import { Prisma, PrismaClient } from "@prisma/client"
import { CreateUserParams, UpdateUserParams } from "../types/user"

const prisma = new PrismaClient();

export async function getUsersModel({
  page = 1,
  limit = 10,
  name,
  email,
  cpf,
  isActive,
  role,
  phone,
  orderBy = 'createdAt',
  order = 'asc'
}: {
  page?: number;
  limit?: number;
  name?: string;
  email?: string;
  cpf?: string;
  isActive?: boolean;
  role?: string;
  phone?: string;
  orderBy?: string;
  order?: 'asc' | 'desc';
}) {
  const offset = (page - 1) * limit;

  const whereClause: any = {};
  if (name) whereClause.name = { contains: name };
  if (email) whereClause.email = { contains: email };
  if (cpf) whereClause.cpf = { equals: cpf };
  if (isActive !== undefined) whereClause.isActive = isActive;
  if (role) whereClause.role = { equals: role };
  if (phone) whereClause.phone = { contains: phone };

  const users = await prisma.users.findMany({
    skip: offset,
    take: limit,
    where: whereClause,
    orderBy: {
      [orderBy]: order,
    }
  });

  const total = await prisma.users.count({
    where: whereClause,
  });

  return {
    users,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  };
}



export async function createUserModel(createUserParams: CreateUserParams) {
    return prisma.users.create({
        data: createUserParams
    })
}

export async function getUserByEmailModel(email: string) {
    return await prisma.users.findUnique({
        where: {
            email
        }
    })
}

export async function getUserByCPFModel(cpf: string) {
    return await prisma.users.findUnique({
        where: {
            cpf
        }
    })
}

export async function getUserByPhoneModel(phone: string) {
    return await prisma.users.findUnique({
        where: {
            phone
        }
    })
}

export async function getUserByIdModel(id: string) {
    return await prisma.users.findUnique({
        where: {
            id
        }
    })
}

export async function updateUserModel(id: string, data: UpdateUserParams) {

    return await prisma.users.update({
        where: {
            id
        },
        data
    })
}
