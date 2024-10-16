import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function getMetricsModel() {
  const numberOfStudents = await prisma.users.count({
    where: {
      role: 'STUDENT'
    }
  })
  const numberOfTeachers = await prisma.users.count({
    where: {
      role: 'TEACHER'
    }
  })
  const numberOfClasses = await prisma.class.count()

  return {
    numberOfClasses,
    numberOfStudents,
    numberOfTeachers
  }
}