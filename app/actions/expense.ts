"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { expenseColors } from "@/lib/data/expenseTracker";
import {
  Category,
  GetExpenseTypesResult,
  Expenses,
  GetExpensesResult,
} from "@/types/ExpenseTracker";

export async function getExpenseTypes(): Promise<GetExpenseTypesResult> {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return { success: false, error: "Unauthorized: Not authenticated." };
  }

  const { data: expenseType, error: expenseError } = await supabase
    .from("expense_types")
    .select("expense_type_id, name")
    .eq("auth_id", user.id);

  if (expenseError) {
    return {
      success: false,
      error: expenseError.message || "Fetching Expenses Type Failed",
    };
  }

  const categories: Category[] = expenseType.map((item, index) => ({
    id: item.expense_type_id,
    label: item.name,
    color: expenseColors[index % expenseColors.length],
  }));

  return {
    success: true,
    data: categories,
  };
}

export async function createExpense(data: {
  expense_type_id: number;
  amount: number;
  expense_date: string;
  note: string | null;
}): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return { success: false, error: "Unauthorized" };
  }

  const { error } = await supabase.from("expenses").insert({
    auth_id: user.id,
    expense_type_id: data.expense_type_id,
    amount: data.amount,
    expense_date: data.expense_date,
    note: data.note,
  });

  if (error) {
    return { success: false, error: error.message };
  }

  revalidatePath("/expense");
  return { success: true };
}

export async function getExpenses(): Promise<GetExpensesResult> {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return {
      success: false,
      error: "Unauthorized: Not authenticated.",
    };
  }

  type RawExpense = {
    expense_id: number;
    expense_type_id: number;
    amount: number;
    note: string | null;
    expense_date: string;
    expense_types: { name: string } | null;
  };

  const { data: rawExpenses, error } = await supabase
    .from("expenses")
    .select(
      `
      expense_id,
      expense_type_id,
      amount,
      note,
      expense_date,
      expense_types(name)
    `,
    )
    .eq("auth_id", user.id);

  const expenses = rawExpenses as unknown as RawExpense[] | null;

  if (error) {
    return {
      success: false,
      error: error.message,
    };
  }

  const formattedExpenses: Expenses[] =
    expenses?.map((expense) => ({
      id: expense.expense_id,
      expense_type_name: expense.expense_types?.name ?? null,
      amount: expense.amount,
      note: expense.note,
      expense_date: new Date(expense.expense_date).toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
      }),
    })) ?? [];

  return {
    success: true,
    data: formattedExpenses,
  };
}
