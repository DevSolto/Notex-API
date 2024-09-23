import { PrismaClient } from "@prisma/client"
import { CreateClassParams, updateClassParams } from "../types/class"

const prisma = new PrismaClient()

export async function getClassesModel() {

    return await prisma.class.findMany()
}

export async function getClassesByIdModel(id: string) {
    return await prisma.class.findUnique({
        where: {
            id: id
        }
    })
}

export async function createClassModel(createClassParams: CreateClassParams) {
    return prisma.class.create({
        data: createClassParams
    })
}

export async function updateClassModel(id: string, data: updateClassParams) {

    return await prisma.class.update({
        where: {
            id
        }, data
    })
}


export async function deleteClassModel(id: string) {
    return await prisma.class.delete({
        where: {
            id
        }
    })
}