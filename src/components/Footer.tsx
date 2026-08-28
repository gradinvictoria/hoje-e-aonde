const COLUMNS = [
  { h: 'Produto', items: ['Explorar', 'Buscar', 'Categorias', 'Eventos'] },
  { h: 'Para negócios', items: ['Divulgue seu negócio', 'Destaque seu estabelecimento'] },
  { h: 'Institucional', items: ['Sobre', 'Contato', 'Termos de uso', 'Privacidade'] },
]

export function Footer() {
  return (
    <footer className="bg-ink">
      <div className="h-2 bg-orange" />
      <div className="mx-auto max-w-[1320px] px-6 py-20 md:px-12">
        <div className="flex flex-wrap items-start justify-between gap-8">
          <div>
            <p className="font-display text-2xl font-bold text-white">Hoje é aonde?</p>
            <p className="mt-2 text-sm text-[#9C9086]">Descubra. Escolha. Viva.</p>
          </div>
          <div className="flex gap-7 text-sm font-medium text-white">
            <a href="https://instagram.com" target="_blank" rel="noreferrer">
              Instagram
            </a>
            <a href="https://wa.me" target="_blank" rel="noreferrer">
              WhatsApp
            </a>
          </div>
        </div>

        <div className="mt-14 grid gap-10 sm:grid-cols-3">
          {COLUMNS.map((col) => (
            <div key={col.h}>
              <p className="text-sm font-bold text-orange">{col.h}</p>
              <ul className="mt-4 space-y-3">
                {col.items.map((item) => (
                  <li key={item} className="text-sm text-[#C9BEB2]">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <hr className="my-10 border-[#3A332B]" />
        <p className="text-xs text-[#6B6259]">© {new Date().getFullYear()} Hoje é aonde?. Todos os direitos reservados.</p>
      </div>
    </footer>
  )
}
