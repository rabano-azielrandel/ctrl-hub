"use client";

import { Slider } from "@/components/ui/slider";
import { useState } from "react";

export default function Performance() {
  const [engagement, setEngagement] = useState(75);

  return (
    <div className="p-4 border border-[#B67DF2]">
      <p>PERFORMANCE TARGETS</p>

      <div className="flex">
        {/* Slider */}
        <div className="flex flex-col">
          <Slider
            value={engagement}
            onValueChange={(value) =>
              setEngagement(Array.isArray(value) ? value[0] : value)
            }
            max={100}
            step={1}
            className="w-full"
          />
        </div>

        {/* Half Donut */}
      </div>
    </div>
  );
}
