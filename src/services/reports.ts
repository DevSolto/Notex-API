import { createReportModel, getReportsModel, getReportByTitleModel } from "../models/reports";
import { CreateReportParams } from "../types/report";


export async function getReportsServices() {
    return await getReportsModel();
}

export async function createReportService(createReportParams: CreateReportParams) {

    const report = await createReportModel({
        ...createReportParams
    });



    return report;
}
