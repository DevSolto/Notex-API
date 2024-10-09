import { faker } from '@faker-js/faker';
import { Class, PrismaClient, Subject, Users } from '@prisma/client';

const prisma = new PrismaClient();

async function generateFakeData() {
  const users: Users[] = [];
  const subjects: Subject[] = [];
  const classes: Class[] = [];

  // Criar 10 usuários falsos
  for (let i = 0; i < 10; i++) {
    const user = await prisma.users.create({
      data: {
        avatarUrl: faker.image.avatar(),
        name: faker.name.fullName(),
        email: faker.internet.email(),
        cpf: faker.string.numeric(11),
        password: faker.internet.password({
          length: 10,
          memorable: true,
        }),
        role: faker.helpers.arrayElement(['STUDENT', 'TEACHER']),
        phone: faker.phone.number({ style: 'national' }),
        isActive: faker.datatype.boolean(),
      },
    });
    users.push(user);
  }

  // Criar 5 disciplinas (Subjects)
  for (let i = 0; i < 5; i++) {
    const subject = await prisma.subject.create({
      data: {
        name: faker.lorem.words(2),
      },
    });
    subjects.push(subject);
  }

  // Criar 5 turmas (Classes) com relação a usuários e disciplinas
  for (let i = 0; i < 5; i++) {
    const classe = await prisma.class.create({
      data: {
        title: faker.lorem.words(3),
        code: faker.internet.ip(),
        year: faker.date.past({years:4}).getFullYear().toString(),
        period: faker.number.int({ min: 1, max: 2 }),
      },
    });
    classes.push(classe);

    // Associar estudantes a cada turma
    const students = users.filter((user) => user.role === 'STUDENT');
    for (const student of students) {
      await prisma.studying.create({
        data: {
          userId: student.id,
          classId: classe.id,
        },
      });
    }

    // Associar professores e disciplinas (SubjectClass)
    const teachers = users.filter((user) => user.role === 'TEACHER');
    const subject = faker.helpers.arrayElement(subjects);
    for (const teacher of teachers) {
      await prisma.subjectClass.create({
        data: {
          userId: teacher.id,
          classId: classe.id,
          subjectId: subject.id,
        },
      });
    }

    // Criar horários (Schedule) para a turma
    await prisma.schedule.create({
      data: {
        url: faker.internet.url(),
        creatorId: faker.helpers.arrayElement(users).id,
        classId: classe.id,
      },
    });
  }

  console.log('Dados falsos gerados com sucesso!');
}

generateFakeData()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
