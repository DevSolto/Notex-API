import express from 'express';
import cors from 'cors'; // Importe o pacote cors
import { userRouter } from './controllers/users';
import { conceptRouter } from './controllers/concepts';
import { reportsController } from './controllers/reports';
import { classesController } from './controllers/classes';
import { studingsRouter } from './controllers/studings';

const app = express();
app.use(cors()); 
app.use(express.json());

app.use(userRouter);
app.use(studingsRouter);
app.use(conceptRouter);
app.use(reportsController);
app.use(classesController);

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
