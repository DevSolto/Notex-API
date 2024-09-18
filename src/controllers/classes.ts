import { Router } from "express";
import { getClassesService, createClassService } from "../services/classes";
import { createClassSchema } from "../schemas/classes";
import { ZodError } from "zod";

export const classesrouter = Router();

classesrouter.get('/classes', async (req, res) => {
    const classes = await getClassesService()
    res.send(classes)
})