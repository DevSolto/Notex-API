import { Router } from "express";
import { getSchedulesService, getSchedulesByIdService, createSchedulesService } from "../services/schedules";
import { CreateSchedulesParams, UpdateSchedulesParams } from "../types/schedules";
import { ZodError } from "zod";
import { scheduler } from "timers/promises";
import { createScheduleSchema } from "../schemas/schedules";
import { create } from "domain";

export const schedulesRouter = Router();

schedulesRouter.get('/schedules', async (req, res) => {
    const schedules = await getSchedulesService()
    res.send(schedules)
})

schedulesRouter.get('/schedules/:id', async (req, res) => {
    const schedulesId = req.params.id
    const scheduleReturned = await getSchedulesByIdService(schedulesId)
    res.send(scheduleReturned)
})

schedulesRouter.post('/schedules', async (req, res) => {
    try {
        const createSchedulesParams = createScheduleSchema.parse(req.body)
        const createdSchedule = await createSchedulesService(createSchedulesParams)
        res.send(createdSchedule)
    } catch (error) {
        if (error instanceof ZodError) {
            res.status(400).send(error)
        } else {
            res.status(500).send(error)
        }
    }
})