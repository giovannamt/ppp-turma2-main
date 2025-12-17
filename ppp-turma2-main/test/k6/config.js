import { group } from 'k6';
import { registerStudent } from './helpers/student.helper.js';
import { loginAsStudent } from './helpers/auth.helper.js';
import { faker } from '@faker-js/faker';

export default function () {
  const student = {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    password: '123456',
  };

  group('Student Registration', () => {
    registerStudent(student);
  });

  group('Student Login', () => {
    const token = loginAsStudent(student.email, student.password);
  });
}
