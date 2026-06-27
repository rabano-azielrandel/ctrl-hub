"use server";

import { createClient } from "@/lib/supabase/server";

export type CategorySpend = {
  name: string;
  spent: number;
};

export type SummaryData = {
  monthlySalary: number;
  totalSpent: number;
  totalSpentLastMonth: number;
  savings: number;
  savingsLastMonth: number;
  remainingBalance: number;
  categoryBreakdown: CategorySpend[];
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

export async function getSummary(year: number, month: number): Promise<GetSummaryResult> {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return { success: false, error: "Unauthorized: Not authenticated." };
  }

  const thisMonth = dateRange(year, month);
  const prevYear = month === 1 ? year - 1 : year;
  const prevMonth = month === 1 ? 12 : month - 1;
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

  const thisRows = (thisExpenses ?? []) as unknown as RawExpenseRow[];
  const lastRows = (lastExpenses ?? []) as unknown as RawExpenseRow[];

  const monthlySalary = sum(thisIncome ?? []);
  const totalSpent = sum(thisRows);
  const totalSpentLastMonth = sum(lastRows);

  const savings = sum(
    thisRows.filter((r) => r.expense_types?.name?.toLowerCase().includes("savings")),
  );
  const savingsLastMonth = sum(
    lastRows.filter((r) => r.expense_types?.name?.toLowerCase().includes("savings")),
  );

  const categoryBreakdown = Object.values(
    thisRows.reduce<Record<string, CategorySpend>>((acc, row) => {
      const name = row.expense_types?.name ?? "Unknown";
      if (!acc[name]) acc[name] = { name, spent: 0 };
      acc[name].spent += Number(row.amount);
      return acc;
    }, {}),
  ).sort((a, b) => b.spent - a.spent);

  return {
    success: true,
    data: {
      monthlySalary,
      totalSpent,
      totalSpentLastMonth,
      savings,
      savingsLastMonth,
      remainingBalance: monthlySalary - totalSpent,
      categoryBreakdown,
    },
  };
}
