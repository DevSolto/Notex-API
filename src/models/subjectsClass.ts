import {  PrismaClient } from "@prisma/client"
import { CreateSubjectClassParams } from "../types/subjectClass";
import { CreateSubjectParams } from "../types/subjects";

const prisma = new PrismaClient();

export async function getSubjectsClassModel() {
    return await prisma.subjectClass.findMany()
}

export async function createSubjectsClassModel(createSubjectClassParams: CreateSubjectClassParams) {
    return prisma.subjectClass.create({
        data: createSubjectClassParams
    })
}

export async function getSubjectsClassAndDeleteModel(id: string) {
    return await prisma.subjectClass.delete({
        where: {
            userId: id,
            classId: id,
            subjectId: id
        }
    })
}