"use client";

import { Slider } from "@/components/ui/slider";
import { useState } from "react";

const data = [{ title: "PERFORMANCE TARGETS", color: [] }];

export default function Performance() {
  const [engagement, setEngagement] = useState(75);

  return (
    <div className="p-4 border border-[#B67DF2]">
      <p className="text-[#B67DF2]">PERFORMANCE TARGETS {engagement}</p>

      <div className="flex flex-col sm:flex-row">
        {/* Slider */}
        <div className="relative flex flex-col w-full sm:w-[50%] bg-amber-50">
          <Slider
            value={[engagement]}
            onValueChange={(value) =>
              setEngagement(Array.isArray(value) ? value[0] : value)
            }
            max={100}
            step={1}
            color={"bg-[#B67DF2]"}
            className="w-full bg-amber-300"
          />
        </div>

        <div className="relative flex flex-col w-full sm:w-[50%] bg-amber-50">
          <Slider
            value={[engagement]}
            onValueChange={(value) =>
              setEngagement(Array.isArray(value) ? value[0] : value)
            }
            max={100}
            step={1}
            color={"bg-[#5dcaa5]"}
            className="w-full bg-amber-300"
          />
        </div>

        {/* Half Donut */}
      </div>
    </div>
  );
}
