# ✅ Checklist de Testes Manuais

Use este guia para validar todas as funcionalidades do projeto.

## 🧹 Preparação

Antes de começar os testes:
1. Abra DevTools (F12)
2. Vá em Application → Storage → Local Storage
3. Limpe todos os dados
4. Atualize a página

---

## 📋 TESTE 1: Cadastro de Cliente

**Objetivo**: Criar conta de cliente e acessar dashboard

### Passos:
1. ✅ Abra `/auth/cadastro.html`
2. ✅ Verifique se formulário está visível e responsivo
3. ✅ Selecione "Cliente" no dropdown de tipo
4. ✅ Preencha:
   - Nome: "João Silva"
   - Email: "joao@exemplo.com"
   - Telefone: "+258 84 123 4567"
   - Endereço: "Av. Julius Nyerere, 123, Maputo"
5. ✅ Clique "Criar Conta"
6. ✅ Deve redirecionar para `/cliente/dashboard.html`
7. ✅ Verifique saudação personalizada (deve mostrar hora do dia)
8. ✅ Verifique se nome está correto
9. ✅ Verifique se email, telefone e endereço estão visíveis
10. ✅ Verifique badge "Cliente" na sidebar

### Resultado Esperado:
- ✅ Redirecionamento automático
- ✅ Dashboard carrega completamente
- ✅ Dados do usuário preenchidos
- ✅ Saudação dinâmica (Bom dia/tarde/noite)
- ✅ Indicador "Sessão ativa" verde

---

## 📋 TESTE 2: Menu Lateral Mobile (Cliente)

**Objetivo**: Testar responsividade do menu

### Passos:
1. ✅ No dashboard do cliente
2. ✅ Redimensione janela para < 768px OU use DevTools modo mobile
3. ✅ Menu lateral deve estar oculto
4. ✅ Botão hamburguer deve estar visível (canto superior esquerdo)
5. ✅ Clique no botão hamburguer
6. ✅ Menu lateral deve aparecer deslizando da esquerda
7. ✅ Clique fora do menu
8. ✅ Menu deve fechar
9. ✅ Redimensione para > 768px
10. ✅ Menu deve ficar fixo e visível

### Resultado Esperado:
- ✅ Transição suave do menu
- ✅ Botão hamburguer apenas no mobile
- ✅ Menu fecha ao clicar fora
- ✅ Desktop mostra menu fixo

---

## 📋 TESTE 3: Proteção de Rotas (Cliente → Farmácia)

**Objetivo**: Verificar que cliente não acessa área de farmácia

### Passos:
1. ✅ Com sessão de cliente ativa
2. ✅ Digite na barra de endereços: `/farmacia/dashboard.html`
3. ✅ Pressione Enter
4. ✅ Deve redirecionar para `/index.html`
5. ✅ Tente acessar outros caminhos incorretos
6. ✅ Sempre deve redirecionar para home

### Resultado Esperado:
- ✅ Redirecionamento imediato
- ✅ Sem erros no console
- ✅ Mensagem não aparece (proteção silenciosa)

---

## 📋 TESTE 4: Logout

**Objetivo**: Encerrar sessão e limpar dados

### Passos:
1. ✅ No dashboard do cliente
2. ✅ Role até o final da sidebar
3. ✅ Clique no botão "Sair" (ícone 🚪)
4. ✅ Deve aparecer confirmação
5. ✅ Clique "OK"
6. ✅ Deve redirecionar para `/index.html`
7. ✅ Abra DevTools → Application → Local Storage
8. ✅ Verifique que `pharmaconnect_user` foi removido
9. ✅ Tente acessar `/cliente/dashboard.html` novamente
10. ✅ Deve ser bloqueado e redirecionar

### Resultado Esperado:
- ✅ Confirmação antes de sair
- ✅ localStorage limpo
- ✅ Acesso bloqueado após logout
- ✅ Navegação volta ao normal

---

## 📋 TESTE 5: Cadastro de Farmácia

