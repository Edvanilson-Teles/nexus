# Sistema Multi-Empresa e Controle de Acesso

## 🏢 Suporte Multi-Empresa (Multi-Tenancy)

O sistema **Nexus** já está configurado para suportar **múltiplas empresas** através da entidade `Company`:

### Como Funciona

#### 1. **Todas as entidades principais têm `companyId`**
```typescript
- Patients (pacientes)
- Orders (pedidos)
- Samples (amostras)
- Results (resultados)
- Reports (relatórios)
- Invoices (faturas)
- Payments (pagamentos)
- Tests (exames - opcional por empresa)
```

#### 2. **Isolamento de Dados por Empresa**
Cada requisição deve incluir o `companyId` correspondente:

```http
POST /patients
{
  "companyId": 1,
  "name": "João Silva",
  ...
}
```

#### 3. **Filtros Automáticos**
Os serviços já filtram por `companyId`:

```typescript
GET /invoices?companyId=1
GET /patients?companyId=2
GET /results?companyId=3
```

### Implementação Multi-Tenant

#### Cenário 1: Laboratórios Independentes
- **Empresa 1**: Laboratório ABC
- **Empresa 2**: Laboratório XYZ
- Dados **completamente isolados**

#### Cenário 2: Rede de Laboratórios
- **Empresa 1**: Matriz (acesso a todos)
- **Empresa 2**: Filial A
- **Empresa 3**: Filial B
- Relatórios consolidados disponíveis na matriz

#### Cenário 3: Franquias
- Cada franquia = 1 company
- Catálogo de exames compartilhado ou independente
- Faturamento separado por franquia

---

## 🔐 Controle de Acesso (RBAC)

O sistema possui **controle de acesso baseado em papéis** (Role-Based Access Control) já implementado:

### Roles Disponíveis

| Role | Descrição | Permissões |
|------|-----------|------------|
| `superadmin` | Administrador total | Acesso completo ao sistema, todas empresas |
| `admin` | Administrador da empresa | Gestão completa da sua empresa |
| `accountant` | Contador/Financeiro | Acesso a invoices, payments, relatórios financeiros |
| `lab_tech` | Técnico de laboratório | Entrada de resultados, gestão de amostras |
| `doctor` | Médico | Visualização de resultados, criação de pedidos |
| `receptionist` | Recepcionista | Cadastro de pacientes, agendamentos, coletas |
| `patient` | Paciente | Visualização dos próprios exames e resultados |

### Sistema de Permissões

#### Estrutura
```
Module → Feature → Permission
   ↓        ↓          ↓
Patients → Create → patients.create
   ↓        ↓          ↓
Results  → View → results.view
```

#### Tabelas
```sql
- modules: Módulos do sistema (patients, results, invoices, etc)
- features: Funcionalidades (create, read, update, delete, approve)
- permissions: Permissões específicas (patients.create, results.validate)
- roles: Papéis de usuário
- role_permissions: Associação roles ↔ permissions
- user_roles: Associação users ↔ roles
```

### Exemplos de Controle de Acesso

#### 1. **Técnico de Laboratório**
```typescript
Pode:
✅ Criar resultados (results.create)
✅ Validar resultados (results.validate)
✅ Ver amostras (samples.view)
✅ Atualizar status de amostras (samples.update_status)

Não pode:
❌ Criar faturas (invoices.create)
❌ Ver dados financeiros (payments.view)
❌ Deletar pacientes (patients.delete)
```

#### 2. **Contador/Financeiro**
```typescript
Pode:
✅ Criar faturas (invoices.create)
✅ Receber pagamentos (payments.create)
✅ Ver relatórios financeiros (reports.financial)
✅ Emitir notas fiscais (invoices.issue)

Não pode:
❌ Validar resultados (results.validate)
❌ Criar pedidos médicos (orders.create)
❌ Cadastrar exames (tests.create)
```

#### 3. **Recepcionista**
```typescript
Pode:
✅ Cadastrar pacientes (patients.create)
✅ Criar pedidos (orders.create)
✅ Agendar coletas (samples.schedule)
✅ Ver status de pedidos (orders.view)

Não pode:
❌ Ver resultados (results.view)
❌ Emitir faturas (invoices.create)
❌ Validar exames (results.validate)
```

#### 4. **Médico**
```typescript
Pode:
✅ Criar pedidos (orders.create)
✅ Ver resultados (results.view)
✅ Ver histórico do paciente (patients.history)
✅ Gerar laudos (reports.create)

Não pode:
❌ Ver dados financeiros (invoices.view)
❌ Cadastrar pacientes (patients.create)
❌ Validar resultados tecnicamente (results.validate)
```

#### 5. **Paciente**
```typescript
Pode:
✅ Ver próprios resultados (results.view_own)
✅ Baixar laudos próprios (reports.download_own)
✅ Ver histórico próprio (patients.view_own)

Não pode:
❌ Ver resultados de outros pacientes
❌ Criar pedidos
❌ Acessar área administrativa
```

