import { createReportModel, getReportsModel, getReportByTitleModel, getReportByIdModel, getReportAndDeleteModel } from "../models/reports";
import { CreateReportParams } from "../types/report";


export async function getReportsServices() {
    return await getReportsModel();
}

export async function createReportService(createReportParams: CreateReportParams) {

    const Createreport = await createReportModel({
        ...createReportParams
    });

    return Createreport;
}

export async function getReportByTitleService(title: string) {

    return await getReportByTitleModel(title)
}

export async function getReportByIdService(id: string) {

    return await getReportByIdModel(id)
}

export async function getReportAndDeleteService(id: string) {
    
    const getAndDelete = await getReportAndDeleteModel(id)

    return getAndDelete
}