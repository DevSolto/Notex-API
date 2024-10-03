import { PrismaClient } from "@prisma/client";
import { CreateStudyingParams } from "../types/studying";

const prisma = new PrismaClient()

export async function getStudyingModel() {
  return await prisma.studying.findMany()
}

export async function createStudyingModel(createStudyingParams: CreateStudyingParams) {
  const studyData = createStudyingParams.usersId.map(userId => ({
    classId: createStudyingParams.classeId,
    userId,
  }));

  return await prisma.studying.createMany({
    data: studyData,
    skipDuplicates: true,
  });
}
