import { useLeadModal } from '../lib/leadModal'

export function CTAFinal() {
  const { open } = useLeadModal()

  return (
    <section className="relative overflow-hidden bg-orange px-6 py-28 text-center md:px-12 md:py-36">
      {/* cantos */}
      <div className="pointer-events-none absolute -left-10 -top-10 h-40 w-40 rotate-12 rounded-3xl bg-ink/20" />
      <div className="pointer-events-none absolute -right-6 bottom-10 h-36 w-52 rotate-6 rounded-3xl bg-ink/20" />
      <div className="pointer-events-none absolute bottom-16 left-16 h-24 w-24 -rotate-12 rounded-3xl bg-white/25" />
      <div className="pointer-events-none absolute -right-8 -top-14 h-44 w-44 rotate-[24deg] rounded-3xl bg-pink/35" />
      <div className="pointer-events-none absolute -bottom-16 -left-10 h-52 w-52 rounded-full bg-ink/15" />

      {/* espalhadas */}
      <div className="pointer-events-none absolute left-[8%] top-[18%] h-16 w-16 rotate-45 rounded-2xl bg-yellow/50" />
      <div className="pointer-events-none absolute right-[10%] top-[12%] h-10 w-10 rounded-full bg-white/40" />
      <div className="pointer-events-none absolute right-[22%] bottom-[14%] h-14 w-14 -rotate-12 rounded-2xl bg-pink/40" />
      <div className="pointer-events-none absolute left-[20%] bottom-[8%] h-8 w-8 rounded-full bg-yellow/60" />
      <div className="pointer-events-none absolute left-[38%] top-[10%] h-6 w-6 rounded-full border-2 border-ink/25" />
      <div className="pointer-events-none absolute right-[6%] top-[42%] h-20 w-20 rotate-[18deg] rounded-2xl border-2 border-white/40" />
      <div className="pointer-events-none absolute left-[4%] top-[48%] h-12 w-12 -rotate-6 rounded-full bg-ink/15" />

      <div className="relative mx-auto max-w-[900px]">
        <p className="text-lg text-[#3A1200] sm:text-2xl">Pare de perguntar "o que tem para fazer?".</p>
        <h2 className="mt-3 font-display text-4xl font-extrabold text-ink sm:text-6xl">Pergunte: Hoje é aonde?</h2>
        <p className="mt-5 text-lg text-[#FFF3E6]">Descubra aqui seu próximo lugar, experiência ou rolê.</p>

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
