"use client";

import { useState } from "react";
import { Search, SquarePlus } from "lucide-react";
import Input from "@/component/ui/Input";

const data = ["Portfolio", "Kaiseki", "Readers Sanctuary"];

export function ProjectPanel() {
  const [active, setActive] = useState(0);

  return (
    <aside className="w-64 h-screen flex flex-col py-4 gap-2 bg-[#0B1220] text-white">
      {/* Header */}
      <div className="flex justify-between items-center px-4 mb-6">
        <div className="flex-col items-start text-xs text-[#b67df2]/60">
          <p>PROJECTS</p>
        </div>
        <SquarePlus size={20} className="cursor-pointer" />
      </div>

      <div className="space-y-3 p-4 border-y border-y-[#432e60]"></div>

      <div className="px-4 overflow-hidden">
        {/* Event List */}
        <div className="space-y-4">
          {data.map((item, index) => (
            <div
              key={index}
              onClick={() => setActive(index)}
              className={`w-full flex justify-between items-center p-2 gap-2 rounded-lg cursor-pointer ${active == index ? "bg-[#241a3b] border border-[#432e60]" : "bg-none"}`}
            >
              <div className="flex justify-start items-center gap-2">
                <div className="w-2 h-2 bg-[#b67df2] rounded-full" />
                <p className="text-[#b67df2] text-sm">{item}</p>
              </div>

              <div className="flex justify-center items-center px-2 py-1 rounded-md bg-[#2a2047] border border-black/5">
                <p className="text-xs text-white/80">3</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
