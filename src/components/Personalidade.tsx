const BUBBLES = [
  { label: 'Hoje tem samba.', bg: 'bg-pink text-white', rot: '-rotate-6' },
  { label: 'Hoje tem sushi.', bg: 'bg-yellow text-ink', rot: 'rotate-3' },
  { label: 'Hoje tem aula de dança.', bg: 'bg-white text-ink', rot: '-rotate-2' },
  { label: 'Hoje tem corrida.', bg: 'bg-orange text-white', rot: 'rotate-3' },
  { label: 'Hoje tem show.', bg: 'bg-white text-ink', rot: '-rotate-3' },
  { label: 'Hoje tem encontro de Border Collies.', bg: 'bg-pink text-white', rot: 'rotate-2' },
  { label: 'Hoje tem aquele lugar que você nunca tinha ouvido falar.', bg: 'bg-orange text-white', rot: '-rotate-1' },
]

export function Personalidade() {
  return (
    <section className="bg-ink px-6 py-28 text-center md:px-12 md:py-36">
      <div className="mx-auto max-w-[900px]">
        <h2 className="font-display text-4xl font-extrabold text-white sm:text-6xl">Então... hoje é aonde?</h2>

        <div className="mt-16 flex flex-wrap items-center justify-center gap-4">
          {BUBBLES.map((b) => (
            <span key={b.label} className={`rounded-full px-6 py-4 text-[15px] font-bold sm:text-lg ${b.bg} ${b.rot}`}>
              {b.label}
            </span>
          ))}
        </div>

        <p className="mt-14 text-2xl font-bold text-orange">O difícil vai ser escolher.</p>
      </div>
    </section>
  )
}
