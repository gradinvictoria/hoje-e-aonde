import { useLeadModal } from '../lib/leadModal'

export function ParaProprietarios() {
  const { open } = useLeadModal()

  return (
    <section id="para-negocios" className="overflow-hidden bg-orange px-6 py-24 md:px-12 md:py-28">
      <div className="mx-auto grid max-w-[1200px] items-center gap-14 lg:grid-cols-[1fr_440px]">
        <div>
          <p className="text-sm font-bold text-ink">PARA NEGÓCIOS</p>
          <h2 className="mt-4 font-display text-4xl font-extrabold leading-tight text-white sm:text-5xl">
            Tem um lugar, negócio, evento ou experiência?
          </h2>
          <p className="mt-5 max-w-lg text-[17px] text-[#3A1200]">
            Coloque o que você faz na frente de quem está procurando exatamente isso.
          </p>
          <p className="mt-4 max-w-lg text-[15px] text-[#4D1A00]">
            O Hoje é aonde? também funciona como uma plataforma de descoberta para quem oferece
            produtos, serviços, experiências, eventos, aulas, cursos, atividades e estabelecimentos.
          </p>
          <button
            onClick={open}
            className="mt-8 rounded-full bg-ink px-7 py-4 text-[15px] font-bold text-white hover:brightness-125"
          >
            Quero divulgar
          </button>
        </div>

        <div className="relative mx-auto h-72 w-full max-w-[440px]">
          <div className="absolute inset-0 translate-x-4 translate-y-2 -rotate-6 rounded-[22px] bg-ink" />
          <div className="absolute inset-0 -rotate-2 overflow-hidden rounded-[22px] bg-white shadow-2xl">
            <div className="relative h-[132px] bg-pink">
              <span className="absolute left-3.5 top-3.5 rounded-full bg-ink px-3.5 py-1.5 text-xs font-bold text-white">
                ✨ Em destaque
              </span>
            </div>
            <div className="p-4">
              <p className="font-bold text-ink">Sundown Bar</p>
              <p className="text-sm text-muted">Bar · ★ 4.6 · Rio Vermelho</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
