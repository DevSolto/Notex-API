import { createUserModel, getAvailableStudentsForClassModel, getUserByCPFModel, getUserByEmailModel, getUserByPhoneModel, getUsersModel, updateUserModel } from "../models/users";
import { CreateUserParams, GetUsersParams, UpdateUserParams } from "../types/user";
import bcrypt from "bcrypt"

export async function getUsersServices(params: GetUsersParams) {
    return await getUsersModel(params);
}
export async function createUserService(createUserParams: CreateUserParams) {

    const isEmailInUse = await getUserByEmailModel(createUserParams.email)
    if (isEmailInUse) {
        return ({
            message: "Este e-mail está sendo usado por outro usuário"
        })
    }
    const isCPFInUse = await getUserByCPFModel(createUserParams.cpf)
    if (isCPFInUse) {
        return ({
            message: "Esta CPF está em uso por outro usuário"
        })
    }
    const isPhoneInUse = await getUserByPhoneModel(createUserParams.phone)
    if (isPhoneInUse) {
        return ({
            message: "Este Número está sendo usado por outro usuário"
        })
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
        if (isEmailInUse) {
            return ({
                message: "Este e-mail está sendo usado por outro usuário"
            })
        }
    }
    if (updateUserParams.cpf) {
        const isCPFInUse = await getUserByCPFModel(updateUserParams.cpf)
        if (isCPFInUse) {
            return ({
                message: "Esta CPF está em uso por outro usuário"
            })
        }
    }
    if (updateUserParams.phone) {
        const isPhoneInUse = await getUserByPhoneModel(updateUserParams.phone)
        if (isPhoneInUse) {
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
    limit = 10,
    name,
    email,
    cpf,
    isActive,
    phone,
    classId,
    orderBy = 'createdAt',
    order = 'asc',
}: {
    page?: number;
    limit?: number;
    name?: string;
    email?: string;
    cpf?: string;
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
            isActive,
            phone,
            classId,
            orderBy,
            order,
        });

        return result;
    } catch (error) {
        console.error('Erro ao buscar estudantes disponíveis:', error);
        throw new Error('Não foi possível buscar estudantes disponíveis.');
    }
}