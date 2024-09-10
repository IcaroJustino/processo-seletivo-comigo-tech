import axios from "axios";

export const api = axios.create({
  //configuração da api
  baseURL: import.meta.env.VITE_API_URL,
});

//interceptor para adicionar o token de autenticação
api.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
