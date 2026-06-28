"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function login({email, password}: {email: string; password: string;}) {
    const supabase = await createClient();

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) throw new Error(error.message);

    redirect("/dashboard");
}

export async function signup({ email, password }: { email: string; password: string }) {
    const supabase = await createClient();

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            emailRedirectTo: `${siteUrl}/auth/callback`,
        },
    });

    if (error) throw new Error(error.message);

    // Auto-confirmed — redirect immediately
    if (data.session) redirect("/dashboard");

    // Email confirmation required — caller shows a message
    return { confirmEmail: true };
}

export async function logout() {
    const supabase = await createClient();
    await supabase.auth.signOut();
    redirect("/");
}