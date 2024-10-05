import { getUserByIdModel } from "../models/users";
import { getClassesByIdModel } from "../models/classes";
import { createStudyingModel, getStudyingByStudentModel, getStudyingModel } from "../models/studying";
import { CreateStudyingParams } from "../types/studying";

export async function getStudyingService() {
  return await getStudyingModel()
}
export async function getStudyingByStudentService(studentId:string) {
  const classes = await getStudyingByStudentModel(studentId)

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