"use client";

import {
  ReactCompareSlider,
  ReactCompareSliderImage,
  ReactCompareSliderHandle,
} from "react-compare-slider";

type BeforeAfterSliderProps = {
  before: string;
  after: string;
};

export function BeforeAfterSlider({ before, after }: BeforeAfterSliderProps) {
  return (
    <div className="relative h-64 w-full overflow-hidden">
      {/* Etiqueta ANTES */}
      <span className="absolute left-3 top-3 z-20 rounded-full bg-slate-900/75 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
        Antes
      </span>

      {/* Etiqueta DEPOIS */}
      <span className="absolute right-3 top-3 z-20 rounded-full bg-brand-600 px-3 py-1 text-xs font-semibold text-white">
        Depois
      </span>

      <ReactCompareSlider
        position={50}
        className="h-full w-full"
        handle={
          <ReactCompareSliderHandle
            buttonStyle={{
              backdropFilter: undefined,
              border: 0,
              boxShadow: "0 0 0 2px white, 0 4px 12px rgba(0,0,0,0.3)",
              color: "white",
              backgroundColor: "#2563eb",
              height: 40,
              width: 40,
            }}
            linesStyle={{ width: 2, color: "white" }}
          />
        }
        itemOne={
          <ReactCompareSliderImage
            src={before}
            alt="Antes do serviço"
            className="h-full w-full object-cover object-center"
          />
        }
        itemTwo={
          <ReactCompareSliderImage
            src={after}
            alt="Depois do serviço"
            className="h-full w-full object-cover object-center"
          />
        }
      />
    </div>
  );
}
