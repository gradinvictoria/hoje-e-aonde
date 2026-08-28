const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:4000'

export type LeadPayload = {
  nome: string
  tipoNegocio: string
  contato: string
  mensagem?: string
}

export async function createLead(payload: LeadPayload): Promise<void> {
  const res = await fetch(`${API_URL}/api/leads`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })

  if (!res.ok) {
    const data = await res.json().catch(() => null)
    throw new Error(data?.error ?? 'Não foi possível enviar seu cadastro agora.')
  }
}
