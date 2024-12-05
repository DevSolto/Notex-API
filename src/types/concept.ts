// types/concept.ts

export type Grade = 'EXCELENTE' | 'ÓTIMO' | 'BOM' | 'INSUFICIENTE' | 'RUIM';

export type CreateConceptParams = {
  creatorId: string;
  studentId: string;
  av1?: Grade; // nota da avaliação 1 (opcional)
  av2?: Grade; // nota da avaliação 2 (opcional)
  subjectId: string;
}

export type UpdateConceptParams = {
  av1?: Grade; // nota da avaliação 1 (opcional)
  av2?: Grade; // nota da avaliação 2 (opcional)
  subjectId?: string;
}


export type GetConceptParams = {
  page?: number,
  limit?: number,
  av1?: string,
  av2?: string,
  search?: string,
  orderBy?: string,
  order?: 'asc' | 'desc';
  creatorId?: string
  studentId?: string
}