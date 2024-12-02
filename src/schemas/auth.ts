import { cpf } from "easy-cpf";
import { z } from "zod";

export const loginSchema = z.object({
  cpf: z.string().refine(cpf.validate),
  password: z.string()
})

export const loginStudentsSchema = z.object({
  cpf: z.string(),
  password: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres'),
});
