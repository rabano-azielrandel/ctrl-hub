"use client";

import { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { dashboardCalendarData, getCalendarData } from "@/lib/data/calendar";

export default function Main() {
  /* LIVE CLOCK */
  const [timeParts, setTimeParts] = useState({
    hour: "",
    minute: "",
    second: "",
    ampm: "",
  });

  const [dateParts, setDateParts] = useState({
    weekday: "",
    month: "",
    day: "",
    year: "",
  });

  /* CALENDAR NAVIGATION */
  const [viewDate, setViewDate] = useState(
    new Date(dashboardCalendarData.year, dashboardCalendarData.month, 1),
  );

  const calendar = useMemo(() => {
    return getCalendarData({
      ...dashboardCalendarData,
      year: viewDate.getFullYear(),
      month: viewDate.getMonth(),
      label: viewDate.toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      }),
    });
  }, [viewDate]);

  const { cells, weekdays, dotColor, events } = calendar;

  /* REAL TODAY */
  const now = new Date();

  const realToday = {
    day: now.getDate(),
    month: now.getMonth(),
    year: now.getFullYear(),
  };

  /* CLOCK */
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();

      const formatter = new Intl.DateTimeFormat("en-PH", {
        timeZone: "Asia/Manila",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      });

      const parts = formatter.formatToParts(now);

      const get = (type: string) =>
        parts.find((p) => p.type === type)?.value || "";

      setTimeParts({
        hour: get("hour"),
        minute: get("minute"),
        second: get("second"),
        ampm: get("dayPeriod"),
      });

      const dateFormatter = new Intl.DateTimeFormat("en-PH", {
        timeZone: "Asia/Manila",
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
      });

      const date = dateFormatter.formatToParts(now);

      const getDate = (type: string) =>
        date.find((p) => p.type === type)?.value || "";

      setDateParts({
        weekday: getDate("weekday").toUpperCase(),
        month: getDate("month").toUpperCase(),
        day: getDate("day"),
        year: getDate("year"),
      });
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  /* NAVIGATION */
  const prevMonth = () => {
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1));
  };

  const goToday = () => {
    setViewDate(new Date());
  };

  return (
    <div className="w-full flex flex-col">
      {/* TOP CLOCK BAR */}
      <div className="w-full px-4 sm:px-12 py-4 sm:py-6 bg-[#140c2a] border-b border-purple-900 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-end gap-2 text-purple-300 font-mono text-lg sm:text-2xl">
          <span>{timeParts.hour}</span>
          <span>:</span>
          <span>{timeParts.minute}</span>
          <span>:</span>
          <span>{timeParts.second}</span>
          <span className="text-sm ml-2 mb-1">{timeParts.ampm}</span>
        </div>

        <div className="flex items-center gap-3 sm:gap-6">
          <div className="flex items-center gap-2 text-sm text-purple-300">
            <span className="text-white/50 tracking-widest">
              {dateParts.weekday}, {dateParts.month}
            </span>
            <span className="text-white/50">{dateParts.day}</span>
            <span className="text-white/80">{dateParts.year}</span>
          </div>

          <div className="flex gap-2">
            <span className="w-2 h-2 rounded-full bg-pink-400" />
            <span className="w-2 h-2 rounded-full bg-yellow-400" />
            <span className="w-2 h-2 rounded-full bg-purple-400" />
          </div>
        </div>
      </div>

      {/* CALENDAR */}
      <div className="w-full h-full px-2 sm:px-8 md:px-12 py-4 sm:py-8 md:py-12 bg-[#140c2a]">
        {/* HEADER */}
        <div className="flex items-center justify-between px-2 sm:px-6 pb-4 sm:pb-6">
          <div className="flex items-center gap-3">
            <button
              onClick={prevMonth}
              className="h-10 w-10 rounded-lg border border-violet-800 flex items-center justify-center text-white"
            >
              <ChevronLeft size={20} />
            </button>

            <h2 className="text-white font-semibold text-xl">
              {calendar.label}
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={goToday}
              className="px-4 h-10 rounded-lg border border-violet-800 text-white"
            >
              Today
            </button>

            <button
              onClick={nextMonth}
              className="h-10 w-10 rounded-lg border border-violet-800 flex items-center justify-center text-white"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* WEEKDAYS */}
        <div className="grid grid-cols-7 px-2 sm:px-6 pb-3 sm:pb-6">
          {weekdays.map((day) => (
            <div
              key={day}
              className="text-center text-[11px] sm:text-[14px] tracking-[0.1em] sm:tracking-[0.2em] text-violet-300/60"
            >
              {day}
            </div>
          ))}
        </div>

        {/* GRID */}
        <div className="grid grid-cols-7 gap-y-2 px-2 sm:px-6 pb-3 sm:pb-6">
          {cells.map((cell, i) => {
            const isToday =
              cell.currentMonth &&
              cell.day === realToday.day &&
              viewDate.getMonth() === realToday.month &&
              viewDate.getFullYear() === realToday.year;

            const dayEvents = events.filter(
              (event) => event.date === cell.date,
            );

            return (
              <div
                key={i}
                className="relative h-14 sm:h-20 flex items-start justify-center pt-2 rounded-2xl border border-transparent hover:border-violet-700/50 transition"
              >
                {/* DAY NUMBER */}
                <span
                  className={`
                    h-7 w-7 rounded-full flex items-center justify-center text-md
                    ${
                      isToday
                        ? "bg-violet-500 text-white"
                        : cell.currentMonth
                          ? "text-white"
                          : "text-white/25"
                    }
                  `}
                >
                  {cell.day}
                </span>

                {/* MULTIPLE EVENT DOTS */}
                {dayEvents.length > 0 && (
                  <div className="absolute bottom-2 flex gap-1">
                    {dayEvents.map((event) => (
                      <span
                        key={event.id}
                        className={`h-2 w-2 rounded-full ${
                          dotColor[event.type]
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* LEGEND */}
        <div className="px-6 pb-5 flex flex-wrap gap-4 text-sm text-white/60">
          {Object.entries(dotColor).map(([type, color]) => (
            <div key={type} className="flex items-center gap-2 capitalize">
              <span className={`h-3 w-3 rounded-full ${color}`} />
              <span>{type}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
