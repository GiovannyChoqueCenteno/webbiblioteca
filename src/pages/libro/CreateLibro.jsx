import React, { useState , useEffect } from 'react'
import { Link ,useNavigate } from 'react-router-dom'
import { apiLibro } from '../../api/apiLibro'
import Navbar from '../../components/navbar'

const CreateLibro = () => {
  const navigate = useNavigate();
  const [libro, setLibro] = useState({
    titulo : ""
  })
  const {titulo } = libro;
  const [categorias, setCategorias] = useState([])
  const handleChange = (e) => {
   setLibro(libro=>({
    ...libro,
    [e.target.name] : e.target.value
   }))
  }
  const handleFileChange =(e)=>{
    setLibro(libro=>(
      {
        ...libro,
        [e.target.name] : e.target.files[0]
      }
    ))
  }
  useEffect(() => {
    getCategorias();
  }, [])
  
  const getCategorias = async()=>{
    const res = await apiLibro.get('api/categoria');
    setCategorias(res.data)
  }

  const handleSubmit = async(e)=>{
    e.preventDefault();
    // // const formData = new FormData();
    // // Object.keys(libro).forEach(key => formData.append(key, libro[key]));
    // // console.log(formData)
    const data = transform()
   const res = await apiLibro.post('api/libro',data);
    if(res.status ===201){
      navigate('/admin/libro')
    }
  }

  const transform =()=>{
    const formData = new FormData();
    formData.append("titulo",libro.titulo)
    formData.append("descripcion", libro.descripcion)
    formData.append("autor", libro.autor)
    formData.append("categoria_id",Number(libro["categoria_id"]))
    formData.append("indice", libro.indice)
    formData.append("idioma", libro.idioma)
    formData.append("portada", libro.portada,libro.portada.name)
    formData.append("file", libro.file,libro.file.name)
    return formData;
  }
  return (
    <>
      <Navbar />
      <div className='container text-center mx-auto'>
        <h2 className='text-gray-500 mb-3 text-4xl text-center' >Registrar Libro</h2>
        <form onSubmit={handleSubmit} >
          <div className='form-control flex-row justify-between mx-auto w-2/4 mb-3'>
            <label className='label' htmlFor="">Titulo</label>
            <input className='input w-4/5' name='titulo' value={titulo} onChange={handleChange} type="text" />
          </div>
          <div className='form-control flex-row justify-between mx-auto w-2/4 mb-3'>
            <label className='label' htmlFor="">Autor</label>
            <input type="text" name='autor' onChange={handleChange} className='input w-4/5' />
          </div>
          <div className='form-control flex-row justify-between mx-auto w-2/4 mb-3'>
            <label className='label' htmlFor="">Idioma</label>
            <input type="text" name='idioma' onChange={handleChange}  className='input w-4/5' />
          </div>
          <div className='form-control flex-row justify-between mx-auto w-2/4 mb-3'>
            <label className='label' htmlFor="">Descripion</label>
            <textarea className='textarea w-4/5 resize-none' onChange={handleChange} name="descripcion" id="" cols="30" rows="10"></textarea>
          </div>
          <div className='form-control flex-row justify-between mx-auto w-2/4 mb-3'>
            <label htmlFor="">Seleccionar categorias</label>
            <select onChange={handleChange} name="categoria_id">
              <option value="0" selected disabled >Seleccionar una categoria</option>
            {categorias.map(categoria=>(
              <option value={categoria.id}>{categoria.nombre}</option>
            ))}
            </select>

          </div>
          <div className='form-control flex-row justify-between mx-auto w-2/4 mb-3'>
            <label className='label' >Indice</label>
            <textarea className='textarea resize-none w-4/5' name="indice" onChange={handleChange} id="" cols="30" rows="10"></textarea>
          </div>
          <div className='form-control flex-row justify-between mx-auto w-2/4 mb-3'>
             <label className='label' htmlFor="">Portada</label>
            <input type="file" name='portada' onChange={handleFileChange} />
          </div>
          <div className='form-control flex-row justify-between mx-auto w-2/4 mb-3'>
            <label className='label' htmlFor="">Libro</label>
            <input type="file" name='file' onChange={handleFileChange} />
          </div>
          <input type="submit" className='btn btn-primary' value="Crear Libro" />
            <Link to='/admin/libro' className='btn btn-warning ml-4'>Volver a la lista</Link>
        </form>
      </div>
    </>
  )
}

export default CreateLibro