import { createUserModel, getAvailableStudentsForClassModel, getUserByCPFModel, getUserByEmailModel, getUserByIdModel, getUserByPhoneModel, getUsersModel, updateUserModel } from "../models/users";
import { CreateUserParams, GetUsersParams, UpdateUserParams } from "../types/user";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getUsersServices(params: GetUsersParams) {
    const whereClause: any = {};

    if (params.search) {
        whereClause.name = { contains: params.search, mode: 'insensitive' }; // Busca por nome
    }

    if (params.email) {
        whereClause.email = { contains: params.email };
    }

    if (params.cpf) {
        whereClause.cpf = { equals: params.cpf };
    }

    if (params.isActive !== undefined) {
        whereClause.isActive = params.isActive;
    }

    if (params.role) {
        whereClause.role = { equals: params.role };
    }

    if (params.phone) {
        whereClause.phone = { contains: params.phone };
    }

    const users = await getUsersModel({
        ...params,
        whereClause,
    });

    return users;
}
export async function getUserByIdService(userId: string) {
    return await getUserByIdModel(userId)
}
export async function createUserService(createUserParams: CreateUserParams) {

    const isEmailInUse = await getUserByEmailModel(createUserParams.email)
    if (isEmailInUse) {
        throw new Error("Este e-mail está sendo usado por outro usuário")
    }
    const isCPFInUse = await getUserByCPFModel(createUserParams.cpf)
    if (isCPFInUse) {
        throw new Error("Esta CPF está em uso por outro usuário")
    }
    const isPhoneInUse = await getUserByPhoneModel(createUserParams.phone)
    if (isPhoneInUse) {
        throw new Error("Este Número está sendo usado por outro usuário")
    }
    const hash = await bcrypt.hash(createUserParams.password, 10)

    const user = await createUserModel({
        ...createUserParams,
        password: hash
    })

    return user
}

export async function updateUserService(id: string, updateUserParams: UpdateUserParams) {
    if (updateUserParams.email) {
        const isEmailInUse = await getUserByEmailModel(updateUserParams.email)
        if (isEmailInUse && isEmailInUse.id !== id) {
            return ({
                message: "Este e-mail está sendo usado por outro usuário"
            })
        }
    }
    if (updateUserParams.cpf) {
        const isCPFInUse = await getUserByCPFModel(updateUserParams.cpf)
        if (isCPFInUse && isCPFInUse.id !== id) {
            return ({
                message: "Esta CPF está em uso por outro usuário"
            })
        }
    }
    if (updateUserParams.phone) {
        const isPhoneInUse = await getUserByPhoneModel(updateUserParams.phone)
        if (isPhoneInUse && isPhoneInUse.id !== id) {
            return ({
                message: "Este Número está sendo usado por outro usuário"
            })
        }
    }

    if (updateUserParams.password) {
        const hash = await bcrypt.hash(updateUserParams.password, 10)
        return await updateUserModel(id, {
            ...updateUserParams,
            password: hash
        })

    }
    return await updateUserModel(id, updateUserParams)
}

export async function getAvailableStudentsForClassService({
    page = 1,
    limit = 100,
    name,
    email,
    cpf,
    avatarUrl,
    isActive,
    phone,
    classId,
    orderBy = 'createdAt',
    order = 'asc'
}: {
    page?: number;
    limit?: number;
    name?: string;
    email?: string;
    cpf?: string;
    avatarUrl: string,
    isActive?: boolean;
    phone?: string;
    classId: string;
    orderBy?: string;
    order?: 'asc' | 'desc';
}) {
    try {
        if (!classId) {
            throw new Error("O ID da classe deve ser fornecido");
        }

        const result = await getAvailableStudentsForClassModel({
            page,
            limit,
            name,
            email,
            cpf,
            avatarUrl,
            isActive,
            phone,
            classId,
            orderBy,
            order
        });

        return result;
    } catch (error) {
        console.error('Erro ao buscar estudantes disponíveis:', error);
        throw new Error('Não foi possível buscar estudantes disponíveis.');
    }
}
export const getUserClassByCpfService = async (cpf: string) => {
    try {
        // Encontra o usuário pelo CPF e retorna as classes associadas a ele
        const user = await prisma.users.findUnique({
            where: { cpf },
            include: {
                Studing: { // Incluir a relação Studying para acessar as classes
                    include: {
                        class: true, // A relação com a classe
                    },
                },
            },
        });

        if (!user) {
            throw new Error('Usuário não encontrado');
        }

        // Retorna as classes associadas ao usuário
        return user.Studing.map(study => study.class);
    } catch (error) {
        throw new Error(`Erro ao buscar classe do usuário: ${error.message}`);
    }
};


export async function addStudentToClass(userId, classId) {
    try {
      // Verifica se o usuário e a classe existem
      const user = await prisma.users.findUnique({ where: { id: userId } });
      const classEntity = await prisma.class.findUnique({ where: { id: classId } });
  
      if (!user) {
        throw new Error('Usuário não encontrado');
      }
      if (!classEntity) {
        throw new Error('Turma não encontrada');
      }
  
      // Criando a relação de matrícula entre o estudante e a turma
      const enrollment = await prisma.studying.create({
        data: {
          userId: user.id,
          classId: classEntity.id,
        },
      });
  
      console.log('Estudante adicionado à turma:', enrollment);
    } catch (error) {
      console.error('Erro ao adicionar estudante à turma:', error.message);
    } finally {
      await prisma.$disconnect();
    }
  }