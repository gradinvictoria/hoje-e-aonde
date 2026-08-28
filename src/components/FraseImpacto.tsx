const ROW_A = [
  { label: '🍔 Comer', bg: 'bg-ink text-white' },
  { label: '🍹 Beber', bg: 'bg-orange text-white' },
  { label: '🎵 Música', bg: 'bg-pink text-white' },
  { label: '🎭 Cultura', bg: 'bg-white text-ink border border-border' },
  { label: '🏃 Esportes', bg: 'bg-ink text-white' },
  { label: '🐶 Pets', bg: 'bg-pink text-white' },
]

const ROW_B = [
  { label: '💅 Serviços', bg: 'bg-orange text-white' },
  { label: '🏍️ Encontros', bg: 'bg-pink text-white' },
  { label: '✨ E muito mais', bg: 'bg-white text-ink border border-border' },
  { label: '🎓 Aprender', bg: 'bg-orange text-white' },
  { label: '🎉 Eventos', bg: 'bg-ink text-white' },
  { label: '🎨 Experiências', bg: 'bg-white text-ink border border-border' },
]

export function FraseImpacto() {
  return (
    <section className="px-6 py-24 md:px-12 md:py-32">
      <div className="mx-auto max-w-[1240px]">
        <h2 className="font-display text-4xl font-extrabold text-ink sm:text-5xl">
          Você não precisa saber para onde ir.
        </h2>

        <div className="mt-6 flex flex-col items-start gap-8 lg:flex-row lg:items-center">
          <p className="font-display text-6xl font-extrabold leading-[1.05] text-orange sm:text-7xl">
            A gente te ajuda
            <br />a descobrir.
          </p>
          <p className="max-w-[490px] text-lg text-muted">
            Reunimos lugares, experiências, eventos, aulas e atividades em um só lugar — tudo o que
            serve para socializar e se divertir.
          </p>
        </div>

        <div className="mt-16 flex flex-wrap gap-3">
          {ROW_A.map((c) => (
            <span key={c.label} className={`rounded-full px-5 py-3 text-[15px] font-medium ${c.bg}`}>
              {c.label}
            </span>
          ))}
        </div>
        <div className="mt-3 flex flex-wrap gap-3">
          {ROW_B.map((c) => (
            <span key={c.label} className={`rounded-full px-5 py-3 text-[15px] font-medium ${c.bg}`}>
              {c.label}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
