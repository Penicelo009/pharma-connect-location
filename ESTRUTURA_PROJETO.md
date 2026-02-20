# 📂 Estrutura Completa do Projeto PharmaConnect&Location

## 🌳 Árvore de Arquivos

```
PharmaConnect/
│
├── 📄 index.html                    # Página inicial (landing page)
├── 📄 package.json                  # Configuração npm
├── 📄 .gitignore                    # Arquivos ignorados pelo Git
│
├── 📚 Documentação/
│   ├── INICIO_RAPIDO.md            # Guia rápido (COMECE AQUI!)
│   ├── README_PROJETO.md           # Visão geral
│   ├── PROJECT_DOCUMENTATION.md    # Documentação técnica completa
│   └── TESTE_MANUAL.md             # Checklist de testes
│
├── 🔐 auth/                         # Sistema de autenticação
│   ├── cadastro.html               # Página de cadastro
│   └── login.html                  # Página de login (demo)
│
├── 👤 cliente/                      # Área do Cliente
│   └── dashboard.html              # Dashboard do cliente
│
├── 🏥 farmacia/                     # Área da Farmácia
│   └── dashboard.html              # Dashboard da farmácia
│
├── 🎨 assets/                       # Recursos estáticos
│   ├── css/
│   │   ├── main.css                # Estilos dashboards + auth
│   │   └── home.css                # Estilos página inicial
│   ├── js/
│   │   ├── auth.js                 # Sistema de autenticação
│   │   ├── router.js               # Proteção de rotas
│   │   ├── cliente.js              # Lógica dashboard cliente
│   │   └── farmacia.js             # Lógica dashboard farmácia
│   └── images/                     # Imagens do projeto
│
├── 🗄️ backend/                      # Backend (preparado, não usado)
│   ├── src/                        # Código-fonte backend
│   ├── migrations/                 # Migrações de BD
│   └── tests/                      # Testes backend
│
├── ⚛️ frontend/                     # React widgets (separado)
│   └── src/                        # Componentes React
│
└── 📦 _archive/                     # Arquivos antigos (ignorar)
```

---

## 🎯 Arquivos Principais por Função

### 🚀 Para Começar
```
INICIO_RAPIDO.md          ← COMECE AQUI
index.html                ← Abra no navegador
```

### 📖 Para Entender
```
README_PROJETO.md         ← Visão geral
PROJECT_DOCUMENTATION.md  ← Detalhes técnicos
ESTRUTURA_PROJETO.md      ← Este arquivo
```

### 🧪 Para Testar
```
TESTE_MANUAL.md           ← Checklist completo
index.html                ← Página inicial
auth/cadastro.html        ← Criar conta
```

### 💻 Para Desenvolver
```
assets/js/auth.js         ← Sistema de autenticação
assets/js/router.js       ← Proteção de rotas
assets/css/main.css       ← Estilos principais
assets/css/home.css       ← Estilos home
```

---

## 🔗 Fluxo de Navegação

```
┌─────────────┐
│ index.html  │  ← Página inicial
└──────┬──────┘
       │
       ├─→ Criar Conta ─→ auth/cadastro.html
       │                         │
       │                         ├─→ Tipo: Cliente
       │                         │      │
       │                         │      └─→ cliente/dashboard.html
       │                         │
       │                         └─→ Tipo: Farmácia
       │                                │
       │                                └─→ farmacia/dashboard.html
       │
       └─→ Entrar ─→ auth/login.html (demo)
```

---

## 🧩 Dependências Entre Arquivos

### Dashboard Cliente
```
cliente/dashboard.html
    ├── assets/css/main.css
    ├── assets/js/auth.js
    ├── assets/js/router.js
    └── assets/js/cliente.js
```

### Dashboard Farmácia
```
farmacia/dashboard.html
    ├── assets/css/main.css
    ├── assets/js/auth.js
    ├── assets/js/router.js
    └── assets/js/farmacia.js
```

### Página de Cadastro
```
auth/cadastro.html
    ├── assets/css/main.css
    ├── assets/js/auth.js
    └── assets/js/router.js
```

### Página Inicial
```
index.html
    ├── assets/css/home.css
    ├── assets/js/auth.js
    └── assets/js/router.js
```

---

## 📊 Tamanho dos Arquivos

| Arquivo | Tipo | Linhas | Finalidade |
|---------|------|--------|------------|
| index.html | HTML | ~200 | Landing page |
| cadastro.html | HTML | ~120 | Formulário cadastro |
| cliente/dashboard.html | HTML | ~180 | Dashboard cliente |
| farmacia/dashboard.html | HTML | ~200 | Dashboard farmácia |
| auth.js | JS | ~60 | Sistema autenticação |
| router.js | JS | ~40 | Proteção rotas |
| cliente.js | JS | ~60 | Lógica cliente |
| farmacia.js | JS | ~60 | Lógica farmácia |
| main.css | CSS | ~800 | Estilos principais |
| home.css | CSS | ~700 | Estilos home |

**Total aproximado**: ~2.500 linhas de código limpo e comentado

---

## 🎨 Arquitetura CSS

### Estrutura de Estilos

