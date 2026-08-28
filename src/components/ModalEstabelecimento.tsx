const PHOTOS = ['bg-pink', 'bg-[#B34579]', 'bg-yellow', 'bg-[#E4CDA6]']
const TAGS = ['🐶 Pet Friendly', '🅿️ Estacionamento', '📶 Wi-Fi grátis']

export function ModalEstabelecimento() {
  return (
    <section className="overflow-hidden bg-ink px-6 py-24 md:px-12 md:py-28">
      <div className="mx-auto max-w-[1240px]">
        <p className="text-sm font-bold text-orange">MODAL DE ESTABELECIMENTO</p>
        <h2 className="mt-3 font-display text-4xl font-extrabold text-white sm:text-5xl">
          Todos os detalhes, num toque.
        </h2>

        <div className="relative mx-auto mt-16 max-w-[640px]">
          <div className="absolute -top-6 -right-10 -bottom-6 -left-6 rotate-3 rounded-[36px] bg-pink" />
          <div className="absolute -top-2 -right-6 -bottom-2 -left-2 -rotate-3 rounded-[32px] bg-orange" />

          <div className="relative -rotate-3 overflow-hidden rounded-3xl border-[3px] border-ink bg-white">
            <div className="relative h-64 bg-orange sm:h-72">
              <span className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white text-ink">
                ✕
              </span>
              <span className="absolute bottom-4 left-4 rounded-full bg-ink/80 px-3 py-1.5 text-xs font-bold text-white">
                1 / 5
              </span>
            </div>

            <div className="grid grid-cols-4 gap-2.5 p-6 pb-0">
              {PHOTOS.map((c, i) => (
                <div key={i} className={`h-16 rounded-[10px] ${c}`} />
              ))}
            </div>

            <div className="p-6">
              <span className="inline-block rounded-full bg-[#FFE5D9] px-3.5 py-1.5 text-[13px] text-orange">
                ☕ Cafeteria
              </span>
              <div className="mt-3 flex flex-wrap items-baseline gap-x-3">
                <h3 className="font-display text-2xl font-bold text-ink">A Barista</h3>
                <span className="text-sm text-muted">★ 4.8 · $$ · Barra, Salvador</span>
              </div>
              <p className="mt-3 text-[15px] text-muted">
                Cafeteria de especialidade com ambiente aconchegante, opções veganas e uma seleção de
                grãos torrados na casa.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {TAGS.map((t) => (
                  <span key={t} className="rounded-full bg-[#F5F5F5] px-3.5 py-1.5 text-[13px] text-ink">
                    {t}
                  </span>
                ))}
              </div>

              <hr className="my-5 border-border" />

              <p className="mb-3 text-[15px] font-bold text-ink">Compartilhar</p>
              <div className="flex flex-wrap gap-3">
                <a
                  href="https://wa.me/?text=Olha%20esse%20lugar%20no%20Hoje%20%C3%A9%20aonde%3F"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 rounded-[14px] bg-[#25A25A] px-4 py-3 text-sm font-bold text-white"
                >
                  💬 WhatsApp
                </a>
                <button className="flex items-center gap-2 rounded-[14px] bg-[#C13584] px-4 py-3 text-sm font-bold text-white">
                  📷 Instagram
                </button>
                <button
                  onClick={() => navigator.clipboard?.writeText(window.location.href)}
                  className="flex items-center gap-2 rounded-[14px] bg-ink px-4 py-3 text-sm font-bold text-white"
                >
                  🔗 Copiar link
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
