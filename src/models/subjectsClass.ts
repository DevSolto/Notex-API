import {  PrismaClient } from "@prisma/client"
import { CreateSubjectClassParams } from "../types/subjectClass";
import { CreateSubjectParams } from "../types/subjects";

const prisma = new PrismaClient();

export async function getSubjectsClassModel() {
    return await prisma.subjectClass.findMany()
}

export async function createSubjectsClassModel(createSubjectParams: CreateSubjectParams) {
    return prisma.subjectClass.create({
        data: createSubjectParams
    })
}

export async function getSubjectsClassAndDeleteModel(id: string) {
    return await prisma.subjectClass.delete({
        where: {
            userId_classId_subjectId: id
        }
    })
}