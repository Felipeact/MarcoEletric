import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "../../lib/site";

type LogoProps = {
  /** Cor do texto (classe Tailwind). Padrão: branco para fundos escuros. */
  className?: string;
  onClick?: () => void;
};

/** Marca do site (texto + ícone de raio), reutilizada no header, footer e menu. */
export function Logo({ className = "text-white", onClick }: LogoProps) {
  return (
    <Link
      href="#inicio"
      onClick={onClick}
      aria-label={`${siteConfig.name} — página inicial`}
      className={`flex items-center gap-1.5 text-xl font-extrabold tracking-tight ${className}`}
    >
      <span>{siteConfig.shortName}</span>
      <Image
        src="/raio-logo.svg"
        alt=""
        width={22}
        height={22}
        priority
        className="-mx-0.5"
      />
      <span>Elétrica</span>
    </Link>
  );
}
