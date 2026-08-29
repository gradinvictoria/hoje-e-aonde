import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppHeader } from '../components/app/AppHeader'
import { Footer } from '../components/Footer'
import { PlaceCard } from '../components/app/PlaceCard'
import { PlaceModal } from '../components/app/PlaceModal'
import { fetchPlaces, type Place } from '../lib/placesApi'

const PAGE_SIZE = 9

export function Home() {
  const navigate = useNavigate()
  const [q, setQ] = useState('')
  const [places, setPlaces] = useState<Place[]>([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [active, setActive] = useState<Place | null>(null)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    fetchPlaces({ page: 1, pageSize: PAGE_SIZE, sort: 'relevance' })
      .then((res) => {
        if (cancelled) return
        setPlaces(res.items)
        setTotal(res.total)
        setPage(1)
      })
      .catch((err) => !cancelled && setError(err.message))
      .finally(() => !cancelled && setLoading(false))
    return () => {
      cancelled = true
    }
  }, [])

  const loadMore = async () => {
    const next = page + 1
    setLoading(true)
    try {
      const res = await fetchPlaces({ page: next, pageSize: PAGE_SIZE, sort: 'relevance' })
      setPlaces((prev) => [...prev, ...res.items])
      setPage(next)
    } catch (err) {
      setError((err as Error).message)
    } finally {
      setLoading(false)
    }
  }

  const hasMore = places.length < total

  return (
    <div className="min-h-screen bg-white">
      <AppHeader />

      <section className="bg-ink px-6 py-8 md:px-12">
        <div className="mx-auto flex max-w-[1440px] flex-col items-center gap-6 text-center md:flex-row md:items-center md:justify-between md:text-left">
          <div className="md:shrink-0">
            <h1 className="font-display text-2xl font-bold text-white md:text-3xl">
              O que você quer fazer hoje?
            </h1>
            <p className="mt-2 max-w-md text-sm text-[#d8cfc4] md:text-base">
              Descubra lugares, experiências, aulas e eventos perto de você.
            </p>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              navigate(`/busca${q ? `?q=${encodeURIComponent(q)}` : ''}`)
            }}
            className="flex w-full max-w-md flex-col gap-3 sm:flex-row md:w-auto md:flex-1 md:max-w-2xl"
          >
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Buscar por lugar, cidade, categoria ou vibe..."
              className="flex-1 rounded-full px-6 py-4 text-sm text-ink placeholder:text-muted-light focus:outline-none"
            />
            <button type="submit" className="rounded-full bg-orange px-8 py-4 text-sm font-bold text-white">
              Buscar
            </button>
          </form>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-6 py-16 md:px-12">
        <h2 className="font-display text-2xl font-semibold text-ink md:text-3xl">Em alta perto de você</h2>
        <p className="mt-1 text-[15px] text-muted">Lugares, experiências, aulas e eventos em destaque hoje.</p>

        {error && <p className="mt-8 text-sm text-red-600">{error}</p>}

        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {places.map((place) => (
            <PlaceCard key={place.id} place={place} onOpen={setActive} />
          ))}
        </div>

        {loading && places.length === 0 && <p className="mt-10 text-center text-muted">Carregando...</p>}

        {hasMore && (
          <div className="mt-10 flex justify-center">
            <button
              type="button"
              onClick={loadMore}
              disabled={loading}
              className="rounded-full border-2 border-orange px-8 py-3 text-sm font-bold text-orange disabled:opacity-50"
            >
              {loading ? 'Carregando...' : 'Carregar mais'}
            </button>
          </div>
        )}
      </section>

      <Footer />

      {active && <PlaceModal place={active} onClose={() => setActive(null)} />}
    </div>
  )
}
