import {
  LayoutDashboard,
  Calendar,
  BriefcaseBusiness,
  AlarmClockCheck,
  Target,
  Settings,
  Clock,
  SquarePlus,
} from "lucide-react";
import { LucideIcon } from "lucide-react";

export interface SidebarItem {
  icon: LucideIcon;
  label: string;
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
      { icon: LayoutDashboard, label: "Dashboard", active: true },
      { icon: Calendar, label: "Calendar" },
      { icon: BriefcaseBusiness , label: "Projects", badge: "24" },
      { icon: AlarmClockCheck, label: "Todo List" },
      { icon: Target, label: "Analytics", badge: "New" },
    ],
  },
  {
    title: "SYSTEM",
    items: [
      { icon: Settings, label: "Settings" },
      { icon: Clock, label: "Audit Log" },
      { icon: SquarePlus, label: "Integrations" },
    ],
  },
];