"use client";

import { ServiceCard } from "./ServiceCard";
import { Reveal } from "../ui/Reveal";

const projects = [
  {
    title: "Quadro de distribuição",
    before: "/services/quadro-before.jpeg",
    after: "/services/quadro-after.jpeg",
    description:
      "Readequação do quadro de distribuição com substituição de disjuntores para mais segurança e organização.",
  },
  {
    title: "Iluminação comercial",
    before: "/services/lights-before.jpeg",
    after: "/services/lights-after.jpeg",
    description:
      "Modernização da iluminação com tecnologia LED, reduzindo o consumo e melhorando o ambiente.",
  },
];

export function Services() {
  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-brand-600">
            Resultados reais
          </span>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Antes e depois
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Arraste para comparar e veja a transformação em alguns dos nossos
            trabalhos.
          </p>
        </Reveal>

        <div className="mx-auto mt-14 grid max-w-4xl grid-cols-1 gap-8 md:grid-cols-2">
          {projects.map((project, index) => (
            <Reveal key={project.title} delay={index * 0.1}>
              <ServiceCard
                title={project.title}
                description={project.description}
                before={project.before}
                after={project.after}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
