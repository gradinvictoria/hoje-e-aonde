const CHAIN = [
  { label: '🍹 Bar', bg: 'bg-ink text-white', offset: '' },
  { label: '🎸 Banda', bg: 'bg-white text-ink', offset: 'sm:-mt-6' },
  { label: '💃 Aula de dança', bg: 'bg-yellow text-ink', offset: 'sm:mt-4' },
  { label: '🎉 Evento', bg: 'bg-white text-ink', offset: 'sm:-mt-8' },
  { label: '📍 Lugar novo', bg: 'bg-orange text-white', offset: 'sm:mt-2' },
]

export function Descoberta() {
  return (
    <section className="overflow-hidden bg-pink px-6 py-24 md:px-12 md:py-28">
      <div className="mx-auto max-w-[1200px]">
        <h2 className="font-display text-4xl font-extrabold leading-tight sm:text-5xl">
          <span className="text-white">Talvez você só estivesse</span>
          <br />
          <span className="text-ink">procurando um bar.</span>
        </h2>
        <p className="mt-5 max-w-xl text-lg text-[#FFD9E6]">
          Mas acabou encontrando uma banda, uma aula de dança, um evento diferente e um lugar novo
          para chamar de seu.
        </p>

        <div className="mt-16 flex flex-wrap items-center gap-x-6 gap-y-8 sm:flex-nowrap">
          {CHAIN.map((c, i) => (
            <div key={c.label} className="flex items-center gap-6">
              <div
                className={`flex h-28 w-44 flex-shrink-0 items-center rounded-2xl px-5 text-[15px] font-bold shadow-xl ${c.bg} ${c.offset} ${i % 2 === 0 ? '-rotate-3' : 'rotate-3'}`}
              >
                {c.label}
              </div>
              {i < CHAIN.length - 1 && <span className="hidden text-2xl font-bold text-white sm:block">→</span>}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
