"use server";

import { createClient } from "@/lib/supabase/server";

export async function getExpenseTypes() {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return { success: false, error: "Unauthorized: Not authenticated." };
  }
}
