export function generateStudent() {
  const timestamp = Date.now() + Math.floor(Math.random() * 1000);

  return {
    name: `Student ${timestamp}`,
    email: `student_${timestamp}@test.com`,
    password: '123456'
  };
}
