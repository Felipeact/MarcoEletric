"use client";

import { useEffect, useState } from "react";
import { Award, ChevronLeft, ChevronRight, Building } from "lucide-react";
import { Reveal } from "../ui/Reveal";

const cards = [
  {
    title: "NR-10 — Segurança em Instalações Elétricas",
    description:
      "Norma do Ministério do Trabalho que estabelece os requisitos mínimos de segurança para trabalhos com eletricidade.",
    date: "14/06/2018 a 20/06/2018",
    instituto: "Precisa",
  },
  {
    title: "NR-35 — Trabalho em Altura",
    description:
      "Estabelece os requisitos mínimos de proteção para atividades realizadas acima de 2 metros.",
    date: "13/06/2018",
    instituto: "Carso",
  },
  {
    title: "NR-33 — Espaço Confinado",
    description: "Curso concluído com carga horária total de 16 horas.",
    date: "11/06/2018 a 12/06/2018",
    instituto: "Precisa",
  },
  {
    title: "NR-23 — Brigada de Incêndio",
    description:
      "Concluído com aproveitamento satisfatório, com carga horária de 8 horas-aula.",
    date: "28 de setembro de 2021",
    instituto: "IPESP",
  },
  {
    title: "Técnico em Elétrica",
    description: "Habilitação profissional como Técnico em Eletrônica.",
    date: "25 de outubro de 2017",
    instituto: "CPS – Guaracy Silveira",
  },
];

const AUTO_SLIDE_MS = 5000;

export function Awards() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const prev = () =>
    setCurrent((c) => (c === 0 ? cards.length - 1 : c - 1));
  const next = () =>
    setCurrent((c) => (c === cards.length - 1 ? 0 : c + 1));

  useEffect(() => {
    if (paused) return;
    const interval = setInterval(
      () => setCurrent((c) => (c === cards.length - 1 ? 0 : c + 1)),
      AUTO_SLIDE_MS,
    );
    return () => clearInterval(interval);
  }, [paused]);

  return (
    <section id="certificados" className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-brand-600">
            Qualificação
          </span>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Certificados e formação
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Profissional certificado e atualizado nas principais normas de
            segurança do setor elétrico.
          </p>
        </Reveal>

        <Reveal
          className="relative mx-auto mt-14 max-w-xl"
          delay={0.05}
        >
          <div
            className="overflow-hidden"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${current * 100}%)` }}
            >
              {cards.map((card) => (
                <div
                  key={card.title}
                  className="min-w-full px-2 pb-2 pt-8"
                >
                  <div className="relative rounded-2xl border border-slate-200 bg-slate-50 p-8 pt-12 text-center shadow-sm">
                    <div className="absolute -top-7 left-1/2 -translate-x-1/2 rounded-2xl bg-brand-600 p-4 text-white shadow-lg shadow-brand-600/30">
                      <Award className="h-8 w-8" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900">
                      {card.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-slate-600">
                      {card.description}
                    </p>
                    <div className="mt-6 flex items-center justify-center gap-2 text-sm font-medium text-slate-700">
                      <Building className="h-4 w-4 text-brand-600" />
                      {card.instituto}
                    </div>
                    <p className="mt-1 text-sm text-slate-500">{card.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Controles */}
          <button
            onClick={prev}
            aria-label="Certificado anterior"
            className="absolute -left-2 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white text-slate-700 shadow-md ring-1 ring-slate-200 transition hover:bg-brand-600 hover:text-white sm:-left-5"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={next}
            aria-label="Próximo certificado"
            className="absolute -right-2 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white text-slate-700 shadow-md ring-1 ring-slate-200 transition hover:bg-brand-600 hover:text-white sm:-right-5"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          {/* Indicadores */}
          <div className="mt-8 flex justify-center gap-2.5">
            {cards.map((card, index) => (
              <button
                key={card.title}
                onClick={() => setCurrent(index)}
                aria-label={`Ir para o certificado ${index + 1}`}
                className={`h-2.5 rounded-full transition-all ${
                  current === index
                    ? "w-7 bg-brand-600"
                    : "w-2.5 bg-slate-300 hover:bg-slate-400"
                }`}
              />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
