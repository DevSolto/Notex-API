import { Router } from "express";
import { loginSchema } from "../schemas/auth";
import { loginService } from "../services/auth";

export const authRouter = Router();


authRouter.post('/login', async (req, res) => {
  try {
    console.log("ola")
    const loginParams = loginSchema.parse(req.body)

    const data = await loginService(loginParams)
    res.send(data)

  } catch (error) {
    res.status(500).send(error)
  }
})