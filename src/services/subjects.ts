import { Prisma, PrismaClient } from "@prisma/client";
import { createSubjectModel, getSubjectsByIdModel, getSubjectsModel, updateSubjectModel, getSubjectAndDeleteModel } from "../models/subjects";
import { CreateClassParams, UpdateClassParams } from "../types/class";
import { CreateSubjectParams, UpdateSubjectParams } from "../types/subjects";
import { GetUsersParams } from "../types/user";

export async function getSubjectsService(params: {
    page?: number;
    limit?: number;
    search?: string;
    orderBy?: string;
    order?: 'asc' | 'desc';
}) {

    // Chamar o model passando a cláusula where e outros parâmetros
    const subjects = await getSubjectsModel(params);

    return subjects;
}


export async function getSubjectsByIdService(id: string) {

    return await getSubjectsByIdModel(id)
}

export async function createSubjectService(createSubjectParams: CreateSubjectParams) {

    const createSubject = await createSubjectModel({
        ...createSubjectParams
    })

    return createSubject
}

export async function updateSubjectService(name: string, updateSubjectParams: UpdateSubjectParams) {
    if (updateSubjectParams.name) {
        const isNameInUse = await getSubjectsByIdModel
            (updateSubjectParams.name)
        if (isNameInUse) {
            return ({
                message: "Este nome esta em uso"
            })
        }
    }

    return await updateSubjectModel(name, updateSubjectParams)
}

export async function getSubjectAndDeleteService(id: string) {

    const getAndDelete = await getSubjectAndDeleteModel(id)

    return getAndDelete
}