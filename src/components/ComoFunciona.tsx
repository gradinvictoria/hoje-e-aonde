const STEPS = [
  {
    n: '01',
    t: 'Descubra',
    d: 'Diga o que você está procurando. Explore lugares, experiências, eventos, aulas e atividades.',
    offset: '',
  },
  {
    n: '02',
    t: 'Filtre',
    d: 'Encontre exatamente o que combina com você: preço, localização, avaliação, categoria, tags e disponibilidade.',
    offset: 'lg:mt-14',
  },
  {
    n: '03',
    t: 'Escolha',
    d: 'Achou? Agora é só ir. Veja fotos, detalhes, localização, categorias e informações do estabelecimento.',
    offset: '',
  },
]

export function ComoFunciona() {
  return (
    <section id="como-funciona" className="bg-ink px-6 py-24 md:px-12 md:py-32">
      <div className="mx-auto max-w-[1200px]">
        <h2 className="font-display text-center text-4xl font-extrabold text-white sm:text-5xl">
          É simples. Você pergunta. A gente encontra.
        </h2>

        <div className="mt-20 grid gap-14 sm:grid-cols-3 sm:gap-10">
          {STEPS.map((s) => (
            <div key={s.n} className={s.offset}>
              <p className="font-display text-7xl font-extrabold text-[#2A241E] sm:text-8xl">{s.n}</p>
              <p className="-mt-3 text-2xl font-bold text-orange">{s.t}</p>
              <p className="mt-2 text-[15px] text-[#B8ADA0]">{s.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
