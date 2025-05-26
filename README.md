# Cubos Movies Web

Aplicação web para gerenciamento e visualização de filmes, construída com Next.js, React, Tailwind CSS e TypeScript.

## ✨ Funcionalidades

- Autenticação de usuários (login, cadastro, recuperação e redefinição de senha)
- Listagem, busca e filtragem de filmes
- Visualização de detalhes do filme
- Adição de novos filmes (protegido)
- Temas claro/escuro com detecção automática do sistema
- Componentes reutilizáveis e estilização com Tailwind CSS

## 🚀 Tecnologias

- [Next.js](https://nextjs.org/) (App Router)
- [React](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [React Hook Form](https://react-hook-form.com/)
- [Yup](https://github.com/jquense/yup) (validação)
- [React Toastify](https://fkhadra.github.io/react-toastify/) (notificações)

## 📦 Instalação

```bash
npm install
# ou
yarn install
```

## 🏃 Rodando localmente

```bash
npm run dev
# ou
yarn dev
```

Acesse [http://localhost:3000](http://localhost:3000) no navegador.

## 📁 Estrutura de Pastas

- `src/app` — Rotas (públicas, protegidas, autenticação)
- `src/components` — Componentes reutilizáveis (atoms, molecules, organisms)
- `src/services` — Serviços de API
- `src/hooks` — Hooks customizados
- `src/constants` — Constantes globais
- `src/validators` — Validações e schemas

## 🛡️ Autenticação

- Login, cadastro, recuperação e redefinição de senha
- Fluxo completo: esqueci minha senha → validação de código → redefinir senha

## 🎨 Temas

- Suporte a tema claro/escuro
- Detecta preferência do sistema
- Persistência da escolha do usuário

## 📝 Scripts úteis

- `dev` — Inicia o servidor de desenvolvimento
- `build` — Gera build de produção
- `start` — Inicia o servidor em produção
- `lint` — Lint do código

## 📄 Licença

MIT
