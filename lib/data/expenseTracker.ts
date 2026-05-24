import { Summary, Category } from "@/types/ExpenseTracker";
import {
  Wallet,
  ShoppingBag,
  PiggyBank,
  FileText,
  LucideProps,
  TrendingUp,
  TrendingDown,
  CreditCard,
  DollarSign,
  BarChart2,
  Receipt,
  Landmark,
  ArrowUpCircle,
  ArrowDownCircle,
  CircleDollarSign,
} from "lucide-react";

export const expenseColors = [
  "#B67DF1",
  "#5DCAA5",
  "#EDD080",
  "#F57A7A",
  "#7EC8F0",
  "#F0A070",
];

export const categories: Category[] = [
  { id: 1, label: "Housing", color: expenseColors[0] },
  { id: 2, label: "Food", color: expenseColors[1] },
  { id: 3, label: "Transport", color: expenseColors[2] },
  { id: 4, label: "Savings", color: expenseColors[3] },
  { id: 5, label: "Leisure", color: expenseColors[4] },
  { id: 6, label: "Others", color: expenseColors[5] },
];

export const ICON_MAP = {
  wallet: Wallet,
  shopping: ShoppingBag,
  piggy: PiggyBank,
  file: FileText,
  trending_up: TrendingUp,
  trending_down: TrendingDown,
  credit: CreditCard,
  dollar: DollarSign,
  bar_chart: BarChart2,
  receipt: Receipt,
  landmark: Landmark,
  arrow_up: ArrowUpCircle,
  arrow_down: ArrowDownCircle,
  circle_dollar: CircleDollarSign,
};

export type IconKey = keyof typeof ICON_MAP;

interface DefaultEntry {
  label: string;
  color: string;
  icon: IconKey;
  total: string;
  desc: string;
}

export const DefaultCards: DefaultEntry[] = [
  {
    label: "Monthly Salary",
    color: "#6C63FF",
    icon: "wallet",
    total: "₱1,500",
    desc: "",
  },
  {
    label: "Total Spent",
    color: "#00D4AA",
    icon: "shopping",
    total: "₱1,000",
    desc: "↓ 33.33% vs last month",
  },
  {
    label: "Savings",
    color: "#F59E0B",
    icon: "piggy",
    total: "₱500",
    desc: "↑ 50.00% vs last month",
  },
  {
    label: "Expense Entries",
    color: "#EC4899",
    icon: "file",
    total: "1",
    desc: "This month",
  },
];
