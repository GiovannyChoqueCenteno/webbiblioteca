import axios from "axios";

export const apiServiceAuth = axios.create({
    baseURL: import.meta.env.VITE_SERVICE_AUTH,
});

