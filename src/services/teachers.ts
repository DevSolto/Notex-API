import { error } from "console";
import { getTeachersModel } from "../models/teachers";
import { CreateClassParams } from "../types/class";
import { CreateTeacherParams, UpdateTeacherParams } from "../types/teachers";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function getTeachersService() {
    return await getTeachersModel()
}

// export async function createTeachersService(createteachersParams: CreateTeacherParams) {
//     const teacherData = await getTeachersModel(createteachersParams.classId);
//     if (!classData) {
//         throw new Error('Classe não encontrada');
//     }
// }

export async function createTeachRelation(userId: string, classId: string) {
    try {
      // Verifica se o relacionamento já existe
      const existingTeach = await prisma.teach.findUnique({
        where: {
          userId_classId: { userId, classId },
        },
      });
  
      if (existingTeach) {
        throw new Error("Este professor já está associado a esta disciplina.");
      }
  
      // Cria o novo relacionamento
      const teach = await prisma.teach.create({
        data: {
          userId,
          classId,
        },
      });
  
      return teach;
    } catch (error: any) {
      throw new Error(`Erro ao criar o relacionamento: ${error.message}`);
    }
  }