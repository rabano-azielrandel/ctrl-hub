"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { IncomeCategory, GetIncomeTypesResult } from "@/types/IncomeTracker";

const incomeColors = [
  "#5DCAA5",
  "#7EC8F0",
  "#B67DF1",
  "#EDD080",
  "#F0A070",
  "#F57A7A",
];

export async function getIncomeTypes(): Promise<GetIncomeTypesResult> {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return { success: false, error: "Unauthorized: Not authenticated." };
  }

  const { data: incomeType, error } = await supabase
    .from("income_types")
    .select("income_type_id, name")
    .eq("auth_id", user.id);

  if (error) {
    return { success: false, error: error.message || "Fetching Income Types Failed" };
  }

  const categories: IncomeCategory[] = incomeType.map((item, index) => ({
    id: item.income_type_id,
    label: item.name,
    color: incomeColors[index % incomeColors.length],
  }));

  return { success: true, data: categories };
}

export async function createIncome(data: {
  income_type_id: number;
  amount: number;
  income_date: string;
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

  const { error } = await supabase.from("income").insert({
    auth_id: user.id,
    income_type_id: data.income_type_id,
    amount: data.amount,
    income_date: data.income_date,
    note: data.note,
  });

  if (error) {
    return { success: false, error: error.message };
  }

  revalidatePath("/expense");
  return { success: true };
}
