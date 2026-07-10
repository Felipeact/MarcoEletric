import { prisma } from "@/lib/db";
import { ServiceCard } from "./ServiceCard";
import { Reveal } from "../ui/Reveal";

export async function Services() {
  const projects = await prisma.beforeAfterItem.findMany({
    orderBy: { createdAt: "desc" },
  });

  if (projects.length === 0) return null;

  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-brand-600">
            Resultados reais
          </span>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Antes e depois
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Arraste para comparar e veja a transformação em alguns dos nossos
            trabalhos.
          </p>
        </Reveal>

        <div className="mx-auto mt-14 grid max-w-4xl grid-cols-1 gap-8 md:grid-cols-2">
          {projects.map((project, index) => (
            <Reveal key={project.id} delay={index * 0.1}>
              <ServiceCard
                title={project.title}
                description={project.description}
                before={project.beforeImageUrl}
                after={project.afterImageUrl}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
