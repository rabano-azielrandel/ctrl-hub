// data/pagesTable.ts

import { ReactNode } from "react";

export type BadgeVariant = "live" | "progress" | "draft";

export type BadgeCell = {
  type: "badge";
  label: string;
  variant?: BadgeVariant;
};

export type CellValue = ReactNode | BadgeCell;

export type Column = {
  key: string;
  label: string;
  width?: string;
};

export type RowData = Record<string, CellValue>;

export const pageColumns: Column[] = [
  {
    key: "page",
    label: "Page",
    width: "22%",
  },
  {
    key: "section",
    label: "Section",
    width: "28%",
  },
  {
    key: "status",
    label: "Status",
    width: "25%",
  },
  {
    key: "tech",
    label: "Tech",
    width: "25%",
  },
];

export const pageRows: RowData[] = [
  {
    page: "Home",
    section: "Hero + About",
    status: {
      type: "badge",
      label: "Live",
      variant: "live",
    },
    tech: "Next.js",
  },
  {
    page: "Projects",
    section: "Gallery",
    status: {
      type: "badge",
      label: "In Progress",
      variant: "progress",
    },
    tech: "React",
  },
  {
    page: "Blog",
    section: "MDX Posts",
    status: {
      type: "badge",
      label: "Draft",
      variant: "draft",
    },
    tech: "Contentlayer",
  },
  {
    page: "Contact",
    section: "Form",
    status: {
      type: "badge",
      label: "Live",
      variant: "live",
    },
    tech: "EmailJS",
  },
];