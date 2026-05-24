"use client";

import Image from "next/image";
import { Button } from "../ui/Button";
import Link from "next/link";
import { logout } from "@/app/actions/auth";
import { LogOut } from "lucide-react";
import { sidebarGroups } from "@/lib/data/sidebar";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 h-screen flex flex-col justify-between bg-[#0B1220] text-white p-4">
      {/* TOP */}
      <div>
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center">
            <Image
              src="/icons/admin.png"
              alt="admin"
              width={40}
              height={40}
              loading="eager"
              className="w-10 h-10 object-cover scale-150"
            />
          </div>
          <div>
            <h3 className="font-semibold leading-none">Admin</h3>
            <p className="text-xs text-white/50">V1.0.0</p>
          </div>
        </div>

        {/* NAV */}
        <div className="space-y-6">
          {sidebarGroups.map((group, i) => (
            <div key={i}>
              {/* Group Title */}
              <p className="text-xs text-white/40 tracking-widest mb-2 px-2">
                {group.title}
              </p>

              {/* Items */}
              <ul className="space-y-1">
                {group.items.map((item, idx) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;

                  return (
                    <li key={idx}>
                      <Link href={item.href}>
                        <div
                          className={cn(
                            "w-full flex items-center justify-between px-3 py-2 rounded-xl transition cursor-pointer",
                            isActive
                              ? "bg-white/10 border border-white/10"
                              : "hover:bg-white/5",
                          )}
                        >
                          <div className="flex items-center gap-3">
                            <Icon size={18} className="text-white/70" />
                            <span className="text-sm">{item.label}</span>
                          </div>

                          {item.badge && (
                            <span
                              className={cn(
                                "text-xs px-2 py-0.5 rounded-full",
                                item.badge === "New"
                                  ? "bg-teal-500/20 text-teal-400"
                                  : "bg-red-500/20 text-red-400",
                              )}
                            >
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

      {/* BOTTOM */}
      <div className="space-y-3">
        {/* User Card */}
        <div className="flex items-center justify-between bg-white/5 rounded-xl px-3 py-2">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-violet-500/30 flex items-center justify-center text-sm">
              AZ
            </div>
            <div>
              <p className="text-sm">Azii</p>
              <p className="text-xs text-white/50">Super Admin</p>
            </div>
          </div>

          <div className="w-2 h-2 bg-green-400 rounded-full" />
        </div>

        {/* Logout */}
        <Button
          variant="secondary"
          onClick={() => logout()}
          className="flex gap-4"
        >
          <LogOut size={16} />
          Sign out
        </Button>
      </div>
    </aside>
  );
}
