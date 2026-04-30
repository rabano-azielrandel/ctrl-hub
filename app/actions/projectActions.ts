"use server";

import { createClient } from "@/lib/supabase/server";

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
