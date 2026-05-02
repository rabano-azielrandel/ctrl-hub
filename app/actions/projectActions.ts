"use server";

import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import { createClient as createAdminClient } from "@supabase/supabase-js";

const adminClient = createAdminClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_SERVICE_ROLE_KEY!
);

export async function getProjects() {
    const supabase = await createClient();

    const { data, error } = await supabase
        .schema("public")
        .from("projects")
        .select("name")
        .neq("name", "bot");

     if (error) throw new Error(error.message);

     return data;
}

export async function getProjectsRows() {
    const supabase = await createClient();

    const { data, error } = await supabase
        .schema("public")
        .from("projects")
        .select("*");
    
    if (error) throw new Error(error.message);

    return data;
}

export async function getProjectsCardRows() {
    const supabase = await createClient();

    const { data, error } = await supabase
        .schema("public")
        .from("project_card")
        .select("*");
    
    if (error) throw new Error(error.message);

    return data;
}

export async function createTable(tableName: string) {
  // 1. Auth check using your existing server client
  const supabase = await createClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();

  if (authError || !user) {
    return { success: false, error: "Unauthorized: Not authenticated." };
  }

  // 2. Role check
  const { data: profile, error: profileError } = await supabase
    .from("user_profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profileError || !profile) {
    return { success: false, error: "Unauthorized: Could not verify role." };
  }

  if (profile.role !== "super-admin") {
    return { success: false, error: "Forbidden: Insufficient permissions." };
  }

  // 3. Validate table name
  if (!/^[a-z][a-z0-9_]{1,62}$/.test(tableName)) {
    return { success: false, error: "Invalid table name." };
  }

  // 4. Call RPC via admin client
  const { error: rpcError } = await adminClient.rpc("create_custom_table", {
    table_name: tableName,
    requesting_user_id: user.id,
  });

  if (rpcError) {
    console.error("RPC error:", rpcError);
    return { success: false, error: "Failed to create table." };
  }

  return { success: true };
}