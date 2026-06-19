"use client";

import {
  ShieldCheck,
  BadgeCheck,
  Clock,
  ReceiptText,
  ThumbsUp,
  HeartHandshake,
  type LucideIcon,
} from "lucide-react";
import { Reveal } from "../ui/Reveal";
import { siteConfig } from "../../lib/site";

type Differential = {
  icon: LucideIcon;
  title: string;
  description: string;
};

const differentials: Differential[] = [
  {
    icon: ShieldCheck,
    title: "Segurança em primeiro lugar",
    description:
      "Serviços executados conforme as normas técnicas, com destaque para a NR-10.",
  },
  {
    icon: BadgeCheck,
    title: "Profissional certificado",
    description:
      "Técnico em elétrica com certificações NR-10, NR-35, NR-33 e brigada de incêndio.",
  },
  {
    icon: ReceiptText,
    title: "Orçamento transparente",
    description:
      "Valores claros e combinados antecipadamente, sem surpresas ou custos ocultos.",
  },
  {
    icon: Clock,
    title: "Pontualidade",
    description:
      "Compromisso com prazos e horários para não atrapalhar a sua rotina.",
  },
  {
    icon: HeartHandshake,
    title: "Atendimento próximo",
    description:
      "Entendemos a sua necessidade e indicamos a melhor solução para cada caso.",
  },
  {
    icon: ThumbsUp,
    title: "Qualidade garantida",
    description:
      "Materiais adequados e acabamento caprichado em cada serviço entregue.",
  },
];

export function WhyUs() {
  return (
    <section id="sobre" className="bg-slate-50 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Texto */}
          <Reveal direction="left">
            <span className="text-sm font-semibold uppercase tracking-wider text-brand-600">
              Sobre nós
            </span>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              Por que escolher a {siteConfig.name}?
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-slate-600">
              Somos uma equipe preparada e qualificada para prestar serviços
              elétricos em residências, comércios e indústrias. Nossa missão é
              garantir a segurança e a eficiência dos sistemas elétricos dos
              nossos clientes, sempre prezando pela qualidade e excelência.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-slate-600">
              Com mais de {siteConfig.yearsOfExperience} anos de experiência,
              unimos conhecimento técnico, respeito às normas de segurança e um
              atendimento próximo e transparente.
            </p>

            <div className="mt-8 rounded-2xl border border-brand-100 bg-brand-50 p-5">
              <p className="text-sm font-semibold text-brand-800">
                {siteConfig.emergency}
              </p>
              <p className="mt-1 text-sm text-brand-700/90">
                Atendemos {siteConfig.serviceArea}. {siteConfig.hours}.
              </p>
            </div>
          </Reveal>

          {/* Grade de diferenciais */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {differentials.map((item, index) => (
              <Reveal key={item.title} delay={(index % 2) * 0.08} direction="right">
                <div className="h-full rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  <item.icon className="h-8 w-8 text-brand-600" />
                  <h3 className="mt-4 font-bold text-slate-900">{item.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
                    {item.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
