import { useCallback, useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { AppHeader } from '../components/app/AppHeader'
import { Footer } from '../components/Footer'
import { PlaceCard } from '../components/app/PlaceCard'
import { PlaceModal } from '../components/app/PlaceModal'
import { ViewToggle } from '../components/app/ViewToggle'
import { Pagination } from '../components/app/Pagination'
import { EmptyState } from '../components/app/EmptyState'
import { EMPTY_FILTERS, FilterSidebar, type FiltersState } from '../components/app/FilterSidebar'
import { fetchPlace, fetchPlaces, fetchPlacesMeta, type Place, type PlacesMeta } from '../lib/placesApi'

const PAGE_SIZE = 6

function countActive(filters: FiltersState): number {
  let n = 0
  if (filters.categories.length) n += filters.categories.length
  if (filters.tags.length) n += filters.tags.length
  if (filters.state) n += 1
  if (filters.city) n += 1
  if (filters.neighborhood) n += 1
  if (filters.minRating) n += 1
  if (filters.openNow !== null) n += 1
  if (filters.priceMin > 0 || filters.priceMax < 250) n += 1
  return n
}

export function Busca() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [filters, setFilters] = useState<FiltersState>({
    ...EMPTY_FILTERS,
    q: searchParams.get('q') ?? '',
  })
  const [meta, setMeta] = useState<PlacesMeta | null>(null)
  const [places, setPlaces] = useState<Place[]>([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [view, setView] = useState<'grid' | 'list'>('grid')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [active, setActive] = useState<Place | null>(null)
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  useEffect(() => {
    fetchPlacesMeta().then(setMeta).catch((err) => setError(err.message))
  }, [])

  useEffect(() => {
    const placeId = searchParams.get('place')
    if (placeId) fetchPlace(placeId).then(setActive).catch(() => {})
  }, [searchParams])

  const runSearch = useCallback(
    async (targetPage: number) => {
      setLoading(true)
      setError(null)
      try {
        const res = await fetchPlaces({
          q: filters.q || undefined,
          categories: filters.categories,
          tags: filters.tags,
          state: filters.state || undefined,
          city: filters.city || undefined,
          neighborhood: filters.neighborhood || undefined,
          minRating: filters.minRating ?? undefined,
          priceMin: filters.priceMin,
          priceMax: filters.priceMax,
          openNow: filters.openNow,
          page: targetPage,
          pageSize: PAGE_SIZE,
        })
        setPlaces(res.items)
        setTotal(res.total)
        setPage(targetPage)
      } catch (err) {
        setError((err as Error).message)
      } finally {
        setLoading(false)
      }
    },
    [filters],
  )

  useEffect(() => {
    const timeout = setTimeout(() => runSearch(1), 250)
    return () => clearTimeout(timeout)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters])

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE))
  const activeCount = useMemo(() => countActive(filters), [filters])

  const openPlace = (place: Place) => {
    setActive(place)
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev)
      next.set('place', place.id)
      return next
    })
  }

  const closePlace = () => {
    setActive(null)
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev)
      next.delete('place')
      return next
    })
  }

  const clearFilters = () => setFilters({ ...EMPTY_FILTERS, q: filters.q })

  return (
    <div className="min-h-screen bg-[#f7f2ec]">
      <AppHeader />

      <div className="bg-white px-6 pb-8 pt-10 md:px-12 md:pt-14">
        <h1 className="font-display text-3xl font-bold text-ink md:text-4xl">Busca</h1>
        <div className="mt-5 flex flex-wrap items-center gap-3">
          <input
            value={filters.q}
            onChange={(e) => setFilters((f) => ({ ...f, q: e.target.value }))}
            placeholder="Buscar por lugar, cidade, categoria ou vibe..."
            className="w-full max-w-xl flex-1 rounded-full border border-[#e6ddd1] bg-[#f7f2ec] px-6 py-3.5 text-sm text-ink placeholder:text-muted-light focus:border-orange focus:outline-none"
          />
          <button
            type="button"
            onClick={() => setMobileFiltersOpen(true)}
            className="flex items-center gap-2 rounded-full border border-[#e6ddd1] px-4.5 py-2.5 text-sm font-bold text-ink lg:hidden"
          >
            ☰ Filtros
            {activeCount > 0 && (
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-orange text-[11px] text-white">
                {activeCount}
              </span>
            )}
          </button>
        </div>
      </div>

      <div className="mx-auto flex max-w-[1440px] gap-10 px-6 py-10 md:px-12">
        <aside className="hidden w-[280px] shrink-0 rounded-3xl border border-[#e6ddd1] bg-white p-6 lg:block h-fit">
          {meta && (
            <FilterSidebar
              meta={meta}
              filters={filters}
              onChange={(patch) => setFilters((f) => ({ ...f, ...patch }))}
              onClear={clearFilters}
              activeCount={activeCount}
            />
          )}
        </aside>

        <main className="min-w-0 flex-1">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <p className="font-display text-xl font-semibold text-ink">
                {loading ? 'Buscando...' : `${total} lugar${total === 1 ? '' : 'es'} encontrado${total === 1 ? '' : 's'}`}
              </p>
              {filters.q && <p className="text-sm text-muted">Resultados para "{filters.q}"</p>}
            </div>
            <ViewToggle value={view} onChange={setView} />
          </div>

          {error && <p className="mb-4 text-sm text-red-600">{error}</p>}

          {!loading && places.length === 0 ? (
            <EmptyState onClear={clearFilters} />
          ) : view === 'grid' ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {places.map((place) => (
                <PlaceCard key={place.id} place={place} onOpen={openPlace} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {places.map((place) => (
                <PlaceCard key={place.id} place={place} variant="list" onOpen={openPlace} />
              ))}
            </div>
          )}

          <Pagination page={page} totalPages={totalPages} onChange={runSearch} />
        </main>
      </div>

      <Footer />

      {active && <PlaceModal place={active} onClose={closePlace} />}

      {mobileFiltersOpen && meta && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-ink/50 lg:hidden" onClick={() => setMobileFiltersOpen(false)}>
          <div
            className="max-h-[85vh] w-full overflow-y-auto rounded-t-[28px] bg-white p-6 pb-28"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mx-auto mb-4 h-1.5 w-11 rounded-full bg-[#e6ddd1]" />
            <FilterSidebar
              meta={meta}
              filters={filters}
              onChange={(patch) => setFilters((f) => ({ ...f, ...patch }))}
              onClear={clearFilters}
              activeCount={activeCount}
            />
            <div className="fixed inset-x-0 bottom-0 flex gap-3 border-t border-[#e6ddd1] bg-white p-4">
              <button
                type="button"
                onClick={clearFilters}
                className="flex-1 rounded-full border border-[#e6ddd1] py-3 text-sm font-bold text-ink"
              >
                Limpar
              </button>
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(false)}
                className="flex-[1.6] rounded-full bg-orange py-3 text-sm font-bold text-white"
              >
                Ver {total} lugares
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
