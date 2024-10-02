import { Router } from "express";
import { ZodError } from "zod";
import { getStudingsService, createStudingsService } from "../services/studings";
import { createStudingsSchema } from "../schemas/studing";

export const studingsRouter = Router();

studingsRouter.get('/studings', async (req, res) => {
    try {
        const studing = await getStudingsService();
        res.send(studing);
    } catch (error) {
        console.error('Error fetching concepts:, error');
        res.status(500).send({ message: 'Interna Server Error'});
    }
});

studingsRouter.post('/studings', async (req, res) => {
    try {
        const createStudingParams = createStudingsSchema.parse(req.body);
        const createdStuding = await createStudingsService(createStudingParams);
        res.send(createdStuding);
    } catch (error) {
        if (error instanceof ZodError) {
            res.status(400).send({
                message: 'Validation Error',
                errors: error,
            });
        } else if (error instanceof Error) {
            if (error.message.includes('Classe não encontrada')) {
              res.status(404).send({ message: error.message });
            } else if (error.message.includes('Estudante não encontrado')) {
              res.status(404).send({ message: error.message });
            } else {
              res.status(400).send({ message: error.message });
            }
          } else {
            console.error('Unexpected error:', error);
            res.status(500).send({ message: 'Internal Server Error' });
          }}
});