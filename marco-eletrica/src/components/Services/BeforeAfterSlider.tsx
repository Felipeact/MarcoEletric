'use client'

import {
  ReactCompareSlider,
  ReactCompareSliderImage,
} from 'react-compare-slider'

type BeforeAfterSliderProps = {
  before: string
  after: string
}

export function BeforeAfterSlider({
  before,
  after,
}: BeforeAfterSliderProps) {
  return (
    <div className="relative w-full h-56 rounded-xl overflow-hidden flex items-center">

      {/* BEFORE LABEL */}
      <span className="absolute top-3 left-3 z-20 bg-black/70 text-white text-xs px-3 py-1 rounded-full">
        Antes
      </span>

      {/* AFTER LABEL */}
      <span className="absolute top-3 right-3 z-20 bg-blue-600 text-white text-xs px-3 py-1 rounded-full">
        Depois
      </span>

      <ReactCompareSlider
        position={50}
        className="w-full h-full"
        itemOne={
          <ReactCompareSliderImage
            src={before}
            alt="Antes"
            className="w-full h-full object-cover object-center"
          />
        }
        itemTwo={
          <ReactCompareSliderImage
            src={after}
            alt="Depois"
            className="w-full h-full object-cover object-center"
          />
        }
      />
    </div>
  )
}
