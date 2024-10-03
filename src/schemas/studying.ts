import { z } from 'zod';

export const createStudyingSchema = z.object({
    classeId: z.string().cuid(),
    usersId: z.array(z.string().cuid())
})
