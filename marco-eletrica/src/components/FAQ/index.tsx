"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Reveal } from "../ui/Reveal";
import { siteConfig } from "../../lib/site";

const faqData = [
  {
    question: "Quais serviços elétricos vocês realizam?",
    answer:
      "Realizamos serviços residenciais, comerciais e industriais: instalações elétricas completas, manutenção preventiva e corretiva, troca de quadros de distribuição e disjuntores, iluminação, tomadas, circuitos dedicados e automação.",
  },
  {
    question: "Vocês trabalham conforme as normas de segurança?",
    answer:
      "Sim. Todos os serviços seguem as normas técnicas vigentes, especialmente a NR-10, que regulamenta a segurança em instalações e serviços com eletricidade. A segurança do cliente e do imóvel é sempre prioridade.",
  },
  {
    question: "Como posso solicitar um orçamento?",
    answer:
      "Basta entrar em contato pelo WhatsApp. Após entender a necessidade do serviço, informamos o valor de forma clara, sem custos ocultos, e combinamos a melhor data para a execução.",
  },
  {
    question: "Quais regiões vocês atendem?",
    answer: `Atendemos ${siteConfig.serviceArea}. Em caso de dúvida sobre a sua localização, fale conosco pelo WhatsApp.`,
  },
  {
    question: "Vocês atendem emergências?",
    answer: `Sim. Contamos com ${siteConfig.emergency.toLowerCase()} para situações como curtos-circuitos, quedas de energia e outros riscos elétricos.`,
  },
  {
    question: "Os serviços têm garantia?",
    answer:
      "Sim. Prezamos pela qualidade em cada serviço, utilizando materiais adequados e oferecendo garantia sobre os trabalhos executados.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <Reveal className="text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-brand-600">
            Dúvidas
          </span>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Perguntas frequentes
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Reunimos as respostas para as dúvidas mais comuns dos nossos
            clientes.
          </p>
        </Reveal>

        <Reveal className="mt-12 space-y-4" delay={0.05}>
          {faqData.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={item.question}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <span className="font-semibold text-slate-900">
                    {item.question}
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 flex-shrink-0 text-brand-600 transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-6 pb-6 leading-relaxed text-slate-600">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
