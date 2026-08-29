import { PrismaClient } from "@prisma/client";
import { geocodeAddress, sleep } from "../src/places/geocode";

const prisma = new PrismaClient();

async function main() {
  const places = await prisma.place.findMany({ where: { lat: null } });
  console.log(`Geocodificando ${places.length} estabelecimento(s) sem coordenadas...`);

  for (const place of places) {
    const coords = await geocodeAddress(place.neighborhood, place.city, place.state);
    if (coords) {
      await prisma.place.update({ where: { id: place.id }, data: coords });
      console.log(`  ✓ ${place.name} → ${coords.lat}, ${coords.lng}`);
    } else {
      console.log(`  ✗ ${place.name} — endereço não encontrado no OpenStreetMap`);
    }
    await sleep(1100); // respeita o limite de 1 req/s do Nominatim
  }

  console.log("Backfill concluído.");
}

main()
  .catch((err) => {
    console.error(err);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
