import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {
  stages: [
    { duration: "10s", target: 300 },
    { duration: "1m", target: 500 },
    { duration: " 2m", target: 800 },
    { duration: "1m", target: 1000 },    
  ],
  thresholds: {
    http_req_failed: ['rate<0.1'],  // Falla si más del 10% de las solicitudes fallan
    http_req_duration: ['p(95)<500'],  // Falla si el 95% de las solicitudes tardan más de 500 ms
  },
};

export default function () {
  const url = 'http://localhost:4000/api/usuarios/sign-up';
  const payload = JSON.stringify({
    nombre_usuario: 'testuser',
    contrasenha: 'Abc123', // Usamos credenciales incorrectas para forzar errores 401
  });

  const params = {
    headers: { 'Content-Type': 'application/json' },
  };

  const response = http.post(url, payload, params);

  check(response, {
    'Response was 500 (Server Error)': (r) => r.status === 500, // Ver si el servidor colapsa
    'Response was 401 (Unauthorized)': (r) => r.status === 401, // Error de autenticación
    'Response was 400 (Bad Request)': (r) => r.status === 400, // Petición mal formulada
    'Response was 201 (Created)': (r) => r.status === 201, // Si en algún caso el registro es exitoso
  });

  sleep(1);
}
