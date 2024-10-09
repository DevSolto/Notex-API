import { z } from 'zod'

export const createSubjectClassSchema = z.object({
    userId: z.string(),
    classId: z.string(),
    subjectId: z.string()
})

export const updateSubjectClassSchema = z.object({
    userId: z.string().optional(),
    classId: z.string().optional(),
    subjectId: z.string().optional()
})