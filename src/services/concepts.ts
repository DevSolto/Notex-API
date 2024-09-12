import { error } from "console";
import { createConceptModel, getConceptsModel } from "../models/concepts";
import { getUserByIdModel } from "../models/users";
import { CreateConceptParams } from "../types/concept";

export async function getConceptsService() {
  return await getConceptsModel()
}

export async function createConceptService(createConceptParams: CreateConceptParams) {

  const creator = await getUserByIdModel(createConceptParams.creatorId);
  if (!creator) {
    throw new Error('Criador não encontrado');
  }

  const student = await getUserByIdModel(createConceptParams.studentId);
  if (!student) {
    throw new Error('Estudante não encontrado');
  }

  if (creator.role !== 'TEACHER') {
    throw new Error('O criador precisa ser obrigatoriamente um professor');
  }

  if (student.role !== 'STUDENT') {
    throw new Error('O estudante precisa ser obrigatoriamente um estudante');
  }

  try {
    return await createConceptModel(createConceptParams);
  } catch (error) {
    throw new Error('Erro ao criar o conceito');
  }
}