import {useState,useEffect} from 'react'
import Navbar from '../../components/navbar'
import { apiLibro } from '../../api/apiLibro'
import { Link } from 'react-router-dom'

const LibroTable = () => {
    const [libros, setLibros] = useState([])
    useEffect(() => {
        getLibros();
    }, [])
    const getLibros = async () => {
        const res = await apiLibro.get('/api/libro')
        const data =  res.data;
        setLibros(data)
    }
  return (
    <>
    <Navbar />
    <h2 className='text-2xl text-center'>Lista de Libros</h2>
    <div className='container mx-auto '>
      <table className='table w-full'>
        <thead>
          <tr>
            <th>Id</th>
            <th>Titulo</th>
            <th>Descripcion</th>
            <th>Imagen</th>
            <th>Pdf</th>
          </tr>
        </thead>
        <tbody>
          {libros.map(libro => (
            <tr >
              <td>{libro.id}</td>
              <td>{libro.titulo}</td>
             <td>{libro.descripcion.substr(0,20)}</td>
            <td><a href={`${apiLibro.getUri()}${libro.portada}`} target="_blank" className='underline text-blue-400 hover:cursor-pointer'>Ver imagen</a></td>
            <td><a href={`${apiLibro.getUri()}${libro.file}`} target="_blank" className='underline text-blue-400 hover:cursor-pointer'>Ver pdf</a></td>
            </tr>
   
   ))}

        </tbody>
      </table>
      <Link className='btn btn-primary mt-4' to={"/libro/create"}>Agregar Libro</Link>
    </div>
  </>

  )
}

export default LibroTable