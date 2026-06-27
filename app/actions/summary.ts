"use server";

import { createClient } from "@/lib/supabase/server";

export type SummaryData = {
  monthlySalary: number;
  totalSpent: number;
  totalSpentLastMonth: number;
  savings: number;
  savingsLastMonth: number;
  remainingBalance: number;
};

export type GetSummaryResult =
  | { success: true; data: SummaryData }
  | { success: false; error: string };

type RawExpenseRow = {
  amount: number;
  expense_types: { name: string } | null;
};

function sum(rows: { amount: number }[]): number {
  return rows.reduce((acc, r) => acc + Number(r.amount), 0);
}

function dateRange(year: number, month: number) {
  const pad = (n: number) => String(n).padStart(2, "0");
  const lastDay = new Date(year, month, 0).getDate();
  return {
    start: `${year}-${pad(month)}-01`,
    end: `${year}-${pad(month)}-${lastDay}`,
  };
}

export async function getSummary(): Promise<GetSummaryResult> {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return { success: false, error: "Unauthorized: Not authenticated." };
  }

  const now = new Date();
  const thisMonth = dateRange(now.getFullYear(), now.getMonth() + 1);
  const prevYear = now.getMonth() === 0 ? now.getFullYear() - 1 : now.getFullYear();
  const prevMonth = now.getMonth() === 0 ? 12 : now.getMonth();
  const lastMonth = dateRange(prevYear, prevMonth);

  const [
    { data: thisIncome },
    { data: lastIncome },
    { data: thisExpenses },
    { data: lastExpenses },
  ] = await Promise.all([
    supabase
      .from("income")
      .select("amount")
      .eq("auth_id", user.id)
      .gte("income_date", thisMonth.start)
      .lte("income_date", thisMonth.end),
    supabase
      .from("income")
      .select("amount")
      .eq("auth_id", user.id)
      .gte("income_date", lastMonth.start)
      .lte("income_date", lastMonth.end),
    supabase
      .from("expenses")
      .select("amount, expense_types(name)")
      .eq("auth_id", user.id)
      .gte("expense_date", thisMonth.start)
      .lte("expense_date", thisMonth.end),
    supabase
      .from("expenses")
      .select("amount, expense_types(name)")
      .eq("auth_id", user.id)
      .gte("expense_date", lastMonth.start)
      .lte("expense_date", lastMonth.end),
  ]);

  const thisExpenseRows = (thisExpenses ?? []) as unknown as RawExpenseRow[];
  const lastExpenseRows = (lastExpenses ?? []) as unknown as RawExpenseRow[];

  const monthlySalary = sum(thisIncome ?? []);
  const totalSpent = sum(thisExpenseRows);
  const totalSpentLastMonth = sum(lastExpenseRows);

  const savings = sum(
    thisExpenseRows.filter((r) =>
      r.expense_types?.name?.toLowerCase().includes("savings"),
    ),
  );
  const savingsLastMonth = sum(
    lastExpenseRows.filter((r) =>
      r.expense_types?.name?.toLowerCase().includes("savings"),
    ),
  );

  const remainingBalance = monthlySalary - totalSpent;

  return {
    success: true,
    data: {
      monthlySalary,
      totalSpent,
      totalSpentLastMonth,
      savings,
      savingsLastMonth,
      remainingBalance,
    },
  };
}
