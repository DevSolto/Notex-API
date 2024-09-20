import { Router } from "express";
import { getClassesService, createClassService,  updateClassService, getClassesByIdService, getClassAndDeleteService} from "../services/classes";
import { createClassSchema, updateClassSchema } from "../schemas/classes";
import { ZodError } from "zod";

export const classesController = Router();

classesController.get('/classes', async (req, res) => {
    const classes = await getClassesService()
    res.send(classes)
})

classesController.get('/classes/:id', async (req, res) => {
    const classId = req.params.id
    const classReturned = await getClassesByIdService(classId)
    res.send(classReturned)
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

classesController.patch ('/classes:id', async (req, res) => {
    try {
        const classId = req.params.id
        const updateClassParams = updateClassSchema.parse(req.body)
        const updatedClass = await updateClassService(classId, updateClassParams)
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
    try {
        const reportDeleted = await getClassAndDeleteService(req.params.id)
        res.send(reportDeleted)
    } catch (error) {
        if (error instanceof ZodError) {
            res.status(400).send(error)
        } else {
            res.status(500).send(error)
        }
    }    
})

