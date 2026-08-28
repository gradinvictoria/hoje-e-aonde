import { useState } from 'react'

const CATEGORIES = [
  { label: 'Restaurantes', checked: true },
  { label: 'Bares', checked: true },
  { label: 'Eventos', checked: false },
  { label: 'Aulas', checked: false },
]

const TAGS = [
  { label: 'Pet Friendly', checked: true },
  { label: 'Estacionamento', checked: true },
  { label: 'Música ao vivo', checked: false },
]

const RESULTS = [
  { t: 'A Barista', c: 'Cafeteria', meta: '★ 4.8', tag: '📍 Barra', bg: 'bg-yellow' },
  { t: 'Sundown Bar', c: 'Bar', meta: '★ 4.6', tag: '🐶 Pet Friendly', bg: 'bg-pink' },
  { t: 'Boteco da Ladeira', c: 'Buteco', meta: '★ 4.7', tag: '🅿️ Estacionamento', bg: 'bg-ink' },
  { t: 'Sol & Lua', c: 'Restaurante', meta: '★ 4.9', tag: '📍 Rio Vermelho', bg: 'bg-orange' },
  { t: 'Café Comunidade', c: 'Cafeteria', meta: '★ 4.5', tag: '🐶 Pet Friendly', bg: 'bg-[#FFD98A]' },
  { t: 'Vista Alta', c: 'Bar', meta: '★ 4.8', tag: '🅿️ Estacionamento', bg: 'bg-[#FF8A5C]' },
]

function Checkbox({ label, defaultChecked }: { label: string; defaultChecked: boolean }) {
  const [checked, setChecked] = useState(defaultChecked)
  return (
    <label className="flex cursor-pointer items-center gap-3 py-1.5 text-sm text-ink">
      <span
        onClick={() => setChecked((v) => !v)}
        className={`flex h-[18px] w-[18px] items-center justify-center rounded-[5px] border ${
          checked ? 'border-orange bg-orange text-white' : 'border-border bg-white'
        }`}
      >
        {checked && '✓'}
      </span>
      {label}
    </label>
  )
}

export function MockupBusca() {
  const [view, setView] = useState<'cards' | 'lista'>('cards')

  return (
    <section id="busca" className="bg-white px-6 py-24 md:px-12 md:py-28">
      <div className="mx-auto max-w-[1240px]">
        <p className="text-sm font-bold text-orange">BUSCA PERSONALIZADA</p>
        <h2 className="mt-3 font-display text-4xl font-extrabold text-ink sm:text-5xl">Filtre do seu jeito.</h2>

        <div className="relative mt-16">
          <div className="absolute -top-1 -right-1 -bottom-10 -left-10 -z-10 hidden rounded-[36px] bg-orange sm:block" />
          <div className="rotate-0 rounded-[28px] border-[3px] border-ink bg-white p-6 shadow-2xl sm:-rotate-[2deg] sm:p-8">
            <div className="flex items-center gap-4 rounded-2xl bg-[#F5F5F5] px-5 py-4">
              <span>🔎</span>
              <span className="flex-1 text-[15px] text-muted">O que você está procurando?</span>
              <button className="rounded-xl bg-orange px-5 py-3 text-sm font-bold text-white">Explorar</button>
            </div>

            <div className="mt-8 grid gap-10 lg:grid-cols-[260px_1fr]">
              <aside className="space-y-7">
                <div>
                  <p className="mb-3 text-sm font-bold text-ink">Faixa de preço</p>
                  <div className="relative h-1.5 rounded-full bg-[#F0E4DC]">
                    <div className="absolute inset-y-0 left-0 w-[55%] rounded-full bg-orange" />
                    <div className="absolute top-1/2 left-[55%] h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-orange bg-white" />
                  </div>
                  <div className="mt-2 flex justify-between text-xs text-muted">
                    <span>R$ 20</span>
                    <span>R$ 150</span>
                  </div>
                </div>

                <div>
                  <p className="mb-3 text-sm font-bold text-ink">Onde?</p>
                  <div className="space-y-2">
                    {['Estado', 'Cidade', 'Bairro'].map((l) => (
                      <div key={l} className="rounded-[10px] border border-border px-3.5 py-2.5 text-sm text-muted">
                        {l}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="mb-2 text-sm font-bold text-ink">Avaliação</p>
                  <p className="text-orange">★★★★<span className="text-border">★</span></p>
                  <p className="mt-1 text-xs text-muted">a partir de 4 estrelas</p>
                </div>

                <div>
                  <p className="mb-3 text-sm font-bold text-ink">Aberto agora</p>
                  <div className="flex gap-2">
                    <span className="rounded-full bg-ink px-4 py-2 text-[13px] font-medium text-white">Sim</span>
                    <span className="rounded-full border border-border px-4 py-2 text-[13px] font-medium text-ink">Não</span>
                  </div>
                </div>

                <div>
                  <p className="mb-1 text-sm font-bold text-ink">Categorias</p>
                  {CATEGORIES.map((c) => (
                    <Checkbox key={c.label} label={c.label} defaultChecked={c.checked} />
                  ))}
                </div>

                <div>
                  <p className="mb-1 text-sm font-bold text-ink">Tags</p>
                  {TAGS.map((t) => (
                    <Checkbox key={t.label} label={t.label} defaultChecked={t.checked} />
                  ))}
                </div>
              </aside>

              <div>
                <div className="mb-5 flex items-center justify-between">
                  <p className="font-bold text-ink">Resultados para sua busca</p>
                  <div className="flex rounded-full bg-[#F5F5F5] p-1">
                    <button
                      onClick={() => setView('cards')}
                      className={`rounded-full px-4 py-1.5 text-[13px] font-bold ${
                        view === 'cards' ? 'bg-ink text-white' : 'text-muted'
                      }`}
                    >
                      Cards
                    </button>
                    <button
                      onClick={() => setView('lista')}
                      className={`rounded-full px-4 py-1.5 text-[13px] font-medium ${
                        view === 'lista' ? 'bg-ink text-white' : 'text-muted'
                      }`}
                    >
                      Lista
                    </button>
                  </div>
                </div>

                <div className={view === 'cards' ? 'grid gap-5 sm:grid-cols-2' : 'space-y-3'}>
                  {RESULTS.map((r) =>
                    view === 'cards' ? (
                      <div key={r.t} className="overflow-hidden rounded-2xl border border-border">
                        <div className={`h-28 ${r.bg}`} />
                        <div className="p-3.5">
                          <p className="text-[15px] font-bold text-ink">{r.t}</p>
                          <p className="text-xs text-muted">
                            {r.c} · {r.meta}
                          </p>
                          <span className="mt-2 inline-block rounded-full bg-orange-soft px-3 py-1 text-[11px] text-orange">
                            {r.tag}
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div key={r.t} className="flex items-center gap-4 rounded-2xl border border-border p-3">
                        <div className={`h-14 w-14 flex-shrink-0 rounded-xl ${r.bg}`} />
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-[15px] font-bold text-ink">{r.t}</p>
                          <p className="text-xs text-muted">
                            {r.c} · {r.meta}
                          </p>
                        </div>
                        <span className="hidden flex-shrink-0 rounded-full bg-orange-soft px-3 py-1 text-[11px] text-orange sm:inline-block">
                          {r.tag}
                        </span>
                      </div>
                    ),
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
