import Image from "next/image";
import { prisma } from "@/lib/db";
import { Reveal } from "../ui/Reveal";

export async function ShowCase() {
  const items = await prisma.galleryItem.findMany({
    orderBy: { createdAt: "desc" },
  });

  if (items.length === 0) return null;

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
          {items.map((item) => (
            <div
              key={item.id}
              className="group relative aspect-[4/3] overflow-hidden rounded-xl ring-1 ring-white/10"
            >
              <Image
                src={item.imageUrl}
                alt={item.caption ?? "Serviço elétrico realizado pela Marco Elétrica"}
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
