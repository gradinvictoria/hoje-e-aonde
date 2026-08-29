import { placeLocationLabel, priceLabel, type Place } from '../../lib/placesApi'
import { useFavorites } from '../../lib/favorites'

type Props = {
  place: Place
  variant?: 'grid' | 'list'
  onOpen: (place: Place) => void
}

function FavoriteButton({ place }: { place: Place }) {
  const { isFavorite, toggle } = useFavorites()
  const active = isFavorite(place.id)

  return (
    <button
      type="button"
      aria-pressed={active}
      aria-label={active ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
      onClick={(e) => {
        e.stopPropagation()
        toggle(place.id)
      }}
      className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-lg shadow-sm"
    >
      <span className={active ? 'text-pink' : 'text-[#d8cfc4]'}>♥</span>
    </button>
  )
}

function Tags({ tags }: { tags: string[] }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {tags.slice(0, 3).map((tag) => (
        <span key={tag} className="rounded-full bg-[#f7f2ec] px-3 py-1 text-[11px] font-medium text-muted">
          {tag}
        </span>
      ))}
    </div>
  )
}

export function PlaceCard({ place, variant = 'grid', onOpen }: Props) {
  if (variant === 'list') {
    return (
      <div
        role="button"
        tabIndex={0}
        onClick={() => onOpen(place)}
        onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onOpen(place)}
        className="flex w-full cursor-pointer items-center gap-6 rounded-3xl border border-[#e6ddd1] bg-white p-4 text-left transition hover:border-orange"
      >
        <img
          src={place.photos[0]}
          alt=""
          className="h-34 w-42 shrink-0 rounded-2xl object-cover"
          style={{ height: 136, width: 168 }}
        />
        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="rounded-full bg-orange-soft px-2.5 py-1 text-[11px] font-bold uppercase text-orange">
              {place.category}
            </span>
            <span className="flex items-center gap-1 text-sm">
              <span className="text-[#ffb100]">★</span>
              <span className="font-bold text-ink">{place.rating.toFixed(1)}</span>
              <span className="text-muted-light">({place.reviewsCount})</span>
            </span>
          </div>
          <p className="truncate font-display text-lg font-semibold text-ink">{place.name}</p>
          <p className="flex items-center gap-1 text-sm text-muted">
            <span>📍</span> {placeLocationLabel(place)}
          </p>
          <div className="flex items-center justify-between">
            <Tags tags={place.tags} />
            <span className="text-sm font-bold text-ink">{priceLabel(place.priceLevel)}</span>
          </div>
        </div>
        <FavoriteButton place={place} />
      </div>
    )
  }

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => onOpen(place)}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onOpen(place)}
      className="flex w-full cursor-pointer flex-col overflow-hidden rounded-3xl border border-[#e6ddd1] bg-white text-left transition hover:border-orange"
    >
      <div className="relative h-50 w-full" style={{ height: 200 }}>
        <img src={place.photos[0]} alt="" className="h-full w-full object-cover" />
        {place.sponsored && (
          <span className="absolute left-3 top-3 rounded-lg bg-ink px-2.5 py-1 text-[10px] font-semibold uppercase text-white">
            Patrocinado
          </span>
        )}
        <div className="absolute right-3 top-3">
          <FavoriteButton place={place} />
        </div>
      </div>
      <div className="flex flex-col gap-3 p-5">
        <div className="flex items-center justify-between">
          <span className="rounded-full bg-orange-soft px-2.5 py-1 text-[11px] font-bold uppercase text-orange">
            {place.category}
          </span>
          <span className="flex items-center gap-1 text-sm">
            <span className="text-[#ffb100]">★</span>
            <span className="font-bold text-ink">{place.rating.toFixed(1)}</span>
            <span className="text-muted-light">({place.reviewsCount})</span>
          </span>
        </div>
        <div>
          <p className="font-display text-lg font-semibold text-ink">{place.name}</p>
          <p className="mt-1 flex items-center gap-1 text-sm text-muted">
            <span>📍</span> {placeLocationLabel(place)}
          </p>
        </div>
        <div className="flex items-end justify-between gap-2">
          <Tags tags={place.tags} />
          <span className="shrink-0 text-sm font-bold text-ink">{priceLabel(place.priceLevel)}</span>
        </div>
      </div>
    </div>
  )
}
