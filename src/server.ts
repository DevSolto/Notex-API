import express from 'express';
import cors from 'cors'
import { userRouter } from './controllers/users';
import { conceptRouter } from './controllers/concepts';
import { reportsController } from './controllers/reports';
import { classesController } from './controllers/classes';
import { studyingRouter } from './controllers/studying';
import { subjectsRouter } from './controllers/subjects';
import { subjectClassRouter } from './controllers/subjectsClass';
import { schedulesRouter } from './controllers/schedules';

const app = express();
app.use(cors());
app.use(express.json());

app.use(userRouter);
app.use(studyingRouter);
app.use(conceptRouter);
app.use(reportsController);
app.use(classesController);
app.use(subjectsRouter);
app.use(subjectClassRouter);
app.use(schedulesRouter);

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
