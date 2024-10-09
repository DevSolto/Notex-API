import { Router } from "express";
import { getSubjectsByIdService } from "../services/subjects";
import { ZodError } from "zod";
import { createSubjectClassService, getSubjectsClassAndDeleteService, getSubjectsClassService } from "../services/subjectsClass";
import { createSubjectClassSchema } from "../schemas/subjectsClass";


export const subjectClassRouter = Router();

subjectClassRouter.get('/subjectClass', async (req, res) => {
    const subjectsClass = await getSubjectsClassService()
    res.send(subjectsClass)
})

subjectClassRouter.post('/subjectClass', async (req, res) => {
    try {
        const createSubjectClassParams = createSubjectClassSchema.parse(req.body)
        const createdSubjectClass = await createSubjectClassService(createSubjectClassParams)
        res.send(createdSubjectClass)
    } catch (error) {
        if (error instanceof ZodError) {
            res.status(400).send(error)
        } else {
            res.status(500).send(error)
        }
    }
})

subjectClassRouter.delete('/subjectClass/:id', async (req, res) => {
    try {
        const subjectClassDeleted = await getSubjectsClassAndDeleteService(req.params.id)
        res.send(subjectClassDeleted)
    } catch (error) {
        if (error instanceof ZodError) {
            res.status(400).send(error)
        } else {
            res.status(500).send(error)
        }
    }
})