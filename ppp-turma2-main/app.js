const express = require('express');
const swaggerUi = require('swagger-ui-express');
const yaml = require('js-yaml');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(express.json());

app.use('/instructors', require('./routes/instructor.routes'));
app.use('/students', require('./routes/student.routes'));
app.use('/auth', require('./routes/auth.routes'));
app.use('/lessons', require('./routes/lesson.routes'));
app.use('/progress', require('./routes/progress.routes'));

const swaggerFile = path.join(__dirname, 'resources', 'swagger.yaml');
const swaggerDoc = yaml.load(fs.readFileSync(swaggerFile, 'utf8'));
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

app.get('/', (_, res) => {
  res.send('Music Students Progression API');
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
