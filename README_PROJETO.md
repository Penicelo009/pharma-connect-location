# 🏥 PharmaConnect&Location

Sistema web profissional para conectar clientes e farmácias, com localização de medicamentos e gestão de pedidos.

## 🚀 Início Rápido

### Para visualizar o projeto:

1. **Opção 1: Abrir diretamente**
   - Abra `index.html` no navegador

2. **Opção 2: Servidor local**
   ```bash
   npm start
   # Acesse: http://localhost:3000
   ```

## 📱 Mobile-First

Este projeto foi desenvolvido com abordagem **mobile-first**:
- ✅ Testado em telas de 360px
- ✅ Menu hamburguer responsivo
- ✅ Botões com 44px+ de altura
- ✅ Tipografia legível (14px+)
- ✅ Touch-friendly

## 📁 Estrutura

```
/
├── index.html              # Página inicial
├── auth/                   # Sistema de autenticação
│   ├── cadastro.html      # Cadastro de usuários
│   └── login.html         # Login
├── cliente/               # Área do cliente
│   └── dashboard.html
├── farmacia/              # Área da farmácia
│   └── dashboard.html
└── assets/                # CSS, JS e imagens
    ├── css/
    ├── js/
    └── images/
```

## 🔐 Sistema de Autenticação

### Tipos de Conta
- **Cliente**: Busca medicamentos e faz pedidos
- **Farmácia**: Gerencia produtos e pedidos

### Fluxo
1. Acesse `/auth/cadastro.html`
2. Selecione tipo de conta
3. Preencha dados
4. Será redirecionado para dashboard apropriado

### Proteção de Rotas
- Cliente não acessa área de farmácia
- Farmácia não acessa área de cliente
- Redirecionamento automático se não autenticado

## 🎨 Design

### Cores Principais
- Verde: `#43b47f` (Cliente)
- Vermelho: `#f41e1e` (Farmácia)

### Breakpoints
- Mobile: < 768px
- Tablet: 768px - 1023px
- Desktop: 1024px+

## 🧪 Como Testar

### Teste Básico
1. Abra `index.html`
2. Clique "Criar Conta"
3. Selecione "Cliente"
4. Preencha nome e email
5. Clique "Criar Conta"
6. Verifique dashboard do cliente

### Teste de Proteção
1. Com conta cliente ativa
2. Tente acessar `/farmacia/dashboard.html`
3. Deve redirecionar para home

### Teste Mobile
1. Abra DevTools (F12)
2. Ative modo responsivo
3. Configure para 360px
4. Navegue pelo site
5. Teste menu hamburguer

## 📖 Documentação Completa

Veja `PROJECT_DOCUMENTATION.md` para:
- Detalhes técnicos
- Fluxos completos
- Guia de extensão
- Preparação para backend

## 🛠️ Tecnologias

- HTML5
- CSS3 (Mobile-First)
- JavaScript Puro (ES6+)
- localStorage (autenticação temporária)
- Google Maps (embed)

## ⚠️ Limitações Atuais

Este é um **projeto de demonstração** usando localStorage:
- ❌ Sem criptografia
- ❌ Sem backend real
- ❌ Sem validação de email único
- ❌ Um usuário por navegador

Para produção, migrar para backend real (estrutura já preparada em `/backend`).

## 🔄 Próximos Passos

1. ✅ Autenticação funcional
2. ✅ Dashboards personalizados
3. ✅ Design mobile-first
4. ⏳ Integrar backend (migrations prontas)
5. ⏳ Busca de medicamentos
6. ⏳ Sistema de pedidos
7. ⏳ Geolocalização real

## 📞 Suporte

Para dúvidas sobre a estrutura do projeto, consulte:
- `PROJECT_DOCUMENTATION.md` - Documentação técnica completa
- `assets/js/auth.js` - Sistema de autenticação
- `assets/js/router.js` - Proteção de rotas

---

**Status**: ✅ Pronto para demonstração e desenvolvimento futuro
