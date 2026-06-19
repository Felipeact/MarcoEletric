import { BeforeAfterSlider } from "./BeforeAfterSlider";

type ServiceCardProps = {
  title: string;
  description: string;
  before: string;
  after: string;
};

export function ServiceCard({
  title,
  description,
  before,
  after,
}: ServiceCardProps) {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-shadow duration-300 hover:shadow-xl hover:shadow-brand-600/10">
      <BeforeAfterSlider before={before} after={after} />

      <div className="flex flex-1 flex-col gap-2 p-6">
        <h3 className="text-lg font-bold text-slate-900">{title}</h3>
        <p className="text-sm leading-relaxed text-slate-600">{description}</p>
      </div>
    </div>
  );
}
