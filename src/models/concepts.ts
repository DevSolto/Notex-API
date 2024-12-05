import { PrismaClient } from "@prisma/client"
import { CreateConceptParams, UpdateConceptParams } from "../types/concept"

const prisma = new PrismaClient()

export async function getConceptsModel({
  page = 1,
  limit = 10,
  whereClause = {},
  orderBy = 'createdAt',
  order = 'asc'
}: {
  page?: number;
  limit?: number;
  whereClause?: any;
  orderBy?: string;
  order?: 'asc' | 'desc';
}) {
  const offset = (page - 1) * limit;

  const concepts = await prisma.concept.findMany({
    skip: offset,
    take: limit,
    where: whereClause,
    orderBy: {
      [orderBy]: order,
    }
  });

  const total = await prisma.concept.count({
    where: whereClause,
  });

  return {
    concepts,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  };
}

export async function getConceptsByIdModel(id: string) {
  return await prisma.concept.findUnique({
    where: {
      id: id // Certifique-se de que 'id' seja do tipo correto
    }
  })
}

export async function createConceptModel(data: CreateConceptParams) {
  return await prisma.concept.create({
    data
  })
}

export async function updateConceptModel(id: string, data: UpdateConceptParams) {
  try {
    // Atualização do registro no banco de dados
    return await prisma.concept.update({
      where: {
        id, // Prisma aceita diretamente "id: id" como "id"
      },
      data,
    });
  } catch (error) {
    throw new Error('Erro ao atualizar o conceito no banco de dados.');
  }
}


export async function getConceptAndDeleteModel(id: string) {
  return await prisma.concept.delete({
    where: {
      id: id
    }
  })
}