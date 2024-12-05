import { PrismaClient } from "@prisma/client";
import { CreateStudyingParams, UpdateStudyingParams } from "../types/studying";

const prisma = new PrismaClient();

// Busca todos os registros da tabela Studying
export async function getStudyingModel() {
  return await prisma.studying.findMany();
}

// Busca registros de Studying por studentId
export async function getStudyingByIdModel(studentId: string) {
  return await prisma.studying.findMany({
    where: {
      userId: studentId,
    },
  });
}

// Cria múltiplos registros na tabela Studying
export async function createStudyingModel(params: CreateStudyingParams) {
  const { usersId, classeId } = params;

  const existingEntries = await prisma.studying.findMany({
    where: {
      OR: usersId.map((userId) => ({
        userId,
        classId: classeId,
      })),
    },
  });

  const existingUserIds = new Set(existingEntries.map((entry) => entry.userId));

  const newEntries = usersId
    .filter((userId) => !existingUserIds.has(userId))
    .map((userId) => ({
      userId,
      classId: classeId,
    }));

  if (newEntries.length === 0) {
    throw new Error('Todos os estudantes já estão cadastrados nessa turma');
  }

  return await prisma.studying.createMany({
    data: newEntries,
  });
}



// Atualiza dados de um registro na tabela Studying
export async function updateStudyingModel(userId: string, classId: string, data: UpdateStudyingParams) {
  return await prisma.studying.update({
    where: {
      userId_classId: {
        userId,
        classId,
      },
    },
    data,
  });
}

// Exclui um registro da tabela Studying
export async function getStudyingAndDeleteModel(userId: string, classId: string) {
  return await prisma.studying.delete({
    where: {
      userId_classId: {
        userId,
        classId,
      },
    },
  });
}
