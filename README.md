# ♻️ Recicla365

## Sobre o Projeto

O **Recicla365** é uma plataforma web que facilita o gerenciamento de resíduos e o acesso a pontos de coleta de materiais recicláveis. Usuários podem cadastrar novos pontos de coleta, visualizar locais já cadastrados, editar, excluir e consultar informações sobre os materiais aceitos em cada ponto, além de gerenciar seu próprio perfil.

**🌐 Deploy:**

https://recicla365-olive.vercel.app/

**📂 Repositório:**

https://github.com/Alexanderu9/Recicla365/

---

## Problema que resolve

A falta de informações centralizadas sobre pontos de coleta de resíduos dificulta a reciclagem e o descarte correto de materiais. O Recicla365 resolve esse problema ao permitir que qualquer pessoa encontre, cadastre e gerencie locais de coleta, promovendo a sustentabilidade e a participação cidadã.

---

## Técnicas e Tecnologias Utilizadas

- **React** com **TypeScript**
- **Context API** para gerenciamento global de estado
- **React Router DOM** para navegação entre páginas
- **LocalStorage** para persistência de dados
- **API ViaCEP** para busca automática de endereço por CEP
- **Atomic Design** para organização dos componentes
- **CSS Modules** e Flexbox/Grid para estilização e responsividade
- **Vite** para build e desenvolvimento rápido
- **Deploy** no Vercel

---

## Como executar

1. **Clone o repositório:**

   ```bash
   git clone https://github.com/Alexanderu9/Recicla365.git
   cd recicla365
   ```

2. **Instale as dependências:**

   ```bash
   npm install
   ```

3. **Execute o projeto:**

   ```bash
   npm run dev
   ```

4. **Acesse:**

   Abra http://localhost:5173 no navegador.

---

## 🔑 Usuários para Teste

Para facilitar o teste da aplicação, você pode usar qualquer um dos usuários pré-cadastrados:

| Nome   | E-mail            | Senha |
|--------|-------------------|-------|
| Maria  | maria@teste.com   | 123   |
| João   | joao@teste.com    | 123   |
| Ana    | ana@teste.com     | 123   |
| Carlos | carlos@teste.com  | 123   |
| Paula  | paula@teste.com   | 123   |

> **💡 Dica:** Use qualquer um desses usuários para fazer login e explorar todas as funcionalidades da plataforma!

---

## 👨‍💻 Como usar

1. **Login:**
   Entre com um usuário já cadastrado ou clique em "Cadastrar" para criar um novo.

2. **Cadastro de Usuário:**
   Preencha todos os campos obrigatórios, incluindo endereço (CEP) e CPF único.

3. **Dashboard:**
   Veja a visão geral dos locais e usuários cadastrados.

4. **Cadastrar/Editar Local:**
   No menu, clique em "Cadastrar Local" e preencha os dados. Para editar, clique em "Editar" na listagem.

5. **Listar/Acessar/Deletar Locais:**
   No menu "Locais", veja todos os locais cadastrados e use os botões para acessar, editar ou deletar.

6. **Perfil:**
   No menu "Perfil", veja e edite seus dados pessoais.

7. **Sair:**
   Clique em "Sair" para encerrar a sessão.

---

## Responsividade

O sistema é totalmente responsivo, funcionando em computadores, tablets e celulares.

---

## Melhorias Possíveis

- Autenticação real com JWT
- Upload de imagens para locais de coleta
- Mapa interativo com geolocalização
- Filtro e busca avançada de locais
- Dashboard com gráficos de reciclagem

---

## Licença

Projeto desenvolvido para o Módulo 1 - Projeto Avaliativo do curso LAB365.
