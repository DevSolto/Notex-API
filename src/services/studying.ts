import { getUserByIdModel } from "../models/users";
import { getClassesByIdModel } from "../models/classes";
import { createStudyingModel, getStudyingAndDeleteModel, getStudyingByIdModel, getStudyingModel, updateStudyingModel } from "../models/studying";
import { CreateStudyingParams, UpdateStudyingParams } from "../types/studying";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getStudyingService() {
  return await getStudyingModel()
}
export async function getStudyingByIdService(studentId:string) {
  const classes = await getStudyingByIdModel(studentId)

  if(classes){
    return classes
  }

  throw new Error('Classe não encontrada')
}

export async function createStudyingService(createStudyingParams: CreateStudyingParams) {
  const classData = await getClassesByIdModel(createStudyingParams.classeId);
  if (!classData) {
    throw new Error('Classe não encontrada');
  }

  for (const userId of createStudyingParams.usersId) {
    const user = await getUserByIdModel(userId);

    if (!user) {
      throw new Error(`Usuário com ID ${userId} não encontrado`);
    }

    if (user.role !== "STUDENT") {
      throw new Error(`Usuário com ID ${userId} não é um estudante`);
    }
  }

  return await createStudyingModel(createStudyingParams);
}

export async function updateStudyingService(id: string, updateStuyindParams: UpdateStudyingParams) {
  if (updateStudyingService.id) {
    const isInUse = await getStudyingByIdModel(updateStuyindParams.id)
    if (isInUse) {
      return ({
        message: "Já estpa atualizado"
      })
    }
  }

  return await updateStudyingModel(id, updateStuyindParams)
}

export async function getStudyingAndDeleteService(id: string) {

  const getAndDelete = await getStudyingAndDeleteModel(id)

  return getAndDelete
}

export async function findClassByStudentCpfService(cpf: string) {
  try {
    // Busca o estudante pelo CPF
    const user = await prisma.users.findUnique({
      where: { cpf },
    });

    if (!user) {
      throw new Error("Estudante não encontrado.");
    }

    // Busca as relações entre o estudante e as turmas
    const studyingRecord = await prisma.studying.findFirst({
      where: { userId: user.id },
      include: { class: true }, // Inclui os dados da turma associada
    });

    if (!studyingRecord || !studyingRecord.class) {
      throw new Error("O estudante não está matriculado em nenhuma turma.");
    }

    return studyingRecord.class; // Retorna os detalhes da turma
  } catch (error) {
    console.error("Erro ao buscar a turma:", error.message);
    throw error; // Relança o erro para tratamento externo, se necessário
  } finally {
    await prisma.$disconnect(); // Fecha a conexão com o banco de dados
  }
}