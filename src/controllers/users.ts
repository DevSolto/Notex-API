import { Router } from "express";
import { createUserService, getUsersServices } from "../services/users";
import { createUserSchema } from "../schemas/users";
import { ZodError } from "zod";

export const router = Router();

router.get('/users', async (req, res) => {
    const users = await getUsersServices()
    res.send(users)
})

router.post('/users', async (req, res) => {
    try {
        const createUserParams = createUserSchema.parse(req.body)
        const createdUser = await createUserService(createUserParams)
        res.send(createdUser)
    } catch (error) {
        if(error instanceof ZodError){
            res.status(400).send(error)
        } else{
            res.status(500).send(error)

        }
    }
})