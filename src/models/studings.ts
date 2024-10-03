import { PrismaClient } from "@prisma/client";
import { CreateStudingParams } from "../types/studings";

const prisma = new PrismaClient()

export async function getStudingsModel() {
    return await prisma.studying.findMany()
}

export async function createStudingsModel(data: CreateStudingParams) {
    return await prisma.studying.create({
        data
    })
}
