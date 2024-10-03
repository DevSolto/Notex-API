import { z } from 'zod'

export const createStudingsSchema = z.object({
    userId: z.string().cuid(),
    classId: z.string().cuid()
})