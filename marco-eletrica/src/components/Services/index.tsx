'use client'

import { ServiceCard } from './ServiceCard'
import { WhatsAppButton } from '../WhatsAppButton'

const services = [
  {
    title: 'Quadro de Distribuição',
    before: '/services/quadro-before.jpeg',
    after: '/services/quadro-after.jpeg',
    description:
      'Readequação do quadro de distribuição com substituição de disjuntores para maior segurança e organização.',
  },
  {
    title: 'Iluminação Comercial',
    before: '/services/lights-before.jpeg',
    after: '/services/lights-after.jpeg',
    description:
      'Modernização da iluminação com tecnologia LED, reduzindo consumo e melhorando a iluminação.',
  },
  // {
  //   title: 'Instalação Predial',
  //   before: '/services/predial-before.jpeg',
  //   after: '/services/predial-after.jpeg',
  //   description:
  //     'Adequação elétrica predial seguindo normas técnicas e garantindo confiabilidade.',
  // },
]

export function Services() {
  return (
    <section className="bg-blue-500 py-20">
      <div className="max-w-7xl mx-auto px-4">

        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white">
            Nossos Serviços
          </h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              title={service.title}
              description={service.description}
              before={service.before}
              after={service.after}
            />
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 flex justify-center">
          <WhatsAppButton bgColor='bg-white' hoverBgColor='bg-white' textColor='text-blue-600'/>
        </div>

      </div>
    </section>
  )
}
