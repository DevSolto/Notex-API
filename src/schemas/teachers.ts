import { z } from 'zod'

export const createTeachersSchema = z.object({
    userId: z.string().min(1, "Obrigatório"),
    classId: z.string().min(1, "Obrigatório")
})

export const updateTeachersSchema = z.object({
    userId: z.string().min(1, "Obrigatório").optional(),
    classId: z.string().min(1, "Obrigatório").optional()
})