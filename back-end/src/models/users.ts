import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()
 
export async function getUsersModel(){

    return await prisma.users.findMany()
}