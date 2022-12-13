import React, { useEffect } from 'react'
import { useState } from 'react'
import {Link} from 'react-router-dom'
import { apiLibro } from '../../api/apiLibro'
import Navbar from '../../components/navbar'
import  useAuth from '../../hooks/useAuth'

const LibroList = () => {
    const [libros, setLibros] = useState([])
    const [search, setSearch] = useState("")
    const [categoria_id, setCategoria_id] = useState("")
    const [categorias, setCategorias] = useState([])
    const user =useAuth()
    useEffect(() => {
        getLibros();
        getCategorias();
        console.log(user)
    }, [])
    const getLibros = async () => {
        const res = await apiLibro.get('/api/libro')
        const data =  res.data;
        
        setLibros(data)
    }
    useEffect(()=>{
            apiLibro.get(`/api/libro?search=${search}&categoria_id=${categoria_id}`).then(res=>{
                setLibros(res.data)
            } )
        
            
    },[search,categoria_id])
    const getCategorias = async()=>{
            const res = await apiLibro.get('api/categoria');
            setCategorias(res.data)
    }
    return (
    <>
        <Navbar />
        
        <div className='flex flex-col items-center mt-10'>
                <div className='flex flex-row gap-10'>
                <div className='flex flex-row'>
                <h2 className='text-lg text-gray-500'>¿ Que quieres aprender hoy?</h2>
                    <input className='input w-1/2' value={search} onChange={(e)=>setSearch(e.target.value)} type="text" placeholder='Buscar por nombre o autor' />
                </div>

                <select className='select' value={categoria_id} onChange={e => setCategoria_id(e.target.value)} id="">
                    <option value="" selected disabled>Selecionar una categoria</option>
                {categorias.map(categoria =>(
                    <option value={categoria.id}>{categoria.nombre}</option>
                ))}

                </select>
                </div>

        </div>
   
        <div className='grid grid-cols-3 gap-y-5 ml-5 mt-5'>
        {libros.map(libro =>(
            <div className="card card-compact w-80 bg-base-100 shadow-xl">
            <figure><img src={`${apiLibro.getUri()}${libro.portada}`} alt="Shoes" /></figure>
            <div className="card-body">
              <h2 className="card-title">{libro.titulo}</h2>
              <p>{libro.descripcion.substring(0,50)}</p>
              <div className="card-actions justify-end">
                <Link to={`/libro/${libro.id}`} className="btn btn-primary">Leer libro</Link>
              </div>
            </div>
          </div>
        ))}
        </div>
    </>

  )
}

export default LibroList