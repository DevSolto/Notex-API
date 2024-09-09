import { createUserModel, getUserByCPFModel, getUserByEmailModel, getUserByPhoneModel, getUsersModel } from "../models/users";
import { CreateUserParams } from "../../types/user";
import bcrypt from "bcrypt"

export async function getUsersServices() {

    return await getUsersModel()
}
export async function createUserService(createUserParams: CreateUserParams) {

    //TODO: Validar se email existe
    const isEmailInUse = await getUserByEmailModel(createUserParams.email)
    if (isEmailInUse) {
        return ({
            message: "Este e-mail está sendo usado por outro usuário"
        })
    }
    //TODO: Validar se cpf existe
    const isCPFInUse = await getUserByCPFModel(createUserParams.cpf)
    if (isCPFInUse) {
        return ({
            message: "Esta CPF está em uso por outro usuário"
        })
    }
    //TODO: Validar se o telefone existe
    const isPhoneInUse = await getUserByPhoneModel(createUserParams.phone)
    if (isPhoneInUse) {
        return ({
            message: "Este Número está sendo usado por outro usuário"
        })
    }


    //TODO: Fazer o hash da senha
    const hash = await bcrypt.hash(createUserParams.password, 10)

    const user = await createUserModel({
        ...createUserParams,
        password: hash
    })

    return user
}