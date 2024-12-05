import { z } from 'zod';

export const createConceptsSchema = z.object({
  creatorId: z.string().min(1, "O id do criador é obrigatório!").cuid(),
  studentId: z.string().min(1, "O id do estudante é obrigatório!").cuid(),
  subjectId: z.string().min(1, "O id da disciplina é obrigatório!").cuid(),
  av1: z.string().optional().refine((value) => 
    typeof value === 'string' && ['EXCELENTE', 'ÓTIMO', 'BOM', 'INSUFICIENTE', 'RUIM'].includes(value), 
    {
      message: "av1 deve ser um valor válido",
    }
  ),
  av2: z.string().optional().refine((value) => 
    typeof value === 'string' && ['EXCELENTE', 'ÓTIMO', 'BOM', 'INSUFICIENTE', 'RUIM'].includes(value),
    {
      message: "av2 deve ser um valor válido",
    }
  ),
});

export const updateConceptsSchema = z.object({
  creatorId: z.string().min(1, "O id do criador é obrigatório!").cuid().optional(),
  studentId: z.string().min(1, "O id do estudante é obrigatório!").cuid().optional(),
  subjectId: z.string().min(1, "O id da disciplina é obrigatório!").cuid(),
  av1: z.string().optional().refine((value) => 
    typeof value === 'string' && ['EXCELENTE', 'ÓTIMO', 'BOM', 'INSUFICIENTE', 'RUIM'].includes(value), 
    {
      message: "av1 deve ser um valor válido",
    }
  ),
  av2: z.string().optional().refine((value) => 
    typeof value === 'string' && ['EXCELENTE', 'ÓTIMO', 'BOM', 'INSUFICIENTE', 'RUIM'].includes(value),
    {
      message: "av2 deve ser um valor válido",
    }
  ),
});
