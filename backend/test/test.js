import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {
    stages: [
      { duration: '1m', target: 100 }, 
      { duration: '2m', target: 300 }, 
      { duration: '3m', target: 500 }, 
      { duration: '2m', target: 300 }, 
      { duration: '1m', target: 0 },   
    ],
  };
  
export default function () {
  const url = 'http://localhost:4000/api/usuarios/sign-up';
  const payload = JSON.stringify({
    nombre_usuario: 'testuser',
    contrasenha: 'testpassword',
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const response = http.post(url, payload, params);

  check(response, {
    'status was 200': (r) => r.status === 200,
    'response time OK': (r) => r.timings.duration < 200,
  });

  sleep(1);
}
