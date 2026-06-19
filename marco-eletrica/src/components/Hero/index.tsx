"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Phone, ShieldCheck, Clock, Star } from "lucide-react";
import { WhatsAppButton } from "../WhatsAppButton";
import { siteConfig, telLink } from "../../lib/site";

const badges = [
  { icon: ShieldCheck, label: "Certificado NR-10" },
  { icon: Star, label: `+${siteConfig.yearsOfExperience} anos de experiência` },
  { icon: Clock, label: "Emergência 24h" },
];

const stats = [
  { value: `${siteConfig.yearsOfExperience}+`, label: "Anos de experiência" },
  { value: "300+", label: "Serviços realizados" },
  { value: "100%", label: "Foco em segurança" },
  { value: "24h", label: "Atendimento de emergência" },
];

export function Hero() {
  return (
    <section
      id="inicio"
      className="relative overflow-hidden bg-brand-950 text-white"
    >
      {/* Brilhos de fundo */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 top-0 h-96 w-96 rounded-full bg-brand-600/30 blur-3xl" />
        <div className="absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-accent-500/10 blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 pb-20 pt-32 sm:px-6 md:grid-cols-2 md:pb-28 md:pt-40">
        {/* Texto */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center md:text-left"
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-blue-100 ring-1 ring-white/15">
            <span className="h-2 w-2 rounded-full bg-green-400" />
            {siteConfig.serviceArea}
          </span>

          <h1 className="mt-6 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            Soluções elétricas com{" "}
            <span className="bg-gradient-to-r from-accent-400 to-accent-500 bg-clip-text text-transparent">
              segurança
            </span>{" "}
            e qualidade
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-blue-100/90 md:mx-0">
            Equipe qualificada para serviços em residências, comércios e
            indústrias: instalações, manutenção preventiva e corretiva, projetos
            elétricos, automação e muito mais — sempre seguindo as normas de
            segurança.
          </p>

          {/* CTAs */}
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row md:justify-start">
            <WhatsAppButton label="Solicitar orçamento grátis" />
            <Link
              href={telLink()}
              className="inline-flex items-center justify-center gap-2.5 rounded-xl bg-white/10 px-6 py-3.5 text-base font-semibold text-white ring-1 ring-white/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/15"
            >
              <Phone className="h-5 w-5" />
              {siteConfig.phoneDisplay}
            </Link>
          </div>

          {/* Selos de confiança */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 md:justify-start">
            {badges.map((badge) => (
              <div
                key={badge.label}
                className="flex items-center gap-2 text-sm font-medium text-blue-100"
              >
                <badge.icon className="h-5 w-5 text-accent-400" />
                {badge.label}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Ilustração */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
          className="relative flex justify-center md:justify-end"
        >
          <div className="absolute inset-0 m-auto h-72 w-72 rounded-full bg-brand-500/20 blur-3xl sm:h-96 sm:w-96" />
          <Image
            src="/service.svg"
            alt="Eletricista profissional realizando instalação elétrica"
            width={560}
            height={560}
            priority
            className="relative w-72 max-w-full drop-shadow-2xl sm:w-96"
          />
        </motion.div>
      </div>

      {/* Faixa de estatísticas */}
      <div className="relative border-t border-white/10 bg-brand-950/60">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px px-4 sm:px-6 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="px-2 py-8 text-center">
              <div className="text-3xl font-extrabold text-accent-400 sm:text-4xl">
                {stat.value}
              </div>
              <div className="mt-1 text-sm text-blue-100/80">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
