import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {
  stages: [
    { duration: "10s", target: 25 },
    { duration: "1m", target: 50 },
    { duration: "2m", target: 100 },
    { duration: "1m", target: 200 },    
  ],
  thresholds: {
    http_req_failed: ['rate<0.1'],  
    http_req_duration: ['p(95)<500'], 
  },
};

export default function () {
  const url = 'http://127.0.0.1:4000/api/usuarios/sign-up';
  const payload = JSON.stringify({
    nombre_usuario: 'testuser',
    contrasenha: 'Abc123', 
  });

  const params = {
    headers: { 'Content-Type': 'application/json' },
  };

  const response = http.post(url, payload, params);

  check(response, {
    'Response was 500 (Server Error)': (r) => r.status === 500, 
    'Response was 401 (Unauthorized)': (r) => r.status === 401, 
    'Response was 400 (Bad Request)': (r) => r.status === 400, 
    'Response was 201 (Created)': (r) => r.status === 201, 
  });

  sleep(1);
}
