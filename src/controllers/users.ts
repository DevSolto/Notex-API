import { Router } from "express";
import { createUserService, getAvailableStudentsForClassService, getUserByIdService, getUsersServices, updateUserService } from "../services/users";
import { createUserSchema, updateUserSchema } from "../schemas/users";
import { ZodError } from "zod";
import { authMiddleware } from "../middlewares/auth";

export const userRouter = Router();

userRouter.use(authMiddleware);

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Lista usuários
 *     description: Retorna uma lista de usuários com suporte a filtros e paginação.
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Número da página.
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 100
 *         description: Limite de usuários por página.
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Filtro por nome.
 *       - in: query
 *         name: email
 *         schema:
 *           type: string
 *         description: Filtro por email.
 *       - in: query
 *         name: cpf
 *         schema:
 *           type: string
 *         description: Filtro por CPF.
 *       - in: query
 *         name: isActive
 *         schema:
 *           type: boolean
 *         description: Filtro por status ativo/inativo.
 *       - in: query
 *         name: role
 *         schema:
 *           type: string
 *           enum: [STUDENT, TEACHER, ADMIN]
 *         description: Filtro por cargo.
 *       - in: query
 *         name: phone
 *         schema:
 *           type: string
 *         description: Filtro por telefone.
 *       - in: query
 *         name: orderBy
 *         schema:
 *           type: string
 *           enum: [id, name, email, cpf, role, phone, createdAt, updatedAt]
 *           default: createdAt
 *         description: Campo para ordenação.
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *           default: asc
 *         description: Direção da ordenação.
 *     responses:
 *       200:
 *         description: Lista de usuários.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       500:
 *         description: Erro ao buscar usuários.
 */
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

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Cria um novo usuário
 *     description: Adiciona um novo usuário ao sistema.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateUserParams'
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso.
 *       400:
 *         description: Erro de validação.
 *       500:
 *         description: Erro no servidor.
 */
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

/**
 * @swagger
 * /users/{id}:
 *   patch:
 *     summary: Atualiza um usuário
 *     description: Atualiza os dados de um usuário específico.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do usuário.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateUserParams'
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso.
 *       400:
 *         description: Erro de validação.
 *       500:
 *         description: Erro no servidor.
 */
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

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Busca usuário pelo ID
 *     description: Retorna os detalhes de um usuário específico.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do usuário.
 *     responses:
 *       200:
 *         description: Detalhes do usuário.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: Usuário não encontrado.
 *       500:
 *         description: Erro no servidor.
 */
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

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Desativa uma usuário
 *     description: Retorna as informações do usuário desativado.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do usuário.
 *     responses:
 *       200:
 *         description: Detalhes do usuário.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: Usuário não encontrado.
 *       500:
 *         description: Erro no servidor.
 */
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


/**
 * @swagger
 * /students/{classId}:
 *   get:
 *     summary: Lista estudantes disponíveis para uma turma
 *     description: Retorna uma lista de estudantes disponíveis para uma turma específica.
 *     parameters:
 *       - in: path
 *         name: classId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da turma.
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Número da página.
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Limite de estudantes por página.
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Filtrar por nome.
 *       - in: query
 *         name: email
 *         schema:
 *           type: string
 *         description: Filtrar por email.
 *       - in: query
 *         name: cpf
 *         schema:
 *           type: string
 *         description: Filtrar por CPF.
 *       - in: query
 *         name: isActive
 *         schema:
 *           type: boolean
 *         description: Filtrar por status ativo/inativo.
 *       - in: query
 *         name: phone
 *         schema:
 *           type: string
 *         description: Filtrar por telefone.
 *       - in: query
 *         name: orderBy
 *         schema:
 *           type: string
 *           enum: [id, name, email, cpf, role, phone, createdAt, updatedAt]
 *           default: createdAt
 *         description: Campo de ordenação.
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *           default: asc
 *         description: Direção da ordenação.
 *     responses:
 *       200:
 *         description: Lista de estudantes.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       500:
 *         description: Erro ao buscar estudantes.
 */
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