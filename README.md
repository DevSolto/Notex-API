# Back-End Project

Este é um projeto de back-end usando **Node.js**, **Express**, **Prisma**, e **TypeScript**. O projeto utiliza o **Prisma** como ORM para gerenciar a conexão com o banco de dados e o **Zod** para validação de dados.

## Requisitos

Antes de rodar o projeto, certifique-se de que você tem o seguinte instalado em seu sistema:

- [Node.js](https://nodejs.org/) (versão 18+)
- [npm](https://www.npmjs.com/) (versão 6+)
- Um banco de dados PostgreSQL em execução
- [Prisma CLI](https://www.prisma.io/docs/getting-started/quickstart)

## Passos para rodar o projeto

Siga os passos abaixo para configurar e rodar o projeto:

### 1. Clonar o repositório

```bash
git clone https://github.com/DevSolto/Notex-API.git
cd Notex-API
```

### 2. Instalar dependências

Após clonar o repositório, instale as dependências do projeto:

```bash
npm install
```

### 3. Configurar o banco de dados

Você precisa configurar a URL de conexão com o banco de dados no arquivo `.env`. Crie o arquivo `.env` na raiz do projeto e adicione a seguinte linha, substituindo `DATABASE_URL` pela sua URL de conexão ao banco de dados PostgreSQL:

```
DATABASE_URL="postgresql://username:password@localhost:5432/mydatabase"
```

### 4. Configurar o Prisma

Após configurar o banco de dados no `.env`, execute o seguinte comando para gerar o cliente do Prisma:

```bash
npx prisma generate
```

### 5. Rodar as migrações

Para aplicar as migrações no banco de dados, execute:

```bash
npx prisma migrate dev
```

### 6. Iniciar o servidor

Finalmente, para rodar o servidor em ambiente de desenvolvimento, execute:

```bash
npm run dev
```

Agora o servidor estará rodando em modo de desenvolvimento!

## Scripts disponíveis

- `npm run dev`: Roda o servidor no modo de desenvolvimento.
- `npm run build`: Compila o TypeScript para JavaScript.
- `npm run prisma`: Comando para rodar o Prisma CLI.

### Contato

Se você tiver dúvidas ou problemas, entre em contato com o mantenedor do projeto.
