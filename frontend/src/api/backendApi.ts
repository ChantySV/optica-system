import axios from 'axios'


const backendApi = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_API_URL
})


backendApi.interceptors.response.use(
  (response) => {
    const newToken = response.headers['x-new-token'];
    if (newToken) {
      localStorage.setItem('token', newToken);
    }
    return response;
  },
  (error) => {
    return Promise.reject(error); // Manejar errores
  }
);

export { backendApi }
