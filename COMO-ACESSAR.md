# 🌐 Como Acessar e Testar o Projeto

## ⚠️ Importante

O servidor está rodando no ambiente GitHub Actions (nuvem), então **não é possível acessar diretamente** pela internet. Mas você pode facilmente rodar na sua máquina local!

## 🚀 Rodar Localmente (RECOMENDADO)

### Passo 1: Clonar o repositório

```bash
git clone https://github.com/Edvanilson-Teles/nexus.git
cd nexus
```

### Passo 2: Instalar dependências

```bash
npm install --legacy-peer-deps
```

### Passo 3: Iniciar o servidor

```bash
npm run start:dev
```

### Passo 4: Acessar!

Abra seu navegador em:

- **API Swagger (Interface Visual)**: http://localhost:3000/api
- **API REST**: http://localhost:3000

## 📚 Testando com Swagger

Ao acessar `http://localhost:3000/api`, você verá uma interface visual onde pode:

1. ✅ Ver todos os endpoints disponíveis
2. ✅ Testar cada endpoint diretamente pelo navegador
3. ✅ Ver exemplos de requisições e respostas
4. ✅ Não precisa usar Postman ou curl!

### Exemplo de uso no Swagger:

1. Acesse http://localhost:3000/api
2. Clique em `POST /user` (criar usuário)
3. Clique em "Try it out"
4. Edite o JSON de exemplo:
```json
{
  "name": "João Silva",
  "email": "joao@example.com",
  "password": "Senha@123"
}
```
5. Clique em "Execute"
6. Veja a resposta!

## 🧪 Testando com cURL (Terminal)

### Criar um usuário
```bash
curl -X POST http://localhost:3000/user \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Admin User",
    "email": "admin@nexus.com",
    "password": "Admin@123"
  }'
```

### Listar usuários
```bash
curl http://localhost:3000/user
```

### Criar uma empresa
```bash
curl -X POST http://localhost:3000/company \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Laboratório Nexus",
    "cnpj": "12.345.678/0001-90",
    "address": "Rua das Análises, 123",
    "phone": "(11) 98765-4321",
    "email": "contato@labonexus.com"
  }'
```

## 🐳 Usando Docker (Opcional)

Se preferir usar PostgreSQL em vez de SQLite:

```bash
docker-compose up -d
```

Isso iniciará:
- PostgreSQL na porta 5432
- Redis na porta 6379
- API na porta 3000

## 📁 Arquivos de Exemplo

Veja os arquivos:
- `examples/api-examples.http` - Exemplos de requisições
- `QUICK-START.md` - Guia rápido
- `README-PT.md` - Documentação completa

## 🔍 Endpoints Disponíveis

### Usuários (`/user`)
- `GET /user` - Listar todos os usuários
- `POST /user` - Criar novo usuário
- `GET /user/:id` - Buscar usuário por ID
- `PATCH /user/:id` - Atualizar usuário
- `PATCH /user/:id/password` - Atualizar senha
- `DELETE /user/:id` - Deletar usuário

### Roles (`/role`)
- `GET /role` - Listar roles
- `POST /role` - Criar role
- `GET /role/:id` - Buscar role
- `PATCH /role/:id` - Atualizar role
- `DELETE /role/:id` - Deletar role

### Companies (`/company`)
- `GET /company` - Listar empresas
- `POST /company` - Criar empresa
- `GET /company/:id` - Buscar empresa
- `PATCH /company/:id` - Atualizar empresa
- `DELETE /company/:id` - Deletar empresa

### Positions (`/position`)
- `GET /position` - Listar cargos
- `POST /position` - Criar cargo
- `GET /position/:id` - Buscar cargo
- `PATCH /position/:id` - Atualizar cargo
- `DELETE /position/:id` - Deletar cargo

### Permissions (`/permission`)
- `GET /permission` - Listar permissões
- `POST /permission` - Criar permissão

### Modules (`/module`)
- `GET /module` - Listar módulos
- `POST /module` - Criar módulo

### Features (`/feature`)
- `GET /feature` - Listar features
- `POST /feature` - Criar feature

## 💡 Dicas

1. **Use o Swagger!** É a forma mais fácil de testar a API
2. **SQLite por padrão**: Não precisa configurar banco de dados
3. **Hot Reload**: Mudanças no código recarregam automaticamente
4. **Veja os logs**: O terminal mostra todas as requisições

## 🐛 Problemas?

### Porta 3000 em uso?
Mude no .env:
```
PORT=3001
```

### Erro de dependências?
```bash
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
```

### Banco de dados não conecta?
Por padrão usa SQLite (não precisa configurar nada). Se quiser PostgreSQL, use Docker:
```bash
docker-compose up postgres -d
```

## 📸 Como Ficará

Quando acessar http://localhost:3000/api no navegador:

```
┌─────────────────────────────────────────┐
│  Nexus - Clinical Laboratory API       │
│  Version 1.0                            │
├─────────────────────────────────────────┤
│  📚 Swagger UI                          │
│                                         │
│  ▶ users - Gestão de usuários          │
│    POST /user - Criar novo usuário     │
│    GET  /user - Listar usuários        │
│                                         │
│  ▶ roles - Gestão de perfis            │
│  ▶ companies - Gestão de empresas      │
│  ▶ positions - Gestão de cargos        │
│                                         │
│  [Try it out] [Execute]                │
└─────────────────────────────────────────┘
```

## 🎯 Próximos Passos

Depois de testar localmente:
1. Explore os endpoints no Swagger
2. Crie alguns usuários e empresas
3. Veja o código em `src/modules/`
4. Acompanhe o desenvolvimento no GitHub

---

**Nota**: Este projeto está em desenvolvimento ativo. Novos módulos (Pacientes, Exames, Financeiro) serão adicionados em breve!
