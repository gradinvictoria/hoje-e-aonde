export function DestaquePatrocinado() {
  return (
    <section className="overflow-hidden bg-ink px-6 py-24 md:px-12 md:py-28">
      <div className="mx-auto grid max-w-[1200px] items-center gap-14 lg:grid-cols-[1fr_420px]">
        <div>
          <p className="text-sm font-bold text-orange">DESTAQUE</p>
          <h2 className="mt-4 font-display text-4xl font-extrabold text-white sm:text-[42px]">
            Quer ser visto por mais gente?
          </h2>
          <p className="mt-5 max-w-md text-[16px] text-[#B8ADA0]">
            Estabelecimentos e organizadores podem ganhar destaque dentro da plataforma e aparecer
            para pessoas que estão procurando algo para fazer.
          </p>
        </div>

        <div className="relative mx-auto w-full max-w-[420px]">
          <div className="absolute -inset-4 rotate-[-4deg] rounded-[32px] bg-pink" />
          <div className="relative overflow-hidden rounded-[22px] bg-white shadow-2xl rotate-[3deg]">
            <div className="relative h-[150px] bg-yellow">
              <span className="absolute left-4 top-4 rounded-full bg-ink px-3.5 py-1.5 text-xs font-bold text-white">
                ✨ Em destaque
              </span>
            </div>
            <div className="p-4">
              <p className="font-bold text-ink">Sol &amp; Lua</p>
              <p className="text-sm text-muted">Restaurante · ★ 4.9 · Rio Vermelho</p>
              <p className="mt-2 text-xs text-orange">Apareça em mais buscas e feeds da sua região.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
