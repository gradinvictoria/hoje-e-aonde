const NOMINATIM_URL = "https://nominatim.openstreetmap.org/search";

// Nominatim (OpenStreetMap) exige User-Agent identificando a aplicação e no
// máximo 1 requisição/segundo — por isso o geocoding só roda no seed/backfill,
// nunca a cada request da API. https://operations.osmfoundation.org/policies/nominatim/
const USER_AGENT = "hoje-e-aonde/1.0 (site institucional; contato via GitHub)";

export type Coords = { lat: number; lng: number };

export async function geocodeAddress(
  neighborhood: string,
  city: string,
  state: string,
): Promise<Coords | null> {
  const query = `${neighborhood}, ${city}, ${state}, Brasil`;
  const params = new URLSearchParams({ q: query, format: "json", limit: "1" });

  const res = await fetch(`${NOMINATIM_URL}?${params}`, {
    headers: { "User-Agent": USER_AGENT },
  });
  if (!res.ok) return null;

  const results = (await res.json()) as { lat: string; lon: string }[];
  if (!results.length) return null;

  return { lat: Number(results[0].lat), lng: Number(results[0].lon) };
}

export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
