import {
  LayoutDashboard,
  User,
  BriefcaseBusiness,
  AlarmClockCheck,
  Target,
  Settings,
  Clock,
  SquarePlus,
  PhilippinePeso
} from "lucide-react";
import { LucideIcon } from "lucide-react";

export interface SidebarItem {
  icon: LucideIcon;
  label: string;
  href: string;
  badge?: string;
  active?: boolean;
}

export interface SidebarGroup {
  title: string;
  items: SidebarItem[];
}

export const sidebarGroups: SidebarGroup[] = [
  {
    title: "MAIN",
    items: [
      { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard", active: true },
      { icon: BriefcaseBusiness, label: "Projects", href: "/projects" },
      { icon: User, label: "Users", href: "/users", badge: "1" },
      { icon: AlarmClockCheck, label: "Todo List", href: "/todos" },
      { icon: Target, label: "Analytics", href: "/analytics", badge: "New" },
    ],
  },
    {
    title: "FINANCE",
    items: [
      { icon: PhilippinePeso , label: "Expense Tracker", href: "/expense" },
    ],
  },
  {
    title: "SYSTEM",
    items: [
      { icon: Settings, label: "Settings", href: "/settings" },
      { icon: Clock, label: "Audit Log", href: "/audit-log" },
      { icon: SquarePlus, label: "Integrations", href: "/integrations" },
    ],
  },
];