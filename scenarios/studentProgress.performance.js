import http from 'k6/http';
import { check, group, sleep } from 'k6';
import { Trend } from 'k6/metrics';
import { authenticateStudent } from '../helpers/auth.helper.js';
import { getStudent } from '../helpers/data.helper.js';
import { BASE_URL } from '../config.js';

export const progressTrend = new Trend('student_progress_duration');

export const options = {
  stages: [
    { duration: '10s', target: 5 },
    { duration: '20s', target: 10 },
    { duration: '10s', target: 0 }
  ],
  thresholds: {
    http_req_duration: ['p(95)<800'],
    student_progress_duration: ['avg<500']
  }
};

export default function () {
  group('Student progress consultation', () => {

    const student = getStudent();
    const token = authenticateStudent(student.email, student.password);

    const response = http.get(`${BASE_URL}/progress/me`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    progressTrend.add(response.timings.duration);

    check(response, {
      'status is 200': r => r.status === 200,
      'response is not empty': r => r.body !== null
    });

    sleep(1);
  });
}
