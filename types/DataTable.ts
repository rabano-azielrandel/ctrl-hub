export type BadgeVariant = "live" | "progress" | "draft";

export type BadgeCell = {
  type: "badge";
  label: string;
  variant?: BadgeVariant;
};

export type CellValue = React.ReactNode | BadgeCell;

export type RowData = Record<string, CellValue>;

export type Column = {
  key: string;
  label: string;
  width?: string;
};

export type DataTableProps = {
  title: string;
  columns: Column[];
  rows: RowData[];
};
