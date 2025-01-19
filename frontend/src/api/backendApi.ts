import axios from 'axios';

const backendApi = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_API_URL,
});

// Interceptor para agregar el token a las solicitudes
backendApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para manejar tokens renovados en las respuestas
backendApi.interceptors.response.use(
  (response) => {
    const newToken = response.headers['x-new-token'];
    if (newToken) {
      localStorage.setItem('token', newToken);
    }
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export { backendApi };
