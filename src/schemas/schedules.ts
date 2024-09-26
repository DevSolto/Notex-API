import { z } from 'zod'

export const createScheduleSchema = z.object({
    url: z.string().url()
})

export const updateScheduleSchema = z.object({
    url: z.string().url()
})