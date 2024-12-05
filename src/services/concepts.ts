import { 
  createConceptModel, 
  getConceptsModel, 
  getConceptsByIdModel, 
  updateConceptModel, 
  getConceptAndDeleteModel 
} from "../models/concepts";
import { getUserByIdModel } from "../models/users";
import { CreateConceptParams, GetConceptParams, UpdateConceptParams } from "../types/concept";

export async function getConceptsService(params: GetConceptParams) {
  const whereClause: any = params.whereClause || {}; // Pega o filtro de studentId se passado

  try {
    const concepts = await getConceptsModel({
      ...params,
      whereClause,
    });
    return concepts;
  } catch (error) {
    throw new Error('Erro ao recuperar os conceitos');
  }
}


export async function getConceptsByIdService(id: string) {
  try {
    return await getConceptsByIdModel(id);
  } catch (error) {
    throw new Error('Erro ao recuperar o conceito');
  }
}

export async function createConceptService(createConceptParams: CreateConceptParams) {
  try {
    const creator = await getUserByIdModel(createConceptParams.creatorId);
    if (!creator) {
      throw new Error('Criador não encontrado');
    }

    const student = await getUserByIdModel(createConceptParams.studentId);
    if (!student) {
      throw new Error('Estudante não encontrado');
    }

    if (creator.role !== 'TEACHER') {
      throw new Error('O criador precisa ser obrigatoriamente um professor');
    }

    if (student.role !== 'STUDENT') {
      throw new Error('O estudante precisa ser obrigatoriamente um estudante');
    }

    return await createConceptModel(createConceptParams);
  } catch (error) {
    throw new Error('Erro ao criar o conceito');
  }
}

export async function updateConceptService(id: string, updateConceptParams: UpdateConceptParams) {
  try {
    if (!id || typeof id !== 'string') {
      throw new Error('O ID do conceito deve ser uma string válida.');
    }

    // Validação adicional em updateConceptParams (se necessário)
    return await updateConceptModel(id, updateConceptParams);
  } catch (error) {
    console.error('Erro no serviço:', error.message);
    throw new Error('Erro ao processar a atualização do conceito.');
  }
}



export async function getConceptAndDeleteService(id: string) {
  try {
    const concept = await getConceptAndDeleteModel(id);
    return concept;
  } catch (error) {
    throw new Error('Erro ao recuperar e excluir o conceito');
  }
}
