import { PrismaClient } from "@prisma/client"
import { CreateClassParams } from "../types/class"

const prisma = new PrismaClient()

export async function getClassesModel() {

    return await prisma.class.findMany()
}

export async function createClassModel(createClassParams: CreateClassParams) {
    return prisma.class.create({
        data: createClassParams
    })
}