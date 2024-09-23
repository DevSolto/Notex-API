import express from 'express';
import { userRouter } from './controllers/users';
import { conceptRouter } from './controllers/concepts';
import { reportsController } from './controllers/reports';
import { classesController } from './controllers/classes';

const app = express();
app.use(express.json());

app.use(userRouter);
app.use(conceptRouter);
app.use(reportsController);
app.use(classesController);

app.listen(3000, () => console.log('Servidor rodando na porta 3000'))