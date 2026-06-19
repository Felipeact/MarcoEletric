import Link from "next/link";
import { Linkedin, Phone, MapPin } from "lucide-react";
import { Logo } from "../ui/Logo";
import { WhatsAppIcon } from "../WhatsAppButton";
import { siteConfig, whatsappLink, telLink } from "../../lib/site";

const navLinks = [
  { label: "Início", href: "#inicio" },
  { label: "Serviços", href: "#servicos" },
  { label: "Sobre", href: "#sobre" },
  { label: "Certificados", href: "#certificados" },
  { label: "Galeria", href: "#galeria" },
  { label: "Contato", href: "#contato" },
];

const servicesLinks = [
  "Instalações residenciais",
  "Instalações comerciais e industriais",
  "Manutenção elétrica",
  "Quadros e disjuntores",
  "Iluminação LED e automação",
];

export function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-300">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Marca */}
          <div className="lg:col-span-1">
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-400">
              Soluções elétricas com segurança e qualidade para residências,
              comércios e indústrias em {siteConfig.serviceArea}.
            </p>
            <div className="mt-5 flex gap-3">
              <Link
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/5 text-slate-300 transition-colors hover:bg-green-600 hover:text-white"
              >
                <WhatsAppIcon className="h-5 w-5" />
              </Link>
              <Link
                href={siteConfig.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/5 text-slate-300 transition-colors hover:bg-brand-600 hover:text-white"
              >
                <Linkedin className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Navegação */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Navegação
            </h3>
            <ul className="mt-4 space-y-3 text-sm">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-slate-400 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Serviços */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Serviços
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-slate-400">
              {servicesLinks.map((service) => (
                <li key={service}>{service}</li>
              ))}
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Contato
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-slate-400">
              <li>
                <Link
                  href={telLink()}
                  className="flex items-center gap-2 transition-colors hover:text-white"
                >
                  <Phone className="h-4 w-4 text-brand-400" />
                  {siteConfig.phoneDisplay}
                </Link>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-brand-400" />
                {siteConfig.serviceArea}
              </li>
              <li className="text-slate-400">{siteConfig.hours}</li>
              <li className="font-medium text-accent-400">
                {siteConfig.emergency}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-8 text-center text-sm text-slate-500">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}. Todos os direitos
            reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
