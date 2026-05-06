"use server";

import { createClient } from "@/lib/supabase/server";

export async function getUsers() {
    const supabase = await createClient();

    const { data: {user}, error: authError } = await supabase.auth.getUser();

     if (authError || !user) {
        return { success: false, error: "Unauthorized: Not authenticated." };
    }

    const { data: profile, error:profileError } = await supabase
    .from("user_profiles")
    .select("*");
    
    if (profileError) throw new Error(profileError.message || "getUsers failed");

    return profile;
}