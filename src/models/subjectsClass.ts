import { PrismaClient } from "@prisma/client";
import { CreateSubjectClassParams } from "../types/subjectClass";

const prisma = new PrismaClient();

export async function getSubjectsClassModel() {
    return await prisma.subjectClass.findMany();
}

export async function createSubjectsClassModel(createSubjectParams: CreateSubjectClassParams) {
    return prisma.subjectClass.create({
        data: createSubjectParams,
    });
}

export async function getSubjectsClassAndDeleteModel({ userId, classId, subjectId }: { userId: string, classId: string, subjectId: string }) {
    return await prisma.subjectClass.delete({
        where: {
            userId_classId_subjectId: {
                userId,
                classId,
                subjectId,
            }
        },
    });
}


export async function getProfessorBySubjectIdModel(subjectId: string) {
    return await prisma.subject.findUnique({
        where: { id: subjectId },
        include: {
            SubjectClass: {
                include: {
                    class: {
                        include: {
                            Teach: {
                                include: {
                                    user: true, // Inclui os dados do professor através do modelo Users
                                },
                            },
                        },
                    },
                },
            },
        },
    });
}
