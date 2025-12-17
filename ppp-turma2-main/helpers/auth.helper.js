import http from 'k6/http';
import { BASE_URL } from '../config.js';

let cachedToken;

export function authenticateStudent(email, password) {
  if (cachedToken) return cachedToken;

  const payload = JSON.stringify({ email, password });

  const response = http.post(
    `${BASE_URL}/auth/student/login`,
    payload,
    { headers: { 'Content-Type': 'application/json' } }
  );

  cachedToken = response.json('token');
  return cachedToken;
}
