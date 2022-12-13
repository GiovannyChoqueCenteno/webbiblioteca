import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const Navbar = () => {
  const {state} =useAuth();
  return (
    <div className="navbar bg-theme-element text-white">
  <div className="flex-1">
    <Link to="/" className="btn btn-ghost normal-case text-2xl">Biblioteca</Link>
  </div>
  <div className="flex-none z-10 mr-5">
    <ul className="menu menu-horizontal p-0">
      <li><Link to='/libro'>Catalogo</Link></li>
      {state.isAuthenticated ?
      <li tabIndex={0}>
      <a>
        {state.nombre}
        <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"/></svg>
      </a>
      <ul className="p-2 bg-theme-element">
        <li><a onClick={()=>{
          
        }}>Cerrar Sesion</a></li>
      </ul>
    </li>  
        :  
        <li>
           <Link to="/auth/login">
        Iniciar Sesion
        </Link>
        </li>
    }
    </ul>
  </div>
</div>
  )
}
export default Navbar;