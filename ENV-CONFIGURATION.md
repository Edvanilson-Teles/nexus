# 🔧 Configuração de Ambiente (.env)

Este guia explica todas as variáveis de ambiente disponíveis no Nexus Laboratory Platform.

## 📋 Índice

1. [Início Rápido](#início-rápido)
2. [Configurações Detalhadas](#configurações-detalhadas)
3. [Ambientes de Execução](#ambientes-de-execução)
4. [Troubleshooting](#troubleshooting)

---

## 🚀 Início Rápido

### Opção 1: SQLite (Zero Configuração - Recomendado para Desenvolvimento)

```bash
# 1. Copie o arquivo .env que já está pronto
cp .env .env.backup  # Backup (opcional)

# 2. Certifique-se que DB_HOST está vazio no .env
# DB_HOST=

# 3. Inicie o servidor
npm run start:dev

# ✅ Pronto! O servidor estará em http://localhost:3000
# ✅ Swagger disponível em http://localhost:3000/api
# ✅ SQLite criará automaticamente o arquivo nexus-dev.sqlite
```

### Opção 2: PostgreSQL com Docker

```bash
# 1. Certifique-se que o .env está configurado

# 2. Inicie o PostgreSQL via Docker
docker-compose up -d postgres

# 3. Configure o .env para usar PostgreSQL
# Descomente e ajuste:
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=nexus_user
DB_PASSWORD=nexus_password
DB_DATABASE=nexus_db

# 4. Inicie o servidor
npm run start:dev
```

---

## 📖 Configurações Detalhadas

### 🔹 Aplicação

```env
# Porta do servidor (padrão: 3000)
PORT=3000

# Ambiente de execução
# Valores: development | production | test
NODE_ENV=development

# URL da API (usado para links e webhooks)
API_URL=http://localhost:3000
```

---

### 🔹 Banco de Dados

#### SQLite (Padrão para Desenvolvimento)

```env
# Deixe DB_HOST vazio para usar SQLite automaticamente
DB_HOST=

# O arquivo será criado em: nexus-dev.sqlite
```

**Vantagens do SQLite:**
- ✅ Zero configuração
- ✅ Não precisa instalar nada
- ✅ Perfeito para desenvolvimento e testes
- ✅ Portável (um único arquivo)

#### PostgreSQL (Produção)

```env
# Configurações individuais
DB_TYPE=postgres
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=nexus_user
DB_PASSWORD=nexus_password
DB_DATABASE=nexus_db

# OU use string de conexão completa
DATABASE_URL=postgresql://nexus_user:nexus_password@localhost:5432/nexus_db
```

> Prioridade de configuração de banco (ordem de avaliação):
>
> 1) Se `DB_HOST` ou `DB_TYPE` estiverem definidos, a aplicação usa as variáveis discretas (ignora `DATABASE_URL`).
>
> 2) Caso contrário, se `DATABASE_URL` estiver definida, ela será utilizada.
>
> 3) Se nada disso estiver presente e `NODE_ENV !== production`, o SQLite é usado automaticamente para desenvolvimento.

> Observações:
>
> - O valor `DB_TYPE=postgresql` é automaticamente normalizado para `postgres` (driver do TypeORM).
> - Para bancos gerenciados (Neon, RDS, etc.), habilite SSL com `DB_SSL=true` e, se necessário, `DB_SSL_REJECT_UNAUTHORIZED=false`.
> - Pool de conexões: `DB_MAX_CONNECTIONS` (padrão 10) e `DB_CONNECTION_TIMEOUT` em ms (padrão 30000) são suportados.

**Quando usar PostgreSQL:**
- 🏢 Ambiente de produção
- 👥 Múltiplos usuários simultâneos
- 📊 Grande volume de dados
- 🔒 Requisitos de segurança avançados

#### Configurações SSL (Bancos na Nuvem)

```env
# Para AWS RDS, Heroku Postgres, etc.
DB_SSL=true
DB_REJECT_UNAUTHORIZED=false
```

#### TypeORM

```env
# Sincronização automática do schema (CUIDADO em produção!)
TYPEORM_SYNCHRONIZE=true  # development: true, production: false

# Logs de queries SQL
TYPEORM_LOGGING=false  # true para debug
```

---

### 🔹 Autenticação JWT

```env
# Segredo para assinar tokens JWT (MUDE EM PRODUÇÃO!)
JWT_SECRET=nexus-super-secret-jwt-key-please-change-in-production-2024

# Segredo para refresh tokens
JWT_REFRESH_SECRET=nexus-super-secret-refresh-jwt-key-please-change-in-production-2024

# Expiração do token principal
JWT_EXPIRES_IN=24h

# Expiração do refresh token
JWT_REFRESH_EXPIRES_IN=7d
```

**⚠️ IMPORTANTE:**
- NUNCA use os valores padrão em produção
- Use strings aleatórias longas (32+ caracteres)
- Gere com: `openssl rand -base64 32`

---

### 🔹 Redis (Cache e Sessões)

```env
# Configurações do Redis
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_URL=redis://localhost:6379
REDIS_PASSWORD=

# Para Redis na nuvem (ex: Redis Cloud)
# REDIS_URL=redis://usuario:senha@redis-cloud.com:12345
```

**Quando usar Redis:**
- ⚡ Cache de consultas frequentes
- 🔐 Gerenciamento de sessões
- 📊 Rate limiting avançado
- 🔔 Filas de processamento

---

### 🔹 CORS (Cross-Origin)

```env
# URLs permitidas (separadas por vírgula)
CORS_ORIGIN=http://localhost:3000,http://localhost:3001

# Permitir credenciais (cookies, headers de auth)
CORS_CREDENTIALS=true
```

---

### 🔹 Stripe (Pagamentos)

```env
# Chaves da API Stripe
# Obtenha em: https://dashboard.stripe.com/apikeys
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...

# Segredo do webhook (para verificar eventos)
STRIPE_WEBHOOK_SECRET=whsec_...

# Versão da API
STRIPE_API_VERSION=2023-10-16
```

**Como configurar:**
1. Crie conta em https://stripe.com
2. Acesse Dashboard → API Keys
3. Use chaves de teste para desenvolvimento
4. Configure webhook para `/api/payments/webhook`

---

### 🔹 AWS S3 (Armazenamento de Arquivos)

```env
# Bucket S3 para PDFs, imagens, documentos
S3_BUCKET=nexus-lab-files
S3_REGION=us-east-1
S3_ACCESS_KEY_ID=AKIA...
S3_SECRET_ACCESS_KEY=...

# Endpoint customizado (para MinIO, DigitalOcean Spaces, etc.)
S3_ENDPOINT=
```

**Uso no sistema:**
- 📄 Laudos em PDF
- 🖼️ Imagens de exames
- 📋 Documentos de pacientes
- 🔐 Upload seguro com presigned URLs

---

### 🔹 Email (SMTP)

```env
# Servidor SMTP
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false

# Credenciais
SMTP_USER=seu-email@gmail.com
SMTP_PASSWORD=sua-senha-de-app

# Remetente
SMTP_FROM=noreply@nexus-lab.com
SMTP_FROM_NAME=Nexus Laboratory Platform
```

**Gmail:**
1. Ative "Verificação em 2 etapas"
2. Gere "Senha de App" em https://myaccount.google.com/apppasswords
3. Use a senha gerada em `SMTP_PASSWORD`

**Uso no sistema:**
- 📧 Notificação de resultados prontos
- 🔗 Links de compartilhamento de laudos
- 🔒 Reset de senha
- 📊 Relatórios por email

---

### 🔹 Frontend (Next.js)

```env
# URL do frontend
FRONTEND_URL=http://localhost:3001

# NextAuth (quando implementar o frontend)
NEXTAUTH_URL=http://localhost:3001
NEXTAUTH_SECRET=nexus-nextauth-secret-change-in-production
```

---

### 🔹 Upload de Arquivos

```env
# Tamanho máximo de arquivo (bytes)
# 10485760 = 10MB
MAX_FILE_SIZE=10485760

# Tipos de arquivo permitidos
ALLOWED_FILE_TYPES=image/jpeg,image/png,image/jpg,application/pdf
```

---

### 🔹 Rate Limiting

```env
# Tempo de janela (segundos)
RATE_LIMIT_TTL=60

# Máximo de requisições por janela
RATE_LIMIT_MAX=100
```

---

### 🔹 Logging

```env
# Nível de log
# Valores: error | warn | info | debug
LOG_LEVEL=debug

# Formato
# Valores: json | simple
LOG_FORMAT=json
```

---

### 🔹 Segurança

```env
# Rounds do BCrypt para hash de senhas
# Valores recomendados: 10-12
BCRYPT_ROUNDS=10

# Segredo da sessão
SESSION_SECRET=nexus-session-secret-change-in-production

# Segredo CSRF
CSRF_SECRET=nexus-csrf-secret-change-in-production
```

---

### 🔹 Configurações de Negócio

```env
# Empresa padrão
DEFAULT_COMPANY_NAME=Nexus Laboratory
DEFAULT_COMPANY_TIMEZONE=America/Sao_Paulo
DEFAULT_COMPANY_LOCALE=pt-BR
DEFAULT_CURRENCY=BRL

# Relatórios
REPORT_EXPIRATION_DAYS=30
REPORT_SHARE_LINK_EXPIRATION_HOURS=168  # 7 dias

# Faturas
INVOICE_DUE_DAYS=30
INVOICE_OVERDUE_DAYS=45
```

---

### 🔹 Feature Flags

```env
# Habilitar/desabilitar funcionalidades
ENABLE_SWAGGER=true
ENABLE_GRAPHQL=false
ENABLE_WEBSOCKETS=false
ENABLE_AUDIT_LOGS=true
ENABLE_2FA=false
```

---

### 🔹 Monitoramento (Opcional)

```env
# Sentry para tracking de erros
SENTRY_DSN=

# New Relic para APM
NEW_RELIC_LICENSE_KEY=
NEW_RELIC_APP_NAME=nexus-laboratory-platform
```

---

## 🌍 Ambientes de Execução

### Development (Desenvolvimento)

```env
NODE_ENV=development
DB_HOST=                        # SQLite automático
TYPEORM_SYNCHRONIZE=true
LOG_LEVEL=debug
ENABLE_SWAGGER=true
```

### Staging (Homologação)

```env
NODE_ENV=staging
DB_HOST=staging-db.example.com
TYPEORM_SYNCHRONIZE=false       # Use migrations
LOG_LEVEL=info
ENABLE_SWAGGER=true
```

### Production (Produção)

```env
NODE_ENV=production
DB_HOST=prod-db.example.com
DB_SSL=true
TYPEORM_SYNCHRONIZE=false       # NUNCA true em produção!
LOG_LEVEL=error
ENABLE_SWAGGER=false            # Desabilitar em produção
```

---

## 🔧 Troubleshooting

### Problema: Servidor não inicia

**Solução 1: Verificar porta em uso**
```bash
# Linux/Mac
lsof -i :3000
kill -9 <PID>

# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

**Solução 2: Verificar variáveis**
```bash
# Ver variáveis carregadas
npm run start:dev | grep "Environment"
```

### Problema: Erro de conexão com banco de dados

**SQLite:**
```bash
# Verificar se o arquivo foi criado
ls -la nexus-dev.sqlite

# Deletar e recriar
rm nexus-dev.sqlite
npm run start:dev
```

**PostgreSQL:**
```bash
# Testar conexão
docker exec -it nexus-postgres psql -U nexus_user -d nexus_db

# Verificar se container está rodando
docker ps | grep postgres
```

### Problema: JWT inválido

```bash
# Gerar novos segredos
openssl rand -base64 32  # Para JWT_SECRET
openssl rand -base64 32  # Para JWT_REFRESH_SECRET

# Atualizar no .env e reiniciar
```

### Problema: CORS bloqueado

```env
# Adicionar origem do frontend
CORS_ORIGIN=http://localhost:3000,http://localhost:3001,http://seu-frontend.com
```

---

## 📚 Recursos Adicionais

- [Documentação do Projeto](./README-PT.md)
- [Guia de Início Rápido](./QUICK-START.md)
- [Multi-Empresa e Controle de Acesso](./MULTIEMPRESA-E-ACESSO.md)
- [Status do Projeto](./STATUS-DO-PROJETO.md)

---

## ⚠️ Lembretes de Segurança

1. ✅ **NUNCA** commitar o arquivo `.env` no Git
2. ✅ Use `.env.example` como template
3. ✅ Mude TODOS os segredos em produção
4. ✅ Use variáveis de ambiente do hosting em produção
5. ✅ Rotacione segredos periodicamente
6. ✅ Use HTTPS em produção
7. ✅ Habilite SSL no banco de dados de produção
8. ✅ Monitore logs de acesso e erros

---

## 🎉 Tudo Pronto!

Agora você pode iniciar o servidor:

```bash
npm run start:dev
```

Acesse:
- **API**: http://localhost:3000
- **Swagger**: http://localhost:3000/api
- **Documentação**: Arquivos `.md` na raiz do projeto

---

**Dúvidas?** Consulte a [documentação completa](./README-PT.md) ou verifique os exemplos em `examples/api-examples.http`.
