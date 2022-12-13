import { createContext, useReducer } from "react";
import { apiServiceAuth } from "../api/apiServiceAuth";
import { apiServiceSuscription } from "../api/apiServiceSuscription";
import { saveToken } from "../helpers/helper";
import usuarioReducer from "../reducer/usuarioReducer";
import { types } from "../types/types";

export const usuarioContext = createContext(null);

const initialState = {
  id: undefined,
  nombre: "",
  email: "",
  isAuthenticated: false,
  perfil: undefined,
  suscription: false,
  fechaFin: undefined,
  type: undefined
}

export const UsuarioContextProvider = ({ children }) => {

  const [state, dispatch] = useReducer(usuarioReducer, initialState);

  async function login(formData, callback) {

    try {
      const result = await apiServiceAuth.post(`/usuario/login`, formData);
      const { data } = result;

      if (!data.ok) {
        console.log(data)
        callback(false);
        return;
      }

      const usuario = data.data;
      const typeUser = usuario.rol_id = 1 ? "client" : "admin";

      const response = await apiServiceSuscription.get(`/suscriptor/active/${usuario.id}`);
      const dataSuscription = response.data;

      let fechaFin;
      let suscription = false;
      if (dataSuscription.ok && dataSuscription.data != null) {
        fechaFin = dataSuscription.data.fechaFin;
        suscription = true;
      }

      const payload = { id: usuario.id, nombre: usuario.nombre, email: usuario.email, perfil: usuario.perfil, type: typeUser, fechaFin, suscription };

      dispatch({
        type: types.UsuarioLogin,
        payload
      });

      callback(true);

    } catch (error) {
      console.log(error);
      callback(false);
    }

  }

  async function register(formData, callback) {

    try {
      let form = new FormData();
      form.append("nombre", formData.nombre);
      form.append("email", formData.email);
      form.append("password", formData.password);
      form.append("perfil", formData.perfil);

      const result = await apiServiceAuth.post(`/usuario/register`, form);
      const { data } = result;

      if (!data.ok) {
        console.log(data)
        callback(false);
        return;
      }

      let usuario = data.data;

      dispatch({
        type: types.UsuarioRegister,
        payload: { id: usuario.id, nombre: usuario.nombre, email: usuario.email, perfil: usuario.perfil }
      });
      callback(true);

    } catch (error) {
      console.log(error);
      callback(false);
    }
  }

  async function compareFace(fileImage, perfil, callback) {
    try {
      const form = new FormData();
      form.append("perfil", perfil);
      form.append("photo", fileImage);
      const { data } = await apiServiceAuth.post(`/usuario/compare`, form);

      if (!data.compare) {
        callback(false, "Face Invalid");
        return;
      }
      
      let token = {
        ...state,
        isAuthenticated: true
      }

      saveToken(token);

      dispatch({
        type: types.UsuarioLogin,
        payload: { isAuthenticated: true }
      });

      callback(true, "");
    } catch (error) {
      console.log(error)
      callback(false, "");
    }
  }

  async function setContext(obj) {
    dispatch({
      type: types.UsuarioSet,
      payload: obj
    });
  }
  function logout(){
    dispatch({
      type: types.UsuarioLogout,
    });
    localStorage.removeItem("_token");
    location.reload();
  }
  return (
    <usuarioContext.Provider value={{
      state,
      login,
      register,
      compareFace,
      setContext,
      logout
    }}>
      {children}
    </usuarioContext.Provider>
  )
}

