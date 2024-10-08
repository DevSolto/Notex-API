import { Router } from "express";
import { ZodError } from "zod";
import { createConceptService, getConceptsByIdService, getConceptsService, updateConceptService, getConceptAndDeleteService } from "../services/concepts";
import { createConceptsSchema, updateConceptsSchema } from "../schemas/concepts";
import { error } from "console";

export const conceptRouter = Router();

conceptRouter.get('/concepts', async (req, res) => {
  try {
    const {
        page = 1,
        limit = 10,
        search, // Novo parâmetro de busca
        isActive,
        url,
        orderBy = 'createdAt',
        order = 'asc'
    } = req.query;

    const allowedOrderFields = ['id', 'url', 'creatorId', 'studentId', 'createdAt', 'updatedAt'];
    const orderByField = allowedOrderFields.includes(orderBy as string) ? orderBy as string : 'createdAt';

    const pageNumber = parseInt(page as string, 10);
    const limitNumber = parseInt(limit as string, 10);
    const orderValue = order as string === 'desc' ? 'desc' : 'asc';
    const isActiveBoolean = isActive ? isActive === 'true' : undefined;

    const concepts = await getConceptsService({
        page: pageNumber,
        limit: limitNumber,
        search: search as string,
        isActive: isActiveBoolean,
        orderBy: orderByField,
        order: orderValue,
        url: orderValue,
    });

    res.send(concepts);
} catch (error) {
    console.error('Error fetching concepts:', error);
    res.status(500).send({ error: 'An error occurred while fetching concepts' });
}
});

conceptRouter.get('/concepts/:id', async (req, res) => {
  const conceptId = req.params.id
  const conceptReturned = await getConceptsByIdService(conceptId)
  res.send(conceptReturned)
})

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


conceptRouter.patch('/concepts/:id', async (req, res) => {
  try {
    const conceptId = req.params.id
    const updateConceptParams = updateConceptsSchema.parse(req.body)
    const updateConcept = await updateConceptService(conceptId, updateConceptParams)
    res.send(updateConcept)
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).send(error)
    } else {
        res.status(500).send(error)
    }
  }
})

conceptRouter.delete('/concepts/:id', async (req, res) => {
  try {
    const conceptDeleted = await getConceptAndDeleteService(req.params.id)
    res.send(conceptDeleted)
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).send(error)
    } else {
      res.status(500).send(error)
    }
  }
})