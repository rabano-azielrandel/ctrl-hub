import { Summary, Category } from "@/types/ExpenseTracker";

export const expenseColors = [
  "#B67DF1",
  "#5DCAA5",
  "#EDD080",
  "#F57A7A",
  "#7EC8F0",
  "#F0A070",
];

export const borderColors = [
  "border-[#B67DF1]",
  "border-[#5DCAA5]",
  "border-[#EDD080]",
  "border-[#F57A7A]",
  "border-[#7EC8F0]",
  "border-[#F0A070]",
];

export const summaryCards: Summary[] = [
  {
    title: "Monthly Salary",
    amount: 1500,
  },
  {
    title: "Total Spent",
    amount: 1500,
  },
  {
    title: "Savings",
    amount: 1500,
  },
  {
    title: "Total Expense Entries",
    amount: 1500,
  },
];

export const categories: Category[] = [
  { id: 1, label: "Housing", color: expenseColors[0] },
  { id: 2, label: "Food", color: expenseColors[1] },
  { id: 3, label: "Transport", color: expenseColors[2] },
  { id: 4, label: "Savings", color: expenseColors[3] },
  { id: 5, label: "Leisure", color: expenseColors[4] },
  { id: 6, label: "Others", color: expenseColors[5] },
];
