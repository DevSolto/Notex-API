import { z } from 'zod'

export const createSubjectSchema = z.object({
    name: z.string()
})

export const updatesubjectSchema = z.object({
    name: z.string()
})