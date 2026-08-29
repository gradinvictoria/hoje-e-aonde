import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { LeadFormModal } from '../LeadFormModal'

const NAV_LINKS = [
  { label: 'Explorar', to: '/explorar' },
  { label: 'Buscar', to: '/busca' },
]

export function AppHeader() {
  const [leadModalOpen, setLeadModalOpen] = useState(false)

  return (
    <>
      <header className="sticky top-0 z-40 border-b-2 border-ink bg-white">
        <div className="mx-auto flex h-20 max-w-[1440px] items-center justify-between px-6 md:px-12">
          <Link to="/" className="font-display text-xl font-bold text-ink md:text-2xl">
            Hoje é <span className="text-orange">aonde?</span>
          </Link>

          <nav className="hidden items-center gap-9 lg:flex">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `text-[15px] font-medium hover:text-orange ${isActive ? 'text-orange' : 'text-ink'}`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <button
            type="button"
            onClick={() => setLeadModalOpen(true)}
            className="rounded-full bg-ink px-5 py-2.5 text-sm font-bold text-white hover:bg-orange"
          >
            Anunciar meu negócio
          </button>
        </div>
      </header>

      {leadModalOpen && <LeadFormModal onClose={() => setLeadModalOpen(false)} />}
    </>
  )
}
