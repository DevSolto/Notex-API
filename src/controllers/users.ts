import { Router } from "express";
import { createUserService, getUsersServices } from "../services/users";

export const router = Router();
router.get('/users', async (req, res) => {
    const users = await getUsersServices()
    res.send(users)
})

router.post('/users', async (req, res) => {
    const createUserParams = req.body
    const createdUser = await createUserService(createUserParams)
    res.send(createdUser)
})