**Objetivo**: Criar conta de farmácia e acessar dashboard diferente

### Passos:
1. ✅ Limpe localStorage (se necessário)
2. ✅ Abra `/auth/cadastro.html`
3. ✅ Selecione "Farmácia"
4. ✅ Preencha:
   - Nome: "Farmácia Central"
   - Email: "central@farma.com"
   - Telefone: "+258 21 123 456"
   - Endereço: "Rua da Resistência, 456, Maputo"
5. ✅ Clique "Criar Conta"
6. ✅ Deve redirecionar para `/farmacia/dashboard.html`
7. ✅ Verifique badge "Farmácia" (vermelho) na sidebar
8. ✅ Verifique estatísticas diferentes (4 cards: Pedidos, Produtos, Clientes, Receita)
9. ✅ Verifique seção "Pedidos Recentes"
10. ✅ Verifique ações rápidas da farmácia

### Resultado Esperado:
- ✅ Dashboard diferente do cliente
- ✅ Badge vermelho "Farmácia"
- ✅ 4 cards de estatísticas
- ✅ Ações específicas de farmácia

---

## 📋 TESTE 6: Proteção de Rotas (Farmácia → Cliente)

**Objetivo**: Verificar que farmácia não acessa área de cliente

### Passos:
1. ✅ Com sessão de farmácia ativa
2. ✅ Tente acessar `/cliente/dashboard.html`
3. ✅ Deve redirecionar para `/index.html`

### Resultado Esperado:
- ✅ Acesso negado
- ✅ Redirecionamento automático

---

## 📋 TESTE 7: Página Inicial (Responsividade)

**Objetivo**: Validar página inicial em diferentes tamanhos

### Passos Mobile (360px):
1. ✅ Configure DevTools para 360px de largura
2. ✅ Abra `index.html`
3. ✅ Verifique menu hamburguer visível
4. ✅ Clique no hamburguer
5. ✅ Menu deve abrir verticalmente
6. ✅ Verifique campos de busca (devem estar em coluna)
7. ✅ Verifique seção "Como funciona" (cards em coluna)
8. ✅ Verifique seção "Destaques" (cards em coluna)
9. ✅ Role todo o conteúdo (não deve haver overflow horizontal)
10. ✅ Verifique footer (deve estar legível)

### Passos Tablet (768px):
1. ✅ Configure para 768px
2. ✅ Menu deve estar horizontal no header
3. ✅ "Como funciona" deve ter 2 colunas
4. ✅ Hero deve ter 2 colunas (texto + mapa)

### Passos Desktop (1024px+):
1. ✅ Configure para 1280px
2. ✅ "Como funciona" deve ter 3 colunas
3. ✅ "Destaques" deve ter 3 colunas
4. ✅ Layout deve estar bem distribuído

### Resultado Esperado:
- ✅ Sem quebras de layout
- ✅ Sem scroll horizontal
- ✅ Texto legível em todas as telas
- ✅ Botões com tamanho adequado (44px+)

---

## 📋 TESTE 8: Geolocalização

**Objetivo**: Testar botão de localização

### Passos:
1. ✅ Na página inicial (`index.html`)
2. ✅ Localize botão "📍 Usar localização"
3. ✅ Clique no botão
4. ✅ Navegador deve pedir permissão
5. ✅ Conceda permissão
6. ✅ Deve aparecer coordenadas abaixo dos botões
7. ✅ Teste negando permissão
8. ✅ Deve mostrar mensagem de erro amigável

### Resultado Esperado:
- ✅ Pedido de permissão do navegador
- ✅ Coordenadas exibidas se permitido
- ✅ Mensagem de erro se negado
- ✅ Sem travamentos

---

## 📋 TESTE 9: Navegação com Sessão Ativa

**Objetivo**: Verificar adaptação da navegação

