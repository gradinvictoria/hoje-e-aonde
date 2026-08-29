const OVERPASS_URL = "https://overpass-api.de/api/interpreter";

// Mesma política de uso responsável do Nominatim: User-Agent identificando a
// aplicação, sem paralelismo, chamado só em scripts de seed — nunca a cada
// request da API pública.
const USER_AGENT = "hoje-e-aonde/1.0 (site institucional; contato via GitHub)";

export type OsmTags = Record<string, string>;

export type OsmPlace = {
  id: number;
  name: string;
  lat: number;
  lng: number;
  tags: OsmTags;
};

type CategoryRule = { category: string; match: (tags: OsmTags) => boolean };

const CATEGORY_RULES: CategoryRule[] = [
  { category: "Restaurante", match: (t) => t.amenity === "restaurant" },
  { category: "Bar", match: (t) => t.amenity === "bar" || t.amenity === "pub" },
  { category: "Show", match: (t) => t.amenity === "nightclub" || t.amenity === "arts_centre" },
  { category: "Evento", match: (t) => t.amenity === "theatre" || t.amenity === "cinema" },
  { category: "Aula", match: (t) => t.leisure === "fitness_centre" || t.leisure === "dance" },
  { category: "Ateliê", match: (t) => t.shop === "art" || t.craft !== undefined },
  { category: "Serviço", match: (t) => t.shop === "hairdresser" || t.shop === "beauty" },
  { category: "Trilha", match: (t) => t.tourism === "viewpoint" || t.natural === "peak" },
];

function categorize(tags: OsmTags): string | null {
  for (const rule of CATEGORY_RULES) {
    if (rule.match(tags)) return rule.category;
  }
  return null;
}

// Busca POIs reais de uma cidade brasileira via Overpass API (dados do
// OpenStreetMap), cobrindo as categorias em CATEGORY_RULES.
export async function fetchOsmPlaces(city: string): Promise<{ category: string; osm: OsmPlace }[]> {
  const query = `
    [out:json][timeout:60];
    area["name"="${city}"]["admin_level"="8"]->.a;
    (
      node["amenity"~"^(restaurant|bar|pub|nightclub|arts_centre|theatre|cinema)$"](area.a);
      node["leisure"~"^(fitness_centre|dance)$"](area.a);
      node["shop"~"^(art|hairdresser|beauty)$"](area.a);
      node["tourism"="viewpoint"](area.a);
      node["natural"="peak"](area.a);
    );
    out body 300;
  `.trim();

  const maxAttempts = 3;
  let lastError: unknown;
  let data: { elements: { id: number; lat: number; lon: number; tags?: OsmTags }[] } | null = null;

  for (let attempt = 1; attempt <= maxAttempts && !data; attempt++) {
    try {
      const res = await fetch(OVERPASS_URL, {
        method: "POST",
        headers: { "Content-Type": "text/plain", "User-Agent": USER_AGENT },
        body: query,
      });
      if (!res.ok) throw new Error(`Overpass respondeu ${res.status} para "${city}"`);
      data = (await res.json()) as { elements: { id: number; lat: number; lon: number; tags?: OsmTags }[] };
    } catch (err) {
      lastError = err;
      if (attempt < maxAttempts) await sleep(3000 * attempt); // servidor público, dá 504 sob carga
    }
  }
  if (!data) throw lastError instanceof Error ? lastError : new Error(String(lastError));

  const results: { category: string; osm: OsmPlace }[] = [];
  for (const el of data.elements) {
    const tags = el.tags ?? {};
    if (!tags.name) continue;
    const category = categorize(tags);
    if (!category) continue;
    results.push({ category, osm: { id: el.id, name: tags.name, lat: el.lat, lng: el.lon, tags } });
  }
  return results;
}

export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
