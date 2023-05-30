import { useState, useEffect, createContext } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

const QuioscoContext = createContext();

const QuioscoProvider = ({ children }) => {

    const [categorias, setCategorias] = useState([]);
    const [categoriaActual, setCategoriaActual] = useState({})
    const [producto, setProducto] = useState({})
    const [modal, setModal] = useState(false)
    const [pedido, setPedido] = useState([])
    const [nombre, setNombre] = useState('')
    const [total, setTotal] = useState(0)
    
    const router = useRouter();

    useEffect(() => {
        const obtenerCategorias = async () => {
            try {
                const { data } = await axios.get('/api/categorias')
                setCategorias(data)
            } catch (error) {
                console.log(error)
            }
        }
        obtenerCategorias()
    }, [])

    useEffect(() => {
      setCategoriaActual(categorias[0])
    }, [categorias])

    useEffect(() => {
      const nuevoTotal = pedido.reduce((total, producto) => (producto.precio * producto.cantidad) + total, 0)

      setTotal(nuevoTotal)
    }, [pedido])
    const handleClickCategoria = id => {
        const categoria = categorias.filter( cat => cat.id === id)
        setCategoriaActual(categoria[0])
        router.push('/')
    }
    const handleSetProducto = producto => {
        setProducto(producto)
    }
    const handleChangeModal = () => {
        setModal(!modal)
    }
    const handleAgregarPedido = ({categoriaId, ...producto}) => {

        if(pedido.some(productostate => productostate.id === producto.id )) {
            const pedidoActualizado = pedido.map(productoState => productoState.id === producto.id ? producto : productoState)

            setPedido(pedidoActualizado)
            toast.success("Agregado al pedido")
        } else {
            setPedido([...pedido, producto])
            toast.success("Agregado al pedido")
        }

        setModal(false)
    }

    const handleEditarCantidades = (id) => {
        const pedidoActualizar = pedido.filter(producto => producto.id === id)
        setProducto(pedidoActualizar[0])
        setModal(!modal)
    }

    const handleEliminarProductos = (id) => {
        const pedidoActualizar = pedido.filter(producto => producto.id !== id)
        setPedido(pedidoActualizar)
    }

    const colocarOrden = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/ordenes', {pedido, nombre, total, fecha: Date.now().toString()})

            //resetear la app
            setCategoriaActual(categorias[0])
            setPedido([])
            setNombre('')
            setTotal(0)

            toast.success("Pedido Realizado Correctamente")
            setTimeout(() => {
                router.push('/')
            }, 3000);
        } catch (error) {
            console.log(error)
        }
        console.log("Enviando orden")
    }

    return (
        <QuioscoContext.Provider value={{
            categorias,
            handleClickCategoria,
            categoriaActual,
            handleSetProducto,
            handleChangeModal,
            modal,
            producto,
            handleAgregarPedido,
            pedido,
            handleEditarCantidades,
            handleEliminarProductos,
            nombre, 
            setNombre,
            colocarOrden,
            total
        }}>
            {children}
        </QuioscoContext.Provider>
    )
}

export {
    QuioscoProvider
}

export default QuioscoContext