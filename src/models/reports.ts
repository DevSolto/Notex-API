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

