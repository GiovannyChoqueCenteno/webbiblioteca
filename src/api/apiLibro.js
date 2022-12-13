import axios from "axios";

export const apiLibro = axios.create({
    baseURL: import.meta.env.VITE_SERVICE_LIBRO,
});

