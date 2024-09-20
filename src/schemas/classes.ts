import { optional, z } from 'zod'

export const createClassSchema = z.object({
    code: z.string().min(1, "O código é obrigatório!"),
    period: z.number().min(1, "O período é obrigatório!")
})

export const updateClassSchema = z.object({
    code: z.string().min(1, "O código é obrigatório!").optional(),
    period: z.number().min(1, "O período é obrigatório!").optional()
})