import { useState } from 'react'
import { LeadModalContext } from '../lib/leadModal'
import { LeadFormModal } from '../components/LeadFormModal'
import { Header } from '../components/Header'
import { Hero } from '../components/Hero'
import { FraseImpacto } from '../components/FraseImpacto'
import { TemDeTudo } from '../components/TemDeTudo'
import { ComoFunciona } from '../components/ComoFunciona'
import { MockupBusca } from '../components/MockupBusca'
import { Descoberta } from '../components/Descoberta'
import { ModalEstabelecimento } from '../components/ModalEstabelecimento'
import { EncontreDoSeuJeito } from '../components/EncontreDoSeuJeito'
import { ParaProprietarios } from '../components/ParaProprietarios'
import { DestaquePatrocinado } from '../components/DestaquePatrocinado'
import { Confianca } from '../components/Confianca'
import { Personalidade } from '../components/Personalidade'
import { CTAFinal } from '../components/CTAFinal'
import { Footer } from '../components/Footer'

export function Landing() {
  const [leadModalOpen, setLeadModalOpen] = useState(false)

  return (
    <LeadModalContext.Provider value={{ open: () => setLeadModalOpen(true) }}>
      <div id="top">
        <Header />
        <Hero />
        <FraseImpacto />
        <TemDeTudo />
        <ComoFunciona />
        <MockupBusca />
        <Descoberta />
        <ModalEstabelecimento />
        <EncontreDoSeuJeito />
        <ParaProprietarios />
        <DestaquePatrocinado />
        <Confianca />
        <Personalidade />
        <CTAFinal />
        <Footer />
      </div>

      {leadModalOpen && <LeadFormModal onClose={() => setLeadModalOpen(false)} />}
    </LeadModalContext.Provider>
  )
}
