import { PrismaClient } from "@prisma/client";
import { CreateSubjectParams, UpdateSubjectParams } from "../types/subjects";


const prisma = new PrismaClient()

export async function getSubjectsModel({
  page = 1,
  limit = 10,
  search = '',
  orderBy = 'createdAt',
  order = 'asc'
}: {
  page?: number;
  limit?: number;
  search?: string;
  orderBy?: string;
  order?: 'asc' | 'desc';
}) {
  const offset = (page - 1) * limit;

  const whereClause: any = {};
  if (search) {
    whereClause.name = {
      contains: search,
      mode: 'insensitive'
    };
  }

  const subjects = await prisma.subject.findMany({
    skip: offset,
    take: limit,
    where: whereClause,
    orderBy: {
      [orderBy]: order,
    },
    include: {
      _count: {
        select: {
          SubjectClass: true
        }
      }
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
    totalPages: Math.ceil(total / limit),
  };
}
export async function getSubjectsByClasseIdModel(id: string, {
  page = 1,
  limit = 10,
  search = '',
  orderBy = 'createdAt',
  order = 'asc'
}: {
  page?: number;
  limit?: number;
  search?: string;
  orderBy?: string;
  order?: 'asc' | 'desc';
}) {
  const offset = (page - 1) * limit;

  const whereClause: any = {
    SubjectClass: { // Verificando a tabela intermediária
      some: { // Verificando se existe algum relacionamento com a 'classId'
        classId: id
      }
    },
    name: search ? {
      contains: search,
      mode: 'insensitive'
    } : undefined
  };
  
  const subjects = await prisma.subject.findMany({
    skip: offset,
    take: limit,
    where: whereClause,
    orderBy: {
      [orderBy]: order,
    },
    include: {
      _count: {
        select: {
          SubjectClass: true
        }
      }
    }
  });
  
  // Contando o total de subjects relacionados à classe
  const total = await prisma.subjectClass.count({
    where: {
      classId: id // Contando os registros na tabela de relacionamento SubjectClass
    }
  });
  
  return {
    subjects,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
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