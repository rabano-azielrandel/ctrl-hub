"use server";

import { createClient } from "@/lib/supabase/server";
import { GetUsersResult } from "@/types/TableFields"

export async function getUsers(): Promise<GetUsersResult> {
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return { success: false, error: "Unauthorized: Not authenticated." };
  }

  const { data: profile, error: profileError } = await supabase
    .from("user_profiles")
    .select("*");

  if (profileError || !profile) {
    return { success: false, error: profileError?.message ?? "getUsers failed" };
  }

  return {
    success: true,
    data: profile,
  };
}