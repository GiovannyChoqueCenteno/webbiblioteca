import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Carousel from '../../components/carousel'
import Navbar from '../../components/navbar'
import '../../components/carousel/carousel.css'
import { apiLibro } from '../../api/apiLibro'

import { Homefull } from './homefull'

const Home = () => {
    const [libros, setLibros] = useState([])
    const [search, setSearch] = useState("")
    useEffect(() => {
        getLibros();
    }, [])
    const getLibros = async () => {
        const res = await apiLibro.get('/api/libro')
        const data =  res.data;
        
        setLibros(data)
    }
    useEffect(()=>{
        if(search.trim().length>0){
            apiLibro.get(`/api/libro?search=${search}`).then(res=>{
                setLibros(res.data)
            } )
        }else{
            getLibros();
        }
    },[search])
    return (
        <>
            <Navbar />
            <div className='container mx-auto'>
                <div className='flex flex-col gap-20'> 

                <div className='flex flex-col items-center mt-10'>
                    <h2 className='text-lg text-gray-500'>¿ Que quieres aprender hoy?</h2>
                    <input className='input w-1/2' value={search} onChange={(e)=>setSearch(e.target.value)} type="text" placeholder='Buscar por nombre o autor' />
                </div>
               {search.trim().length>0? <>
                <h3>Resultados para {search}</h3>
                <div className='grid grid-cols-4 gap-y-5'>
                {libros.map((libro)=>(
                             <img className='' src={`${apiLibro.getUri()}${libro.portada}`} />
                ))}
                </div>

               </> :
               <Homefull libros={libros} />}
                </div>

            </div>

        </>
    )
}

export default Home