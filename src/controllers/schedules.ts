import { Router } from "express";
import { getSchedulesService, getSchedulesByIdService, createSchedulesService, updateScheduleService, getScheduleAndDeleteService } from "../services/schedules";
import { CreateSchedulesParams, UpdateSchedulesParams } from "../types/schedules";
import { ZodError } from "zod";
import { scheduler } from "timers/promises";
import { createScheduleSchema, updateScheduleSchema } from "../schemas/schedules";
import { create } from "domain";
import { updateScheduleModel } from "../models/schedules";

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

schedulesRouter.patch('/schedules/:id', async (req, res) => {
    try {
        const schedulesId = req.params.id
        const updateSchedulesParams = updateScheduleSchema.parse(req.body)
        const updateSchedule = await updateScheduleService(schedulesId, updateSchedulesParams)
        res.send(updateSchedule)
    } catch (error) {
        if (error instanceof ZodError) {
            res.status(400).send(error)
        } else {
            res.status(500).send(error)
        }
    }
})

schedulesRouter.delete('/schedules/:id', async (req, res) => {
    try {
        const scheduleDeleted = await getScheduleAndDeleteService(req.params.id)
        res.send(scheduleDeleted)
    } catch (error) {
        if (error instanceof ZodError) {
            res.status(400).send(error)
        } else {
            res.status(500).send(error)
        }
    }
})