const ITEMS = [
  { emoji: '💰', label: 'Quanto quer gastar', bg: 'bg-yellow', rot: '-rotate-2' },
  { emoji: '📍', label: 'Onde quer ir', bg: 'bg-ink text-white', rot: 'rotate-2' },
  { emoji: '⭐', label: 'Qual avaliação aceita', bg: 'bg-orange text-white', rot: '-rotate-1' },
  { emoji: '🟢', label: 'O que está aberto agora', bg: 'bg-pink text-white', rot: 'rotate-2' },
  { emoji: '🍔', label: 'O que quer fazer', bg: 'bg-ink text-white', rot: 'rotate-1' },
  { emoji: '🐶', label: 'O que combina com você', bg: 'bg-yellow', rot: '-rotate-2' },
]

export function EncontreDoSeuJeito() {
  return (
    <section className="overflow-hidden px-6 py-24 md:px-12 md:py-28">
      <div className="mx-auto max-w-[1200px]">
        <h2 className="font-display text-4xl font-extrabold text-ink sm:text-5xl">Cada pessoa tem um rolê.</h2>
        <p className="mt-4 text-lg text-muted">Por isso, você escolhe o que importa.</p>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {ITEMS.map((it) => (
            <div
              key={it.label}
              className={`rounded-3xl p-6 shadow-lg transition-transform hover:rotate-0 ${it.bg} ${it.rot}`}
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 text-2xl">
                {it.emoji}
              </span>
              <p className="mt-6 text-lg font-bold">{it.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
