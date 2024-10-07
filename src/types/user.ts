import { PrismaClient } from "@prisma/client"

export type CreateUserParams = {
    name: string
    avatarUrl: string
    email: string
    cpf: string
    password: string
    role: string
    phone: string
}
export type UpdateUserParams = {
    name?: string
    avatarUrl?: string
    email?: string
    cpf?: string
    password?: string
    role?: string
    phone?: string
    isActive?: boolean
}

export type GetUsersParams = {
    page?: number;
    limit?: number;
    search?: string;
    email?: string;
    cpf?: string;
    isActive?: boolean;
    role?: string;
    phone?: string;
    orderBy?: string;
    order?: 'asc' | 'desc';
};
