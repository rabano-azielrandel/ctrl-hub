"use client";

import Button from "@/component/ui/Button";
import { SquarePlus } from "lucide-react";

export function EventsPanel() {
  return (
    <aside className="w-64 h-screen flex flex-col justify-between bg-[#0B1220] text-white p-4">
      {/* TOP */}
      <div>
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex-col items-start text-xs text-[#b67df2]/60">
            <p>UPCOMING</p>
            <p>EVENTS</p>
          </div>

          <div className="w-8 h-6 flex justify-center items-center rounded-2xl bg-[#b67df2]">
            <p className="text-black text-xs font-semibold">90</p>
          </div>
        </div>

        {/* Event List */}
        <div className="space-y-6">hello</div>
      </div>

      {/* BOTTOM */}
      <div className="space-y-3">
        <Button variant="secondary" className="flex gap-4">
          <SquarePlus size={16} />
          Add Event
        </Button>
      </div>
    </aside>
  );
}
