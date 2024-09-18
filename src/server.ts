import express from 'express';
import { userRouter } from './controllers/users';
import { conceptRouter } from './controllers/concepts';
import { reportsrouter } from './controllers/reports';

const app = express();
app.use(express.json());

app.use(userRouter);
app.use(conceptRouter);
app.use(reportsrouter)

app.listen(3333, () => console.log('Servidor rodando na porta 3333'))