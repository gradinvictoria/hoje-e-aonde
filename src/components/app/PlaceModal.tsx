import { useState } from 'react'
import { placeLocationLabel, priceLabel, type Place } from '../../lib/placesApi'
import { canUseNativeShare, copyPlaceLink, shareNative, shareOnInstagram, shareOnWhatsApp } from '../../lib/share'
import { useFavorites } from '../../lib/favorites'
import { PlaceMap } from './PlaceMap'

type Props = {
  place: Place
  onClose: () => void
}

function ShareRow({ place }: { place: Place }) {
  const [feedback, setFeedback] = useState<string | null>(null)

  const flash = (msg: string) => {
    setFeedback(msg)
    setTimeout(() => setFeedback(null), 2200)
  }

  return (
    <div className="flex flex-col gap-2">
      <p className="text-sm font-medium text-muted">Compartilhar via</p>
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => shareOnWhatsApp(place)}
          className="rounded-full bg-[#25D366] px-4 py-2 text-sm font-bold text-white"
        >
          WhatsApp
        </button>
        <button
          type="button"
          onClick={() => {
            shareOnInstagram(place)
            flash('Link copiado! Cole nos stories ou no direct do Instagram.')
          }}
          className="rounded-full bg-[#C1348B] px-4 py-2 text-sm font-bold text-white"
        >
          Instagram
        </button>
        <button
          type="button"
          onClick={() => {
            copyPlaceLink(place)
            flash('Link copiado para a área de transferência!')
          }}
          className="rounded-full bg-ink px-4 py-2 text-sm font-bold text-white"
        >
          Copiar link
        </button>
        {canUseNativeShare() && (
          <button
            type="button"
            onClick={() => shareNative(place)}
            className="rounded-full border border-[#e6ddd1] px-4 py-2 text-sm font-bold text-ink"
          >
            Mais opções
          </button>
        )}
      </div>
      {feedback && <p className="text-xs font-medium text-orange">{feedback}</p>}
    </div>
  )
}

export function PlaceModal({ place, onClose }: Props) {
  const { isFavorite, toggle } = useFavorites()
  const [mainPhoto, setMainPhoto] = useState(0)
  const thumbs = place.photos.slice(1, 5)

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-ink/45 px-4 py-10"
      onClick={onClose}
    >
      <div
        className="w-full max-w-[900px] rounded-[32px] bg-white p-6 md:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-5 flex items-center justify-between">
          {place.sponsored ? (
            <span className="rounded-lg bg-pink px-3 py-1 text-[11px] font-bold uppercase text-white">
              Em destaque
            </span>
          ) : (
            <span />
          )}
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f7f2ec] text-ink"
          >
            ✕
          </button>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-[1.6fr_1fr]">
          <img
            src={place.photos[mainPhoto]}
            alt={place.name}
            className="h-70 w-full rounded-2xl object-cover sm:h-full"
            style={{ minHeight: 220 }}
          />
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-1">
            {thumbs.map((photo, i) => (
              <button
                key={photo}
                type="button"
                onClick={() => setMainPhoto(i + 1)}
                className="overflow-hidden rounded-2xl"
              >
                <img src={photo} alt="" className="h-full max-h-32 w-full object-cover sm:max-h-none" />
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-orange-soft px-3 py-1 text-[11px] font-bold uppercase text-orange">
                {place.category}
              </span>
              {place.tags.slice(0, 2).map((tag) => (
                <span key={tag} className="rounded-full bg-[#f7f2ec] px-3 py-1 text-[11px] font-medium text-muted">
                  {tag}
                </span>
              ))}
            </div>
            <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">{place.name}</h2>
            <p className="mt-1 flex items-center gap-1 text-sm text-muted">
              📍 {placeLocationLabel(place)}
              {place.neighborhood !== place.city && ` — ${place.state}`}
            </p>
          </div>
          <div className="text-right">
            <p className="flex items-center gap-1 text-lg font-bold text-ink sm:justify-end">
              <span className="text-[#ffb100]">★</span> {place.rating.toFixed(1)}
            </p>
            <p className="text-xs text-muted-light">{place.reviewsCount} avaliações verificadas</p>
            <p className="mt-1 text-sm font-bold text-ink">{priceLabel(place.priceLevel)}</p>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => toggle(place.id)}
            className="flex items-center gap-2 rounded-full border border-[#e6ddd1] px-5 py-2.5 text-sm font-bold text-ink"
          >
            <span className={isFavorite(place.id) ? 'text-pink' : ''}>♥</span> Favoritar
          </button>
          <span
            className={`rounded-full px-4 py-2 text-sm font-bold ${
              place.openNow ? 'bg-[#eafaf0] text-[#1c8a4b]' : 'bg-[#fdeceb] text-[#c93b30]'
            }`}
          >
            {place.openNow ? 'Aberto agora' : 'Fechado agora'}
          </span>
        </div>

        <hr className="my-6 border-[#e6ddd1]" />

        <div>
          <h3 className="mb-2 font-display text-lg font-semibold text-ink">Sobre o local</h3>
          <p className="text-[15px] leading-relaxed text-muted">{place.description}</p>
        </div>

        {place.lat != null && place.lng != null && (
          <>
            <hr className="my-6 border-[#e6ddd1]" />
            <div>
              <h3 className="mb-2 font-display text-lg font-semibold text-ink">Localização</h3>
              <PlaceMap lat={place.lat} lng={place.lng} label={place.name} />
            </div>
          </>
        )}

        <hr className="my-6 border-[#e6ddd1]" />

        <ShareRow place={place} />
      </div>
    </div>
  )
}
