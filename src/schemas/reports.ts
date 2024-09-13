import { z } from 'zod'

export const createReportSchema = z.object({
    title: z.string().min(1, "O título é obrigatório!"),
    description: z.string().min(1, "O email é obrigatório!").email("Esse email não é valido")
})