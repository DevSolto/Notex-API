import { Router } from "express";
import { getTeachersService, createTeachRelation } from "../services/teachers";

export const teacherRouter = Router();

teacherRouter.get('/teachers', async (req, res) => {
    try {
        const teachers = await getTeachersService();
        res.send(teachers)
    } catch (error) {
        console.error('Error', error)
        res.status(500).send({message: 'Internal Server Error'})
    }
});

teacherRouter.post("/teachers", async (req, res) => {
    const { userId, classId } = req.body;
  
    // Verifica se os parâmetros necessários estão presentes
    if (!userId || !classId) {
      return res.status(400).send({ error: "userId e classId são obrigatórios." });
    }
  
    try {
      // Chama o serviço para criar o relacionamento
      const teach = await createTeachRelation(userId, classId);
      res.status(201).send(teach); // Retorna o relacionamento criado
    } catch (error: any) {
      res.status(500).send({ error: `Erro ao criar o relacionamento: ${error.message}` });
    }
  });