"use client";

import React from "react";
import clsx from "clsx";
import {
  BadgeVariant,
  BadgeCell,
  CellValue,
  RowData,
  Column,
  DataTableProps,
} from "@/types/DataTable";

/* TYPE GUARD */
function isBadgeCell(value: CellValue): value is BadgeCell {
  return (
    typeof value === "object" &&
    value !== null &&
    !React.isValidElement(value) &&
    "type" in value &&
    value.type === "badge"
  );
}

/* MAIN COMPONENT */
export default function DataTable({ title, columns, rows }: DataTableProps) {
  return (
    <div className="w-full border border-violet-900/40 bg-[#070312] text-white">
      {/* Header */}
      <div className="flex items-center gap-3 px-6 pt-5 pb-4">
        <h2 className="text-xl font-semibold">{title}</h2>

        <span className="rounded-md border border-violet-700/30 bg-violet-900/20 px-2 py-0.5 text-xs text-violet-300">
          {rows.length} rows
        </span>
      </div>

      {/* Table */}
      <div className="px-6 pb-6">
        <div className="w-full overflow-x-auto">
          <table className="min-w-[900px] w-full border-collapse">
            <thead className="sticky top-0 bg-[#070312] z-10">
              <tr className="border-b border-violet-900/30">
                {columns.map((col) => (
                  <th
                    key={col.key}
                    style={{ width: col.width }}
                    className="pb-3 pr-6 text-left text-[11px] uppercase tracking-[0.18em] text-violet-400 whitespace-nowrap"
                  >
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {rows.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className="border-b border-violet-900/10 last:border-none hover:bg-violet-900/10 transition"
                >
                  {columns.map((col) => (
                    <td
                      key={col.key}
                      className="py-4 pr-6 text-sm text-white whitespace-nowrap max-w-[250px] truncate"
                    >
                      {renderCell(row[col.key])}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* CELL RENDERER */

function renderCell(value: CellValue): React.ReactNode {
  if (isBadgeCell(value)) {
    return <StatusBadge label={value.label} variant={value.variant} />;
  }
  return value;
}

/* BADGE */

function StatusBadge({
  label,
  variant = "live",
}: {
  label: string;
  variant?: BadgeVariant;
}) {
  const styles = {
    live: "border-emerald-700/40 bg-emerald-900/20 text-emerald-300",
    progress: "border-amber-700/40 bg-amber-900/20 text-amber-300",
    draft: "border-orange-700/40 bg-orange-900/20 text-orange-300",
  };

  return (
    <span
      className={clsx(
        "inline-flex rounded-md border px-2 py-1 text-xs font-medium",
        styles[variant],
      )}
    >
      {label}
    </span>
  );
}
