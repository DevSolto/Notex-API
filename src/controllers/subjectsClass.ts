import { Router } from "express";
import { ZodError } from "zod";
import {
    createSubjectClassService,
    getSubjectsClassAndDeleteService,
    getSubjectsClassService,
    getProfessorBySubjectIdService,
} from "../services/subjectsClass";
import { createSubjectClassSchema } from "../schemas/subjectsClass";
import { PrismaClient } from "@prisma/client"; // Adicione a importação do PrismaClient

// Instanciar o PrismaClient
const prisma = new PrismaClient();

export const subjectClassRouter = Router();

subjectClassRouter.get("/subjectClass", async (req, res) => {
    try {
        const subjectsClass = await getSubjectsClassService();
        res.status(200).send(subjectsClass);
    } catch (error) {
        res.status(500).send({ error: "Erro ao buscar SubjectClasses." });
    }
});

subjectClassRouter.post("/subjectClass", async (req, res) => {
    try {
        const createSubjectClassParams = createSubjectClassSchema.parse(req.body);
        const createdSubjectClass = await createSubjectClassService(createSubjectClassParams);
        res.status(201).send(createdSubjectClass);
    } catch (error) {
        if (error instanceof ZodError) {
            res.status(400).send(error.errors);
        } else {
            res.status(500).send({ error: "Erro ao criar SubjectClass." });
        }
    }
});

subjectClassRouter.delete("/subjectClass/:userId/:classId/:subjectId", async (req, res) => {
    try {
        const { userId, classId, subjectId } = req.params;
        const subjectClassDeleted = await getSubjectsClassAndDeleteService({ userId, classId, subjectId });
        res.status(200).send(subjectClassDeleted);
    } catch (error) {
        res.status(500).send({ error: "Erro ao deletar SubjectClass." });
    }
});


subjectClassRouter.get("/subjectClass/professor/:subjectId", async (req, res) => {
    try {
        const { subjectId } = req.params; // Obtém o ID da disciplina da URL
        const professor = await getProfessorBySubjectIdService(subjectId); // Chama a função para buscar o professor
        
        // Se a função retornar uma mensagem de erro, envia como resposta
        if (professor.message) {
            return res.status(404).send(professor.message);
        }

        // Caso o professor seja encontrado, retorna os dados do professor
        res.status(200).send(professor);
    } catch (error) {
        console.error("Erro ao buscar professor:", error.message);
        res.status(500).send({ error: "Erro ao buscar professor." });
    }
});

// PATCH: Atualizar SubjectClass
subjectClassRouter.patch("/subjectClass", async (req, res) => {
    const { userId, classId, subjectId } = req.body;
  
    // Verifica se todos os campos necessários estão presentes
    if (!userId || !classId || !subjectId) {
      return res.status(400).send({ error: "userId, classId e subjectId são obrigatórios." });
    }
  
    try {
      // Verifica se o SubjectClass já existe usando os três campos da chave composta
      const existingSubjectClass = await prisma.subjectClass.findUnique({
        where: {
          userId_classId_subjectId: { // Chave composta para identificação única
            userId, 
            classId, 
            subjectId
          }
        }
      });
  
      // Se o SubjectClass não existir, retorna um erro
      if (!existingSubjectClass) {
        return res.status(404).send({ message: "SubjectClass não encontrada." });
      }
  
      // Atualiza o SubjectClass
      const updatedSubjectClass = await prisma.subjectClass.update({
        where: {
          userId_classId_subjectId: { 
            userId, 
            classId, 
            subjectId 
          }
        },
        data: {
          // Aqui você pode incluir os dados que deseja atualizar. Exemplo:
          // userId: req.body.newUserId
        }
      });
  
      // Responde com a SubjectClass atualizada
      res.status(200).send(updatedSubjectClass);
    } catch (error) {
      res.status(500).send({ error: "Erro ao atualizar SubjectClass." });
    }
  });
  