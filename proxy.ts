import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
  let response = NextResponse.next();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_API_KEY!,
    {
      cookies: {
        getAll: () => request.cookies.getAll(),
        setAll: (cookiesToSet) => {
          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options);
          });
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { pathname } = request.nextUrl;

  const isAuthPage = pathname === "/";
  const isDashboard = pathname.startsWith("/dashboard");

  let role: string | null = null;

  if (user) {
    const { data } = await supabase
      .from("user_profiles")
      .select("role")
      .eq("id", user.id)
      .single();

       role = data?.role ?? null;
  }

  console.log("user", user);
  console.log("role", role);

  const isPrivileged =
    role === "admin" || role === "super-admin";

  // 🚫 1. Not logged in → only login page
  if (!user && !isAuthPage) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // 🚫 2. Logged in → block login page
  if (user && isAuthPage) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // 🔐 3. NON-PRIVILEGED USERS → ONLY dashboard allowed
  if (user && !isPrivileged) {
    if (!isDashboard && pathname !== "/") {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  // 🔐 4. PRIVILEGED USERS → DO NOTHING (full access)
  // super-admin/admin bypass everything

  return response;
}

export const config = {
  matcher: ["/", "/dashboard/:path*", "/projects/:path*", "/admin/:path*"],
};