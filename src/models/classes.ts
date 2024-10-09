import { PrismaClient } from "@prisma/client"
import { CreateClassParams, UpdateClassParams } from "../types/class"

const prisma = new PrismaClient()

export async function getClassesModel({ page = 1, limit = 10, year, orderBy = 'title', order = 'asc' }: { page?: number; limit?: number; year?: string; orderBy?: string; order?: 'asc' | 'desc' }) {
    const offset = (page - 1) * limit;

    const whereClause = year ? { year } : {};

    let classes = await prisma.class.findMany({
        skip: offset,
        take: limit,
        where: whereClause,
        orderBy: {
            [orderBy]: order,
        }
    });

    const classesStudents = await Promise.all(classes.map(async (classe) => {
        const amountStudents = await prisma.studying.count({
            where: {
                classId: classe.id
            }
        });

        return {
            ...classe,
            amountStudents
        };
    }));

    const total = await prisma.class.count({
        where: whereClause,
    });

    return {
        classes: classesStudents,
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
    };
}



export async function getClassesByIdModel(id: string) {
    const classe = await prisma.class.findUnique({
        where: {
            id,
        },
    });
    const relations = await prisma.class.findUnique({
        where: {
            id,
        },
        include: {
            Studing: {
                include: {
                    user: true,
                },
            },
            SubjectClass: {
                include: {
                    subject: {
                        include: {
                            _count: {
                                select: {
                                    SubjectClass: true
                                }
                            }
                        }
                    }
                }
            },
            Schedule: true
        },
    });
    return { ...relations, ...classe }
}


export async function createClassModel(createClassParams: CreateClassParams) {
    return prisma.class.create({
        data: createClassParams
    })
}

export async function updateClassModel(id: string, data: UpdateClassParams) {

    return await prisma.class.update({
        where: {
            id
        }, data
    })
}


export async function deleteClassModel(id: string) {
    return await prisma.class.delete({
        where: {
            id
        }
    })
}