import http from 'k6/http';
import { check, group } from 'k6';
import { Trend } from 'k6/metrics';
import { loginAsStudent } from './helpers/auth.helper.js';
import students from './data/students.json';

export let options = {
  stages: [
    { duration: '10s', target: 5 },
    { duration: '20s', target: 10 },
    { duration: '10s', target: 0 }
  ],
  thresholds: {
    http_req_duration: ['p(95)<500'],
    checks: ['rate>0.95']
  }
};

const responseTime = new Trend('response_time');
const BASE_URL = __ENV.BASE_URL || 'http://localhost:3000';

const studentsData = students.default || students;

export default function () {
  studentsData.forEach(student => {

    group('Student Login', () => {
      const token = loginAsStudent(BASE_URL, student.email, student.password);

      group('Consult Progress', () => {
        const res = http.get(`${BASE_URL}/progress`, {
          headers: {
            Authorization: token
          }
        });

        responseTime.add(res.timings.duration);

        check(res, {
          'status 200': (r) => r.status === 200
        });
      });
    });

  });
}
