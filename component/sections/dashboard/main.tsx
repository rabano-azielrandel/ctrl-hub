"use client";

import { useEffect, useState } from "react";

export default function Main() {
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

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();

      // TIME
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

      // DATE
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

  return (
    <div className="w-full flex flex-col">
      {/* Date and Time */}
      <div className="w-full px-12 py-6 bg-[#140c2a] border-b border-purple-900 flex items-center justify-between">
        {/* Time */}
        <div className="flex items-end gap-2 text-purple-300 font-mono text-2xl">
          <span className="tracking-widest">{timeParts.hour}</span>
          <span>:</span>
          <span className="tracking-widest">{timeParts.minute}</span>
          <span>:</span>
          <span className="tracking-widest">{timeParts.second}</span>

          <span className="text-sm ml-2 mb-1">{timeParts.ampm}</span>
        </div>

        <div className="flex items-center gap-6">
          {/* DATE */}
          <div className="flex items-center gap-2 text-sm text-purple-300">
            <span className="text-white/50 tracking-widest">
              {dateParts.weekday}, {dateParts.month}
            </span>

            <span className="text-white/50">{dateParts.day}</span>

            <span className="text-white/80">{dateParts.year}</span>
          </div>

          {/* DOTS */}
          <div className="flex gap-2">
            <span className="w-2 h-2 rounded-full bg-pink-400" />
            <span className="w-2 h-2 rounded-full bg-yellow-400" />
            <span className="w-2 h-2 rounded-full bg-purple-400" />
          </div>
        </div>
      </div>

      {/* Calendar */}
      <div className="w-full px-12 py-6 bg-[#140c2a]"></div>
    </div>
  );
}
