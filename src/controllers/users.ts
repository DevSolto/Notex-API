import { Router } from "express";
import {
    createUserService, getUsersServices, updateUserService
} from "../services/users";
import { createUserSchema, updateUserSchema } from "../schemas/users";
import { ZodError } from "zod";

export const userRouter = Router();

userRouter.get('/users', async (req, res) => {
    const users = await getUsersServices()
    res.send(users)
})

userRouter.post('/users', async (req, res) => {
    try {
        const createUserParams = createUserSchema.parse(req.body)
        const createdUser = await createUserService(createUserParams)
        res.send(createdUser)
    } catch (error) {
        if (error instanceof ZodError) {
            res.status(400).send(error)
        } else {
            res.status(500).send(error)
        }
    }
})

userRouter.patch('/users/:id', async (req, res) => {
    try {
        const userId = req.params.id
        const updateUserParams = updateUserSchema.parse(req.body)
        const updatedUser = await updateUserService(userId, updateUserParams)
        res.send(updatedUser)
    } catch (error) {
        if (error instanceof ZodError) {
            res.status(400).send(error)
        } else {
            res.status(500).send(error)
        }
    }
})

userRouter.delete('/users/:id', async (req, res) => {
    try {
        const user = await updateUserService(req.params.id, {
            isActive: false
        })
        res.send(user)
    } catch (error) {
        if (error instanceof ZodError) {
            res.status(400).send(error)
        } else {
            res.status(500).send(error)
        }
    }
})