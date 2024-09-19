import { Router } from "express";
import { ZodError } from "zod";
import { createConceptService, getConceptsService } from "../services/concepts";
import { createConceptsSchema } from "../schemas/concepts";

export const conceptRouter = Router();

conceptRouter.get('/concepts', async (req, res) => {
  try {
    const users = await getConceptsService();
    res.send(users);
  } catch (error) {
    console.error('Error fetching concepts:', error);
    res.status(500).send({ message: 'Internal Server Error' });
  }
});

conceptRouter.post('/concepts', async (req, res) => {
  try {
    const createConceptParams = createConceptsSchema.parse(req.body);
    const createdConcept = await createConceptService(createConceptParams);
    res.send(createdConcept);
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).send({
        message: 'Validation Error',
        errors: error,
      });
    } else if (error instanceof Error) {
      if (error.message.includes('Criador não encontrado')) {
        res.status(404).send({ message: error.message });
      } else if (error.message.includes('Estudante não encontrado')) {
        res.status(404).send({ message: error.message });
      } else {
        res.status(400).send({ message: error.message });
      }
    } else {
      console.error('Unexpected error:', error);
      res.status(500).send({ message: 'Internal Server Error' });
    }
  }
});
