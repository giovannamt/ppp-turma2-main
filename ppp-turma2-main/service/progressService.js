const db = require('../model/database');

exports.getProgress = () => {
  return db.progress;
};
