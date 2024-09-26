import { string } from "zod";
import { getSchedulesModel, getSchedulesByIdModel, CreateSchedulesModel } from "../models/schedules";
import { CreateUserParams, UpdateUserParams } from "../types/user";
import { CreateSchedulesParams } from "../types/schedules";

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