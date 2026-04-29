"use client";

import Button from "@/component/ui/Button";
import { SquarePlus } from "lucide-react";
import { dashboardCalendarData, dotColor } from "@/lib/data/calendar";
import { getTomorrow, isSameDay } from "@/lib/utils";

export function EventsPanel() {
  return (
    <aside className="w-64 h-screen flex flex-col justify-between bg-[#0B1220] text-white p-4">
      {/* TOP */}
      <div className="overflow-hidden">
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
        <div className="space-y-6 overflow-y-scroll h-[calc(100vh-120px)]">
          {dashboardCalendarData.events.map((item, index) => {
            const today = new Date();
            const tomorrow = getTomorrow();
            const color = dotColor[item.type];

            let label;

            if (isSameDay(item.date, today)) {
              label = "Today";
            } else if (isSameDay(item.date, tomorrow)) {
              label = "Tomorrow";
            } else {
              label = item.date;
            }

            return (
              <div
                key={index}
                className="w-full h-18 flex  rounded-lg border border-[#2f2550] overflow-hidden"
              >
                <div className={`w-1 rounded-l-lg ${color}`} />

                <div className="flex flex-col p-4">
                  <p className="text-[11px] text-[#b67df2]/60">{label}</p>
                  <span className="text-base leading-none">{item.title}</span>
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${color}`} />
                    <p className="text-[11px] text-[#b67df2]/60">12:00</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* BOTTOM */}
      <div className="space-y-3 p-2">
        <Button variant="secondary" className="flex gap-4">
          <SquarePlus size={16} />
          Add Event
        </Button>
      </div>
    </aside>
  );
}
