import { z } from 'zod'

export const createScheduleSchema = z.object({
    url: z.string().url(),
    classId: z.string().cuid(),
    creatorId: z.string().cuid()
})

export const updateScheduleSchema = z.object({
    url: z.string().url()
})