# Pizzaria Frontend

Frontend web para gerenciamento administrativo de uma pizzaria. O projeto foi construído com Next.js, React, TypeScript e Tailwind CSS, consumindo uma API externa configurada pela variável `NEXT_PUBLIC_API_URL`.

A aplicação concentra os principais fluxos de operação interna: autenticação de usuários, recuperação de acesso, acompanhamento de pedidos, cadastro de produtos, organização por categorias, gerenciamento de funcionários e edição de perfil.

## Tecnologias

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- Radix UI / shadcn
- Lucide React
- Sonner

## Pré-requisitos

Antes de executar o frontend, é necessário ter instalado:

- Node.js
- npm
- API backend da pizzaria disponível e acessível

## Configuração

Crie um arquivo `.env` na raiz do projeto com a URL da API:

```env
NEXT_PUBLIC_API_URL=http://localhost:3333
```

Use a URL correspondente ao ambiente em que o backend estiver rodando.

## Instalação

Instale as dependências:

```bash
npm install
```

Execute o servidor de desenvolvimento:

```bash
npm run dev
```

Depois acesse a aplicação no navegador:

```text
http://localhost:3000
```

## Scripts Disponíveis

```bash
npm run dev
```

Inicia o projeto em modo de desenvolvimento.

```bash
npm run build
```

Gera a versão de produção da aplicação.

```bash
npm run start
```

Executa a versão de produção após o build.

## Visão Geral do Uso

Ao acessar a raiz da aplicação, o usuário é redirecionado para a tela de login. Após a autenticação, o destino depende do cargo do usuário:

- `ADMIN`, `SUPER_ADMIN` e `USER_ROOT`: acesso ao painel administrativo.
- Outros usuários autenticados: acesso à página de perfil.
- Usuários sem permissão administrativa: redirecionamento para a tela de acesso negado ao tentar entrar no dashboard.

O token de autenticação é salvo em cookie HTTP-only e usado nas chamadas protegidas para a API.

## Fluxos de Uso

### 1. Cadastro e Login

O usuário pode criar uma conta pela tela de registro. Após o cadastro, deve entrar pela tela de login usando email e senha.

Fluxo:

1. Acessar `/register`.
2. Informar nome, email e senha.
3. Confirmar o cadastro.
4. Acessar `/login`.
5. Informar email e senha.
6. Entrar na aplicação.

Após o login, usuários administrativos são enviados para `/dashboard`; usuários comuns são enviados para `/profile`.

### 2. Recuperação de Acesso

Caso esqueça a senha, o usuário pode solicitar a recuperação de acesso.

Fluxo:

1. Acessar `/forgot-password`.
2. Informar os dados solicitados para iniciar a recuperação.
3. Validar o código OTP em `/code-validation`.
4. Definir uma nova senha em `/recover-access`.
5. Retornar para o login.

### 3. Painel de Pedidos

A tela principal do dashboard exibe os pedidos em produção.

Fluxo:

1. Acessar `/dashboard`.
2. Visualizar pedidos pendentes, mesa, itens e total.
3. Usar o botão de atualizar para buscar pedidos recentes.
4. Abrir os detalhes de um pedido.
5. Finalizar o pedido quando estiver pronto.

Pedidos finalizados deixam a lista principal e passam a aparecer no histórico.

### 4. Histórico de Pedidos

O histórico reúne os pedidos já finalizados.

Fluxo:

1. Acessar `/dashboard/past-orders`.
2. Visualizar pedidos concluídos.
3. Abrir detalhes para consultar itens, mesa e total.
4. Atualizar a listagem quando necessário.

### 5. Gerenciamento de Produtos

A área de produtos permite cadastrar e remover itens do cardápio.

Fluxo:

1. Acessar `/dashboard/products`.
2. Visualizar produtos cadastrados com imagem, descrição, preço e categoria.
3. Clicar em "Novo produto".
4. Informar nome, preço, descrição e categoria.
5. Enviar uma imagem JPG, JPEG ou PNG de até 5 MB.
6. Confirmar o cadastro.
7. Remover produtos quando necessário.

Para cadastrar um produto, é necessário que exista ao menos uma categoria disponível.

### 6. Gerenciamento de Categorias

As categorias organizam os produtos do cardápio.

Fluxo:

1. Acessar `/dashboard/categories`.
2. Visualizar as categorias existentes.
3. Clicar em "Nova categoria".
4. Informar o nome da categoria.
5. Confirmar o cadastro.
6. Renomear categorias já existentes quando necessário.

### 7. Gerenciamento de Usuários

A tela de usuários é restrita a cargos superiores.

Permissões:

- `SUPER_ADMIN`
- `USER_ROOT`

Fluxo:

1. Acessar `/dashboard/users`.
2. Visualizar funcionários cadastrados.
3. Separar usuários internos de usuários externos.
4. Alterar o cargo de um usuário quando necessário.

Usuários sem permissão são redirecionados para o dashboard.

### 8. Perfil do Usuário

Todo usuário autenticado pode consultar seus dados de perfil.

Fluxo:

1. Acessar `/profile`.
2. Visualizar nome, email e cargo.
3. Abrir as opções de edição.
4. Alterar nome de usuário.
5. Redefinir email.
6. Redefinir senha.

Usuários administrativos também podem acessar o painel administrativo a partir da tela de perfil.

### 9. Logout

O usuário pode encerrar a sessão pelo menu lateral do dashboard. Ao sair, o token é removido e a aplicação redireciona para `/login`.

## Estrutura Principal

```text
src/
  app/
    _actions/           Server actions de autenticação, produtos, pedidos e categorias
    dashboard/          Rotas protegidas do painel administrativo
    login/              Tela de login
    register/           Tela de cadastro
    profile/            Perfil e redefinição de dados do usuário
  components/
    dashboard/          Componentes do painel administrativo
    forms/              Formulários de autenticação e recuperação
    ui/                 Componentes base de interface
  lib/
    api.ts              Cliente HTTP da API
    auth.ts             Controle de token, usuário e permissões
    types.ts            Tipos compartilhados da aplicação
```

## Permissões e Cargos

A aplicação reconhece os seguintes cargos:

- `USER_ROOT`
- `SUPER_ADMIN`
- `ADMIN`
- `STAFF`
- `EXTERNAL`

O acesso ao dashboard é permitido para `ADMIN`, `SUPER_ADMIN` e `USER_ROOT`. O gerenciamento de usuários é restrito a `SUPER_ADMIN` e `USER_ROOT`.

## Integração com a API

As requisições são centralizadas em `src/lib/api.ts`. Quando o usuário está autenticado, o token é enviado no cabeçalho:

```text
Authorization: Bearer <token>
```

As principais áreas da aplicação consomem endpoints de sessão, usuários, pedidos, produtos e categorias.

## Observações

- Os preços dos produtos são tratados em centavos na comunicação com a API.
- O upload de imagem de produto usa `FormData`.
- As telas protegidas dependem de token válido no cookie `token_pizzaria`.
- O arquivo `endpoints.md` contém uma referência dos endpoints do backend.
