import { PrismaClient } from "@prisma/client";
import { fetchOsmPlaces, sleep } from "../src/places/osm";
import { pickDiverse } from "../src/places/pickDiverse";
import { toPlaceInput, type PlaceCreateInput } from "../src/places/osmToPlace";

const prisma = new PrismaClient();

const CITIES: { city: string; state: string }[] = [
  { city: "Salvador", state: "BA" },
  { city: "Rio de Janeiro", state: "RJ" },
  { city: "Belo Horizonte", state: "MG" },
];

const PER_CITY_LIMIT = 8;

// Substitui todo o conteúdo de Place por estabelecimentos REAIS puxados do
// OpenStreetMap (Overpass API), em vez dos dados fictícios de placesData.ts.
// Confirmado com o usuário: Place é só dado de demonstração, sem conteúdo
// real de usuário — seguro apagar e recriar.
//
// Busca tudo ANTES de apagar nada: se o Overpass falhar, o banco não é tocado.
async function main() {
  const toCreate: PlaceCreateInput[] = [];

  for (const { city, state } of CITIES) {
    console.log(`Buscando locais reais em ${city} no OpenStreetMap...`);
    const found = await fetchOsmPlaces(city);
    const picked = pickDiverse(found, PER_CITY_LIMIT);
    for (const { category, osm } of picked) {
      toCreate.push(toPlaceInput(category, osm, city, state));
    }
    console.log(
      `  ${picked.length} local(is) encontrado(s) em ${city}: ${[...new Set(picked.map((p) => p.category))].join(", ")}`,
    );
    await sleep(1500); // não martela o Overpass público
  }

  if (toCreate.length === 0) {
    console.error("Nenhum local encontrado no OpenStreetMap. Abortando sem alterar o banco.");
    process.exitCode = 1;
    return;
  }

  const { count: removed } = await prisma.place.deleteMany({});
  console.log(`Removidos ${removed} local(is) antigo(s).`);

  for (const place of toCreate) {
    await prisma.place.create({ data: place });
  }

  console.log(`Reseed via OpenStreetMap concluído: ${toCreate.length} estabelecimentos criados.`);
}

main()
  .catch((err) => {
    console.error(err);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
