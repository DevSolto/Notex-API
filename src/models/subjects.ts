import { PrismaClient } from "@prisma/client";
import { CreateSubjectParams, UpdateSubjectParams } from "../types/subjects";
import { UpdateClassParams } from "../types/class";


const prisma = new PrismaClient()

export async function getSubjectsModel() {

  return await prisma.subject.findMany()
}

export async function getSubjectsByIdModel(id: string) {
  return await prisma.subject.findUnique({
    where: {
      id
    }
  })
}

export async function createSubjectModel(createSubjectParams: CreateSubjectParams) {
  return prisma.subject.create({
    data: createSubjectParams
  })
}

export async function updateSubjectModel(id: string, data: UpdateSubjectParams) {

  return await prisma.class.update({
    where: {
      id
    }, data
  })
}