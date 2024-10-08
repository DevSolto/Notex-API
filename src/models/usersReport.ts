import { PrismaClient } from "@prisma/client";
import { CreateUsersReportParams, UpdateUsersReportParams } from "../types/report";


const prisma = new PrismaClient()

export async function createUserReportModel(data: CreateUsersReportParams) {
  return await prisma.usersReport.create({
    data
  })
}
export async function updateUserReportModel(userId: string, reportId: string, data: UpdateUsersReportParams) {
  return await prisma.usersReport.update({
    where: {
      userId_reportId: {
        userId,
        reportId
      }
    },
    data
  })
}



export async function getNotViewedReportsByUserIdModel(userId: string) {
  const usersReports = await prisma.usersReport.findMany({
    where: {
      userId,
      viewed: false,
    },
    include: {
      report: {
        include: {
          creator: true
        }
      },
    },
  });
  console.log(usersReports);

  const reports = usersReports.map((userReport) => userReport.report);

  return { reports };
}