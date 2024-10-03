import { string } from "zod";
import { getSchedulesModel, getSchedulesByIdModel, CreateSchedulesModel, updateScheduleModel, getScheduleAndDeleteModel } from "../models/schedules";
import { CreateUserParams, UpdateUserParams } from "../types/user";
import { CreateSchedulesParams, UpdateSchedulesParams } from "../types/schedules";
import { UpdateClassParams } from "../types/class";

export async function getSchedulesService() {

    return await getSchedulesModel()
}

export async function getSchedulesByIdService(id: string) {

    return await getSchedulesByIdModel(id)
}

export async function createSchedulesService(createSchedulesParams: CreateSchedulesParams) {
    
    const createSchedule = await CreateSchedulesModel({
        ...createSchedulesParams
    });

    return createSchedule
}

export async function updateScheduleService(id: string, updateSchedulesParams: UpdateSchedulesParams) {
    if (updateSchedulesParams.url) {
        const isUrlInUse = await getSchedulesByIdModel(updateSchedulesParams.url)
        if (isUrlInUse) {
            return ({
                message: "A url já está em uso"
            })
        }
    }

    return await updateScheduleModel(id, updateSchedulesParams)
}

export async function getScheduleAndDeleteService(id: string) {

    const getAndDelete = await getScheduleAndDeleteModel(id)

    return getAndDelete
}