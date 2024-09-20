import { PrismaClient } from "@prisma/client";
import { CreateSubjectParams } from "../types/subjects";


const prisma = new PrismaClient()

export async function createSubject(data:CreateSubjectParams) {
  return await prisma.subject.create({
    data
  })
}