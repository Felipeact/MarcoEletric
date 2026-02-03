"use client"; // Next.js 13+ app directory

import { useState } from "react";

const tabs = [
  { id: "stats", label: "Estatísticas" },
  { id: "about", label: "Serviços" },
  { id: "faq", label: "FAQ" },
];

const statsData = [
  { value: "10+", label: "Anos de experiência" },
  { value: "300+", label: "Serviços realizados" },
  { value: "3+", label: "Perguntas frequentes" },
];

const servicesList = [
  "Instalações elétricas residenciais",
  "Manutenção elétrica preventiva e corretiva",
  "Troca de quadros de distribuição e disjuntores",
  "Iluminação, tomadas e circuitos dedicados",
];

const faqData = [
  {
    question: "Quais serviços elétricos você realiza?",
    answer: (
      <>
        <p className="mb-2">
          Realizo serviços elétricos residenciais e comerciais, incluindo
          instalações elétricas completas, manutenção preventiva e corretiva,
          troca de disjuntores, quadros de distribuição, iluminação e tomadas.
        </p>
        <p>
          Todos os serviços seguem as normas de segurança vigentes, garantindo
          qualidade e confiabilidade.
        </p>
      </>
    ),
  },
  {
    question: "Você trabalha conforme as normas de segurança?",
    answer: (
      <>
        <p className="mb-2">
          Sim. Todos os serviços são executados conforme as normas técnicas,
          especialmente a <strong>NR-10</strong>, que regulamenta a segurança em
          instalações e serviços com eletricidade.
        </p>
        <p>
          A segurança do cliente e do imóvel é sempre prioridade.
        </p>
      </>
    ),
  },
  {
  question: "Como posso solicitar um orçamento?",
  answer: (
    <>
      <p className="mb-2">
        Você pode solicitar um orçamento entrando em contato diretamente por
        WhatsApp.
      </p>
      <p>
        Após entender a necessidade do serviço, informo o valor de forma clara,
        sem custos ocultos, e combinamos a melhor data para execução.
      </p>
    </>
  ),
},
];

export default function Tabs() {
  const [activeTab, setActiveTab] = useState("stats");
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  return (

    <div className="w-full bg-gray-50 border border-gray-300 rounded-md shadow-sm">
      {/* Mobile Select */}
      <div className="sm:hidden p-2">
        <label htmlFor="tabs" className="sr-only">
          Selecionar aba
        </label>
        <select
          id="tabs"
          className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-t-md block w-full p-2.5"
          value={activeTab}
          onChange={(e) => setActiveTab(e.target.value)}
        >
          {tabs.map((tab) => (
            <option key={tab.id} value={tab.id}>
              {tab.label}
            </option>
          ))}
        </select>
      </div>

      {/* Desktop Tabs */}
      <ul className="hidden text-sm font-medium text-center text-gray-700 divide-x divide-gray-300 rounded-md sm:flex">
        {tabs.map((tab) => (
          <li key={tab.id} className="w-full">
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === tab.id}
              className={`inline-block w-full p-4 transition ${
                activeTab === tab.id
                  ? "bg-gray-200"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          </li>
        ))}
      </ul>

      {/* Tab Panels */}
      <div className="border-t border-gray-300">
        {/* Estatísticas */}
        {activeTab === "stats" && (
          <div className="p-4 md:p-8">
            <dl className="grid max-w-screen-xl grid-cols-2 gap-8 mx-auto text-gray-900 sm:grid-cols-3">
              {statsData.map((item, idx) => (
                <div key={idx} className="flex flex-col">
                  <dt className="mb-2 text-2xl font-semibold">
                    {item.value}
                  </dt>
                  <dd className="text-gray-700">{item.label}</dd>
                </div>
              ))}
            </dl>
          </div>
        )}

        {/* Serviços */}
        {activeTab === "about" && (
          <div className="p-4 md:p-8">
            <h2 className="mb-5 text-2xl font-semibold text-gray-900">
              Serviços elétricos profissionais
            </h2>
            <ul className="space-y-4 text-gray-700">
              {servicesList.map((service, idx) => (
                <li
                  key={idx}
                  className="flex items-center space-x-2"
                >
                  <svg
                    className="w-4 h-4 text-blue-600 shrink-0"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>
                  <span>{service}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* FAQ */}
        {activeTab === "faq" && (
          <div className="p-4">
            {faqData.map((item, idx) => (
              <div key={idx}>
                <button
                  type="button"
                  className="flex items-center justify-between w-full py-5 font-medium text-gray-700 border-b border-gray-300"
                  onClick={() =>
                    setOpenFaqIndex(openFaqIndex === idx ? null : idx)
                  }
                >
                  <span>{item.question}</span>
                  <svg
                    className={`w-5 h-5 transition-transform ${
                      openFaqIndex === idx ? "rotate-180" : ""
                    }`}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m5 15 7-7 7 7"
                    />
                  </svg>
                </button>

                {openFaqIndex === idx && (
                  <div className="py-5 border-b border-gray-300 text-gray-700">
                    {item.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
