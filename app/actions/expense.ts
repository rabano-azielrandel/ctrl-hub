"use server";

import { createClient } from "@/lib/supabase/server";
import { expenseColors } from "@/lib/data/expenseTracker";
import { Category } from "@/types/ExpenseTracker";

export async function getExpenseTypes(): Promise<{
  success: boolean;
  data?: Category[];
  error?: string;
}> {
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
