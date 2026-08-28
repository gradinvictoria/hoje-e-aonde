import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export const leadsRouter = Router();

leadsRouter.post("/", async (req, res) => {
  const { nome, tipoNegocio, contato, mensagem } = req.body ?? {};

  if (!nome?.trim() || !tipoNegocio?.trim() || !contato?.trim()) {
    res.status(400).json({ error: "Preencha nome, o que você oferece e um contato." });
    return;
  }

  const lead = await prisma.lead.create({
    data: {
      nome: nome.trim(),
      tipoNegocio: tipoNegocio.trim(),
      contato: contato.trim(),
      mensagem: mensagem?.trim() || null,
    },
  });

  res.status(201).json({ id: lead.id });
});

// Listagem simples para a Victoria conferir os cadastros recebidos — protegida por uma
// chave compartilhada (não há painel admin nesta primeira versão, só o site institucional).
leadsRouter.get("/", async (req, res) => {
  const key = req.header("x-admin-key");
  if (!process.env.ADMIN_KEY || key !== process.env.ADMIN_KEY) {
    res.status(401).json({ error: "Não autorizado." });
    return;
  }

  const leads = await prisma.lead.findMany({ orderBy: { criadoEm: "desc" } });
  res.json(leads);
});
