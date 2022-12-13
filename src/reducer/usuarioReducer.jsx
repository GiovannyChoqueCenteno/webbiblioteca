import { types } from '../types/types';

const usuarioReducer = (state, action) => {
    switch (action.type) {
        case types.UsuarioLogin:
            return {
                ...state,
                ...action.payload
            }
        case types.UsuarioRegister:
            return {
                id: action.payload.id,
                nombre: action.payload.nombre,
                email: action.payload.email,
                perfil: action.payload.perfil,
                isAuthenticated: true,
            }
        case types.UsuarioSet:
            return {
                ...state,
                ...action.payload
            }
            case types.UsuarioLogout:
                return {
                    id: undefined,
                    nombre: "",
                    email: "",
                    isAuthenticated: false,
                    perfil: undefined,
                    suscription: false,
                    fechaFin: undefined,
                    type: undefined                  
                }    
        default:
            return state;
    }
}

export default usuarioReducer