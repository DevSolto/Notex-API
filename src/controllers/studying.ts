import { Router } from "express";
import { ZodError } from "zod";
import { createStudyingSchema, updateStudyingSchema } from "../schemas/studying";
import { createStudyingService, getStudyingAndDeleteService, getStudyingByIdService, getStudyingService, updateStudyingService, findClassByStudentCpfService } from "../services/studying";

export const studyingRouter = Router();

studyingRouter.get('/studying', async (req, res) => {
  try {
    const studying = await getStudyingService();
    res.send(studying);
  } catch (error) {
    console.error('Error fetching concepts:, error');
    res.status(500).send({ message: 'Interna Server Error' });
  }
});

studyingRouter.get('/studying:id', async (req, res) => {
  const studyingId = req.params.id
  const studyingReturned = await getStudyingByIdService(studyingId)
  res.send(studyingReturned)
})

studyingRouter.post('/studying', async (req, res) => {
  try {
    const createStudyingParams = createStudyingSchema.parse(req.body);
    const createdStudying = await createStudyingService(createStudyingParams);
    res.send(createdStudying);
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).send({
        message: 'Validation Error',
        errors: error,
      });
    } else if (error instanceof Error) {
      if (error.message.includes('Classe não encontrada')) {
        res.status(404).send({ message: error.message });
      } else if (error.message.includes('Estudante não encontrado')) {
        res.status(404).send({ message: error.message });
      } else {
        res.status(400).send({ message: error.message });
      }
    } else {
      console.error('Unexpected error:', error);
      res.status(500).send({ message: 'Internal Server Error' });
    }
  }
});

studyingRouter.patch('/studying/:id', async (req, res) => {
  try {
    const studyingId = req.params.id
    const updateStuyindParams = updateStudyingSchema.parse(req.body)
    const updateStudying = await updateStudyingService(studyingId, updateStuyindParams)
    res.send(updateStudying)
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).send(error)
    } else {
      res.status(500).send(error)
    }
  }
})

studyingRouter.delete('/studying/:id', async (req, res) => {
  try {
    const studyingDeleted = await getStudyingAndDeleteService(req.params.id)
    res.send(studyingDeleted)
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).send(error)
    } else {
      res.status(500).send(error)
    }
  }
})
studyingRouter.get('/studying/cpf/:cpf', async (req, res) => {
  const { cpf } = req.params;

  try {
    const studentClass = await findClassByStudentCpfService(cpf);
    res.status(200).send(studentClass);
  } catch (error) {
    if (error.message === "Estudante não encontrado.") {
      return res.status(404).send({ message: error.message });
    }
    if (error.message === "O estudante não está matriculado em nenhuma turma.") {
      return res.status(404).send({ message: error.message });
    }
    res.status(500).send({ message: "Erro interno do servidor." });
  }
});