import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { reseedPlacesFromOsm } from "../places/reseedOsm";

const prisma = new PrismaClient();
export const adminRouter = Router();

// Roda no próprio servidor (que já fala com o Postgres sem problema) — usado
// quando a máquina de quem está operando não alcança o banco diretamente
// (porta 5432 bloqueada na rede local, por exemplo). Protegido pela mesma
// chave compartilhada usada em /api/leads. Confirmado com o usuário.
let reseedState: { running: boolean; log: string[]; error: string | null; finishedAt: string | null } = {
  running: false,
  log: [],
  error: null,
  finishedAt: null,
};

function checkAdminKey(req: import("express").Request, res: import("express").Response): boolean {
  const key = req.header("x-admin-key");
  if (!process.env.ADMIN_KEY || key !== process.env.ADMIN_KEY) {
    res.status(401).json({ error: "Não autorizado." });
    return false;
  }
  return true;
}

adminRouter.post("/reseed-osm", (req, res) => {
  if (!checkAdminKey(req, res)) return;

  if (reseedState.running) {
    res.status(409).json({ ...reseedState, error: "Já existe um reseed em andamento." });
    return;
  }

  reseedState = { running: true, log: [], error: null, finishedAt: null };
  res.status(202).json({ started: true });

  reseedPlacesFromOsm(prisma, (msg) => reseedState.log.push(msg))
    .catch((err) => {
      reseedState.error = err instanceof Error ? err.message : String(err);
    })
    .finally(() => {
      reseedState.running = false;
      reseedState.finishedAt = new Date().toISOString();
    });
});

adminRouter.get("/reseed-osm", (req, res) => {
  if (!checkAdminKey(req, res)) return;
  res.json(reseedState);
});
