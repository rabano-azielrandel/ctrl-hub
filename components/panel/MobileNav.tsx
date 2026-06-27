"use client";

import { useState } from "react";
import { Menu, X, LogOut } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { sidebarGroups } from "@/lib/data/sidebar";
import { logout } from "@/app/actions/auth";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      {/* Fixed top bar — mobile only */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-4 h-14 bg-[#0B1220] border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center overflow-hidden">
            <Image src="/icons/admin.png" alt="admin" width={32} height={32} className="object-cover scale-150" />
          </div>
          <span className="text-white font-semibold text-sm">Ctrl Hub</span>
        </div>
        <button onClick={() => setOpen(true)} className="text-white p-1">
          <Menu size={22} />
        </button>
      </div>

      {/* Backdrop */}
      {open && (
        <div
          className="md:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Slide-in drawer */}
      <div
        className={cn(
          "md:hidden fixed top-0 left-0 bottom-0 z-50 w-72 bg-[#0B1220] text-white flex flex-col justify-between p-4 transition-transform duration-300 ease-in-out",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div>
          {/* Drawer header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center overflow-hidden">
                <Image src="/icons/admin.png" alt="admin" width={40} height={40} className="object-cover scale-150" />
              </div>
              <div>
                <h3 className="font-semibold leading-none">Admin</h3>
                <p className="text-xs text-white/50">V1.0.0</p>
              </div>
            </div>
            <button onClick={() => setOpen(false)} className="text-white/60 hover:text-white transition-colors">
              <X size={20} />
            </button>
          </div>

          {/* Nav groups */}
          <div className="space-y-6">
            {sidebarGroups.map((group, i) => (
              <div key={i}>
                <p className="text-xs text-white/40 tracking-widest mb-2 px-2">{group.title}</p>
                <ul className="space-y-1">
                  {group.items.map((item, idx) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;
                    return (
                      <li key={idx}>
                        <Link href={item.href} onClick={() => setOpen(false)}>
                          <div className={cn(
                            "w-full flex items-center justify-between px-3 py-2 rounded-xl transition cursor-pointer",
                            isActive ? "bg-white/10 border border-white/10" : "hover:bg-white/5",
                          )}>
                            <div className="flex items-center gap-3">
                              <Icon size={18} className="text-white/70" />
                              <span className="text-sm">{item.label}</span>
                            </div>
                            {item.badge && (
                              <span className={cn(
                                "text-xs px-2 py-0.5 rounded-full",
                                item.badge === "New" ? "bg-teal-500/20 text-teal-400" : "bg-red-500/20 text-red-400",
                              )}>
                                {item.badge}
                              </span>
                            )}
                          </div>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div className="space-y-3">
          <div className="flex items-center justify-between bg-white/5 rounded-xl px-3 py-2">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-violet-500/30 flex items-center justify-center text-sm">AZ</div>
              <div>
                <p className="text-sm">Azii</p>
                <p className="text-xs text-white/50">Super Admin</p>
              </div>
            </div>
            <div className="w-2 h-2 bg-green-400 rounded-full" />
          </div>
          <Button variant="secondary" onClick={() => logout()} className="w-full flex gap-4">
            <LogOut size={16} />
            Sign out
          </Button>
        </div>
      </div>
    </>
  );
}
