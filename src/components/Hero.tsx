import { useLeadModal } from '../lib/leadModal'

const FRAGMENTS = [
  { title: 'A Barista', meta: '☕ Cafeteria', bg: 'bg-yellow', dark: false, className: 'left-0 top-0 w-56 rotate-[-11deg]' },
  { title: 'Roda de Samba', meta: '🎵 Hoje às 20h', bg: 'bg-pink', dark: true, className: 'right-0 top-8 w-56 rotate-[8deg]' },
  { title: 'Aula de Cerâmica', meta: '🏺 Para iniciantes', bg: 'bg-orange', dark: false, className: 'left-4 top-56 w-52 rotate-[6deg]' },
  { title: 'Sundown Bar', meta: '🍹 Aberto agora', bg: 'bg-ink', dark: true, className: 'right-2 top-72 w-56 rotate-[-7deg]' },
]

const BADGES = [
  { label: '📍 Salvador', className: 'left-0 top-[210px] -rotate-6 bg-white text-ink' },
  { label: 'Aberto agora', className: 'right-10 bottom-0 rotate-3 bg-orange text-white' },
  { label: '★★★★★', className: 'right-8 top-0 rotate-6 bg-ink text-white' },
  { label: '🐶 Pet Friendly', className: 'left-0 bottom-2 -rotate-3 bg-white text-ink' },
]

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

        <div className="relative mx-auto hidden h-[420px] w-full max-w-[560px] md:block">
          {FRAGMENTS.map((f) => (
            <div
              key={f.title}
              className={`absolute overflow-hidden rounded-2xl bg-white shadow-[0_18px_36px_rgba(0,0,0,0.35)] ${f.className}`}
            >
              <div className={`h-24 w-full ${f.bg}`} />
              <div className={`p-4 ${f.dark ? 'bg-ink' : 'bg-white'}`}>
                <p className={`text-sm font-bold ${f.dark ? 'text-white' : 'text-ink'}`}>{f.title}</p>
                <p className={`text-xs ${f.dark ? 'text-[#B8ADA0]' : 'text-muted'}`}>{f.meta}</p>
              </div>
            </div>
          ))}
          {BADGES.map((b) => (
            <span
              key={b.label}
              className={`absolute rounded-full px-4 py-2.5 text-[13px] font-bold shadow-lg ${b.className}`}
            >
              {b.label}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