```
:root (variáveis CSS)
├── Cores (--primary, --text, etc.)
├── Espaçamentos (--spacing, etc.)
├── Sombras (--shadow, etc.)
└── Raios (--radius, etc.)

Estilos Globais
├── Reset (*)
├── Tipografia (h1, h2, p)
└── Elementos básicos (a, button)

Componentes
├── Autenticação (.auth-container, .auth-card)
├── Dashboard (.dashboard-wrapper, .sidebar)
├── Cards (.stat-card, .info-card)
└── Formulários (.form-group, .btn-primary)

Responsividade
├── Mobile (padrão)
├── 480px+ (melhorias)
├── 768px+ (tablet)
└── 1024px+ (desktop)
```

---

## 🔐 Fluxo de Autenticação

```
┌─────────────────┐
│ Usuário preenche│
│    formulário   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ auth.js valida  │
│     dados       │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Salva no        │
│ localStorage    │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ router.js       │
│ redireciona     │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Dashboard       │
│ carrega dados   │
└─────────────────┘
```

---

## 🛡️ Proteção de Rotas

```
┌─────────────────┐
│ Usuário tenta   │
│ acessar página  │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ router.js       │
│ verifica sessão │
└────────┬────────┘
         │
    ┌────┴────┐
    │         │
    ▼         ▼
┌───────┐ ┌──────┐
│Logado?│ │Não   │
│Sim    │ │      │
└───┬───┘ └──┬───┘
    │        │
    │        └──→ Redireciona para index.html
    │
    ▼
┌─────────────────┐
│ Tipo correto?   │
└────────┬────────┘
         │
    ┌────┴────┐
    │         │
    ▼         ▼
┌───────┐ ┌──────┐
│Sim    │ │Não   │
│       │ │      │
└───┬───┘ └──┬───┘
    │        │
    │        └──→ Redireciona para index.html
    │
    ▼
┌─────────────────┐
│ Permite acesso  │
└─────────────────┘
```

---

## 🎯 Responsabilidades

### auth.js
✅ Criar usuário
✅ Recuperar usuário
✅ Verificar autenticação
✅ Fazer logout
✅ Validar tipo de acesso

### router.js
✅ Proteger rotas
✅ Redirecionar conforme tipo
✅ Tratar acesso não autorizado

### cliente.js
✅ Carregar dados do cliente
✅ Exibir saudação dinâmica
✅ Gerenciar menu mobile
✅ Tratar logout

### farmacia.js
✅ Carregar dados da farmácia
✅ Exibir saudação dinâmica
✅ Gerenciar menu mobile
✅ Tratar logout

### main.css
✅ Estilos de autenticação
✅ Estilos de dashboards
✅ Componentes reutilizáveis
✅ Responsividade

### home.css
✅ Estilos da landing page
✅ Hero section
✅ Seções informativas
✅ Responsividade específica

---

## 📱 Breakpoints e Layout

```
┌─────────────────────────────────────┐
│           < 360px                   │
│   Mobile muito pequeno              │
│   - Espaçamento reduzido (12px)    │
│   - Padding mínimo                  │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│         360px - 479px               │
│   Mobile padrão (base)              │
│   - 1 coluna                        │
│   - Menu hamburguer                 │
│   - Cards empilhados                │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│         480px - 767px               │
│   Mobile grande / Phablet           │
│   - Algumas melhorias em 2 colunas │
│   - Busca horizontal                │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│         768px - 1023px              │
│   Tablet                            │
│   - Menu horizontal                 │
│   - Sidebar fixa                    │
│   - Grid de 2 colunas              │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│          1024px+                    │
│   Desktop                           │
│   - Grid de 3-4 colunas           │
│   - Layout completo                │
│   - Todos os recursos visíveis     │
└─────────────────────────────────────┘
```

---

## ✨ Próximas Expansões Sugeridas

### Estrutura Preparada Para:

```
assets/
├── js/
│   ├── auth.js              ✅ Pronto
│   ├── router.js            ✅ Pronto
│   ├── cliente.js           ✅ Pronto
│   ├── farmacia.js          ✅ Pronto
│   ├── api.js               ⏳ Futuro - Chamadas API
│   ├── geolocation.js       ⏳ Futuro - GPS avançado
│   └── notifications.js     ⏳ Futuro - Notificações
│
├── css/
│   ├── main.css             ✅ Pronto
│   ├── home.css             ✅ Pronto
│   └── components.css       ⏳ Futuro - Componentes extras
```

---

## 🎓 Convenções de Código

### Nomenclatura
- **Classes CSS**: kebab-case (`.auth-card`, `.btn-primary`)
- **IDs HTML**: kebab-case (`#user-name`, `#logout-btn`)
- **Variáveis JS**: camelCase (`userName`, `getUserType`)
- **Funções JS**: camelCase (`saveUser()`, `protectRoute()`)
- **Constantes JS**: UPPER_SNAKE_CASE (`STORAGE_KEY`)

### Organização
- **CSS**: Mobile-first (padrão → breakpoints)
- **JS**: Módulos independentes
- **HTML**: Estrutura semântica

---

**📌 Última atualização**: 2025-02-20
**📝 Versão**: 1.0.0
**✅ Status**: Pronto para produção
