import { Router } from "express";
import { getSubjectsByIdService, getSubjectsService, createSubjectService, updateSubjectService, getSubjectAndDeleteService, getSubjectsByClasseIdService } from "../services/subjects";
import { ZodError } from "zod";
import { createSubjectSchema, updatesubjectSchema } from "../schemas/subjects";
import { error } from "console";

export const subjectsRouter = Router();

subjectsRouter.get('/subjects', async (req, res) => {
    try {
        const {
            page = 1,
            limit = 10,
            search,
            orderBy = 'createdAt',
            order = 'asc'
        } = req.query;

        const allowedOrderFields = ['id', 'name', 'createdAt', 'updatedAt'];
        const orderByField = allowedOrderFields.includes(orderBy as string) ? orderBy as string : 'createdAt';

        const pageNumber = parseInt(page as string, 10);
        const limitNumber = parseInt(limit as string, 10);
        const orderValue = order as string === 'desc' ? 'desc' : 'asc';

        const subject = await getSubjectsService({
            page: pageNumber,
            limit: limitNumber,
            search: search as string,
            orderBy: orderByField,
            order: orderValue
        });

        res.send(subject);
    } catch (error) {
        console.error('Error fetching subjects:', error);
        res.status(500).send({ error: 'An error occurred while fetching subjects' });
    }
});
subjectsRouter.get('/subjects/classe/:id', async (req, res) => {
    try {
        const {
            page = 1,
            limit = 10,
            search,
            orderBy = 'createdAt',
            order = 'asc'
        } = req.query;

        const classeId = req.params.id
        const allowedOrderFields = ['id', 'name', 'createdAt', 'updatedAt'];
        const orderByField = allowedOrderFields.includes(orderBy as string) ? orderBy as string : 'createdAt';

        const pageNumber = parseInt(page as string, 10);
        const limitNumber = parseInt(limit as string, 10);
        const orderValue = order as string === 'desc' ? 'desc' : 'asc';

        const subject = await getSubjectsByClasseIdService(classeId, {
            page: pageNumber,
            limit: limitNumber,
            search: search as string,
            orderBy: orderByField,
            order: orderValue
        });

        res.send(subject);
    } catch (error) {
        console.error('Error fetching subjects:', error);
        res.status(500).send({ error: 'An error occurred while fetching subjects' });
    }
});

subjectsRouter.get('/subjects/:id', async (req, res) => {
    const subjectId = req.params.id
    const subjectReturn = await getSubjectsByIdService(subjectId)
    res.send(subjectReturn)
})

subjectsRouter.post('/subjects', async (req, res) => {
    try {
        const createSubjectParams = createSubjectSchema.parse(req.body)
        const createSubject = await createSubjectService(createSubjectParams)
        res.send(createSubject)
    } catch (error) {
        if (error instanceof ZodError) {
            res.status(400).send(error)
        } else {
            res.status(500).send(error)
        }
    }
})

subjectsRouter.patch('/subjects/:id', async (req, res) => {
    try {
        const updateSubjectParams = updatesubjectSchema.parse(req.body)
        const updateSubject = await updateSubjectService(req.params.id, updateSubjectParams)
        res.send(updateSubject)
    } catch (error) {
        if (error instanceof ZodError) {
            res.status(400).send(error)
        } else {
            res.status(500).send(error)
        }
    }
})

subjectsRouter.delete('/subjects/:id', async (req, res) => {
    try {
        const subjectDeleted = await getSubjectAndDeleteService(req.params.id)
        res.send(subjectDeleted)
    } catch (error) {
        if (error instanceof ZodError) {
            res.status(400).send(error)
        } else {
            res.status(500).send(error)
        }
    }
})