import { createClassModel, getClassesModel, getClassesByIdModel, updateClassModel, deleteClassModel } from "../models/classes";
import { CreateClassParams, updateClassParams } from "../types/class";


export async function getClassesService({
    page = 1,
    limit = 10,
    year,
    orderBy = 'title',
    order = 'asc'
}: {
    page?: number;
    limit?: number;
    year?: string;
    orderBy?: string;
    order?: 'asc' | 'desc'
}) {
    if (orderBy && orderBy === 'all') {
        orderBy = ''
    }

    return await getClassesModel({
        page,
        limit,
        year,
        orderBy,
        order,
    });
}


export async function getClassesByIdService(id: string) {
    return await getClassesByIdModel(id)
}

export async function createClassService(createClassParams: CreateClassParams) {

    const createClass = await createClassModel({
        ...createClassParams
    })
    return createClass
}

export async function updateClassService(id: string, updateClassParams: updateClassParams) {
    if (updateClassParams.code) {
        const isCodeInUse = await getClassesByIdModel(updateClassParams.code)
        if (isCodeInUse) {
            return ({
                message: "Este código está sendo usado por outra turma"
            })
        }
    }

    return await updateClassModel(id, updateClassParams)

}

export async function deleteClassService(id: string) {
    return await deleteClassModel(id)
}