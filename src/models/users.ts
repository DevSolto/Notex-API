import { PrismaClient } from "@prisma/client"
import { CreateUserParams } from "../types/user"

const prisma = new PrismaClient()

export async function getUsersModel() {

    return await prisma.users.findMany()
}

export async function createUserModel(createUserParams: CreateUserParams) {
    return prisma.users.create({
        data: createUserParams
    })
}

export async function getUserByEmailModel(email: string) {
    return await prisma.users.findUnique({
        where: {
            email 
        }
    })    
}

export async function getUserByCPFModel(cpf: string) {
    return await prisma.users.findUnique({
        where: {
            cpf
        }
    })
}

export async function getUserByPhoneModel(phone: string) {
    return await prisma.users.findUnique({
        where: {
            phone
        }
    })
}