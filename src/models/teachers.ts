import { PrismaClient } from "@prisma/client";
import { CreateTeacherParams, UpdateTeacherParams } from "../types/teachers";

const prisma = new PrismaClient()

export async function getTeachersModel() {
    return await prisma.teach.findMany()
}

export async function createTeachersModel(createteachersParams: CreateTeacherParams) {
    const teacherData = createteachersParams.userId.map(userId => ({
        classId: createteachersParams.classId,
        userId
    }));
}