import { getUserByIdModel } from "../models/users";
import { getClassesByIdModel } from "../models/classes";
import { createStudyingModel, getStudyingAndDeleteModel, getStudyingByIdModel, getStudyingModel, updateStudyingModel } from "../models/studying";
import { CreateStudyingParams, UpdateStudyingParams } from "../types/studying";

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