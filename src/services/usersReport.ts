import { getUsersByRoleModel } from "../models/users";
import { createUserReportModel, getNotViewedReportsByUserIdModel, updateUserReportModel } from "../models/usersReport";
import { UpdateUsersReportParams } from "../types/report";

export async function createUsersReportByRoleService(role: string, reportId: string) {
  const users = await getUsersByRoleModel(role);

  const usersReport = await Promise.all(
    users.map(async (user) => {
      const userReport = await createUserReportModel({
        userId: user.id,
        reportId
      });
      return userReport;
    })
  );

  return {
    count: usersReport.length
  };
}


export async function getNotViewedReportsByUserIdService(userId: string) {
  return await getNotViewedReportsByUserIdModel(userId)
}


export async function updateUserReportService(userId: string, reportId: string,data:UpdateUsersReportParams) {
    const updatedReport = await updateUserReportModel(userId, reportId,data);

    return {
      message: 'Relatório atualizado com sucesso.',
      report: updatedReport,
    };
}
