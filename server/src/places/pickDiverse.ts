import type { OsmPlace } from "./osm";

function shuffle<T>(arr: T[]): T[] {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// Escolhe até `limit` locais alternando entre categorias (round-robin), em
// vez de pegar os primeiros da lista bruta — o Overpass às vezes devolve
// dezenas seguidas da mesma categoria (ex: só trilhas/montanhas no Rio).
export function pickDiverse(
  found: { category: string; osm: OsmPlace }[],
  limit: number,
): { category: string; osm: OsmPlace }[] {
  const byCategory = new Map<string, { category: string; osm: OsmPlace }[]>();
  for (const item of found) {
    if (!byCategory.has(item.category)) byCategory.set(item.category, []);
    byCategory.get(item.category)!.push(item);
  }
  for (const bucket of byCategory.values()) shuffle(bucket);

  const categories = [...byCategory.keys()];
  const seenNames = new Set<string>();
  const picked: { category: string; osm: OsmPlace }[] = [];

  let stillHasItems = true;
  while (picked.length < limit && stillHasItems) {
    stillHasItems = false;
    for (const category of categories) {
      const bucket = byCategory.get(category)!;
      while (bucket.length) {
        const candidate = bucket.shift()!;
        if (seenNames.has(candidate.osm.name)) continue;
        seenNames.add(candidate.osm.name);
        picked.push(candidate);
        stillHasItems = true;
        break;
      }
      if (picked.length >= limit) break;
    }
  }
  return picked;
}
