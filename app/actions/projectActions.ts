"use server";

import { createClient } from "@/lib/supabase/server";
import { createClient as createAdminClient } from "@supabase/supabase-js";
import { FieldDefinition, CreateTableResult } from "@/types/TableFields";

function getAdminClient() {
  return createAdminClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_SERVICE_ROLE_KEY!,
  );
}

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

export async function createTable(
  tableName: string,
  fields: FieldDefinition[],
): Promise<CreateTableResult> {
  // 👈 explicit return type

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
    .select("role")
    .eq("id", user.id)
    .single();

  if (profileError || !profile) {
    return { success: false, error: "Unauthorized: Could not verify role." };
  }

  if (profile.role !== "super-admin") {
    return { success: false, error: "Forbidden: Insufficient permissions." };
  }

  if (!/^[a-z][a-z0-9_]{1,62}$/.test(tableName)) {
    return { success: false, error: "Invalid table name." };
  }

  for (const field of fields) {
    if (!/^[a-z][a-z0-9_]{0,62}$/.test(field.name)) {
      return { success: false, error: `Invalid field name: "${field.name}".` };
    }
  }

  const { error: rpcError } = await getAdminClient().rpc("create_custom_table", {
    table_name: tableName,
    requesting_user_id: user.id,
    fields,
  });

  if (rpcError) {
    console.error("RPC error:", rpcError);
    return { success: false, error: "Failed to create table." };
  }

  return { success: true }; // TypeScript now knows this is literal `true`
}

export async function addRow(
  tableName: string,
  rowData: Record<string, any>,
): Promise<CreateTableResult> {
  const supabase = await createClient();

  // 1. Verify session
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();
  if (authError || !user) {
    return { success: false, error: "Unauthorized: Not authenticated." };
  }

  // 2. Verify role
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

  // 4. Inject created_by automatically
  const payload = {
    ...rowData,
    created_by: user.id,
  };

  // 5. Insert into the active table
  const { error: insertError } = await getAdminClient()
    .from(tableName)
    .insert(payload);

  if (insertError) {
    console.error("Insert error:", insertError);
    return { success: false, error: insertError.message };
  }

  return { success: true };
}
