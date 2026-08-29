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

      <section className="bg-ink px-6 py-20 text-center md:px-12">
        <h1 className="mx-auto max-w-2xl font-display text-3xl font-bold text-white md:text-5xl">
          O que você quer fazer hoje?
        </h1>
        <p className="mx-auto mt-4 max-w-lg text-[15px] text-[#d8cfc4] md:text-lg">
          Descubra lugares, experiências, aulas e eventos perto de você.
        </p>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            navigate(`/busca${q ? `?q=${encodeURIComponent(q)}` : ''}`)
          }}
          className="mx-auto mt-8 flex max-w-xl flex-col gap-3 sm:flex-row"
        >
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Buscar por lugar, categoria ou vibe..."
            className="flex-1 rounded-full px-6 py-4 text-sm text-ink placeholder:text-muted-light focus:outline-none"
          />
          <button type="submit" className="rounded-full bg-orange px-8 py-4 text-sm font-bold text-white">
            Buscar
          </button>
        </form>
      </section>

      <section className="mx-auto max-w-[1440px] px-6 py-16 md:px-20">
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
