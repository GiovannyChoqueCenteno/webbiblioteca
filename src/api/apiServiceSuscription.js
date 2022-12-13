import axios from "axios";
import { extractToken } from "../helpers/helper";
import moment from 'moment';

export const apiServiceSuscription = axios.create({
    baseURL: import.meta.env.VITE_SERVICE_SUSCRIPTION,
});

apiServiceSuscription.interceptors.request.use(function (config) {
    let json = extractToken();
    if (json != null) {
        if (json.fechaFin == undefined) return config;

        let fechaActual = moment(new Date());
        let fechaFinal = moment(json.fechaFin);
        if (fechaActual > fechaFinal) {
            localStorage.removeItem("_token");
            location.reload();
        }
    }
    return config;
});