'use client'

import Image from 'next/image'
import { WhatsAppButton } from '../WhatsAppButton'

const services = [
    {
        title: 'Instalação Elétrica Residencial',
        before: '/services/lights-before.jpeg',
        after: '/services/lights-after.jpeg',
    },
    {
        title: 'Quadro de Distribuição',
        before: '/services/panel-before.jpeg',
        after: '/services/panel-after.jpeg',
    },
    {
        title: 'Iluminação Comercial',
        before: '/services/lights-before.jpeg',
        after: '/services/lights-after.jpeg',
    },
]

export function Services() {
    return (
        <section className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8 py-16">

            {/* Header */}
            <header className="text-center mb-14">
                <h2 className="text-3xl sm:text-5xl font-bold text-blue-600 mb-4">
                    Serviços
                </h2>
                <p className="text-gray-500 max-w-2xl mx-auto">
                    Veja alguns resultados reais do nosso trabalho antes e depois.
                </p>
            </header>

            {/* Showcase */}
            <div className="space-y-12">
                {services.map((service, index) => (
                    <div key={index} className="space-y-4">

                        {/* Title */}
                        <h3 className="text-xl font-semibold text-gray-800 text-center">
                            {service.title}
                        </h3>

                        {/* Before / After */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 justify-items-center">

                            {/* BEFORE */}
                            <div className="relative inline-block">
                                <span className="absolute top-3 left-3 z-10 bg-black/70 text-white text-xs px-3 py-1 rounded-full">
                                    Antes
                                </span>
                                <Image
                                    src={service.before}
                                    alt={`${service.title} antes`}
                                    width={360}
                                    height={480}
                                    className="rounded-lg"
                                />
                            </div>

                            {/* AFTER */}
                            <div className="relative inline-block">
                                <span className="absolute top-3 left-3 z-10 bg-blue-600 text-white text-xs px-3 py-1 rounded-full">
                                    Depois
                                </span>
                                <Image
                                    src={service.after}
                                    alt={`${service.title} depois`}
                                    width={360}
                                    height={480}
                                    className="rounded-lg"
                                />
                            </div>

                        </div>

                    </div>
                ))}
            </div>

            {/* CTA */}
            <div className="mt-16 flex justify-center">
                <WhatsAppButton />
            </div>

        </section>
    )
}
