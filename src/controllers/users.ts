import { Router } from "express";
import { createUserService, getUsersServices, updateUserService } from "../services/users";
import { createUserSchema, updateUserSchema } from "../schemas/users";
import { ZodError } from "zod";

export const userRouter = Router();

userRouter.get('/users', async (req, res) => {
    try {
        const {
            page = 1,
            limit = 10,
            name,
            email,
            cpf,
            isActive,
            role,
            phone,
            orderBy = 'createdAt',
            order = 'asc'
        } = req.query;

        const allowedOrderFields = ['id', 'name', 'email', 'cpf', 'role', 'phone', 'createdAt', 'updatedAt'];
        const orderByField = allowedOrderFields.includes(orderBy as string) ? orderBy as string : 'createdAt';

        const pageNumber = parseInt(page as string, 10);
        const limitNumber = parseInt(limit as string, 10);
        const orderValue = order as string === 'desc' ? 'desc' : 'asc';
        const isActiveBoolean = isActive ? isActive === 'true' : undefined;

        const users = await getUsersServices({
            page: pageNumber,
            limit: limitNumber,
            name: name as string,
            email: email as string,
            cpf: cpf as string,
            isActive: isActiveBoolean,
            role: role as string,
            phone: phone as string,
            orderBy: orderByField,
            order: orderValue,
        });

        res.send(users);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'An error occurred while fetching users' });
    }
});


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