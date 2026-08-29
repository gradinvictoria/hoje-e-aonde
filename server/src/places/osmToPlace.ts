import type { OsmPlace, OsmTags } from "./osm";

const PRICE_RANGES: Record<string, [number, number]> = {
  Restaurante: [40, 110],
  Bar: [35, 80],
  Show: [30, 70],
  Evento: [20, 60],
  Aula: [50, 150],
  "Ateliê": [60, 150],
  "Serviço": [40, 100],
  Trilha: [0, 30],
};

function neighborhoodOf(tags: OsmTags, fallback: string): string {
  return tags["addr:suburb"] || tags["addr:neighbourhood"] || tags["addr:city_district"] || fallback;
}

function tagsFor(category: string, tags: OsmTags): string[] {
  const out: string[] = [];
  if (tags.cuisine) {
    out.push(...tags.cuisine.split(";").map((c) => c.trim().charAt(0).toUpperCase() + c.trim().slice(1)));
  }
  if (tags.outdoor_seating === "yes") out.push("Ao ar livre");
  if (tags["diet:vegetarian"] === "yes" || tags["diet:vegan"] === "yes") out.push("Vegetariano");
  if (out.length === 0) out.push(category);
  return out.slice(0, 3);
}

function priceFor(category: string): number {
  const [min, max] = PRICE_RANGES[category] ?? [20, 80];
  return Math.round((min + Math.random() * (max - min)) / 5) * 5;
}

function ratingFor(): number {
  return Math.round((4.3 + Math.random() * 0.7) * 10) / 10;
}

function reviewsFor(): number {
  return Math.floor(20 + Math.random() * 280);
}

function descriptionFor(name: string, category: string, neighborhood: string, city: string): string {
  return `${name} é um estabelecimento real listado no OpenStreetMap, na categoria ${category.toLowerCase()}, em ${neighborhood}, ${city}. Descrição gerada automaticamente — edite para adicionar mais detalhes.`;
}

export function photos(slug: string, count = 5): string[] {
  return Array.from({ length: count }, (_, i) => `https://picsum.photos/seed/${slug}-${i + 1}/900/700`);
}

export type PlaceCreateInput = {
  name: string;
  category: string;
  description: string;
  state: string;
  city: string;
  neighborhood: string;
  rating: number;
  reviewsCount: number;
  avgPrice: number;
  tags: string[];
  photos: string[];
  sponsored: boolean;
  openNow: boolean;
  lat: number;
  lng: number;
};

export function toPlaceInput(category: string, osm: OsmPlace, city: string, state: string): PlaceCreateInput {
  const neighborhood = neighborhoodOf(osm.tags, city);
  const slug = osm.name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  return {
    name: osm.name,
    category,
    description: descriptionFor(osm.name, category, neighborhood, city),
    state,
    city,
    neighborhood,
    rating: ratingFor(),
    reviewsCount: reviewsFor(),
    avgPrice: priceFor(category),
    tags: tagsFor(category, osm.tags),
    photos: photos(slug),
    sponsored: false,
    openNow: true,
    lat: osm.lat,
    lng: osm.lng,
  };
}
