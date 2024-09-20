import { Router } from "express";
import { getClassesService, createClassService,  updateClassService} from "../services/classes";
import { createClassSchema, updateClassSchema } from "../schemas/classes";
import { ZodError } from "zod";

export const classesController = Router();

classesController.get('/classes', async (req, res) => {
    const classes = await getClassesService()
    res.send(classes)
})

classesController.get('/users/:id', async (req, res) => {
    const classId = req.params.id
    res.send(getClassesService)
    
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



