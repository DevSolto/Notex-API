import { PrismaClient } from "@prisma/client"
import { CreateConceptParams } from "../types/concept"

const prisma = new PrismaClient()

export async function getConceptsModel() {
  return await prisma.concept.findMany()
}

export async function createConceptModel(data: CreateConceptParams) {
  return await prisma.concept.create({
    data
  })
}