import { PrismaClient } from "@prisma/client";
import { CreateStudyingParams, UpdateStudyingParams } from "../types/studying";

const prisma = new PrismaClient()

export async function getStudyingModel() {
  return await prisma.studying.findMany()
}
export async function getStudyingByIdModel(studentId: string) {
  return await prisma.studying.findFirst({
    where: {
      userId: studentId
    }
  })
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

export async function updateStudyingModel(id: string, data: UpdateStudyingParams) {

  return await prisma.studying.update({
    where: {
      id
    },
    data
  })
}

export async function getStudyingAndDeleteModel(id: string) {
  return await prisma.studying.delete({
    where: {
      userId_classId: id
    }
  })
}