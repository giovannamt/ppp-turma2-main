import { group, sleep } from 'k6';
import { registerStudent } from './helpers/student.helper.js';
import { loginAsStudent } from './helpers/auth.helper.js';
import { generateStudent } from './helpers/data.helper.js';

/* =========================
   K6 OPTIONS
========================= */
export const options = {
  stages: [
    { duration: '10s', target: 5 },
    { duration: '20s', target: 10 },
    { duration: '10s', target: 0 },
  ],
  thresholds: {
    http_req_failed: ['rate < 0.2'],
    checks: ['rate > 0.99'],
  },
};

/* =========================
   DEFAULT TEST FUNCTION
========================= */
export default function () {
  const student = generateStudent();

  group('Student Registration', () => {
    registerStudent(student);
  });

  sleep(0.5);

  group('Student Login', () => {
    loginAsStudent(student.email, student.password);
  });
}

/* =========================
   HTML REPORT
========================= */
export function handleSummary(data) {
  return {
    'reports/relatorio-execucao.html': generateHtmlReport(data),
  };
}

function generateHtmlReport(data) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>K6 Performance Test Report</title>
  <style>
    body { font-family: Arial, sans-serif; margin: 40px; }
    h1 { color: #333; }
    table { border-collapse: collapse; width: 60%; }
    th, td { border: 1px solid #ccc; padding: 8px; }
    th { background-color: #f4f4f4; }
  </style>
</head>
<body>
  <h1>K6 Performance Test Report</h1>

  <h2>Execution Summary</h2>
  <table>
    <tr><th>Metric</th><th>Value</th></tr>
    <tr>
      <td>Checks</td>
      <td>${(data.metrics.checks.values.rate * 100).toFixed(2)}%</td>
    </tr>
    <tr>
      <td>HTTP Requests Failed</td>
      <td>${(data.metrics.http_req_failed.values.rate * 100).toFixed(2)}%</td>
    </tr>
    <tr>
      <td>Average Response Time</td>
      <td>${data.metrics.http_req_duration.values.avg.toFixed(2)} ms</td>
    </tr>
    <tr>
      <td>95th Percentile</td>
      <td>${data.metrics.http_req_duration.values['p(95)'].toFixed(2)} ms</td>
    </tr>
  </table>

  <p><strong>Test finished at:</strong> ${new Date().toLocaleString()}</p>
</body>
</html>
`;
}
