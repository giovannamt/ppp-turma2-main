const db = require('../model/database');
const jwt = require('jsonwebtoken');

exports.register = (data) => {
  db.students.push(data);
  return data;
};

exports.login = ({ email }) => {
  return jwt.sign(
    { email, role: 'student' },
    'secret'
  );
};
