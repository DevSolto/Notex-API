import { Router } from "express";
import { getTeachersService } from "../services/teachers";

export const teacherRouter = Router();

teacherRouter.get('/teachers', async (req, res) => {
    try {
        const teachers = await getTeachersService();
        res.send(teachers)
    } catch (error) {
        console.error('Error', error)
        res.status(500).send({message: 'Internal Server Error'})
    }
});