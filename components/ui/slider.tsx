"use client";

import { useState } from "react";
import { Slider as SliderPrimitive } from "@base-ui/react/slider";
import { cn } from "@/lib/utils";

type SliderProps = SliderPrimitive.Root.Props & {
  color: string;
};

function Slider({
  className,
  defaultValue,
  value,
  min = 0,
  max = 100,
  color,
  ...props
}: SliderProps) {
  const [dragging, setDragging] = useState(false);

  const _values = Array.isArray(value)
    ? value
    : Array.isArray(defaultValue)
      ? defaultValue
      : [min, max];

  return (
    <SliderPrimitive.Root
      className={cn(
        "data-horizontal:w-full data-vertical:h-full",
        dragging ? "cursor-grabbing" : "cursor-grab",
        className,
      )}
      data-slot="slider"
      defaultValue={defaultValue}
      value={value}
      min={min}
      max={max}
      {...props}
    >
      <SliderPrimitive.Control className="relative flex w-full touch-none items-center select-none data-disabled:opacity-50 data-vertical:h-full data-vertical:min-h-40 data-vertical:w-auto data-vertical:flex-col">
        <SliderPrimitive.Track
          data-slot="slider-track"
          className="relative grow overflow-hidden rounded-full bg-[#2A2047] select-none data-horizontal:h-1.5 data-horizontal:w-full data-vertical:h-full data-vertical:w-1.5"
        >
          {/* Slider Active */}
          <SliderPrimitive.Indicator
            data-slot="slider-range"
            className={`${color} select-none data-horizontal:h-full data-vertical:w-full`}
          />
        </SliderPrimitive.Track>
        {/* Slider circle button */}
        {Array.from({ length: _values.length }, (_, index) => (
          <SliderPrimitive.Thumb
            data-slot="slider-thumb"
            key={index}
            onPointerDown={() => setDragging(true)}
            onPointerUp={() => setDragging(false)}
            className={`block size-4 shrink-0 rounded-full border border-[#F7F7F7]
                      bg-[#30302E] shadow-sm ring-ring/50 transition-[color,box-shadow] select-none hover:ring-4 
                        focus-visible:ring-4 focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50 
                        mt-[2px]`} // for center
          />
        ))}
      </SliderPrimitive.Control>
    </SliderPrimitive.Root>
  );
}

export { Slider };
