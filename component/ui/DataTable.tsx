"use client";

import { DataTableProps } from "@/types/DataTable";

/* small formatter */
function formatValue(value: unknown) {
  if (value === null || value === undefined) return "—";

  if (typeof value === "string" && value.includes("T")) {
    const date = new Date(value);
    if (!isNaN(date.getTime())) {
      return date.toLocaleString();
    }
  }

  return String(value);
}

export default function DataTable({ title, columns, rows }: DataTableProps) {
  return (
    <div className="w-full rounded-2xl border border-violet-900/40 bg-gradient-to-b from-[#0b0618] to-[#070312] text-white shadow-[0_0_40px_rgba(139,92,246,0.08)]">
      {/* Header */}
      <div className="flex items-center justify-between px-6 pt-5 pb-4">
        <div className="flex items-center gap-3">
          <h2 className="text-lg font-semibold tracking-wide">{title}</h2>

          <span className="rounded-full border border-violet-700/40 bg-violet-900/30 px-3 py-0.5 text-xs text-violet-300">
            {rows.length} rows
          </span>
        </div>
      </div>

      {/* Table */}
      <div className="px-6 pb-6">
        <div className="w-full overflow-x-auto rounded-xl border border-violet-900/30">
          <table className="min-w-[900px] w-full border-collapse">
            {/* HEADER */}
            <thead className="sticky top-0 z-10 backdrop-blur bg-[#070312]/80">
              <tr className="border-b border-violet-900/30">
                {columns.map((col) => (
                  <th
                    key={col.key}
                    style={{ width: col.width }}
                    className="px-4 py-3 text-left text-[10px] uppercase tracking-[0.2em] text-violet-400 whitespace-nowrap"
                  >
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>

            {/* BODY */}
            <tbody>
              {rows.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className={`
                    group border-b border-violet-900/10 last:border-none
                    transition-all duration-200
                    hover:bg-violet-900/10 hover:shadow-[inset_0_0_20px_rgba(139,92,246,0.08)]
                    ${rowIndex % 2 === 0 ? "bg-transparent" : "bg-violet-900/[0.03]"}
                  `}
                >
                  {columns.map((col) => {
                    const value = formatValue(row[col.key]);

                    // only clamp long-text fields
                    const shouldClamp =
                      col.key === "system_desc" || col.key === "note";

                    return (
                      <td
                        key={col.key}
                        className="px-4 py-3 text-sm text-white align-top max-w-[220px]"
                        title={String(value)}
                      >
                        <div
                          className={`
                            ${shouldClamp ? "line-clamp-3" : ""}
                            break-words overflow-hidden leading-relaxed
                            text-gray-300
                          `}
                        >
                          {value}
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
