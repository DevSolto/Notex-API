import { Router } from "express";
import { getClassesService, createClassService, updateClassService, getClassesByIdService, deleteClassService } from "../services/classes";
import { createClassSchema, updateClassSchema } from "../schemas/classes";
import { ZodError } from "zod";

export const classesController = Router();

classesController.get('/classes', async (req, res) => {
    const classes = await getClassesService()
    res.send(classes)
})

classesController.get('/classes/:id', async (req, res) => {
classesController.get('/classes/:id', async (req, res) => {
    const classId = req.params.id

    const deletedClass = await getClassesByIdService(classId)

    res.send(deletedClass)

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





