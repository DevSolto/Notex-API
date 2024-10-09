import { Router } from "express";
import { createUserService, getAvailableStudentsForClassService, getUserByIdService, getUsersServices, updateUserService } from "../services/users";
import { createUserSchema, updateUserSchema } from "../schemas/users";
import { ZodError } from "zod";

export const userRouter = Router();

userRouter.get('/users', async (req, res) => {
    try {
        const {
            page = 1,
            limit = 100,
            search, // Novo parâmetro de busca
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
            search: search as string,
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
        console.error('Error fetching users:', error);
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
            // Tratamento de erros de validação Zod
            return res.status(400).json({
                status: 'error',
                message: 'Erro de validação',
                details: error.errors, // Retorna os detalhes da validação que falhou
            });
        } else if (error.message && error.message.includes('usuário')) {
            return res.status(400).json({
                status: 'error',
                message: error.message,
            });
        } else {
            // Tratamento de erros genéricos
            return res.status(500).json({
                status: 'error',
                message: 'Ocorreu um erro no servidor. Tente novamente mais tarde.',
                error: error.message, // Para desenvolvimento, pode ser útil
            });
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
userRouter.get('/users/:id', async (req, res) => {
    try {
        const userId = req.params.id
        const user = await getUserByIdService(userId)
        res.send(user)
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

userRouter.get('/students/:classId', async (req, res) => {
    try {
        const {
            page = 1,
            limit = 10,
            name,
            email,
            cpf,
            isActive,
            phone,
            orderBy = 'createdAt',
            order = 'asc',
        } = req.query;

        const { classId } = req.params;

        const allowedOrderFields = ['id', 'name', 'email', 'cpf', 'role', 'phone', 'createdAt', 'updatedAt'];
        const orderByField = allowedOrderFields.includes(orderBy as string) ? orderBy as string : 'createdAt';

        const pageNumber = parseInt(page as string, 10);
        const limitNumber = parseInt(limit as string, 10);
        const orderValue = order as string === 'desc' ? 'desc' : 'asc';
        const isActiveBoolean = isActive ? isActive === 'true' : undefined;

        const users = await getAvailableStudentsForClassService({
            page: pageNumber,
            limit: limitNumber,
            name: name as string,
            email: email as string,
            cpf: cpf as string,
            isActive: isActiveBoolean,
            phone: phone as string,
            orderBy: orderByField,
            order: orderValue,
            classId: classId,
        });

        res.send(users);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'An error occurred while fetching students' });
    }
});