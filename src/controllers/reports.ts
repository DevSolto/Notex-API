import { Router } from 'express';
import { getReportsServices, createReportService } from '../services/reports';
import { createReportSchema } from "../schemas/reports";
import { ZodError } from "zod";

export const reportsController = Router();

reportsController.get('/reports', async (req, res) => {
    const reports = await getReportsServices()
    res.send(reports)
})

reportsController.post('/reports', async (req, res) => {
    try {
        const createReportParams = createReportSchema.parse(req.body)
        const createdReport = await createReportService(createReportParams)
        res.send(createdReport)
    } catch (error) {
        if (error instanceof ZodError) {
            res.status(400).send(error)
        } else {
            res.status(500).send(error)

        }
    }
})
