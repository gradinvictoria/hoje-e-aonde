import { createContext, useContext } from 'react'

type LeadModalContextValue = {
  open: () => void
}

export const LeadModalContext = createContext<LeadModalContextValue | null>(null)

export function useLeadModal() {
  const ctx = useContext(LeadModalContext)
  if (!ctx) throw new Error('useLeadModal deve ser usado dentro do LeadModalContext.Provider')
  return ctx
}
