import { z } from 'zod'

export const createReportSchema = z.object({
    title: z.string().min(1, "O título é obrigatório!"),
    description: z.string().min(1, "A descrição é obrigatória!")
})

export const updateReportSchema = z.object({
    title: z.string().min(1, "O título é obrigatório!").optional(),
    description: z.string().min(1, "A descrição é obrigatória!").optional()
})

export const updateReportSchema = z.object({
    title: z.string().min(1, "O título é obrigatório!").optional(),
    description: z.string().min(1, "A descrição é obrigatória!").optional()
    creatorId: z.string().cuid().optional()
})