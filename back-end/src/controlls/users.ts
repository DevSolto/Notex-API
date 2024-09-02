import { Router } from "express";
import { getUsersServices } from "../services/users";

export const router = Router();
router.get('/users', async (req, res) => {
    const users = await getUsersServices()
    res.send(users)
})