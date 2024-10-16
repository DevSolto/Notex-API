import { cpf } from "easy-cpf";
import { z } from "zod";

export const loginSchema = z.object({
  cpf: z.string().refine(cpf.validate),
  password: z.string()
})