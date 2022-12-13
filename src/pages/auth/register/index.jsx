import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import svgwave from '../../../assets/wave.svg';
import { usuarioContext } from '../../../context/usuarioContext';

const Register = () => {

  const { register } = useContext(usuarioContext);

  function OnSubmit(e) {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.target));
    register(formData, (ok) => { });
  }

  return (
    <div className={"flex h-screen justify-center items-center"}>
      <div style={{ width: 450, minHeight: 360 }} className={"relative rounded-md shadow-2xl bg-white overflow-hidden"} >
        <div>
          <form onSubmit={OnSubmit} className={"p-2"} encType="multipart/form-data">

            <div>
              <h1 className={"text-xl text-center font-bold"}>Register</h1>
            </div>

            <div className={"px-5"}>
              <label className="label">
                <small className="label-text">Nombre</small>
              </label>
              <input
                type="text"
                placeholder="nombre"
                className="input input-sm w-full bg-theme-box"
                name={"nombre"}
                required
                minLength={3}
              />
            </div>

            <div className={"px-5"}>
              <label className="label">
                <small className="label-text">Email</small>
              </label>
              <input
                type="email"
                placeholder="email"
                className="input input-sm w-full bg-theme-box"
                name={"email"}
                required
              />
            </div>

            <div className={"px-5"}>
              <label className="label">
                <small className="label-text">Password</small>
              </label>
              <input
                type="password"
                placeholder="********"
                className="input input-sm w-full bg-theme-box"
                minLength={8}
                name={"password"}
                required
              />
            </div>

            <div className={"px-5"}>
              <label className="label">
                <small className="label-text">Imagen Perfil</small>
              </label>
              <input
                type="file"
                className="file-input file-input-sm  w-full"
                required
                name={"perfil"}
                accept="image/*"
              />
            </div>

            <div className={"text-center my-2 hover:underline "}>
              <Link to={"/auth/login"}>
                <small>¿Ya tienes cuenta? Login</small>
              </Link>
            </div>

            <div className={"px-4 mt-5"}>
              <button className="btn  btn-sm btn-primary">Registrar</button>
            </div>

          </form>
        </div>

        <div className={"h-20"} ></div>

        <div className='absolute bottom-0 w-full drop-shadow-2xl mt-1'>
          <img className={"object-cover h-20 w-full "} src={svgwave} alt="svg image" />
        </div>

      </div>
    </div>
  )
}

export default Register