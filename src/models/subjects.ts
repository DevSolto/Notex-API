import { PrismaClient } from "@prisma/client";
import { CreateSubjectParams, UpdateSubjectParams } from "../types/subjects";


const prisma = new PrismaClient()

export async function getSubjectsModel({
  page = 1,
  limit = 10,
  whereClause = {},
  orderBy = 'createdAt',
  order = 'asc'
}: {
  page?: number;
  limit?: number;
  whereClause?: any;
  orderBy?: string,
  order?: 'asc' | 'desc';
}) {
  const offset = (page - 1) * limit;

  const subjects = await prisma.subject.findMany({
    skip: offset,
    take: limit,
    where: whereClause,
    orderBy: {
      [orderBy]: order,
    }
  });

  const total = await prisma.subject.count({
    where: whereClause,
  });

  return {
    subjects,
    total,
    page,
    limit,
    totalPages:  Math.ceil(total / limit),
  };
}

export async function getSubjectsByIdModel(id: string) {
  return await prisma.subject.findUnique({
    where: {
      id
    }
  })
}

export async function createSubjectModel(createSubjectParams: CreateSubjectParams) {
  return prisma.subject.create({
    data: createSubjectParams
  })
}

export async function updateSubjectModel(id: string, data: UpdateSubjectParams) {

  return await prisma.class.update({
    where: {
      id
    }, data
  })
}

export async function getSubjectAndDeleteModel(id: string) {
  return await prisma.subject.delete({
    where: {
      id: id
    }
  })
}