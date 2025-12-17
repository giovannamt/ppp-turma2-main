const db = require('../model/database');
const jwt = require('jsonwebtoken');

exports.register = (data) => {
  db.instructors.push(data);
  return data;
};

exports.login = ({ email }) => {
  return jwt.sign(
    { email, role: 'instructor' },
    'secret'
  );
};
