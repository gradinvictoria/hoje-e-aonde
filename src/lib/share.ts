import type { Place } from './placesApi'

function placeUrl(place: Place): string {
  return `${window.location.origin}/busca?place=${place.id}`
}

function shareText(place: Place): string {
  return `Olha o que eu achei no Hoje é aonde?: ${place.name} — ${place.neighborhood}, ${place.city}.`
}

export function shareOnWhatsApp(place: Place) {
  const text = `${shareText(place)} ${placeUrl(place)}`
  window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer')
}

export async function copyPlaceLink(place: Place): Promise<void> {
  await navigator.clipboard.writeText(placeUrl(place))
}

// O Instagram não tem uma URL de compartilhamento web — o padrão do app é
// copiar o link e colar manualmente numa Stories/DM, então reaproveitamos
// a mesma cópia de link e deixamos o rótulo do botão guiar a pessoa.
export async function shareOnInstagram(place: Place): Promise<void> {
  await copyPlaceLink(place)
}

export function canUseNativeShare(): boolean {
  return typeof navigator !== 'undefined' && 'share' in navigator
}

export async function shareNative(place: Place): Promise<void> {
  await navigator.share({
    title: place.name,
    text: shareText(place),
    url: placeUrl(place),
  })
}
