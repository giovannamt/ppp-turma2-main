import { SharedArray } from 'k6/data';
import { faker } from 'https://jslib.k6.io/faker/0.4.0/index.js';

const students = new SharedArray('students', () =>
  JSON.parse(open('../data/students.json'))
);

export function getStudent() {
  return {
    email: faker.internet.email(),
    password: students[0].password
  };
}
