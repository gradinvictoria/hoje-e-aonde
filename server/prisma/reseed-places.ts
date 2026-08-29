import { PrismaClient } from "@prisma/client";
import { geocodeAddress, sleep } from "../src/places/geocode";
import { places, photos } from "./placesData";

const prisma = new PrismaClient();

// Substitui todo o conteúdo de Place por placesData.ts — usado para trocar
// a cidade demo (ex: São Paulo → Salvador/Rio/BH) num banco que já foi
// seedado, já que o seed normal pula quando a tabela não está vazia.
// Confirmado com o usuário: são dados fictícios de demonstração, sem
// conteúdo real de usuário.
async function main() {
  const { count } = await prisma.place.deleteMany({});
  console.log(`Removidos ${count} estabelecimento(s) antigo(s).`);

  for (const place of places) {
    const slug = place.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    const coords = await geocodeAddress(place.neighborhood, place.city, place.state);
    if (!coords) console.log(`  ⚠ sem coordenadas: ${place.name}`);
    await sleep(1100); // respeita o limite de 1 req/s do Nominatim

    await prisma.place.create({
      data: { ...place, photos: photos(slug), lat: coords?.lat, lng: coords?.lng },
    });
  }

  console.log(`Reseed concluído: ${places.length} estabelecimentos criados.`);
}

main()
  .catch((err) => {
    console.error(err);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
