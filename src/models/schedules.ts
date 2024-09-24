import { PrismaClient } from "@prisma/client";
import { CreateSchedulesParams, UpdateSchedulesParams } from "../types/schedules";
import { string } from "zod";

const prisma = new PrismaClient()

export async function getSchedulesModel() {

    return await prisma.schedule.findMany()
}

export async function getSchedulesByIdModel(id: string) {
    return await prisma.schedule.findUnique({
        where: {
            id
        }
    })
}

export async function CreateSchedulesModel(createSchedulesParams: CreateSchedulesParams) {
    return prisma.schedule.create({
        data: createSchedulesParams
    })
}