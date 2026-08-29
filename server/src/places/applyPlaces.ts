import type { PrismaClient } from "@prisma/client";
import type { PlaceCreateInput } from "./osmToPlace";

function isValidPlace(p: unknown): p is PlaceCreateInput {
  if (!p || typeof p !== "object") return false;
  const r = p as Record<string, unknown>;
  return (
    typeof r.name === "string" &&
    r.name.length > 0 &&
    typeof r.category === "string" &&
    typeof r.state === "string" &&
    typeof r.city === "string" &&
    typeof r.lat === "number" &&
    typeof r.lng === "number" &&
    Array.isArray(r.tags) &&
    Array.isArray(r.photos)
  );
}

// Apaga todo o conteúdo de Place e recria com a lista recebida — usado pela
// rota admin /apply-places, quando os dados já vêm prontos de fora (o
// próprio servidor não precisa alcançar a fonte original).
export async function applyPlaces(
  prisma: PrismaClient,
  places: unknown[],
): Promise<{ removed: number; created: number }> {
  const valid = places.filter(isValidPlace);
  if (valid.length === 0) {
    throw new Error("Nenhum local válido no payload recebido.");
  }

  const { count: removed } = await prisma.place.deleteMany({});
  for (const place of valid) {
    await prisma.place.create({ data: place });
  }

  return { removed, created: valid.length };
}
