import { useLeadModal } from '../lib/leadModal'

// Posições em % calculadas a partir das coordenadas exatas do frame
// "hero-composition" (620×560) na página V2 do Figma — não são estimativas.
const COMP_W = 620
const COMP_H = 560

const FRAGMENTS = [
  { title: 'A Barista', meta: '☕ Cafeteria', bg: 'bg-yellow', x: 60, y: 0, w: 250, h: 200, rot: -11 },
  { title: 'Roda de Samba', meta: '🎵 Hoje às 20h', bg: 'bg-pink', x: 340, y: 40, w: 260, h: 210, rot: 8 },
  { title: 'Aula de Cerâmica', meta: '🏺 Para iniciantes', bg: 'bg-orange', x: 20, y: 270, w: 240, h: 220, rot: 6 },
  { title: 'Sundown Bar', meta: '🍹 Aberto agora', bg: 'bg-[#FDE186]', x: 310, y: 300, w: 270, h: 220, rot: -7 },
]

const BADGES = [
  { label: '📍 Salvador', x: 0, y: 225, rot: -6, className: 'bg-white text-ink' },
  { label: 'Aberto agora', x: 250, y: 530, rot: 4, className: 'bg-orange text-white' },
  { label: '★★★★★', x: 430, y: 10, rot: 10, className: 'bg-ink text-white' },
  { label: '🐶 Pet Friendly', x: 0, y: 520, rot: -3, className: 'bg-white text-ink' },
]

const pct = (v: number, total: number) => `${(v / total) * 100}%`

export function Hero() {
  const { open } = useLeadModal()

  return (
    <section className="bg-ink px-6 pt-16 pb-24 md:px-12 md:pt-20 md:pb-28">
      <div className="mx-auto grid max-w-[1320px] items-center gap-16 lg:grid-cols-[minmax(0,620px)_1fr]">
        <div>
          <h1 className="font-display font-extrabold text-white">
            <span className="block text-6xl leading-[0.95] sm:text-7xl">Hoje é</span>
            <span className="block text-8xl leading-[0.9] text-orange sm:text-[9.5rem]">aonde?</span>
          </h1>
          <p className="mt-8 max-w-md text-lg text-[#D8CFC4]">
            Descubra lugares, experiências, eventos e coisas incríveis para fazer perto de você.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="#busca"
              className="rounded-full bg-orange px-7 py-4 text-[15px] font-bold text-white hover:brightness-110"
            >
              Explorar agora
            </a>
            <button
              onClick={open}
              className="rounded-full border-[1.5px] border-white px-7 py-4 text-[15px] font-bold text-white hover:bg-white hover:text-ink"
            >
              Quero divulgar meu negócio
            </button>
          </div>
        </div>

        <div
          className="relative mx-auto hidden w-full max-w-[560px] md:block"
          style={{ aspectRatio: `${COMP_W} / ${COMP_H}` }}
        >
          {FRAGMENTS.map((f) => (
            <div
              key={f.title}
              className={`absolute overflow-hidden rounded-2xl bg-white shadow-[0_18px_36px_rgba(0,0,0,0.35)]`}
              style={{
                left: pct(f.x, COMP_W),
                top: pct(f.y, COMP_H),
                width: pct(f.w, COMP_W),
                height: pct(f.h, COMP_H),
                transform: `rotate(${f.rot}deg)`,
              }}
            >
              <div className={`h-[62%] w-full ${f.bg}`} />
              <div className="bg-white p-4">
                <p className="text-sm font-bold text-ink">{f.title}</p>
                <p className="text-xs text-muted">{f.meta}</p>
              </div>
            </div>
          ))}
          {BADGES.map((b) => (
            <span
              key={b.label}
              className={`absolute whitespace-nowrap rounded-full px-4 py-2.5 text-[13px] font-bold shadow-lg ${b.className}`}
              style={{ left: pct(b.x, COMP_W), top: pct(b.y, COMP_H), transform: `rotate(${b.rot}deg)` }}
            >
              {b.label}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
