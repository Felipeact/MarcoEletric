"use client";

import Link from "next/link";
import { Phone, MapPin, Clock, Siren } from "lucide-react";
import { Reveal } from "../ui/Reveal";
import { WhatsAppButton } from "../WhatsAppButton";
import { siteConfig, telLink } from "../../lib/site";

const infos = [
  {
    icon: Phone,
    label: "Telefone / WhatsApp",
    value: siteConfig.phoneDisplay,
    href: telLink(),
  },
  {
    icon: MapPin,
    label: "Região de atendimento",
    value: siteConfig.serviceArea,
  },
  {
    icon: Clock,
    label: "Horário de atendimento",
    value: siteConfig.hours,
  },
  {
    icon: Siren,
    label: "Emergências",
    value: siteConfig.emergency,
  },
];

export function Contact() {
  return (
    <section
      id="contato"
      className="relative overflow-hidden bg-brand-950 py-20 text-white sm:py-28"
    >
      {/* Brilhos de fundo */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -right-32 top-0 h-96 w-96 rounded-full bg-brand-600/25 blur-3xl" />
        <div className="absolute -left-32 bottom-0 h-96 w-96 rounded-full bg-accent-500/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Chamada */}
          <Reveal direction="left">
            <span className="text-sm font-semibold uppercase tracking-wider text-accent-400">
              Fale conosco
            </span>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
              Vamos resolver o seu problema elétrico?
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-blue-100/90">
              Solicite um orçamento sem compromisso. Respondemos rápido pelo
              WhatsApp e combinamos a melhor solução para a sua necessidade.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <WhatsAppButton label="Solicitar orçamento grátis" />
              <Link
                href={telLink()}
                className="inline-flex items-center justify-center gap-2.5 rounded-xl bg-white/10 px-6 py-3.5 text-base font-semibold text-white ring-1 ring-white/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/15"
              >
                <Phone className="h-5 w-5" />
                Ligar agora
              </Link>
            </div>
          </Reveal>

          {/* Cartões de informação */}
          <Reveal
            className="grid grid-cols-1 gap-4 sm:grid-cols-2"
            direction="right"
          >
            {infos.map((info) => {
              const content = (
                <>
                  <info.icon className="h-7 w-7 text-accent-400" />
                  <div className="mt-4 text-sm font-medium text-blue-100/70">
                    {info.label}
                  </div>
                  <div className="mt-1 font-semibold text-white">
                    {info.value}
                  </div>
                </>
              );

              const className =
                "block h-full rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-colors hover:border-white/25";

              return info.href ? (
                <Link key={info.label} href={info.href} className={className}>
                  {content}
                </Link>
              ) : (
                <div key={info.label} className={className}>
                  {content}
                </div>
              );
            })}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
