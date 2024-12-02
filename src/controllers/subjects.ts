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

        const classId = req.params.id
        const allowedOrderFields = ['id', 'name', 'createdAt', 'updatedAt', 'subfield'];
        const orderByField = allowedOrderFields.includes(orderBy as string) ? orderBy as string : 'createdAt';

        const pageNumber = parseInt(page as string, 10);
        const limitNumber = parseInt(limit as string, 10);
        const orderValue = order as string === 'desc' ? 'desc' : 'asc';

        const subject = await getSubjectsByClasseIdService(classId, {
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

subjectsRouter.get("/by-class/:id", async (req, res) => {
    try {
        const classId = req.params.id;
        const { page, limit, search, orderBy, order } = req.query;

        const subjects = await getSubjectsByClasseIdService(classId, {
            page: page ? parseInt(page as string, 10) : undefined,
            limit: limit ? parseInt(limit as string, 10) : undefined,
            search: search as string,
            orderBy: orderBy as string,
            order: order as 'asc' | 'desc',
        });

        res.status(200).json(subjects);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro ao buscar disciplinas da turma." });
    }
});