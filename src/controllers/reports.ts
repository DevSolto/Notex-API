import { Router } from 'express';
import { getReportsServices, createReportService, getReportAndDeleteService } from '../services/reports';
import { createReportSchema } from "../schemas/reports";
import { ZodError } from "zod";

export const reportsrouter = Router();

reportsrouter.get('/reports', async (req, res) => {
    const reports = await getReportsServices()
    res.send(reports)
})

reportsrouter.post('/reports', async (req, res) => {
    try {
        const createReportParams = createReportSchema.parse(req.body)
        const createdReport = await createReportService(createReportParams)
        res.send(createdReport)
    } catch (error) {
        if(error instanceof ZodError){
            res.status(400).send(error)
        } else{
            res.status(500).send(error)

        }
    }
})

reportsrouter.delete('/reports/:id', async (req, res) => {
    try { 
        const reportDeleted = await getReportAndDeleteService(req.params.id)
        res.send(reportDeleted)
    } catch (error) {
        if(error instanceof ZodError){
            res.status(400).send(error)
        } else{
            res.status(500).send(error)

        }
    }
})