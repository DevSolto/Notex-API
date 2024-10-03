import { createReportModel, getReportByIdModel ,getReportsModel, getReportAndDeleteModel, updateReportModel } from "../models/reports";
import { CreateReportParams, UpdateReportParams } from "../types/report";


export async function getReportsServices() {

    return await getReportsModel();
}

export async function getReportByIdService(id: string) {

    return await getReportByIdModel(id)
}

export async function createReportService(createReportParams: CreateReportParams) {

    const Createreport = await createReportModel({
        ...createReportParams
    });

    return Createreport;
}

export async function updateReportService(id: string, updateReportParams: UpdateReportParams) {
    if (updateReportParams.title) {
        const isTitleInUse = await getReportByIdModel(updateReportParams.title)
        if (isTitleInUse) {
                return ({
                    message: "O título já está em uso"
                })
        }
    }

    return await updateReportModel(id, updateReportParams)
}

export async function getReportAndDeleteService(id: string) {
    
    const getAndDelete = await getReportAndDeleteModel(id)

    return getAndDelete
}