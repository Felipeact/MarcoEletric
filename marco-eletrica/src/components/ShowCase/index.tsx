"use client";

import Image from "next/image";
import { Reveal } from "../ui/Reveal";

const images = [
  { src: "/showcase/showcase1.JPG", alt: "Serviço elétrico realizado pela Marco Elétrica" },
  { src: "/showcase/showcase2.JPG", alt: "Instalação elétrica profissional" },
  { src: "/showcase/showcase3.JPG", alt: "Quadro de distribuição organizado" },
  { src: "/showcase/showcase4.JPG", alt: "Manutenção elétrica" },
  { src: "/showcase/showcase5.JPG", alt: "Instalação de iluminação" },
  { src: "/showcase/showcase6.JPG", alt: "Trabalho elétrico concluído" },
  { src: "/showcase/showcase7.JPG", alt: "Serviço de eletricista" },
  { src: "/showcase/showcase8.JPG", alt: "Instalação elétrica residencial" },
  { src: "/showcase/showcase9.JPG", alt: "Projeto elétrico executado" },
  { src: "/showcase/showcase10.JPG", alt: "Instalação elétrica comercial" },
  { src: "/showcase/showcase11.JPG", alt: "Serviço elétrico de qualidade" },
];

export function ShowCase() {
  return (
    <section id="galeria" className="bg-slate-900 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-accent-400">
            Portfólio
          </span>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Galeria de serviços
          </h2>
          <p className="mt-4 text-lg text-slate-300">
            Alguns dos trabalhos realizados com dedicação e atenção aos detalhes.
          </p>
        </Reveal>

        <Reveal
          className="mt-14 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4"
          delay={0.05}
        >
          {images.map((image) => (
            <div
              key={image.src}
              className="group relative aspect-[4/3] overflow-hidden rounded-xl ring-1 ring-white/10"
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
