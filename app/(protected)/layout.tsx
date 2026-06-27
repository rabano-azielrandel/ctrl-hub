import { Sidebar } from "@/components/panel/Sidebar";
import { MobileNav } from "@/components/panel/MobileNav";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <MobileNav />
      <main className="flex-1 min-w-0 overflow-y-auto pt-14 md:pt-0">{children}</main>
    </div>
  );
}
