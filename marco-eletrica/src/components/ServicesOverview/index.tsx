"use client";

import {
  Home,
  Building2,
  Factory,
  Wrench,
  CircuitBoard,
  Lightbulb,
  Cpu,
  Siren,
  type LucideIcon,
} from "lucide-react";
import { Reveal } from "../ui/Reveal";
import { WhatsAppButton } from "../WhatsAppButton";

type Service = {
  icon: LucideIcon;
  title: string;
  description: string;
};

const services: Service[] = [
  {
    icon: Home,
    title: "Instalações residenciais",
    description:
      "Instalações elétricas completas e seguras para casas e apartamentos, do projeto à execução.",
  },
  {
    icon: Building2,
    title: "Instalações comerciais",
    description:
      "Projetos e adequações elétricas para lojas, escritórios e estabelecimentos comerciais.",
  },
  {
    icon: Factory,
    title: "Instalações industriais",
    description:
      "Soluções industriais de diferentes níveis de complexidade, com foco em desempenho e segurança.",
  },
  {
    icon: Wrench,
    title: "Manutenção elétrica",
    description:
      "Manutenção preventiva e corretiva para evitar falhas e prolongar a vida útil da instalação.",
  },
  {
    icon: CircuitBoard,
    title: "Quadros e disjuntores",
    description:
      "Montagem, troca e readequação de quadros de distribuição, disjuntores e dispositivos DR.",
  },
  {
    icon: Lightbulb,
    title: "Iluminação LED",
    description:
      "Modernização da iluminação com tecnologia LED para reduzir o consumo e valorizar o ambiente.",
  },
  {
    icon: Cpu,
    title: "Automação residencial",
    description:
      "Automação e praticidade: controle de iluminação, tomadas e cenários de forma inteligente.",
  },
  {
    icon: Siren,
    title: "Emergência 24h",
    description:
      "Atendimento rápido para curtos-circuitos, quedas de energia e situações de risco a qualquer hora.",
  },
];

export function ServicesOverview() {
  return (
    <section id="servicos" className="bg-slate-50 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-brand-600">
            O que fazemos
          </span>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Nossos serviços
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Soluções elétricas completas para residências, comércios e
            indústrias — com qualidade, segurança e atendimento ágil.
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => (
            <Reveal key={service.title} delay={(index % 4) * 0.08}>
              <article className="group h-full rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand-300 hover:shadow-xl hover:shadow-brand-600/10">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-brand-50 text-brand-600 transition-colors duration-300 group-hover:bg-brand-600 group-hover:text-white">
                  <service.icon className="h-7 w-7" />
                </div>
                <h3 className="mt-5 text-lg font-bold text-slate-900">
                  {service.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {service.description}
                </p>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-14 flex justify-center" delay={0.1}>
          <WhatsAppButton label="Precisa de um serviço? Fale conosco" />
        </Reveal>
      </div>
    </section>
  );
}
