import express from 'express';
import { router } from './controlls/users';

const app = express();
app.use(express.json());

app.use(router);
app.listen(3333, () => 'Servidor rodando na porta 3333')