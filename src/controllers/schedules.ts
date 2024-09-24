import { Router } from "express";
import { getSchedulesService, getSchedulesByIdService } from "../services/schedules";
import { CreateSchedulesParams, UpdateSchedulesParams } from "../types/schedules";
import { ZodError } from "zod";
import { scheduler } from "timers/promises";

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