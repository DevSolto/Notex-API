import { Router } from "express";
import { loginSchema } from "../schemas/auth";
import { loginService } from "../services/auth";

export const authRouter = Router();


authRouter.post('/login', async (req, res) => {
  try {
    const loginParams = loginSchema.parse(req.body)

    const token = await loginService(loginParams)
    res.send(token)

  } catch (error) {
    res.status(500).send(error)
  }
})