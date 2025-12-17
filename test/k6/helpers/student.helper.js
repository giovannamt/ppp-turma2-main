import http from 'k6/http';
import { check } from 'k6';
import { BASE_URL } from '../config/env.js';

export function registerStudent(student) {
  const res = http.post(
    `${BASE_URL}/students/register`,
    JSON.stringify(student),
    { headers: { 'Content-Type': 'application/json' } }
  );

  check(res, {
  'student registered or already exists': (r) =>
    r.status === 201 || r.status === 400,
});

  return res;
}
