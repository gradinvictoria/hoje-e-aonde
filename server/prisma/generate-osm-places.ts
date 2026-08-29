import { writeFileSync } from "node:fs";
import { fetchOsmPlaces, sleep } from "../src/places/osm";
import { pickDiverse } from "../src/places/pickDiverse";
import { toPlaceInput, type PlaceCreateInput } from "../src/places/osmToPlace";

// Só busca no OpenStreetMap e escreve um JSON local — não toca no banco.
// Rodar de onde o Overpass é alcançável; o arquivo gerado é enviado depois
// para POST /api/admin/apply-places, que só grava (roda de onde o Postgres
// é alcançável). Separado assim porque nem sempre a mesma máquina consegue
// falar com as duas coisas.
const CITIES: { city: string; state: string }[] = [
  { city: "Salvador", state: "BA" },
  { city: "Rio de Janeiro", state: "RJ" },
  { city: "Belo Horizonte", state: "MG" },
];

const PER_CITY_LIMIT = 8;
const OUT_FILE = process.argv[2] ?? "osm-places.json";

async function main() {
  const toCreate: PlaceCreateInput[] = [];

  for (const { city, state } of CITIES) {
    console.log(`Buscando locais reais em ${city} no OpenStreetMap...`);
    const found = await fetchOsmPlaces(city);
    const picked = pickDiverse(found, PER_CITY_LIMIT);
    for (const { category, osm } of picked) {
      toCreate.push(toPlaceInput(category, osm, city, state));
    }
    console.log(`  ${picked.length} local(is) encontrado(s) em ${city}: ${[...new Set(picked.map((p) => p.category))].join(", ")}`);
    await sleep(8000);
  }

  writeFileSync(OUT_FILE, JSON.stringify({ places: toCreate }, null, 2));
  console.log(`\n${toCreate.length} locais escritos em ${OUT_FILE}`);
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
