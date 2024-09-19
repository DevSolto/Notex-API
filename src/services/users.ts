import { createUserModel, getUserByCPFModel, getUserByEmailModel, getUserByPhoneModel, getUsersModel, updateUserModel } from "../models/users";
import { CreateUserParams, UpdateUserParams } from "../types/user";
import bcrypt from "bcrypt"

export async function getUsersServices() {

    return await getUsersModel()
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