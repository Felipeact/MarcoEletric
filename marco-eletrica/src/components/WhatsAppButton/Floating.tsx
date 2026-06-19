import Link from "next/link";
import { whatsappLink } from "../../lib/site";
import { WhatsAppIcon } from "./index";

/** Botão flutuante de WhatsApp fixo no canto inferior direito. */
export function FloatingWhatsApp() {
  return (
    <Link
      href={whatsappLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar no WhatsApp"
      className="group fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-full bg-green-600 px-4 py-4 text-white shadow-xl shadow-green-900/30 transition-all duration-200 hover:bg-green-700 hover:shadow-2xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
    >
      {/* Anel de destaque pulsante */}
      <span className="absolute inset-0 -z-10 rounded-full bg-green-500 opacity-75 motion-safe:animate-ping" />
      <WhatsAppIcon className="h-7 w-7" />
      <span className="hidden max-w-0 overflow-hidden whitespace-nowrap text-sm font-semibold transition-all duration-300 group-hover:max-w-[10rem] sm:inline">
        Fale conosco
      </span>
    </Link>
  );
}
