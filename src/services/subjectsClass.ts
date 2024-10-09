import { createSubjectsClassModel, getSubjectsClassAndDeleteModel, getSubjectsClassModel } from "../models/subjectsClass";
import { CreateSubjectClassParams, UpdateSubjectClassParams } from "../types/subjectClass";
import { CreateSubjectParams } from "../types/subjects";

export async function getSubjectsClassService() {

    return await getSubjectsClassModel()
}

export async function createSubjectClassService(createSubjectClassParams: CreateSubjectClassParams) {

    const createSubjectClass = await createSubjectsClassModel({
        ...createSubjectClassParams
    })

    return createSubjectClass
}

export async function getSubjectsClassAndDeleteService(id: string) {

    const getAndDelete = await getSubjectsClassAndDeleteModel(id)

    return getAndDelete
}