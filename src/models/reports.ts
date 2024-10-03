import { PrismaClient } from "@prisma/client"
import { CreateReportParams, UpdateReportParams } from "../types/report"

const prisma = new PrismaClient()

export async function getReportsModel() {

    return await prisma.report.findMany()
}

export async function getReportByIdModel(id: string) {
    return await prisma.report.findUnique({
        where: {
            id
        }
    })
}

export async function createReportModel(createReportParams: CreateReportParams) {
    return prisma.report.create({
        data: createReportParams
    })
}

export async function updateReportModel(id: string, data: UpdateReportParams) {

    return await prisma.report.update({
        where: {
            id
        },
        data
    })
}

export async function getReportAndDeleteModel(id: string) {
    return await prisma.report.delete({
        where: {
            id: id
        }
    })
}