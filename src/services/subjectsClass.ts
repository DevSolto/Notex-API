
import {
    createSubjectsClassModel,
    getSubjectsClassAndDeleteModel,
    getSubjectsClassModel,
    getProfessorBySubjectIdModel,
} from "../models/subjectsClass";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
import { CreateSubjectClassParams } from "../types/subjectClass";

/**
 * Serviço para buscar todas as SubjectClasses.
 */
export async function getSubjectsClassService() {
    try {
        return await getSubjectsClassModel();
    } catch (error: any) {
        throw new Error(`Erro ao buscar SubjectClasses: ${error.message}`);
    }
}

/**
 * Serviço para criar uma nova SubjectClass.
 * @param createSubjectClassParams Parâmetros para criar uma nova SubjectClass.
 */
export async function createSubjectClassService(createSubjectClassParams: CreateSubjectClassParams) {
    try {
        return await createSubjectsClassModel(createSubjectClassParams);
    } catch (error: any) {
        throw new Error(`Erro ao criar SubjectClass: ${error.message}`);
    }
}

/**
 * Serviço para buscar e deletar uma SubjectClass pelo ID.
 * @param id ID da SubjectClass a ser deletada.
 */
export async function getSubjectsClassAndDeleteService({ userId, classId, subjectId }: { userId: string, classId: string, subjectId: string }) {
    try {
        return await getSubjectsClassAndDeleteModel({
            userId,
            classId,
            subjectId,
        });
    } catch (error: any) {
        throw new Error(`Erro ao deletar SubjectClass: ${error.message}`);
    }
}


/**
 * Serviço para obter professores vinculados a um Subject ID.
 * @param subjectId ID do Subject.
 * @returns Lista de professores associados ou mensagem de erro.
 */
export async function getProfessorBySubjectIdService(subjectId: string) {
    try {
        // Buscar a disciplina com os professores associados
        const subjectWithProfessor = await prisma.subject.findUnique({
            where: { id: subjectId }, // Filtrando pelo ID da disciplina
            include: {
                SubjectClass: {
                    include: {
                        user: true, // Inclui o professor associado diretamente pela tabela SubjectClass
                    },
                },
            },
        });

        // Verifica se a disciplina foi encontrada e se tem professor associado
        if (!subjectWithProfessor || !subjectWithProfessor.SubjectClass.length) {
            return { message: "Nenhum professor encontrado para esta disciplina." };
        }

        // Busca o professor associado à disciplina
        const professors = subjectWithProfessor.SubjectClass
            .map((subjectClass) => subjectClass.user) // Pega o usuário (professor) relacionado à SubjectClass
            .filter(Boolean); // Filtra se não houver professor

        if (professors.length === 0) {
            return { message: "Nenhum professor encontrado para esta disciplina." };
        }

        return professors[0]; // Retorna o primeiro professor encontrado
    } catch (error) {
        console.error("Erro ao buscar professor:", error.message);
        throw new Error(`Erro ao buscar professor: ${error.message}`);
    }
}
