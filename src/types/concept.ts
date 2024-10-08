export type CreateConceptParams = {
  url: string
  creatorId: string
  studentId: string
}

export type UpdateConceptParams = {
  url?: string
  creatorId?: string
  studentId?: string
}


export type GetConceptParams = {
  page?: number,
  limit?: number,
  search?: string,
  isActive?: boolean,
  orderBy?: string,
  order?: 'asc' | 'desc';
  url?: string
  creatorId?: string
  studentId?: string
}