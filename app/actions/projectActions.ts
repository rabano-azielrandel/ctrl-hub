import { createClient } from "@/lib/supabase/server";

const supabase = await createClient();

export async function getProjects() {
    const { data, error } = await supabase
        .schema("public")
        .from("projects")
        .select("*");

     if (error) throw new Error(error.message);

     return data;
}