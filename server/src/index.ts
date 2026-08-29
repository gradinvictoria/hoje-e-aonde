import "dotenv/config";
import express from "express";
import cors from "cors";
import { leadsRouter } from "./leads/routes";
import { placesRouter } from "./places/routes";
import { adminRouter } from "./admin/routes";

const app = express();
const PORT = process.env.PORT ?? 4000;

app.use(
  cors({
    // Em dev, várias instâncias do Vite podem rodar em portas diferentes de localhost
    // (ex.: quando 5173 já está em uso) — aceitamos qualquer uma delas, além da origem configurada.
    origin: (origin, callback) => {
      if (!origin || origin === process.env.CLIENT_ORIGIN || /^http:\/\/localhost:\d+$/.test(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  }),
);
app.use(express.json());

app.get("/api/health", (_req, res) => {
  // RENDER_GIT_COMMIT é preenchido automaticamente pelo Render a cada deploy —
  // usado pra confirmar de fora que o deploy mais recente já está no ar.
  res.json({ ok: true, commit: process.env.RENDER_GIT_COMMIT ?? null });
});

app.use("/api/leads", leadsRouter);
app.use("/api/places", placesRouter);
app.use("/api/admin", adminRouter);

app.listen(PORT, () => {
  console.log(`API do Hoje é aonde? rodando em http://localhost:${PORT}`);
});
