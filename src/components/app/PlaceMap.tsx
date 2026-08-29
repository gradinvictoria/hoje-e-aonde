import { useEffect, useRef } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'

// O bundler não resolve os caminhos padrão dos ícones do Leaflet — sem isso
// o marcador some (bug conhecido do Leaflet com Vite/Webpack).
const markerIconDefault = L.icon({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
})

type Props = {
  lat: number
  lng: number
  label: string
}

export function PlaceMap({ lat, lng, label }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<L.Map | null>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const map = L.map(containerRef.current, {
      center: [lat, lng],
      zoom: 15,
      scrollWheelZoom: false,
    })
    mapRef.current = map

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map)

    L.marker([lat, lng], { icon: markerIconDefault }).addTo(map).bindPopup(label)

    return () => {
      map.remove()
      mapRef.current = null
    }
  }, [lat, lng, label])

  return (
    <div
      ref={containerRef}
      className="h-64 w-full overflow-hidden rounded-2xl border border-[#e6ddd1]"
      role="img"
      aria-label={`Mapa mostrando a localização de ${label}`}
    />
  )
}
