import React from 'react'
import Image from 'next/image'
import useQuiosco from '../hooks/useQuiosco'
import Categoria from './Categoria';

const Sidebar = () => {
    const { categorias } = useQuiosco();
  return (
    <>
        <Image 
            width={300}
            height={100}
            src={"/assets/img/logo.svg"}
            alt='Imagen logotipo'
        />

        <nav className='mt-10'>
            {
                categorias.map( categoria => (
                    <Categoria 
                        categoria={categoria}
                        key={categoria.id}
                    />
                ))
            }
        </nav>
    </>
  )
}

export default Sidebar