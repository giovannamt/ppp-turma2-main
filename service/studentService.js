const students = [];

function create(name, email, password) {
  const student = {
    id: students.length + 1,
    name,
    email,
    password,
    role: 'student',
    lessonsCompleted: []
  };

  students.push(student);
  return student;
}

function findByEmail(email) {
  return students.find(student => student.email === email);
}

function getAll() {
  return students;
}

function addLesson(studentId, lessonId) {
  const student = students.find(s => s.id === Number(studentId));
  if (student) {
    student.lessonsCompleted.push(lessonId);
  }
  return student;
}

module.exports = {
  create,
  findByEmail,
  getAll,
  addLesson
};
