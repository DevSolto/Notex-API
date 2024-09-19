import { Router } from "express";
import { getClassesService, createClassService } from "../services/classes";
import { createClassSchema } from "../schemas/classes";
import { ZodError } from "zod";

export const classesController = Router();

classesController.get('/classes', async (req, res) => {
    const classes = await getClassesService()
    res.send(classes)
})

classesController.post('/reports', async (req, res) => {
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