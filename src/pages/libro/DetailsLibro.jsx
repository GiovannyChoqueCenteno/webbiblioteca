import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { apiLibro } from '../../api/apiLibro'
import Navbar from '../../components/navbar'
import { Document, Page } from 'react-pdf/dist/esm/entry.vite'
import useAuth from '../../hooks/useAuth'

const DetailsLibro = () => {
    const {state} = useAuth();
    const [libro, setLibro] = useState({
    })
    const { id } = useParams()
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }

    useEffect(() => {
        getLibro()
        console.log(state.isAuthenticated)
    }, [])

    const getLibro = async () => {
        const res = await apiLibro.get(`/api/libro/${id}`)
        console.log(res.data)
        setLibro(res.data)
    }

    return (
        <>
            <Navbar />
            <div className='container mx-auto'>
                <div className='flex justify-center gap-10'>
                    <div className='flex flex-col gap-10'>
                        <div>
                            <h2 className='text-gray-700 text-4xl'>{libro.titulo}</h2>
                        </div>
                        <div className='flex flex-row justify-center gap-28'>
                            <div>
                                <img className='w-60' src={`${apiLibro.getUri()}${libro.portada}`} alt={libro.titulo} />
                            </div>
                            <div className='flex flex-col justify-between' >
                                <div className='flex flex-row gap-4 items-center'>
                                    <span className='text-gray-800 text-xl'>Titulo : </span>
                                    <span className='text-gray-500 text-xl'>{libro.titulo}</span>
                                </div>
                                <div className='flex flex-row gap-4 items-center'>
                                    <span className='text-gray-800 text-xl'>Autor : </span>
                                    <span className='text-gray-500 text-xl'>{libro.autor}</span>
                                </div>
                                <div className='flex flex-row gap-4 items-center'>
                                    <span className='text-gray-800 text-xl'>Idioma : </span>
                                    <span className='text-gray-500 text-xl'>{libro.idioma}</span>
                                </div>
                                <div className='flex flex-row gap-4 items-center'>
                                    <span className='text-gray-800 text-xl'>Categoria : </span>
                                    <span className='text-gray-500 text-xl'>{libro.categoria_id?.nombre}</span>
                                </div>

                            </div>
                        </div>
                        <div className='flex flex-col gap-5'>
                            <div className='text-2xl'>
                                Descripcion
                            </div>
                            <div>
                                {libro.descripcion}
                            </div>
                        </div>
                        {state.suscription ?
                        <a target={'_blank'} href={`${apiLibro.getUri()}${libro.file}`} className='btn bg-theme-element hover:btn-primary' >Leer Libro</a>
                        :
                        <Link className='btn bg-theme-element' to={'/login'}>Suscribirse</Link>
                    }
                    </div>
                </div>
            </div>
        </>

    )
}

export default DetailsLibro
