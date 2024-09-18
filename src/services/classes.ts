import { createClassModel, getClassesModel } from "../models/classes";
import { CreateClassParams } from "../types/class";

export async function getClassesService() {
    return await getClassesModel();
}

export async function createClassService(createClassParams: CreateClassParams) {

    const Createclass = await createClassModel({
        ...createClassParams
    })
}