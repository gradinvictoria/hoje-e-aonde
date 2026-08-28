const CARDS = [
  { emoji: '🎶', title: 'Samba hoje', sub: 'Roda de samba — 20h', dark: false, h: 'h-64', rot: '-rotate-2' },
  { emoji: '🏃', title: 'Corrida de rua', sub: '5 km — inscrição aberta', dark: true, h: 'h-52', rot: 'rotate-2' },
  { emoji: '🏺', title: 'Aula de cerâmica', sub: 'Para iniciantes', dark: false, h: 'h-56', rot: 'rotate-1' },
  { emoji: '🍓', title: 'Açaí depois da praia', sub: '', dark: true, h: 'h-44', rot: '-rotate-2' },
  { emoji: '📸', title: 'Workshop de fotografia', sub: '', dark: true, h: 'h-52', rot: 'rotate-2' },
  { emoji: '🐶', title: 'Encontro de Border Collies', sub: 'Parque da cidade — domingo', dark: false, h: 'h-60', rot: '-rotate-1' },
  { emoji: '🎸', title: 'Show de rock', sub: '', dark: true, h: 'h-56', rot: 'rotate-1' },
  { emoji: '🍻', title: 'Barzinho novo na região', sub: '', dark: false, h: 'h-52', rot: '-rotate-2' },
]

export function TemDeTudo() {
  return (
    <section className="bg-orange px-6 py-24 md:px-12 md:py-28">
      <div className="mx-auto max-w-[1320px]">
        <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
          <div>
            <p className="text-sm font-extrabold text-ink">TEMOS DE TUDO</p>
            <h2 className="mt-4 max-w-[820px] font-display text-4xl font-extrabold leading-tight text-white sm:text-5xl">
              Do rolê mais óbvio ao programa que você nem sabia que existia.
            </h2>
          </div>
          <p className="self-end text-[20px] font-bold text-[#3A1200] lg:text-right">
            No <em className="font-black italic">Hoje é aonde?</em> você encontra muito
            mais do que restaurantes. Lugares, pessoas, atividades, eventos e experiências que
            combinam com o seu momento.
          </p>
        </div>

        <div className="mt-14 columns-1 gap-6 sm:columns-2 lg:columns-3 [&>*]:mb-6">
          {CARDS.map((c) => (
            <div
              key={c.title}
              className={`break-inside-avoid rounded-3xl p-5 shadow-xl transition-transform hover:scale-[1.02] hover:rotate-0 ${c.h} ${c.rot} ${
                c.dark ? 'bg-ink text-white' : 'bg-white text-ink'
              } flex flex-col justify-between`}
            >
              <span
                className={`flex h-11 w-11 items-center justify-center rounded-full text-lg ${
                  c.dark ? 'bg-orange' : 'bg-[#F5F5F5]'
                }`}
              >
                {c.emoji}
              </span>
              <div>
                <p className="text-lg font-bold">{c.title}</p>
                {c.sub && <p className="mt-1 text-sm opacity-75">{c.sub}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
