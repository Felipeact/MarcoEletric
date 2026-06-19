/**
 * Configurações centrais do site.
 *
 * Altere os dados abaixo para atualizar as informações de contato em todo o
 * site (cabeçalho, rodapé, botões de WhatsApp, seção de contato e SEO).
 */

export const siteConfig = {
  name: "Marco Elétrica",
  shortName: "Marco",
  tagline: "Soluções elétricas com segurança e qualidade",
  description:
    "Eletricista profissional em São Paulo e região. Instalações elétricas residenciais, comerciais e industriais, manutenção preventiva e corretiva, troca de quadros e disjuntores, iluminação LED e automação. Serviço certificado (NR-10) e atendimento ágil.",

  // URL pública usada para SEO (Open Graph, sitemap, etc.)
  url: "https://marcoeletrica.com.br",

  // Profissional responsável
  owner: "Marco Aurélio",

  // Contato principal (WhatsApp / telefone)
  // Apenas dígitos, com código do país (55) + DDD.
  whatsapp: "5511914812553",
  phoneDisplay: "(11) 91481-2553",

  // Mensagem padrão ao abrir o WhatsApp
  whatsappMessage:
    "Olá! Vim pelo site e gostaria de solicitar um orçamento.",

  // Região e horários de atendimento
  serviceArea: "São Paulo - SP e Grande São Paulo",
  hours: "Segunda a Sábado, das 8h às 18h",
  emergency: "Atendimento de emergência 24 horas",

  // Redes sociais / links externos
  linkedin: "https://www.linkedin.com/in/marco-aur%C3%A9lio-95964615b/",

  // Anos de experiência (usado em destaques)
  yearsOfExperience: 10,
} as const;

/** Monta o link do WhatsApp com mensagem opcional pré-preenchida. */
export function whatsappLink(message: string = siteConfig.whatsappMessage) {
  const text = encodeURIComponent(message);
  return `https://wa.me/${siteConfig.whatsapp}?text=${text}`;
}

/** Link de telefone (tel:) a partir do número de WhatsApp. */
export function telLink() {
  return `tel:+${siteConfig.whatsapp}`;
}
