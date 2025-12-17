const db = require('../model/database');

exports.create = (lesson) => {
  db.lessons.push(lesson);
  return lesson;
};
