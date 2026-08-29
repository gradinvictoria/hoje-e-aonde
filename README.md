# Hoje é aonde?

Plataforma de descoberta de lugares, experiências, aulas e eventos. Tem duas frentes no mesmo
projeto (React + Vite + Tailwind / Express + Prisma + Postgres):

- **Site institucional** (`/`) — landing page de marketing, com formulário "Quero divulgar meu
  negócio" que só grava um lead no banco.
- **Produto** (`/explorar` e `/busca`) — o feed de estabelecimentos (Home) e a busca com filtro
  lateral (preço, localização, categorias, avaliação, aberto agora, tags), grade/lista e modal de
  detalhes com galeria de fotos e compartilhamento (WhatsApp/Instagram/link).

Projeto separado do case Vetor/ShopHub — produtos distintos, sem nada em comum além da stack.

## API do produto

- `GET /api/places` — feed/busca paginado, filtros via query string (`q`, `categories`, `tags`,
  `state`, `city`, `neighborhood`, `minRating`, `priceMin`, `priceMax`, `openNow`, `sort`, `page`,
  `pageSize`).
- `GET /api/places/:id` — detalhe usado no modal.
- `GET /api/places/meta` — categorias/tags/estados/cidades/bairros com contagem, para popular o
  filtro lateral.

Popule o banco com estabelecimentos de demonstração rodando, dentro de `server/`:

```bash
npm run seed
```

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
