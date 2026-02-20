# PharmaConnect&Location - Documentação do Projeto

## Visão Geral

PharmaConnect&Location é uma aplicação web profissional, mobile-first, que conecta clientes e farmácias. O sistema permite que utilizadores criem contas como Cliente ou Farmácia, gerenciem seus perfis e tenham acesso a dashboards personalizados.

## Estrutura do Projeto

```
/
├── assets/
│   ├── css/
│   │   ├── main.css          # Estilos dos dashboards e autenticação
│   │   └── home.css          # Estilos da página inicial
│   ├── js/
│   │   ├── auth.js           # Sistema de autenticação
│   │   ├── router.js         # Proteção de rotas
│   │   ├── cliente.js        # Lógica do dashboard do cliente
│   │   └── farmacia.js       # Lógica do dashboard da farmácia
│   └── images/               # Imagens do projeto
├── auth/
│   ├── cadastro.html         # Página de cadastro
│   └── login.html            # Página de login
├── cliente/
│   └── dashboard.html        # Dashboard do cliente
├── farmacia/
│   └── dashboard.html        # Dashboard da farmácia
└── index.html                # Página inicial
```

## Funcionalidades Principais

### 1. Sistema de Autenticação

#### auth.js
Responsável por gerenciar utilizadores no localStorage:

- `saveUser(userData)` - Salva novo utilizador
- `getUser()` - Recupera utilizador atual
- `isAuthenticated()` - Verifica se há sessão ativa
- `getUserType()` - Retorna tipo do utilizador
- `logout()` - Remove sessão
- `checkAccess(requiredType)` - Valida acesso por tipo

**Estrutura do utilizador:**
```javascript
{
  id: "user_timestamp_random",
  nome: "Nome Completo",
  email: "email@exemplo.com",
  telefone: "+258 XX XXX XXXX",
  endereco: "Endereço completo",
  tipo: "cliente" | "farmacia",
  createdAt: "2025-01-01T00:00:00.000Z"
}
```

### 2. Proteção de Rotas

#### router.js
Controla acesso às páginas:

- `protectRoute(requiredType)` - Protege rota por tipo
- `redirectToHome()` - Redireciona para página inicial
- `redirectToDashboard(tipo)` - Redireciona para dashboard correto
- `handleLogout()` - Executa logout e redireciona

**Fluxo de proteção:**
1. Verifica se utilizador está autenticado
2. Valida se o tipo corresponde ao necessário
3. Redireciona para home se falhar qualquer validação

### 3. Cadastro

Localização: `/auth/cadastro.html`

**Campos obrigatórios:**
- Tipo de conta (Cliente ou Farmácia)
- Nome completo
- Email

**Campos opcionais:**
- Telefone
- Endereço

**Validações:**
- Tipo deve ser selecionado
- Nome mínimo de 3 caracteres
- Email válido com @

**Fluxo:**
1. Utilizador preenche formulário
2. Sistema valida dados
3. Cria conta no localStorage
4. Redireciona para dashboard correspondente

### 4. Dashboards

#### Dashboard Cliente (`/cliente/dashboard.html`)
Funcionalidades:
- Saudação personalizada por hora do dia
- Informações do perfil
- Estatísticas (pedidos, medicamentos, farmácias)
- Ações rápidas
- Menu lateral responsivo
- Botão de logout

#### Dashboard Farmácia (`/farmacia/dashboard.html`)
Funcionalidades:
- Saudação personalizada por hora do dia
- Informações da farmácia
- Estatísticas (pedidos, produtos, clientes, receita)
- Ações rápidas de gestão
- Lista de pedidos recentes
- Menu lateral responsivo
- Botão de logout

### 5. Página Inicial

Localização: `/index.html`

Seções:
- Header com navegação responsiva
- Hero com busca de medicamentos e mapa
- Como funciona (3 passos)
- Destaques (3 cartões)
- Call-to-action para farmácias
- Footer com links

**Funcionalidades especiais:**
- Geolocalização do utilizador
- Menu hamburguer mobile
- Adaptação dinâmica se utilizador já está logado

## Design Mobile-First

### Breakpoints

```css
/* Mobile (padrão) */
@media (min-width: 480px)  { /* Melhorias básicas */ }
@media (min-width: 640px)  { /* Tablet pequeno */ }
@media (min-width: 768px)  { /* Tablet */ }
@media (min-width: 1024px) { /* Desktop */ }
@media (max-width: 360px)  { /* Mobile pequeno */ }
```

### Princípios Aplicados

1. **Botões**: Altura mínima de 44px para touch
2. **Tipografia**: Mínimo de 14px, máximo de 16px no mobile
3. **Espaçamento**: 16px padrão, 12px em telas pequenas
4. **Cards**: Preferidos sobre tabelas
5. **Menu**: Hamburguer no mobile, horizontal no desktop
6. **Sidebar**: Oculta no mobile, fixa no desktop

### Componentes Responsivos

#### Menu Hamburguer
- Mobile: Menu slide-in ativado por botão
- Desktop: Navegação horizontal sempre visível

#### Sidebar (Dashboards)
- Mobile: Menu lateral oculto, abre com botão toggle
- Desktop (768px+): Sidebar fixa sempre visível

#### Grid de Estatísticas
- Mobile: 1 coluna
- 480px+: 2 colunas
- 1024px+: 4 colunas

