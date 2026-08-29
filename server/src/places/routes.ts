import { Router } from "express";
import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();
export const placesRouter = Router();

function toStringArray(value: unknown): string[] {
  if (!value) return [];
  if (Array.isArray(value)) return value.map(String).filter(Boolean);
  return String(value)
    .split(",")
    .map((v) => v.trim())
    .filter(Boolean);
}

function priceLevel(avgPrice: number): 1 | 2 | 3 {
  if (avgPrice <= 30) return 1;
  if (avgPrice <= 80) return 2;
  return 3;
}

function serialize<T extends { avgPrice: number }>(place: T) {
  return { ...place, priceLevel: priceLevel(place.avgPrice) };
}

// GET /api/places — feed (Home) e resultados filtrados (Busca).
placesRouter.get("/", async (req, res) => {
  const {
    q,
    categories,
    tags,
    state,
    city,
    neighborhood,
    minRating,
    priceMin,
    priceMax,
    openNow,
    sort,
    page = "1",
    pageSize = "9",
  } = req.query;

  const categoryList = toStringArray(categories);
  const tagList = toStringArray(tags);
  const pageNum = Math.max(1, Number(page) || 1);
  const pageSizeNum = Math.min(60, Math.max(1, Number(pageSize) || 9));

  const where: Prisma.PlaceWhereInput = {
    ...(q ? {
      OR: [
        { name: { contains: String(q), mode: "insensitive" } },
        { description: { contains: String(q), mode: "insensitive" } },
        { category: { contains: String(q), mode: "insensitive" } },
      ],
    } : {}),
    ...(categoryList.length ? { category: { in: categoryList } } : {}),
    ...(tagList.length ? { tags: { hasSome: tagList } } : {}),
    ...(state ? { state: String(state) } : {}),
    ...(city ? { city: String(city) } : {}),
    ...(neighborhood ? { neighborhood: String(neighborhood) } : {}),
    ...(minRating ? { rating: { gte: Number(minRating) } } : {}),
    ...(openNow === "true" ? { openNow: true } : {}),
    ...(openNow === "false" ? { openNow: false } : {}),
    ...(priceMin || priceMax
      ? {
          avgPrice: {
            ...(priceMin ? { gte: Number(priceMin) } : {}),
            ...(priceMax ? { lte: Number(priceMax) } : {}),
          },
        }
      : {}),
  };

  const orderBy: Prisma.PlaceOrderByWithRelationInput[] =
    sort === "rating"
      ? [{ rating: "desc" }]
      : sort === "reviews"
        ? [{ reviewsCount: "desc" }]
        : sort === "price-asc"
          ? [{ avgPrice: "asc" }]
          : sort === "price-desc"
            ? [{ avgPrice: "desc" }]
            : [{ sponsored: "desc" }, { rating: "desc" }];

  const [items, total] = await Promise.all([
    prisma.place.findMany({
      where,
      orderBy,
      skip: (pageNum - 1) * pageSizeNum,
      take: pageSizeNum,
    }),
    prisma.place.count({ where }),
  ]);

  res.json({
    items: items.map(serialize),
    total,
    page: pageNum,
    pageSize: pageSizeNum,
  });
});

// GET /api/places/meta — opções e contagens para o filtro lateral da Busca.
placesRouter.get("/meta", async (_req, res) => {
  const places = await prisma.place.findMany({
    select: { category: true, tags: true, state: true, city: true, neighborhood: true },
  });

  const count = (values: string[]) => {
    const map = new Map<string, number>();
    for (const v of values) map.set(v, (map.get(v) ?? 0) + 1);
    return [...map.entries()]
      .map(([name, total]) => ({ name, count: total }))
      .sort((a, b) => b.count - a.count);
  };

  const categories = count(places.map((p) => p.category));
  const tags = count(places.flatMap((p) => p.tags));
  const states = [...new Set(places.map((p) => p.state))].sort();
  const cities = [...new Set(places.map((p) => p.city))].sort();
  const neighborhoods = [...new Set(places.map((p) => p.neighborhood))].sort();

  res.json({ categories, tags, states, cities, neighborhoods });
});

// GET /api/places/:id — detalhe usado no modal do estabelecimento.
placesRouter.get("/:id", async (req, res) => {
  const place = await prisma.place.findUnique({ where: { id: req.params.id } });
  if (!place) {
    res.status(404).json({ error: "Estabelecimento não encontrado." });
    return;
  }
  res.json(serialize(place));
});