### Passos:
1. ✅ Crie uma sessão (cliente ou farmácia)
2. ✅ Volte para `index.html`
3. ✅ No menu, "Entrar" deve mudar para "Dashboard"
4. ✅ Clique em "Dashboard"
5. ✅ Deve levar ao dashboard correto
6. ✅ Botão "Criar Conta" deve estar oculto

### Resultado Esperado:
- ✅ Navegação adaptada automaticamente
- ✅ Link aponta para dashboard correto
- ✅ Sem opção de criar nova conta

---

## 📋 TESTE 10: Validações de Formulário

**Objetivo**: Testar validações do cadastro

### Passos:
1. ✅ Abra `/auth/cadastro.html`
2. ✅ Tente submeter sem preencher nada
3. ✅ Deve impedir e mostrar erro
4. ✅ Selecione tipo mas deixe nome vazio
5. ✅ Deve mostrar erro: "Nome deve ter pelo menos 3 caracteres"
6. ✅ Preencha nome com "Jo" (2 caracteres)
7. ✅ Deve mostrar mesmo erro
8. ✅ Preencha email sem "@"
9. ✅ Deve mostrar "Email inválido"
10. ✅ Preencha tudo corretamente
11. ✅ Deve permitir submissão

### Resultado Esperado:
- ✅ Validações impedem envio
- ✅ Mensagens de erro claras
- ✅ Campos obrigatórios destacados
- ✅ Sucesso quando tudo válido

---

## 📋 TESTE 11: Saudação Dinâmica

**Objetivo**: Verificar saudação por hora do dia

### Passos:
1. ✅ Acesse dashboard (cliente ou farmácia)
2. ✅ Verifique mensagem no topo
3. ✅ Antes das 12h deve mostrar "Bom dia, [Nome]"
4. ✅ Entre 12h-18h deve mostrar "Boa tarde, [Nome]"
5. ✅ Após 18h deve mostrar "Boa noite, [Nome]"
6. ✅ Deve usar apenas primeiro nome

### Resultado Esperado:
- ✅ Saudação muda conforme hora
- ✅ Nome correto exibido
- ✅ Apenas primeiro nome usado

---

## 📋 TESTE 12: Acessibilidade

**Objetivo**: Verificar acessibilidade básica

### Passos:
1. ✅ Navegue usando apenas TAB
2. ✅ Todos os elementos interativos devem ser alcançáveis
3. ✅ Botões devem ter indicação visual de foco
4. ✅ Formulários devem ter labels associados
5. ✅ Imagens devem ter alt (se houver)
6. ✅ Contraste de cores deve ser adequado

### Resultado Esperado:
- ✅ Navegação por teclado funcional
- ✅ Foco visível
- ✅ Labels corretos
- ✅ Bom contraste

---

## 📊 Resumo de Testes

| Teste | Funcionalidade | Status |
|-------|----------------|--------|
| 1 | Cadastro Cliente | ⬜ |
| 2 | Menu Mobile | ⬜ |
| 3 | Proteção Cliente→Farmácia | ⬜ |
| 4 | Logout | ⬜ |
| 5 | Cadastro Farmácia | ⬜ |
| 6 | Proteção Farmácia→Cliente | ⬜ |
| 7 | Responsividade | ⬜ |
| 8 | Geolocalização | ⬜ |
| 9 | Navegação Adaptada | ⬜ |
| 10 | Validações | ⬜ |
| 11 | Saudação Dinâmica | ⬜ |
| 12 | Acessibilidade | ⬜ |

---

## 🐛 Relatório de Bugs

Se encontrar bugs, anote aqui:

**Bug #1:**
- Descrição:
- Passos para reproduzir:
- Tela afetada:
- Gravidade: Baixa / Média / Alta

---

## ✅ Aprovação Final

- [ ] Todos os testes passaram
- [ ] Responsividade validada (360px - 1920px)
- [ ] Autenticação funcionando
- [ ] Proteção de rotas ativa
- [ ] Mobile-first confirmado
- [ ] Design profissional mantido

**Data do teste**: _______________
**Testador**: _______________
**Aprovado**: ⬜ Sim  ⬜ Não
