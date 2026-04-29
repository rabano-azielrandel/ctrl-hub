export type EventType = "general" | "sync" | "urgent" | "review";

export type CalendarEvent = {
  id: number;
  title: string;
  date: string; // YYYY-MM-DD
  type: EventType;
};

export type CalendarCell = {
  day: number;
  currentMonth: boolean;
  date: string;
};

export type CalendarMonth = {
  month: number; // 0 = January
  year: number;
  label: string;
  activeDay: number;
  today: number;
  events: CalendarEvent[];
};

export const weekdays = [
  "SUN",
  "MON",
  "TUE",
  "WED",
  "THU",
  "FRI",
  "SAT",
];

export const dotColor: Record<EventType, string> = {
  general: "bg-violet-400",
  sync: "bg-purple-500",
  urgent: "bg-rose-400",
  review: "bg-amber-400",
};

export const dashboardCalendarData: CalendarMonth = {
  month: 3, // April
  year: 2026,
  label: "April 2026",
  activeDay: 29,
  today: 29,

  events: [
    { id: 1, title: "Team Notes", date: "2026-04-28", type: "general" },
    { id: 2, title: "Standup Sync", date: "2026-04-29", type: "sync" },
    { id: 3, title: "Client Deadline", date: "2026-04-30", type: "urgent" },
    { id: 4, title: "Design Review", date: "2026-04-05", type: "review" },
    { id: 5, title: "Planning", date: "2026-04-07", type: "general" },
    { id: 6, title: "Dev Sync", date: "2026-04-14", type: "sync" },
    { id: 7, title: "Bug Fixes", date: "2026-04-17", type: "urgent" },
    { id: 8, title: "Sprint Review", date: "2026-04-28", type: "review" },
  ],
};

/* ---------------------------------- */
/* UTILITIES */
/* ---------------------------------- */

export function generateCalendarCells(
  year: number,
  month: number
): CalendarCell[] {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const prevMonthDays = new Date(year, month, 0).getDate();

  const cells: CalendarCell[] = [];

  // previous month fillers
  for (let i = firstDay - 1; i >= 0; i--) {
    const day = prevMonthDays - i;
    const date = new Date(year, month - 1, day);

    cells.push({
      day,
      currentMonth: false,
      date: date.toISOString().split("T")[0],
    });
  }

  // current month
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day);

    cells.push({
      day,
      currentMonth: true,
      date: date.toISOString().split("T")[0],
    });
  }

  // next month fillers
  let nextDay = 1;

  while (cells.length < 42) {
    const date = new Date(year, month + 1, nextDay);

    cells.push({
      day: nextDay,
      currentMonth: false,
      date: date.toISOString().split("T")[0],
    });

    nextDay++;
  }

  return cells;
}

export function getCalendarData(data: CalendarMonth) {
  return {
    ...data,
    weekdays,
    dotColor,
    cells: generateCalendarCells(data.year, data.month),
  };
}