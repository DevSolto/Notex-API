import { createReportModel, getReportsModel, getReportByTitleModel, getReportByIdModel, getReportAndDeleteModel } from "../models/reports";
import { CreateReportParams } from "../types/report";


export async function getReportsServices({
    page = 1,
    limit = 10,
    orderBy = 'title',
    order = 'asc',
  }: {
    page?: number;
    limit?: number;
    orderBy?: string;
    order?: 'asc' | 'desc';
  }) {
    return await getReportsModel({
      page,
      limit,
      orderBy,
      order,
    });
  }

export async function createReportService(createReportParams: CreateReportParams) {

    const createdReport = await createReportModel({
        ...createReportParams
    });

    return createdReport;
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