## Paleta de Cores

```css
--primary: #43b47f        /* Verde principal */
--primary-dark: #359368   /* Verde escuro */
--primary-light: #5cc491  /* Verde claro */
--secondary: #f41e1e      /* Vermelho (farmácia) */
--text: #0f172a           /* Texto principal */
--text-muted: #475569     /* Texto secundário */
--bg: #ffffff             /* Fundo branco */
--bg-light: #f8fafb       /* Fundo claro */
--border: #e2e8f0         /* Borda */
```

## Fluxo de Utilizador

### Novo Utilizador
1. Acessa `index.html`
2. Clica em "Criar Conta"
3. Preenche formulário em `/auth/cadastro.html`
4. Seleciona tipo (Cliente ou Farmácia)
5. Sistema salva no localStorage
6. Redireciona para dashboard apropriado

### Utilizador Existente
1. Acessa qualquer página
2. Sistema detecta sessão no localStorage
3. Adapta navegação (mostra "Dashboard" ao invés de "Entrar")
4. Pode acessar dashboard diretamente
5. Pode fazer logout a qualquer momento

### Proteção de Acesso
1. Cliente tenta acessar `/farmacia/dashboard.html`
2. Sistema detecta tipo incorreto
3. Redireciona para `/index.html`
4. Mesmo processo para farmácia acessando área de cliente

## Segurança e Validações

### Validações de Formulário
- Prevenção de campos vazios
- Validação de formato de email
- Tamanho mínimo para nome
- Seleção obrigatória de tipo

### Proteção de Rotas
- Verificação em cada página protegida
- Redirecionamento automático se não autenticado
- Validação de tipo de utilizador

### Limitações Atuais (localStorage)
⚠️ **Importante**: Este é um sistema de demonstração usando localStorage.

**Limitações:**
- Dados não são criptografados
- Dados ficam apenas no navegador
- Um utilizador por navegador
- Sem recuperação de senha
- Sem validação de email único

**Para produção**, implementar:
- Backend com base de dados real
- Autenticação JWT
- Encriptação de passwords
- Validação de email
- Recuperação de conta
- Múltiplas sessões

## Como Testar

### Teste 1: Cadastro Cliente
1. Abra `/auth/cadastro.html`
2. Selecione "Cliente"
3. Preencha: Nome, Email
4. Clique "Criar Conta"
5. Deve redirecionar para `/cliente/dashboard.html`
6. Verifique saudação personalizada
7. Verifique informações do perfil

### Teste 2: Cadastro Farmácia
1. Limpe localStorage (F12 → Application → Clear)
2. Abra `/auth/cadastro.html`
3. Selecione "Farmácia"
4. Preencha formulário
5. Deve redirecionar para `/farmacia/dashboard.html`
6. Verifique badge "Farmácia" na sidebar

### Teste 3: Proteção de Rotas
1. Com sessão de Cliente ativa
2. Tente acessar `/farmacia/dashboard.html` diretamente
3. Deve redirecionar para `/index.html`
4. Repita o contrário

### Teste 4: Logout
1. No dashboard, clique botão "Sair"
2. Confirme ação
3. Deve redirecionar para `/index.html`
4. Tente acessar dashboard novamente
5. Deve ser bloqueado

### Teste 5: Responsividade
1. Abra DevTools (F12)
2. Ative modo responsivo
3. Teste em 360px (mobile pequeno)
4. Teste em 768px (tablet)
5. Teste em 1024px+ (desktop)
6. Verifique menu hamburguer
7. Verifique sidebar
8. Verifique grid de estatísticas

## Manutenção e Extensão

### Adicionar Nova Página Protegida
1. Crie HTML na pasta apropriada
2. Inclua scripts: `auth.js` e `router.js`
3. Adicione no início do body:
```javascript
<script>
  if (!Router.protectRoute('cliente')) { // ou 'farmacia'
    // Código não será executado se acesso negado
  }
</script>
```

### Adicionar Novo Campo ao Utilizador
1. Edite `auth.js` → `saveUser()`
2. Adicione campo ao objeto user
3. Atualize formulário de cadastro
4. Atualize exibição nos dashboards

### Estilizar Novo Componente
1. Use variáveis CSS existentes
2. Mantenha padrão mobile-first
3. Adicione breakpoints conforme necessário
4. Teste em 360px

## Preparação para Backend

O código está estruturado para migração fácil:

### Substituir localStorage por API
```javascript
// Atual (localStorage)
Auth.saveUser(userData);

// Futuro (API)
await fetch('/api/auth/register', {
  method: 'POST',
  body: JSON.stringify(userData)
});
```

### Manter Estrutura de Rotas
- URLs já seguem padrão RESTful
- Separação cliente/farmácia facilita permissões
- Router pode ser adaptado para validar JWT

### Base de Dados Sugerida
O projeto já tem migrations preparadas em `/backend/migrations/`:
- Tabela users com role
- Proteção RLS
- Estrutura completa

## Notas Finais

✅ **Código limpo e comentado**
✅ **Estrutura escalável**
✅ **Mobile-first completo**
✅ **Proteção de rotas funcionando**
✅ **Saudação dinâmica**
✅ **Logout funcional**
✅ **Formulários validados**
✅ **Design profissional**
✅ **Testado em 360px**

🚀 **Pronto para demonstração e próximas fases!**
