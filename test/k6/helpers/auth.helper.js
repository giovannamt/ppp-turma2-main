import http from 'k6/http';
import { check, fail } from 'k6';
import { BASE_URL } from '../config/env.js';

export function loginAsStudent(email, password) {
  const res = http.post(
    `${BASE_URL}/students/login`,
    JSON.stringify({ email, password }),
    { headers: { 'Content-Type': 'application/json' } }
  );

  check(res, {
    'student login status 200': (r) => r.status === 200,
  });

  if (!res.headers['Content-Type']?.includes('application/json')) {
    fail(`Expected JSON, got: ${res.body}`);
  }

  return `Bearer ${res.json().token}`;
}
