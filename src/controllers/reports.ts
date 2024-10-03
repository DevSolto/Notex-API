import { Router } from 'express';
import { getReportsServices, createReportService, getReportAndDeleteService, getReportByIdService, updateReportService } from '../services/reports';
import { createReportSchema, updateReportSchema } from "../schemas/reports";
import { ZodError } from "zod";

export const reportsController = Router();

reportsController.get('/reports', async (req, res) => {
    try {
        const { page = 1, limit = 10, orderBy = 'title', order = 'asc' } = req.query;
        const orderValue = order === 'asc' || order === 'desc' ? order : 'asc';

        const reports = await getReportsServices({
            page: Number(page),
            limit: Number(limit),
            orderBy: String(orderBy),
            order: orderValue,
        });

        res.send(reports);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Erro ao buscar relatórios' });
    }
});



reportsController.get('/reports/:id', async (req, res) => {
    const reportsId = req.params.id
    const reportsReturned = await getReportByIdService(reportsId)
    res.send(reportsReturned)
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

reportsController.patch('/reports/:id', async (req, res) => {
    try {
        const reportsId = req.params.id
        const updateReportParams = updateReportSchema.parse(req.body)
        const updateReport = await updateReportService(reportsId, updateReportParams)
        res.send(updateReport)
    } catch (error) {
        if (error instanceof ZodError) {
            res.status(400).send(error)
        } else {
            res.status(500).send(error)
        }
    }
})

reportsController.delete('/reports/:id', async (req, res) => {
    try { 
        const reportDeleted = await getReportAndDeleteService(req.params.id)
        res.send(reportDeleted)
    } catch (error) {
        if (error instanceof ZodError) {
            res.status(400).send(error)
        } else {
            res.status(500).send(error)

        }
    }
})
