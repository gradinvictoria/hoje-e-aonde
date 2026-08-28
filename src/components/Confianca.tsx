const ITEMS = [
  { icon: '📋', label: 'Informações organizadas', bg: 'bg-[#FFF3E8]' },
  { icon: '⭐', label: 'Avaliações reais', bg: 'bg-pink-soft' },
  { icon: '🏷️', label: 'Categorias claras', bg: 'bg-yellow-soft' },
  { icon: '📍', label: 'Localização exata', bg: 'bg-ink text-white' },
  { icon: '📸', label: 'Fotos atualizadas', bg: 'bg-[#FFF3E8]' },
  { icon: '🔎', label: 'Filtros precisos', bg: 'bg-pink-soft' },
]

export function Confianca() {
  return (
    <section id="confianca" className="px-6 py-24 md:px-12 md:py-28">
      <div className="mx-auto max-w-[1200px]">
        <h2 className="font-display text-4xl font-extrabold leading-tight sm:text-5xl">
          <span className="text-ink">Descobrir pode ser divertido.</span>
          <br />
          <span className="text-orange">Confiar também.</span>
        </h2>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {ITEMS.map((it) => (
            <div key={it.label} className={`flex items-center gap-4 rounded-[20px] p-6 ${it.bg}`}>
              <span className="text-2xl">{it.icon}</span>
              <p className="text-[16px] font-bold">{it.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
