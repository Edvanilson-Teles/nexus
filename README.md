# Nexus - Clinical Laboratory Platform

Sistema completo de gerenciamento para laboratórios de análises clínicas, desenvolvido com NestJS (backend) e Next.js (frontend).

## 📚 Documentação

- **[🚀 Guia Rápido (Quick Start)](./QUICK-START.md)** - Comece aqui!
- **[🌐 Como Acessar e Testar](./COMO-ACESSAR.md)** - Instruções para rodar localmente
- **[📖 Documentação Completa em PT-BR](./README-PT.md)** - Documentação detalhada
- **[🧪 Exemplos de API](./examples/api-examples.http)** - Requisições de exemplo

## ⚡ Início Rápido

```bash
# 1. Clonar o repositório
git clone https://github.com/Edvanilson-Teles/nexus.git
cd nexus

# 2. Instalar dependências
npm install --legacy-peer-deps

# 3. Iniciar o servidor
npm run start:dev

# 4. Acessar a API Swagger
# Abra http://localhost:3000/api no navegador
```

## ✨ Features Atuais

- ✅ Autenticação JWT com RBAC
- ✅ Gestão de Usuários
- ✅ Sistema de Roles e Permissões
- ✅ Gestão de Empresas/Laboratórios
- ✅ Gestão de Cargos e Funcionários
- ✅ API REST com Swagger/OpenAPI
- ✅ SQLite (dev) e PostgreSQL (prod)
- ✅ Docker Compose para desenvolvimento
- ✅ Hot Reload e TypeScript

## 🔄 Em Desenvolvimento

- 🔄 Módulo de Pacientes
- 🔄 Catálogo de Exames
- 🔄 Ordens e Amostras
- 🔄 Resultados e Laudos
- 🔄 Sistema Financeiro
- 🔄 Frontend Next.js

## 🛠️ Tecnologias

- **Backend**: NestJS 11, TypeORM, PostgreSQL/SQLite
- **Autenticação**: JWT, Passport
- **Validação**: class-validator
- **Documentação**: Swagger/OpenAPI
- **DevOps**: Docker, Docker Compose

## Description

Platform for managing clinical laboratory operations including patient management, test orders, sample tracking, results, and financial operations.

## Project setup

```bash
$ yarn install
```

## Compile and run the project

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Run tests

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ yarn install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
