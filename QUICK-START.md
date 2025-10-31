# 🚀 Guia Rápido - Nexus

## Iniciar o Projeto AGORA! ⚡

### Opção 1: Desenvolvimento Local Simples (SQLite - RECOMENDADO)

```bash
# 1. Instalar dependências
npm install --legacy-peer-deps

# 2. Copiar configuração
cp .env.example .env

# 3. Iniciar servidor
npm run start:dev
```

✅ **Pronto!** O servidor estará rodando em `http://localhost:3000`

O projeto usa SQLite por padrão em desenvolvimento (não precisa instalar banco de dados!).

### Opção 2: Com Docker (PostgreSQL + Redis)

```bash
# Iniciar todos os serviços
docker-compose up -d

# Ver logs
docker-compose logs -f api
```

Serviços disponíveis:
- Backend API: `http://localhost:3000`
- PostgreSQL: `localhost:5432`
- Redis: `localhost:6379`

## 🧪 Testar a API

```bash
# Health check
curl http://localhost:3000/

# Listar usuários
curl http://localhost:3000/user

# Listar roles
curl http://localhost:3000/role

# Listar companies
curl http://localhost:3000/company
```

## 📊 Endpoints Disponíveis

### Usuários
- `GET /user` - Listar usuários
- `POST /user` - Criar usuário
- `GET /user/:id` - Buscar usuário
- `PATCH /user/:id` - Atualizar usuário
- `DELETE /user/:id` - Deletar usuário

### Roles
- `GET /role` - Listar roles
- `POST /role` - Criar role
- `GET /role/:id` - Buscar role
- `PATCH /role/:id` - Atualizar role
- `DELETE /role/:id` - Deletar role

### Companies
- `GET /company` - Listar empresas
- `POST /company` - Criar empresa
- `GET /company/:id` - Buscar empresa
- `PATCH /company/:id` - Atualizar empresa
- `DELETE /company/:id` - Deletar empresa

### Positions (Cargos)
- `GET /position` - Listar cargos
- `POST /position` - Criar cargo
- `GET /position/:id` - Buscar cargo
- `PATCH /position/:id` - Atualizar cargo
- `DELETE /position/:id` - Deletar cargo

### Permissions
- `GET /permission` - Listar permissões
- `POST /permission` - Criar permissão

### Modules
- `GET /module` - Listar módulos
- `POST /module` - Criar módulo

### Features
- `GET /feature` - Listar features
- `POST /feature` - Criar feature

## 📁 Arquivos Importantes

- `src/main.ts` - Ponto de entrada da aplicação
- `src/app.module.ts` - Módulo principal
- `src/modules/` - Módulos de domínio
- `src/database/entities/` - Entidades do banco
- `.env` - Configurações (não commitado)
- `docker-compose.yml` - Configuração Docker

## 🔧 Comandos Úteis

```bash
# Desenvolvimento
npm run start:dev     # Modo watch (auto-reload)
npm run start:debug   # Com debug

# Build
npm run build         # Compilar TypeScript

# Testes
npm run test          # Testes unitários
npm run test:e2e      # Testes E2E

# Linting
npm run lint          # Verificar código
npm run format        # Formatar código
```

## 🐛 Problemas Comuns

### "Cannot connect to database"
- Se usar PostgreSQL, certifique que está rodando na porta 5432
- Ou simplesmente use SQLite (padrão): comente as variáveis DB_* no .env

### "Port 3000 already in use"
- Mude a porta no .env: `PORT=3001`

### "Module not found"
- Execute: `npm install --legacy-peer-deps`

## 📝 Próximos Passos

1. ✅ Servidor rodando
2. 🔄 Criar módulo de Pacientes
3. 🔄 Criar módulo de Exames
4. 🔄 Criar módulo Financeiro
5. 🔄 Desenvolver Frontend Next.js

## 🎯 Status do Projeto

**Fase Atual**: Fundação ✅
- [x] Build funcionando
- [x] Servidor iniciando
- [x] SQLite configurado para dev
- [x] Docker compose pronto
- [x] Endpoints básicos funcionando

**Próxima Fase**: Core Clínico
- [ ] Módulo de Pacientes
- [ ] Catálogo de Exames
- [ ] Ordens e Amostras

---

Veja mais detalhes em [README-PT.md](./README-PT.md)
