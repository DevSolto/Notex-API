import { Router } from 'express';
import { getReportsServices, getReportAndDeleteService, createReportService, } from '../services/reports';
import { ZodError } from "zod";
import { createReportSchema, updateUserReportSchema } from '../schemas/reports';
import { createUsersReportByRoleService, getNotViewedReportsByUserIdService, updateUserReportService } from '../services/usersReport';

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

reportsController.get('/reports/not-viewed/:userId', async (req, res) => {
    try {
        console.log(req.params.userId);

        const reports = await getNotViewedReportsByUserIdService(req.params.userId)

        res.send(reports);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Erro ao buscar comunicados' });
    }
});

reportsController.post('/reports', async (req, res) => {
    try {
        const createReportParams = createReportSchema.parse(req.body)
        const createdReport = await createReportService(createReportParams)
        const numberOfUsersWhoReceived = await createUsersReportByRoleService(createReportParams.recipients, createdReport.id)
        res.send({ ...createdReport, numberOfUsersWhoReceived: numberOfUsersWhoReceived.count })
    } catch (error) {
        if (error instanceof ZodError) {
            res.status(400).send(error)
        } else {
            res.status(500).send(error)

        }
    }
})
reportsController.patch('/users/:userId/reports/:reportId', async (req, res) => {
    try {
      const { userId, reportId } = req.params;
      
      const updateUserReportParams = updateUserReportSchema.parse(req.body);
      
      const updatedReport = await updateUserReportService(userId, reportId, updateUserReportParams);
      
      res.send(updatedReport);
      
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).send(error.errors);
      } else {
        res.status(500).send({ message: 'Erro interno ao atualizar o relatório.', error });
      }
    }
  });


// reportsController.get('/reports/:id', async (req, res) => {
//     const reportsId = req.params.id
//     const reportsReturned = await getReportByIdService(reportsId)
//     res.send(reportsReturned)
// })


// reportsController.patch('/reports/:id', async (req, res) => {
//     try {
//         const reportsId = req.params.id
//         const updateReportParams = updateReportSchema.parse(req.body)
//         const updateReport = await updateReportService(reportsId, updateReportParams)
//         res.send(updateReport)
//     } catch (error) {
//         if (error instanceof ZodError) {
//             res.status(400).send(error)
//         } else {
//             res.status(500).send(error)
//         }
//     }
// })

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
