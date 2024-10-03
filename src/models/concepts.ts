import { PrismaClient } from "@prisma/client"
import { CreateConceptParams, UpdateConceptParams } from "../types/concept"

const prisma = new PrismaClient()

export async function getConceptsModel() {
  return await prisma.concept.findMany()
}

export async function getConceptsByIdModel(id: string) {
  return await prisma.concept.findUnique({
    where: {
      id
    }
  })
}

export async function createConceptModel(data: CreateConceptParams) {
  return await prisma.concept.create({
    data
  })
}

export async function updateConceptModel(id: string, data: UpdateConceptParams) {

  return await prisma.concept.update({
    where: {
      id
    },
    data
  })
}

export async function getConceptAndDeleteModel(id: string) {
  return await prisma.concept.delete({
    where: {
      id: id
    }
  })
}