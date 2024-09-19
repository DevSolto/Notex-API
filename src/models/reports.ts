import { PrismaClient } from "@prisma/client"
import { CreateReportParams } from "../types/report"

const prisma = new PrismaClient()

export async function getReportsModel() {

    return await prisma.report.findMany()
}

export async function createReportModel(createReportParams: CreateReportParams) {
    return prisma.report.create({
        data: createReportParams
    })
}

export async function getReportByTitleModel(title: string) {
    return await prisma.report.findFirst({
        where: {
            title: title
        },
    });
}

export async function getReportByIdModel(id: string) {
    return await prisma.report.findUnique({
        where: {
            id: id
        }
    })
}

export async function getReportAndDeleteModel(id: string) {
    return await prisma.report.delete({
        where: {
            id: id
        }
    })
}