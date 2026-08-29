import type { PrismaClient } from "@prisma/client";
import { fetchOsmPlaces, sleep } from "./osm";
import { pickDiverse } from "./pickDiverse";
import { toPlaceInput, type PlaceCreateInput } from "./osmToPlace";

const CITIES: { city: string; state: string }[] = [
  { city: "Salvador", state: "BA" },
  { city: "Rio de Janeiro", state: "RJ" },
  { city: "Belo Horizonte", state: "MG" },
];

const PER_CITY_LIMIT = 8;

// Substitui todo o conteúdo de Place por estabelecimentos REAIS puxados do
// OpenStreetMap (Overpass API) para Salvador, Rio de Janeiro e Belo
// Horizonte. Busca tudo ANTES de apagar nada: se o Overpass falhar, o banco
// não é tocado. Usado tanto pelo script de linha de comando (prisma/reseed-
// from-osm.ts) quanto pela rota admin (para rodar direto no servidor,
// quando a máquina de quem está operando não alcança o Postgres).
export async function reseedPlacesFromOsm(
  prisma: PrismaClient,
  log: (msg: string) => void = console.log,
): Promise<{ created: number; removed: number }> {
  const toCreate: PlaceCreateInput[] = [];

  for (const { city, state } of CITIES) {
    log(`Buscando locais reais em ${city} no OpenStreetMap...`);
    const found = await fetchOsmPlaces(city);
    const picked = pickDiverse(found, PER_CITY_LIMIT);
    for (const { category, osm } of picked) {
      toCreate.push(toPlaceInput(category, osm, city, state));
    }
    log(`  ${picked.length} local(is) encontrado(s) em ${city}: ${[...new Set(picked.map((p) => p.category))].join(", ")}`);
    await sleep(8000); // não martela o Overpass público (evita 429)
  }

  if (toCreate.length === 0) {
    throw new Error("Nenhum local encontrado no OpenStreetMap. Banco não foi alterado.");
  }

  const { count: removed } = await prisma.place.deleteMany({});
  log(`Removidos ${removed} local(is) antigo(s).`);

  for (const place of toCreate) {
    await prisma.place.create({ data: place });
  }

  log(`Reseed via OpenStreetMap concluído: ${toCreate.length} estabelecimentos criados.`);
  return { created: toCreate.length, removed };
}
