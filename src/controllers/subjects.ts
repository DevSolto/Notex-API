import { Router } from "express";
import { getSubjectsByIdService, getSubjectsService, createSubjectService, updateSubjectService, getSubjectAndDeleteService } from "../services/subjects";
import { ZodError } from "zod";
import { createSubjectSchema, updatesubjectSchema } from "../schemas/subjects";
import { error } from "console";

export const subjectsRouter = Router();

subjectsRouter.get('/subjects', async (req, res) => {
    const subjects = await getSubjectsService()
    res.send(subjects)
})

subjectsRouter.get('/subjects/:id', async (req, res) => {
    const subjectId = req.params.id
    const subjectReturn = await getSubjectsByIdService(subjectId)
    res.send(subjectReturn)
})

subjectsRouter.post('/subjects', async (req,res) => {
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