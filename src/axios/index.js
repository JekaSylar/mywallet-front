import axios from "axios";
import router from "@/router";
import {useAuth} from '@/stores/auth.js'


const baseUrl = import.meta.env.VITE_URL_API;
const requestAxios = axios.create({
  baseURL: baseUrl
});

requestAxios.interceptors.response.use(null, (err) => {
  const store = useAuth();
  if (err.response.status === 401 || err.response.status === 419) {
   // store.logout();
    router.push("/login?message=auth");
  }
  return Promise.reject(err);
});

requestAxios.interceptors.request.use(
  config => {
    const token = localStorage.getItem('jwt-token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);


export default requestAxios;
