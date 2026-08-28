# Hoje é aonde?

Site institucional da plataforma **Hoje é aonde?** — landing page de marketing (React + Vite +
Tailwind) com um back-end mínimo (Express + Prisma + Postgres) que só recebe os cadastros do
formulário "Quero divulgar meu negócio".

Projeto separado do case Vetor/ShopHub — produtos distintos, sem nada em comum além da stack.

## Rodando localmente

```bash
npm install
npm install --prefix server

# em dois terminais, ou:
npm run dev:all
```

O front sobe em `http://localhost:5173` e a API em `http://localhost:4000`.

Copie `.env.example` para `.env` (raiz, variável `VITE_API_URL`) e `server/.env.example` para
`server/.env` (precisa de um `DATABASE_URL` do Postgres — veja abaixo).

## Banco de dados

Use um Postgres gratuito no [Neon](https://neon.tech). Depois de criar o projeto, copie a
connection string para `DATABASE_URL` em `server/.env` e rode:

```bash
cd server
npx prisma migrate dev --name init
```

## Deploy gratuito

Mesma stack usada no Vetor/ShopHub:

- **API → [Render](https://render.com)**: "New Web Service" apontando para este repositório, usa
  o `render.yaml` da raiz (plano free, `rootDir: server`). Configure as env vars
  `DATABASE_URL`, `CLIENT_ORIGIN` (URL do site publicado no Vercel) e `ADMIN_KEY` (senha para
  consultar `/api/leads`).
- **Site → [Vercel](https://vercel.com)**: importe o repositório (build padrão do Vite, usa o
  `vercel.json` da raiz). Configure a env var `VITE_API_URL` com a URL do serviço no Render.

Depois do primeiro deploy da API, atualize `CLIENT_ORIGIN` no Render com a URL final do Vercel.

## Ver os cadastros recebidos

Sem painel admin nesta primeira versão — para conferir os leads, chame a API com a chave
configurada:

```bash
curl -H "x-admin-key: SUA_ADMIN_KEY" https://sua-api.onrender.com/api/leads
```
