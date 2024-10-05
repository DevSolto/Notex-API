import { Router } from "express";
import { getClassesService, createClassService, updateClassService, getClassesByIdService, deleteClassService } from "../services/classes";
import { createClassSchema, updateClassSchema } from "../schemas/classes";
import { ZodError } from "zod";
import { getStudyingByStudentModel } from "../models/studying";

export const classesController = Router();

classesController.get('/classes', async (req, res) => {
    try {
        const { page = 1, limit = 10, year, orderBy = 'id', order = 'asc' } = req.query;

        const allowedOrderFields = ['id', 'title', 'code', 'year', 'createdAt'];
        const orderByField = allowedOrderFields.includes(orderBy as string) ? orderBy as string : 'id';

        const pageNumber = parseInt(page as string, 10);
        const limitNumber = parseInt(limit as string, 10);
        const yearNumber = year ? year as string : undefined;
        const orderValue = order as string === 'desc' ? 'desc' : 'asc';

        const classes = await getClassesService({
            page: pageNumber,
            limit: limitNumber,
            year: yearNumber,
            orderBy: orderByField,
            order: orderValue,
        });

        res.send(classes);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'An error occurred while fetching classes' });
    }
});



classesController.get('/classes/:id', async (req, res) => {
    const classId = req.params.id

    const deletedClass = await getClassesByIdService(classId)

    res.send(deletedClass)

})

classesController.get('/classes/students/:id', async (req, res) => {
    const studentId = req.params.id

    const classe = await getStudyingByStudentModel(studentId)

    res.send(classe)
})

classesController.post('/classes', async (req, res) => {
    try {
        const createClassParams = createClassSchema.parse(req.body)
        const createdClass = await createClassService(createClassParams)
        res.send(createdClass)
    } catch (error) {
        if (error instanceof ZodError) {
            res.status(400).send(error)
        } else {
            res.status(500).send(error)
        }
    }
})
classesController.patch('/classes/:id', async (req, res) => {
    try {
        const createClassParams = updateClassSchema.parse(req.body)
        const updatedClass = await updateClassService(req.params.id, createClassParams)
        res.send(updatedClass)
    } catch (error) {
        if (error instanceof ZodError) {
            res.status(400).send(error)
        } else {
            res.status(500).send(error)
        }
    }
})

classesController.delete('/classes/:id', async (req, res) => {
    const deletedClass = await deleteClassService(req.params.id)

    res.send(deletedClass)
})
