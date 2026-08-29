import { Link } from 'react-router-dom'
import { useLeadModal } from '../lib/leadModal'

const NAV_LINKS = [
  { label: 'Como funciona', href: '#como-funciona' },
  { label: 'Para negócios', href: '#para-negocios' },
  { label: 'Sobre', href: '#confianca' },
]

export function Header() {
  const { open } = useLeadModal()

  return (
    <header className="sticky top-0 z-40 border-b-2 border-ink bg-white">
      <div className="mx-auto flex h-20 max-w-[1440px] items-center justify-between px-6 md:px-12">
        <a href="#top" className="font-display text-xl font-bold text-ink md:text-2xl">
          Hoje é <span className="text-orange">aonde?</span>
        </a>

        <nav className="hidden items-center gap-9 lg:flex">
          <Link
            to="/explorar"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[15px] font-medium text-ink hover:text-orange"
          >
            Explorar
          </Link>
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} className="text-[15px] font-medium text-ink hover:text-orange">
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={open}
            className="hidden rounded-full border-2 border-ink px-5 py-2.5 text-sm font-bold text-ink hover:bg-ink hover:text-white sm:inline-block"
          >
            Quero divulgar
          </button>
          <Link
            to="/explorar"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-ink px-5 py-2.5 text-sm font-bold text-white hover:bg-orange"
          >
            Explorar agora
          </Link>
        </div>
      </div>
    </header>
  )
}
