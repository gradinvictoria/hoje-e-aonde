const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:4000'

export type Place = {
  id: string
  name: string
  category: string
  description: string
  state: string
  city: string
  neighborhood: string
  rating: number
  reviewsCount: number
  avgPrice: number
  priceLevel: 1 | 2 | 3
  tags: string[]
  photos: string[]
  sponsored: boolean
  openNow: boolean
  lat: number | null
  lng: number | null
}

export type PlacesResponse = {
  items: Place[]
  total: number
  page: number
  pageSize: number
}

export type PlacesMeta = {
  categories: { name: string; count: number }[]
  tags: { name: string; count: number }[]
  states: string[]
  cities: string[]
  neighborhoods: string[]
}

export type PlacesFilters = {
  q?: string
  categories?: string[]
  tags?: string[]
  state?: string
  city?: string
  neighborhood?: string
  minRating?: number
  priceMin?: number
  priceMax?: number
  openNow?: boolean | null
  sort?: 'relevance' | 'rating' | 'reviews' | 'price-asc' | 'price-desc'
  page?: number
  pageSize?: number
}

function buildQuery(filters: PlacesFilters): string {
  const params = new URLSearchParams()
  if (filters.q) params.set('q', filters.q)
  if (filters.categories?.length) params.set('categories', filters.categories.join(','))
  if (filters.tags?.length) params.set('tags', filters.tags.join(','))
  if (filters.state) params.set('state', filters.state)
  if (filters.city) params.set('city', filters.city)
  if (filters.neighborhood) params.set('neighborhood', filters.neighborhood)
  if (filters.minRating) params.set('minRating', String(filters.minRating))
  if (filters.priceMin != null) params.set('priceMin', String(filters.priceMin))
  if (filters.priceMax != null) params.set('priceMax', String(filters.priceMax))
  if (filters.openNow != null) params.set('openNow', String(filters.openNow))
  if (filters.sort) params.set('sort', filters.sort)
  params.set('page', String(filters.page ?? 1))
  params.set('pageSize', String(filters.pageSize ?? 9))
  return params.toString()
}

export async function fetchPlaces(filters: PlacesFilters = {}): Promise<PlacesResponse> {
  const res = await fetch(`${API_URL}/api/places?${buildQuery(filters)}`)
  if (!res.ok) throw new Error('Não foi possível carregar os estabelecimentos agora.')
  return res.json()
}

export async function fetchPlace(id: string): Promise<Place> {
  const res = await fetch(`${API_URL}/api/places/${id}`)
  if (!res.ok) throw new Error('Estabelecimento não encontrado.')
  return res.json()
}

export async function fetchPlacesMeta(): Promise<PlacesMeta> {
  const res = await fetch(`${API_URL}/api/places/meta`)
  if (!res.ok) throw new Error('Não foi possível carregar os filtros agora.')
  return res.json()
}

export function priceLabel(level: 1 | 2 | 3): string {
  return level === 1 ? '$' : level === 2 ? '$$' : '$$$'
}
