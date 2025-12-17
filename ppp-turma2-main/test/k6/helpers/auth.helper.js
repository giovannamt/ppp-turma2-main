import http from 'k6/http';
import { check } from 'k6';

export function loginAsStudent(baseUrl, email, password) {
  const res = http.post(`${baseUrl}/students/login`, JSON.stringify({
    email,
    password
  }), {
    headers: { 'Content-Type': 'application/json' }
  });

  check(res, {
    'login success': (r) => r.status === 200
  });

  return res.json('token');
}
