import { useState, type FormEvent } from 'react'
import { createLead } from '../lib/api'

export function LeadFormModal({ onClose }: { onClose: () => void }) {
  const [nome, setNome] = useState('')
  const [tipoNegocio, setTipoNegocio] = useState('')
  const [contato, setContato] = useState('')
  const [mensagem, setMensagem] = useState('')
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setStatus('sending')
    setErrorMsg('')
    try {
      await createLead({ nome, tipoNegocio, contato, mensagem })
      setStatus('sent')
    } catch (err) {
      setStatus('error')
      setErrorMsg(err instanceof Error ? err.message : 'Erro ao enviar.')
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4" onClick={onClose}>
      <div
        className="w-full max-w-[480px] rounded-3xl border-[3px] border-ink bg-white p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {status === 'sent' ? (
          <div className="py-6 text-center">
            <p className="text-4xl">✨</p>
            <h3 className="mt-4 font-display text-2xl font-bold text-ink">Recebemos seu cadastro!</h3>
            <p className="mt-2 text-[15px] text-muted">
              Em breve entramos em contato para colocar o seu negócio no Hoje é aonde?.
            </p>
            <button
              onClick={onClose}
              className="mt-8 rounded-full bg-ink px-6 py-3 text-sm font-bold text-white"
            >
              Fechar
            </button>
          </div>
        ) : (
          <>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-bold text-orange">PARA NEGÓCIOS</p>
                <h3 className="mt-1 font-display text-2xl font-bold text-ink">Quero divulgar meu negócio</h3>
              </div>
              <button onClick={onClose} className="text-xl text-muted" aria-label="Fechar">
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <label className="text-sm font-bold text-ink">Nome do negócio</label>
                <input
                  required
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-border px-4 py-3 text-[15px] outline-none focus:border-orange"
                  placeholder="Ex: Café Comunidade"
                />
              </div>
              <div>
                <label className="text-sm font-bold text-ink">O que você oferece?</label>
                <input
                  required
                  value={tipoNegocio}
                  onChange={(e) => setTipoNegocio(e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-border px-4 py-3 text-[15px] outline-none focus:border-orange"
                  placeholder="Ex: cafeteria, aula de dança, evento..."
                />
              </div>
              <div>
                <label className="text-sm font-bold text-ink">E-mail ou WhatsApp</label>
                <input
                  required
                  value={contato}
                  onChange={(e) => setContato(e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-border px-4 py-3 text-[15px] outline-none focus:border-orange"
                  placeholder="Como podemos te chamar?"
                />
              </div>
              <div>
                <label className="text-sm font-bold text-ink">Conte um pouco mais (opcional)</label>
                <textarea
                  value={mensagem}
                  onChange={(e) => setMensagem(e.target.value)}
                  rows={3}
                  className="mt-1.5 w-full resize-none rounded-xl border border-border px-4 py-3 text-[15px] outline-none focus:border-orange"
                />
              </div>

              {status === 'error' && <p className="text-sm text-pink">{errorMsg}</p>}

              <button
                type="submit"
                disabled={status === 'sending'}
                className="w-full rounded-full bg-orange py-4 text-[15px] font-bold text-white disabled:opacity-60"
              >
                {status === 'sending' ? 'Enviando...' : 'Quero divulgar'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  )
}
