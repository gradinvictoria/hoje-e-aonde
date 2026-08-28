const CHIPS = [
  { label: '🍔 Comer', bg: 'bg-ink text-white' },
  { label: '🍹 Beber', bg: 'bg-orange text-white' },
  { label: '🎵 Música', bg: 'bg-pink text-white' },
  { label: '🎭 Cultura', bg: 'bg-white text-ink border border-border' },
  { label: '🏃 Esportes', bg: 'bg-ink text-white' },
  { label: '🎓 Aprender', bg: 'bg-orange text-white' },
  { label: '🐶 Pets', bg: 'bg-pink text-white' },
  { label: '🎨 Experiências', bg: 'bg-white text-ink border border-border' },
  { label: '🎉 Eventos', bg: 'bg-ink text-white' },
  { label: '💅 Serviços', bg: 'bg-orange text-white' },
  { label: '🏍️ Encontros', bg: 'bg-pink text-white' },
  { label: '✨ E muito mais', bg: 'bg-white text-ink border border-border' },
]

export function FraseImpacto() {
  return (
    <section className="px-6 py-24 md:px-12 md:py-32">
      <div className="mx-auto max-w-[1200px]">
        <div className="grid gap-10 lg:grid-cols-[1fr_300px]">
          <h2 className="font-display text-5xl font-extrabold leading-[1.05] text-ink sm:text-6xl">
            Você não precisa <br /> saber para onde ir. <br />
            <span className="text-orange">A gente ajuda você <br /> a descobrir.</span>
          </h2>
          <p className="self-end text-[15px] text-muted lg:text-right">
            O Hoje é aonde? reúne lugares, experiências, eventos, aulas e atividades em um só lugar —
            tudo o que serve para socializar e se divertir.
          </p>
        </div>

        <div className="mt-16 flex flex-wrap gap-3">
          {CHIPS.map((c, i) => (
            <span
              key={c.label}
              className={`rounded-full px-5 py-3 text-[15px] font-medium ${c.bg} ${i % 2 === 0 ? '-rotate-2' : 'rotate-2'}`}
            >
              {c.label}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