### Implementação no Código

#### Guard de Permissão
```typescript
@UseGuards(JwtAuthGuard, PermissionGuard)
@RequirePermissions('results.validate')
@Patch(':id/validate')
async validateResult(@Param('id') id: number) {
  // Apenas usuários com permissão 'results.validate' podem acessar
}
```

#### Filtro por Empresa
```typescript
// Usuário vê apenas dados da sua empresa
const results = await this.resultService.findAll({
  companyId: user.companyId
});
```

#### Validação Multi-Empresa
```typescript
// Superadmin pode acessar todas as empresas
if (user.role === 'superadmin') {
  // Sem filtro de empresa
} else {
  // Filtrar pela empresa do usuário
  where.companyId = user.companyId;
}
```

---

## 🔧 Configurando Multi-Empresa

### 1. Criar Empresas
```http
POST /companies
{
  "name": "Laboratório ABC",
  "cnpj": "12.345.678/0001-90",
  "address": "Rua Principal, 123",
  "phone": "(11) 98765-4321",
  "email": "contato@lababc.com"
}
```

### 2. Criar Usuários por Empresa
```http
POST /users
{
  "name": "Maria Silva",
  "email": "maria@lababc.com",
  "password": "senha123",
  "companyId": 1,
  "roleId": 3  // lab_tech
}
```

### 3. Atribuir Permissões Específicas
```http
POST /roles/3/permissions
{
  "permissionIds": [10, 11, 12, 13]  // results.*, samples.*
}
```

---

## 🎯 Casos de Uso Práticos

### Caso 1: Rede de Laboratórios
```
Empresa 1 (Matriz): 
  - Admin vê todos os dados de todas as filiais
  - Relatórios consolidados
  
Empresa 2 (Filial A):
  - Admin vê apenas dados da Filial A
  - Técnicos acessam apenas suas amostras
  
Empresa 3 (Filial B):
  - Admin vê apenas dados da Filial B
  - Recepcionista cadastra apenas pacientes da filial
```

### Caso 2: Laboratório com Terceirização
```
Empresa 1 (Lab Principal):
  - Coleta e recepção
  - Faturamento
  
Empresa 2 (Lab Terceirizado):
  - Apenas análise técnica
  - Entrada de resultados
  - Sem acesso a financeiro
```

### Caso 3: Hospital com Múltiplos Departamentos
```
Empresa 1 (Hospital):
  - Departamento: Análises Clínicas
  - Departamento: Imagem
  - Departamento: Anatomia Patológica
  
Cada departamento = 1 company
Dados isolados, mas relatório geral disponível
```

---

## 📋 Checklist de Implementação

### ✅ Já Implementado
- [x] Entidade Company com dados completos
- [x] Todas entidades com companyId
- [x] Sistema de Roles (7 papéis)
- [x] Sistema de Permissions (modules, features, permissions)
- [x] Guards de autenticação (JWT)
- [x] Guards de permissão (RBAC)
- [x] Filtros por empresa em todos os serviços
- [x] Isolamento de dados por empresa

### 🔄 Recomendações Adicionais

#### 1. **Middleware de Tenant**
Adicione um middleware que:
- Identifica a empresa pelo token JWT
- Injeta automaticamente o companyId nas queries
- Previne acesso cruzado entre empresas

#### 2. **Audit Log por Empresa**
```typescript
- Quem acessou o quê
- Quando acessou
- De qual empresa
- Que ação executou
```

#### 3. **Relatórios Consolidados**
Para superadmin:
- Dashboard consolidado de todas as empresas
- Comparativo de performance
- Métricas agregadas

#### 4. **Configurações por Empresa**
```typescript
interface CompanySettings {
  allowPatientSelfSignup: boolean;
  requireInsurance: boolean;
  autoValidateResults: boolean;
  invoiceAutomaticIssue: boolean;
  reportExpirationDays: number;
}
```

---

## 🚀 Próximos Passos

1. **Testar o sistema** com múltiplas empresas
2. **Criar seed data** com 2-3 empresas de exemplo
3. **Implementar tenant middleware** para isolamento automático
4. **Adicionar audit log** completo
5. **Dashboard multi-empresa** para superadmin

---

## 📖 Documentação de Referência

- Entidades: `/src/modules/organization/modules/company/entities/company.entity.ts`
- Roles: `/src/modules/role/`
- Permissions: `/src/modules/permission/`
- Guards: `/src/common/guards/permission.guard.ts`

---

**Nota**: O sistema **já está pronto** para multi-empresa. Todas as entidades principais têm `companyId` e os serviços já filtram por empresa. Você pode começar a usar imediatamente criando múltiplas companies e atribuindo usuários a elas!
