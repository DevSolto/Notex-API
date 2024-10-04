import { getReportByIdModel, getReportsModel, getReportAndDeleteModel } from "../models/reports";
import { UpdateReportParams } from "../types/report";

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

// export async function updateReportService(id: string, updateReportParams: UpdateReportParams) {
//   if (updateReportParams.title) {
//     const isTitleInUse = await getReportByIdModel(updateReportParams.title)
//     if (isTitleInUse) {
//       return ({
//         message: "O título já está em uso"
//       })
//     }
//   }

//   return await updateReportModel(id, updateReportParams)
// }

export async function getReportAndDeleteService(id: string) {

  const getAndDelete = await getReportAndDeleteModel(id)

  return getAndDelete
}