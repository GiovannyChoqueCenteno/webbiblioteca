import React, { useEffect } from 'react'
import { useState } from 'react'
import { apiLibro } from '../../api/apiLibro'
import Navbar from '../../components/navbar'

const CategoriaTable = () => {
  const [categorias, setCategorias] = useState([])
  const [categoria, setCategoria] = useState("")
  useEffect(() => {
    getCategorias()
  }, [])
  const getCategorias = async () => {
    const res = await apiLibro.get('api/categoria')
    setCategorias(res.data)
  }
  const handleSubmit =async(e)=>{
    //Lamada a la api
    const res = await apiLibro.post('api/categoria',{
      nombre : categoria
    })
    console.log(res.status)
    if (res.status ===201){
      setCategorias(categorias=>
        [...categorias,{
          nombre : categoria,
          id : categorias.length +1
        }])
    }
    setCategoria("")
  }
  return (
    <>
      <Navbar />
      <h2 className='text-2xl text-center'>Lista de Categorias</h2>
      <div className='container mx-auto '>
        <table className='table w-full'>
          <thead>
            <tr>
              <th>Id</th>
              <th>Nombre</th>
            </tr>
          </thead>
          <tbody>
            {categorias.map(categoria => (
              <tr >
                <td>{categoria.id}</td>
                <td>{categoria.nombre}</td>
              </tr>
            ))}

          </tbody>
        </table>
        <label htmlFor="my-modal" className="btn btn-primary mt-5">Crear Categoria</label>

        {/* Put this part before </body> tag */}
        <input type="checkbox" id="my-modal" className="modal-toggle" />
        <div className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Crear Categoria</h3>
            <form action="" onSubmit={e=>e.preventDefault()}>
              <div className='form-control'>
                <label htmlFor="" className='label'>Nombre</label>
              <input type="text" onChange={e => setCategoria(e.target.value)} className='input outline outline-1' />
              </div>

            </form>
            <div className="modal-action">
            <label htmlFor="my-modal"  onClick={handleSubmit} className="btn btn-secondary">Cancelar</label>
              <label htmlFor="my-modal"  onClick={handleSubmit} className="btn btn-primary">Guardar</label>
            </div>
          </div>
        </div>
      </div>

    </>

  )
}

export default CategoriaTable