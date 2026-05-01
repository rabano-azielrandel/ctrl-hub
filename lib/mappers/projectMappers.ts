

import type { Column, RowData } from "@/types/DataTable";

export function mapToTableFormat(data: Record<string, any>[]): {
  columns: Column[];
  rows: RowData[];
} {
  if (data.length === 0) return { columns: [], rows: [] };

  const columns: Column[] = Object.keys(data[0]).map((key) => ({
    key,
    label: key.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()), // snake_case → Title Case
  }));

  const rows: RowData[] = data.map((item) =>
    Object.fromEntries(
      Object.entries(item).map(([key, value]) => [
        key,
        value === null ? "—" : String(value), // handle nulls
      ])
    )
  );

  return { columns, rows };
}