import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Documentation',
      version: '1.0.0',
      description: 'API Documentation with Swagger',
    },
    servers: [
      {
        url: 'http://localhost:4000',
      },
    ],
    components: {
      schemas: {
        User: {
          type: 'object',
          properties: {
            id: { type: 'string', example: '12345' },
            name: { type: 'string', example: 'John Doe' },
            email: { type: 'string', example: 'john.doe@example.com' },
            cpf: { type: 'string', example: '123.456.789-00' },
            avatarUrl: { type: 'string', example: 'https://www.pontotel.com.br/local/wp-content/uploads/2022/05/imagem-corporativa.webp' },
            role: {
              type: 'string',
              enum: ['STUDENT', 'TEACHER', 'ADMIN'],
              example: 'STUDENT',
            },
            phone: { type: 'string', example: '(11) 91234-5678' },
            isActive: { type: 'boolean', example: true },
            createdAt: { type: 'string', format: 'date-time', example: '2024-01-01T12:00:00Z' },
            updatedAt: { type: 'string', format: 'date-time', example: '2024-01-01T12:00:00Z' },
          },
        },
        CreateUserParams: {
          type: 'object',
          required: ['name', 'avatarUrl', 'email', 'cpf', 'password', 'role', 'phone'],
          properties: {
            name: { type: 'string', example: 'John Doe' },
            avatarUrl: { type: 'string', format: 'url', example: 'https://example.com/avatar.jpg' },
            email: { type: 'string', example: 'john.doe@example.com' },
            cpf: { type: 'string', example: '123.456.789-00' },
            password: { type: 'string', example: 'password123' },
            role: {
              type: 'string',
              enum: ['STUDENT', 'TEACHER', 'ADMIN'],
              example: 'STUDENT',
            },
            phone: { type: 'string', example: '(11) 91234-5678' },
          },
        },
      },
    },
  },
  apis: ['./src/controllers/*.ts'],
};

const swaggerSpec = swaggerJsdoc(options);

export const setupSwagger = (app: Express) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log('Swagger disponível em: http://localhost:4000/api-docs');
};
