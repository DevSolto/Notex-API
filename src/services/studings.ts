import { error } from "console";
import { getStudingsModel, createStudingsModel } from "../models/studings";
import { getUserByIdModel, getUsersModel } from "../models/users";
import { CreateStudingParams } from "../types/studings";
import { getClassesByIdModel } from "../models/classes";

export async function getStudingsService() {
    return await getStudingsModel()
}

export async function createStudingsService(createStudingParams: CreateStudingParams) {

    const userRole = await getUserByIdModel(createStudingParams.userId)
    if (!userRole) {
        throw error('Estudante Não encontrado');
    }

    if (userRole.role !== "STUDENT") {
        throw new Error('Usuário precisa ser um estudante')
    }

    const classId = await getClassesByIdModel(createStudingParams.classId)
    if (!classId) {
        throw new Error('Classe não encontrada');
    }
}