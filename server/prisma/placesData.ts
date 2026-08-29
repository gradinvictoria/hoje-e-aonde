export function photos(slug: string, count = 5): string[] {
  return Array.from({ length: count }, (_, i) => `https://picsum.photos/seed/${slug}-${i + 1}/900/700`)
}

export const places = [
  {
    name: "Cantina da Vila",
    category: "Restaurante",
    description:
      "Cantina italiana descontraída em um quintal ao ar livre no Rio Vermelho, com música ao vivo às quintas e sextas, cardápio de massas artesanais e opção pet friendly. Ideal para jantares em grupo ou um encontro casual depois do trabalho.",
    state: "BA", city: "Salvador", neighborhood: "Rio Vermelho",
    rating: 4.9, reviewsCount: 128, avgPrice: 75,
    tags: ["Ao ar livre", "Pet friendly", "Música ao vivo"],
    sponsored: true, openNow: true,
  },
  {
    name: "Bar do Zé — Chopp Artesanal",
    category: "Bar",
    description:
      "Boteco de esquina com mais de 12 rótulos de chopp artesanal, petiscos de boteco e futebol na telona. Happy hour todo dia até as 20h.",
    state: "MG", city: "Belo Horizonte", neighborhood: "Savassi",
    rating: 4.7, reviewsCount: 92, avgPrice: 60,
    tags: ["Happy hour", "Estacionamento", "Ao vivo"],
    sponsored: false, openNow: true,
  },
  {
    name: "Estúdio Vinyasa Flow",
    category: "Aula",
    description:
      "Aulas de yoga vinyasa para todos os níveis em um estúdio arejado em Botafogo. Turmas pequenas, tapetes disponíveis no local e primeira aula gratuita.",
    state: "RJ", city: "Rio de Janeiro", neighborhood: "Botafogo",
    rating: 5.0, reviewsCount: 64, avgPrice: 55,
    tags: ["Iniciantes", "Ar livre", "Manhã"],
    sponsored: false, openNow: true,
  },
  {
    name: "Feira de Vinil & Discos",
    category: "Evento",
    description:
      "Feira mensal de vinil, CDs e memorabília musical no coração do Pelourinho, com food trucks e DJ set ao vivo. Entrada gratuita.",
    state: "BA", city: "Salvador", neighborhood: "Pelourinho",
    rating: 4.8, reviewsCount: 210, avgPrice: 0,
    tags: ["Gratuito", "Família", "Ao ar livre"],
    sponsored: true, openNow: false,
  },
  {
    name: "Noite de Samba na Varanda",
    category: "Show",
    description:
      "Roda de samba semanal com bandas locais em um bar com varanda ao ar livre. Reserva recomendada para mesas na frente do palco.",
    state: "RJ", city: "Rio de Janeiro", neighborhood: "Lapa",
    rating: 4.9, reviewsCount: 156, avgPrice: 45,
    tags: ["Música ao vivo", "Bar", "Reserva"],
    sponsored: false, openNow: true,
  },
  {
    name: "Trilha da Pedra Grande",
    category: "Trilha",
    description:
      "Trilha leve de 6km com mirante e cachoeira, ideal para iniciantes. Guia local disponível aos sábados de manhã.",
    state: "MG", city: "Belo Horizonte", neighborhood: "Serra do Curral",
    rating: 4.6, reviewsCount: 73, avgPrice: 25,
    tags: ["Natureza", "Pet friendly", "Iniciante"],
    sponsored: false, openNow: true,
  },
  {
    name: "Comédia no Porão",
    category: "Stand-up",
    description:
      "Noite de stand-up com line-up rotativo de comediantes locais em um porão intimista. Conteúdo adulto, bar completo durante o show.",
    state: "RJ", city: "Rio de Janeiro", neighborhood: "Copacabana",
    rating: 4.8, reviewsCount: 301, avgPrice: 50,
    tags: ["18+", "Bar", "Reserva"],
    sponsored: false, openNow: true,
  },
  {
    name: "Cerâmica das Manas",
    category: "Ateliê",
    description:
      "Ateliê de cerâmica com aulas avulsas aos sábados. Materiais inclusos, ideal para quem nunca colocou a mão no torno.",
    state: "BA", city: "Salvador", neighborhood: "Barra",
    rating: 4.9, reviewsCount: 48, avgPrice: 120,
    tags: ["Iniciantes", "Materiais inclusos"],
    sponsored: false, openNow: false,
  },
  {
    name: "Rodada de Motos — Sábado",
    category: "Encontro",
    description:
      "Encontro semanal de motociclistas com café da manhã e saída em grupo para estrada. Aberto a todos os estilos de moto.",
    state: "MG", city: "Belo Horizonte", neighborhood: "Pampulha",
    rating: 4.7, reviewsCount: 89, avgPrice: 0,
    tags: ["Grátis", "Pet friendly", "Iniciante"],
    sponsored: false, openNow: true,
  },
  {
    name: "Empório Verde Copo",
    category: "Restaurante",
    description:
      "Restaurante vegetariano com cardápio sazonal, cerveja artesanal na torneira e área externa arborizada. Opções veganas em todos os pratos.",
    state: "RJ", city: "Rio de Janeiro", neighborhood: "Ipanema",
    rating: 4.7, reviewsCount: 145, avgPrice: 85,
    tags: ["Ao ar livre", "Vegano", "Wi-Fi grátis"],
    sponsored: false, openNow: true,
  },
  {
    name: "Acustico no Quintal",
    category: "Show",
    description:
      "Sarau acústico mensal com artistas independentes em um quintal decorado com luzinhas. Sessão de open mic no final da noite.",
    state: "BA", city: "Salvador", neighborhood: "Itapuã",
    rating: 4.8, reviewsCount: 67, avgPrice: 30,
    tags: ["Música ao vivo", "Ao ar livre", "Gratuito"],
    sponsored: false, openNow: false,
  },
  {
    name: "Aula de Malabares no Parque",
    category: "Aula",
    description:
      "Aula gratuita de malabares e circo aos domingos de manhã no parque. Equipamentos emprestados no local, ideal para crianças e adultos.",
    state: "MG", city: "Belo Horizonte", neighborhood: "Centro",
    rating: 4.5, reviewsCount: 39, avgPrice: 0,
    tags: ["Gratuito", "Família", "Ao ar livre"],
    sponsored: false, openNow: true,
  },
  {
    name: "Encontro de Bordercollistas",
    category: "Encontro",
    description:
      "Encontro mensal de tutores e cães border collie com atividades de agility e socialização. Traga água e petiscos para o seu pet.",
    state: "RJ", city: "Rio de Janeiro", neighborhood: "Tijuca",
    rating: 4.9, reviewsCount: 52, avgPrice: 0,
    tags: ["Pet friendly", "Gratuito", "Ao ar livre"],
    sponsored: false, openNow: true,
  },
  {
    name: "Teatro de Bolso Independente",
    category: "Evento",
    description:
      "Peça autoral em cartaz até o fim do mês em teatro de bolso com 60 lugares. Bar aberto antes e depois da sessão.",
    state: "RJ", city: "Rio de Janeiro", neighborhood: "Botafogo",
    rating: 4.8, reviewsCount: 118, avgPrice: 40,
    tags: ["Reserva", "Bar"],
    sponsored: true, openNow: true,
  },
  {
    name: "Boteco da Serra",
    category: "Bar",
    description:
      "Boteco de estrada com vista para a serra, música sertaneja raiz aos fins de semana e porções generosas. Estacionamento amplo e gratuito.",
    state: "MG", city: "Belo Horizonte", neighborhood: "Serra",
    rating: 4.6, reviewsCount: 84, avgPrice: 55,
    tags: ["Estacionamento", "Música ao vivo", "Pet friendly"],
    sponsored: false, openNow: true,
  },
  {
    name: "Cuspidor de Fogo — Oficina Circense",
    category: "Aula",
    description:
      "Oficina intensiva de cuspir fogo e manipulação de tochas com instrutores certificados. Equipamento de segurança incluso, turma máxima de 8 pessoas.",
    state: "BA", city: "Salvador", neighborhood: "Ondina",
    rating: 4.9, reviewsCount: 21, avgPrice: 150,
    tags: ["Iniciantes", "Materiais inclusos", "18+"],
    sponsored: false, openNow: false,
  },
  {
    name: "Manicure & Café",
    category: "Serviço",
    description:
      "Espaço de manicure e pedicure com café e chá cortesia, ambiente instagramável e agenda online. Pacotes para noivas e grupos.",
    state: "RJ", city: "Rio de Janeiro", neighborhood: "Leblon",
    rating: 4.8, reviewsCount: 203, avgPrice: 65,
    tags: ["Wi-Fi grátis", "Reserva"],
    sponsored: false, openNow: true,
  },
  {
    name: "Acaiteria da Praça",
    category: "Restaurante",
    description:
      "Açaiteria com mais de 20 combinações de acompanhamentos, área externa na praça e opção sem açúcar. Delivery próprio até as 23h.",
    state: "BA", city: "Salvador", neighborhood: "Pituba",
    rating: 4.6, reviewsCount: 176, avgPrice: 25,
    tags: ["Ao ar livre", "Família"],
    sponsored: false, openNow: true,
  },
  {
    name: "Rock no Porão da Augusta",
    category: "Show",
    description:
      "Casa de shows dedicada a bandas de rock e punk independentes, com line-up novo toda semana. Bar com preços de estudante.",
    state: "MG", city: "Belo Horizonte", neighborhood: "Santo Antônio",
    rating: 4.7, reviewsCount: 267, avgPrice: 40,
    tags: ["Música ao vivo", "18+", "Bar"],
    sponsored: true, openNow: true,
  },
  {
    name: "Professor Particular de Violão",
    category: "Aula",
    description:
      "Aulas particulares de violão para iniciantes e intermediários, presenciais ou online. Método próprio com foco em música popular brasileira.",
    state: "BA", city: "Salvador", neighborhood: "Federação",
    rating: 5.0, reviewsCount: 34, avgPrice: 90,
    tags: ["Iniciantes", "Wi-Fi grátis"],
    sponsored: false, openNow: true,
  },
]
