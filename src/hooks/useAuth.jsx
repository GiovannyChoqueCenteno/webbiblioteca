import { useContext } from "react";
import { usuarioContext } from "../context/usuarioContext";

const useAuth = ()=>{
    const context = useContext(usuarioContext);
    if (!context) throw new Error("There is no Auth provider");
    return context;
}
export default useAuth