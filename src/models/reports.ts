import { PrismaClient } from "@prisma/client"
import { CreateReportParams, UpdateReportParams } from "../types/report"

const prisma = new PrismaClient()

export async function getReportsModel({
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
  const offset = (page - 1) * limit;

  let reports = await prisma.report.findMany({
    skip: offset,
    take: limit,
    orderBy: {
      [orderBy]: order,
    },
    include: {
      creator: true,
    },
  });

  const reportsWithUsersCount = await Promise.all(
    reports.map(async (report) => {
      const userCount = await prisma.usersReport.count({
        where: {
          reportId: report.id,
        },
      });

      return {
        ...report,
        userCount,
      };
    })
  );

  const total = await prisma.report.count();

  return {
    reports: reportsWithUsersCount,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  };
}

export async function createReportModel({ title, description, creatorId }: CreateReportParams) {
  return prisma.report.create({
    data: {
      title,
      description,
      creator: {
        connect: { id: creatorId },
      },
    },
  });
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