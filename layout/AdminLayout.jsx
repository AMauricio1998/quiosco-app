import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AdminLayout({ children, pagina }) {
  const [paginaActual, setPaginaActual] = useState('')
  const router = useRouter()

  useEffect(() => {
    setPaginaActual(router.asPath)    
  }, [])

  return (
    <>
      <Head>
        <title>Café - {pagina}</title>
        <meta name="description" content="Quosco Cafetería" />
      </Head>

      <div className="md:flex">
            <aside className="md:w-4/12 xl:w-1/4 2xl:w-1/5 py-5">
                <Image
                    width={300}
                    height={100}
                    src="/assets/img/logo.svg"
                    alt="imagen logotipo"
                />
                <nav className="mt-10">
                  <div className={`flex items-center gap-4 w-full border p-5 hover:bg-amber-400 ${paginaActual === '/admin' ? 'bg-amber-400' : ''}`}>
                    <button
                      type="button" 
                      className="text-2xl font-bold hover:cursor-pointer" 
                      onClick={() => {
                        router.push('/admin')
                      }}
                    >
                      Ordenes Pendientes
                    </button>
                  </div>
                  <div className={`flex items-center gap-4 w-full border p-5 hover:bg-amber-400 ${paginaActual === '/completadas' ? 'bg-amber-400' : ''}`}>
                    <button
                      type="button" 
                      className="text-2xl font-bold hover:cursor-pointer"
                      onClick={() => {
                        router.push('/completadas')
                      }} 
                    >
                      Ordenes Completadas
                    </button>
                  </div>
                </nav>
            </aside>

            <main className="md:w-8/12 xl:w-3/4 2xl:w-4/5 h-screen overflow-y-scroll">
                <div className="p-10">
                    {children}
                </div>
            </main>
      </div>
      <ToastContainer />
    </>
  );
} 