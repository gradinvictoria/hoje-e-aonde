import { useLeadModal } from '../lib/leadModal'

export function CTAFinal() {
  const { open } = useLeadModal()

  return (
    <section className="relative overflow-hidden bg-orange px-6 py-28 text-center md:px-12 md:py-36">
      <div className="pointer-events-none absolute -left-10 -top-10 h-40 w-40 rotate-12 rounded-3xl bg-ink/20" />
      <div className="pointer-events-none absolute -right-6 bottom-10 h-36 w-52 rotate-6 rounded-3xl bg-ink/20" />
      <div className="pointer-events-none absolute bottom-16 left-16 h-24 w-24 -rotate-12 rounded-3xl bg-white/25" />

      <div className="relative mx-auto max-w-[900px]">
        <p className="text-lg text-[#3A1200] sm:text-2xl">Pare de perguntar "o que tem para fazer?".</p>
        <h2 className="mt-3 font-display text-4xl font-extrabold text-ink sm:text-6xl">Pergunte: Hoje é aonde?</h2>
        <p className="mt-5 text-lg text-[#FFF3E6]">Descubra seu próximo lugar, experiência ou rolê.</p>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <a href="#busca" className="rounded-full bg-ink px-7 py-4 text-[15px] font-bold text-white">
            Explorar agora
          </a>
          <button onClick={open} className="rounded-full bg-white px-7 py-4 text-[15px] font-bold text-ink">
            Quero divulgar meu negócio
          </button>
        </div>
      </div>
    </section>
  )
}
