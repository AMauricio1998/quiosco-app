import useSWR from 'swr'
import axios from 'axios'
import Orden from '@/components/Orden'
import AdminLayout from '@/layout/AdminLayout'

const Completadas = () => {
    const fetcher = () => axios('/api/ordenes-completas').then(datos => datos.data)
    const { data, error, isLoading } = useSWR('/api/user', fetcher, { refreshInterval: 100})
  return (
    <AdminLayout pagina={'Admin'}>
        <h1 className='text-4xl font-black'>Panel de Administración</h1>
        <p className='text-2xl my-10'>
            Ordenes Completadas
        </p>

        {data && data.length ? data.map(orden => (
            <Orden 
                key={orden.id}
                orden={orden}
            />
        )) : <p>No hay ordenes completas</p>}
    </AdminLayout>
  )
}

export default Completadas