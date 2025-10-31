# Nexus - Plataforma de Análises Clínicas

Sistema completo de gerenciamento para laboratórios de análises clínicas, desenvolvido com NestJS (backend) e Next.js (frontend).

## 🚀 Início Rápido

### Pré-requisitos

- Node.js 20+ 
- Docker e Docker Compose (para desenvolvimento local)
- PostgreSQL 15+ (se não usar Docker)

### Instalação Local (com Docker)

1. Clone o repositório:
```bash
git clone https://github.com/Edvanilson-Teles/nexus.git
cd nexus
```

2. Instale as dependências:
```bash
npm install --legacy-peer-deps
```

3. Configure as variáveis de ambiente:
```bash
cp .env.example .env
# Edite o .env se necessário
```

4. Inicie os serviços com Docker:
```bash
docker-compose up -d
```

5. O backend estará disponível em: `http://localhost:3000`

### Instalação Local (sem Docker)

1. Instale e inicie o PostgreSQL localmente

2. Crie o banco de dados:
```bash
createdb nexus_db
```

3. Configure o .env com suas credenciais do banco

4. Instale as dependências:
```bash
npm install --legacy-peer-deps
```

5. Execute as migrations (quando disponíveis):
```bash
npm run migration:run
```

6. Inicie o servidor:
```bash
npm run start:dev
```

## 📋 Scripts Disponíveis

```bash
# Desenvolvimento
npm run start:dev          # Inicia em modo watch
npm run start:debug        # Inicia com debug

# Build e Produção
npm run build              # Compila o projeto
npm run start:prod         # Inicia em modo produção

# Testes
npm run test               # Testes unitários
npm run test:e2e           # Testes end-to-end
npm run test:cov           # Cobertura de testes

# Qualidade de Código
npm run lint               # Verifica linting
npm run format             # Formata código
```

## 🏗️ Arquitetura

### Backend (Atual)
- **Framework**: NestJS 11
- **ORM**: TypeORM
- **Database**: PostgreSQL
- **Autenticação**: JWT + Passport
- **Validação**: class-validator

### Módulos Existentes
- ✅ Autenticação e Autorização (JWT)
- ✅ Usuários com RBAC
- ✅ Organizações/Empresas
- ✅ Funcionários e Cargos
- ✅ Módulos e Permissões

### Módulos em Desenvolvimento
- 🔄 Pacientes
- 🔄 Catálogo de Exames
- 🔄 Ordens de Coleta
- 🔄 Amostras
- 🔄 Resultados
- 🔄 Sistema Financeiro
- 🔄 Relatórios

### Frontend (Planejado)
- **Framework**: Next.js 14+ (App Router)
- **UI**: Tailwind CSS + Radix UI
- **Estado**: React Context + React Query
- **Formulários**: React Hook Form + Zod

## 🗄️ Estrutura de Pastas

```
nexus/
├── src/
│   ├── auth/              # Autenticação
│   ├── common/            # Utilitários compartilhados
│   ├── config/            # Configurações
│   ├── database/          # Entidades base e config
│   └── modules/           # Módulos de domínio
│       ├── user/          # Gestão de usuários
│       ├── role/          # Roles e permissões
│       ├── organization/  # Empresas e cargos
│       └── human-resources/ # RH e funcionários
├── test/                  # Testes E2E
├── docker-compose.yml     # Configuração Docker
└── Dockerfile            # Build da aplicação
```

## 🔐 Segurança

- Autenticação JWT com refresh tokens
- RBAC (Role-Based Access Control)
- Validação de entrada em todas as rotas
- Passwords com bcrypt
- Guards e decorators personalizados

## 🧪 Testes

Execute os testes com:
```bash
npm test                   # Testes unitários
npm run test:e2e          # Testes E2E
npm run test:cov          # Com cobertura
```

## 📦 Docker

### Desenvolvimento
```bash
docker-compose up -d       # Inicia todos os serviços
docker-compose logs -f api # Ver logs do backend
docker-compose down        # Para todos os serviços
```

### Serviços Docker
- **postgres**: Banco de dados (porta 5432)
- **redis**: Cache e sessões (porta 6379)
- **api**: Backend NestJS (porta 3000)

## 🌐 API Endpoints

### Autenticação
- `POST /api/auth/login` - Login
- `POST /api/auth/refresh` - Refresh token
- `POST /api/auth/logout` - Logout

### Usuários
- `GET /api/users` - Listar usuários
- `POST /api/users` - Criar usuário
- `GET /api/users/:id` - Buscar usuário
- `PATCH /api/users/:id` - Atualizar usuário
- `DELETE /api/users/:id` - Deletar usuário

*Mais endpoints em desenvolvimento...*

## 🚧 Roadmap

### Fase 1: Fundação (Em Progresso)
- [x] Setup do projeto NestJS
- [x] Autenticação JWT
- [x] Sistema de permissões RBAC
- [x] Docker setup
- [ ] Sistema de migrations
- [ ] Seed de dados iniciais

### Fase 2: Core Clínico
- [ ] Módulo de Pacientes
- [ ] Catálogo de Exames
- [ ] Ordens e Amostras
- [ ] Resultados e Laudos

### Fase 3: Financeiro
- [ ] Faturamento
- [ ] Integração com Stripe
- [ ] Relatórios financeiros
- [ ] Conciliação

### Fase 4: Frontend
- [ ] Setup Next.js
- [ ] Sistema de Design
- [ ] Páginas principais
- [ ] Dashboards

### Fase 5: DevOps
- [ ] CI/CD com GitHub Actions
- [ ] Deploy automático
- [ ] Monitoramento
- [ ] Backups automáticos

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona MinhaFeature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença UNLICENSED.

## 👥 Autores

- Edvanilson Teles

## 📞 Suporte

Para suporte, abra uma issue no repositório.
