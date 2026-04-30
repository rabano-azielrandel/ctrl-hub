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