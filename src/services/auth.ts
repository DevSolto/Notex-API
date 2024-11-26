import { z } from "zod";
import { loginSchema } from "../schemas/auth";
import { getUserByCPFModel } from "../models/users";
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'


export async function loginService(data: z.infer<typeof loginSchema>) {
  const user = await getUserByCPFModel(data.cpf)

  if (!user) {
    return ({
      message: 'Usuário não encontrado'
    })
  }

  const passwordMatch = await bcrypt.compare(data.password, user.password)

  if (!passwordMatch) {
    return ({
      message: 'Senha incorreta'
    })
  }

  const token = await jwt.sign({
    user
  }, process.env.SECRET || 'secreto', { expiresIn: '1 day' })

  return {
    token,
    user
  }
}