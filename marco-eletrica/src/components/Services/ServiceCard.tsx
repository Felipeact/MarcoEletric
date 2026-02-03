import { BeforeAfterSlider } from './BeforeAfterSlider'

type ServiceCardProps = {
  title: string
  description: string
  before: string
  after: string
}

export function ServiceCard({
  title,
  description,
  before,
  after,
}: ServiceCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col gap-4">
      
      {/* Image / Before After */}
      <BeforeAfterSlider before={before} after={after} />

      {/* Title */}
      <h3 className="text-lg font-bold text-gray-900 text-center">
        {title}
      </h3>

      {/* Description */}
      <p className="text-sm text-gray-600 text-center leading-relaxed">
        {description}
      </p>
    </div>
  )
}
