'use client'

import { useEffect, useState } from 'react'
import { Award } from 'lucide-react'

const cards = [
    {
        title: 'NR-23 – Brigada de Incêndio',
        description:
            'Concluído com aproveitamento satisfatório, com carga horária de 8 horas-aula.',
        date: '28 de setembro de 2021',
        instituto: 'IPESP',
    },
    {
        title: 'NR-33 – Espaço Confinado',
        description:
            'Curso concluído com carga horária total de 16 horas.',
        date: '11/06/2018 a 12/06/2018',
        instituto: 'Precisa',
    },
    {
        title: 'Técnico em Elétrica',
        description:
            'Habilitação profissional como Técnico em Eletrônica.',
        date: '25 de outubro de 2017',
        instituto: 'CPS – Guaracy Silveira',
    },
    {
        title: 'NR-10 – Segurança em Instalações Elétricas',
        description:
            'Norma do Ministério do Trabalho que estabelece requisitos mínimos de segurança para trabalhos com eletricidade.',
        date: '14/06/2018 a 20/06/2018',
        instituto: 'Precisa',
    },
    {
        title: 'NR-35 – Trabalho em Altura',
        description:
            'Estabelece os requisitos mínimos de proteção para atividades realizadas acima de 2 metros.',
        date: '13/06/2018',
        instituto: 'Carso',
    },
]

const AUTO_SLIDE_MS = 4000

export function Awards() {
    const [current, setCurrent] = useState(0)

    const prev = () =>
        setCurrent((c) => (c === 0 ? cards.length - 1 : c - 1))

    const next = () =>
        setCurrent((c) => (c === cards.length - 1 ? 0 : c + 1))

    useEffect(() => {
        const interval = setInterval(next, AUTO_SLIDE_MS)
        return () => clearInterval(interval)
    }, [])

    return (
        <>
            {/* Header */}
            <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-blue-500">
                    Certificados
                </h2>
            </div>

            <div className="relative w-full overflow-hidden py-24 mx-auto max-w-xl">
                {/* Track */}
                <div
                    className="flex transition-transform duration-700 ease-in-out"
                    style={{ transform: `translateX(-${current * 100}%)` }}
                >
                    {cards.map((card, index) => (
                        <div
                            key={index}
                            className="min-w-full flex items-center justify-center"
                        >
                            {/* Card */}
                            <div className="relative bg-gray-100 w-96 rounded-md shadow-xl p-6">

                                {/* Icon Overlay */}
                                <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-blue-500 text-white p-4 rounded-full shadow-lg">
                                    <Award size={32} />
                                </div>

                                <div className="mt-10 text-center space-y-3">
                                    <h5 className="text-2xl font-semibold">
                                        {card.title}
                                    </h5>

                                    <p className="text-sm text-gray-600">
                                        {card.description}
                                    </p>

                                    <div className="pt-4 text-sm font-medium text-gray-700">
                                        <p>{card.instituto}</p>
                                        <p className="text-gray-500">{card.date}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Prev */}
                <button
                    onClick={prev}
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/60 text-white px-4 py-2 rounded-md hover:bg-black transition"
                >
                    ‹
                </button>

                {/* Next */}
                <button
                    onClick={next}
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/60 text-white px-4 py-2 rounded-md hover:bg-black transition"
                >
                    ›
                </button>

                {/* Dots */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3">
                    {cards.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrent(index)}
                            className={`w-3 h-3 rounded-full transition ${
                                current === index ? 'bg-blue-600' : 'bg-gray-300'
                            }`}
                        />
                    ))}
                </div>
            </div>
        </>
    )
}
