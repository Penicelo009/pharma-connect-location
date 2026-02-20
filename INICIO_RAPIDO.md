# 🚀 Guia de Início Rápido - PharmaConnect&Location

## ⚡ 3 Passos para Começar

### 1️⃣ Abrir o Projeto
```bash
# Opção A: Abrir diretamente no navegador
# - Dê duplo clique em index.html

# Opção B: Usar servidor local (recomendado)
npm start
# Acesse: http://localhost:3000
```

### 2️⃣ Criar sua Primeira Conta
1. Clique em **"Criar Conta"**
2. Selecione **"Cliente"**
3. Preencha:
   - Nome: "Teste Usuario"
   - Email: "teste@email.com"
4. Clique **"Criar Conta"**
5. ✅ Pronto! Você está no dashboard

### 3️⃣ Explorar Funcionalidades
- 📱 Redimensione a janela para testar responsividade
- 🔄 Clique no menu hamburguer (mobile)
- 📊 Veja suas informações no perfil
- 🚪 Teste o botão "Sair"

---

## 📱 Testar em Mobile

### DevTools (Mais Rápido)
1. Pressione **F12**
2. Clique no ícone de **celular** (toggle device toolbar)
3. Selecione **iPhone SE** ou **360px**
4. Navegue normalmente

### Dispositivo Real
1. Conecte-se à mesma rede
2. Descubra seu IP: `ipconfig` (Windows) ou `ifconfig` (Mac/Linux)
3. No celular acesse: `http://SEU_IP:3000`

---

## 🎯 Principais Páginas

| Página | URL | Descrição |
|--------|-----|-----------|
| Inicial | `/index.html` | Landing page |
| Cadastro | `/auth/cadastro.html` | Criar conta |
| Login | `/auth/login.html` | Página de login (demo) |
| Dashboard Cliente | `/cliente/dashboard.html` | Área do cliente |
| Dashboard Farmácia | `/farmacia/dashboard.html` | Área da farmácia |

---

## 🔐 Testar os 2 Tipos de Conta

### Conta Cliente
```
Tipo: Cliente
Acesso: /cliente/dashboard.html
Badge: Verde
Funcionalidades: Buscar medicamentos, fazer pedidos
```

### Conta Farmácia
```
Tipo: Farmácia
Acesso: /farmacia/dashboard.html
Badge: Vermelho
Funcionalidades: Gerir produtos, ver pedidos
```

### Como alternar:
1. Faça logout (botão 🚪 na sidebar)
2. Crie nova conta com tipo diferente
3. Compare os dashboards

---

## ✅ Checklist Rápido

Use para validar que tudo está funcionando:

- [ ] Página inicial carrega sem erros
- [ ] Consegue criar conta de cliente
- [ ] Dashboard do cliente abre
- [ ] Vê informações do perfil
- [ ] Menu hamburguer funciona no mobile
- [ ] Consegue fazer logout
- [ ] Consegue criar conta de farmácia
- [ ] Dashboard da farmácia é diferente
- [ ] Proteção de rotas funciona (cliente não acessa farmácia)
- [ ] Layout responsivo em 360px

---

## 🐛 Problemas Comuns

### ❌ "Página não carrega"
**Solução**: Use servidor local (npm start) ao invés de abrir diretamente

### ❌ "Menu não abre no mobile"
**Solução**: Verifique se está em tela < 768px ou modo mobile do DevTools

### ❌ "Fui redirecionado para home"
**Solução**: Normal! É a proteção de rotas funcionando. Crie uma conta primeiro.

### ❌ "Dados não aparecem no perfil"
**Solução**: Limpe localStorage (F12 → Application → Clear) e crie conta novamente

---

## 📖 Documentação Completa

Para informações detalhadas:
- **PROJECT_DOCUMENTATION.md** - Documentação técnica completa
- **TESTE_MANUAL.md** - Guia completo de testes
- **README_PROJETO.md** - Visão geral do projeto

---

## 💡 Dicas Pro

1. **Limpar dados**: F12 → Application → Local Storage → Clear All
2. **Ver console**: F12 → Console (para debug)
3. **Testar múltiplos tipos**: Use navegação anônima para segunda conta
4. **Mobile real**: Use `npm start` e acesse do celular na mesma rede
5. **Editar código**: Qualquer editor (VS Code recomendado)

---

## 🎨 Customização Rápida

### Mudar cor principal:
Edite `assets/css/main.css` ou `assets/css/home.css`:
```css
:root {
  --primary: #43b47f;  /* <- Mude esta cor */
}
```

### Mudar textos:
Edite os arquivos HTML diretamente. Tudo está comentado.

### Adicionar nova página:
1. Crie HTML na pasta apropriada
2. Inclua `auth.js` e `router.js`
3. Adicione proteção se necessário

---

## 📞 Próximos Passos

Após testar o projeto:

1. ✅ Valide todas as funcionalidades
2. 📝 Leia `PROJECT_DOCUMENTATION.md`
3. 🧪 Execute `TESTE_MANUAL.md`
4. 🚀 Planeje integração com backend
5. 📱 Teste em dispositivos reais
6. 🎨 Customize conforme necessário

---

**⏱️ Tempo estimado para setup**: 2 minutos
**⏱️ Tempo para testar completamente**: 15 minutos
**⏱️ Tempo para entender estrutura**: 30 minutos

✨ **Pronto para começar? Abra `index.html` agora!**
