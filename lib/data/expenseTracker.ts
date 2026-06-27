import { Category } from "@/types/ExpenseTracker";
import {
  Wallet,
  ShoppingBag,
  PiggyBank,
  FileText,
  TrendingUp,
  TrendingDown,
  CreditCard,
  DollarSign,
  BarChart2,
  Receipt,
  Landmark,
  ArrowUpCircle,
  ArrowDownCircle,
  CircleDollarSign,
  HeartHandshake,
  Wifi,
  ShoppingCart,
  User,
  Tag,
  Home,
  Car,
  Utensils,
  Coffee,
  Phone,
  Zap,
  Flame,
  Tv,
  Dumbbell,
  Pill,
  GraduationCap,
  Plane,
  Gift,
  Music,
  BookOpen,
  Shirt,
  Wrench,
  type LucideIcon,
} from "lucide-react";

export const expenseColors = [
  "#B67DF1",
  "#5DCAA5",
  "#EDD080",
  "#F57A7A",
  "#7EC8F0",
  "#F0A070",
];

export const categories: Category[] = [
  { id: 1, label: "Housing",   color: expenseColors[0], icon: "home" },
  { id: 2, label: "Food",      color: expenseColors[1], icon: "utensils" },
  { id: 3, label: "Transport", color: expenseColors[2], icon: "car" },
  { id: 4, label: "Savings",   color: expenseColors[3], icon: "piggy_bank" },
  { id: 5, label: "Leisure",   color: expenseColors[4], icon: "tv" },
  { id: 6, label: "Others",    color: expenseColors[5], icon: "tag" },
];

export const ICON_MAP = {
  wallet:       Wallet,
  shopping:     ShoppingBag,
  piggy:        PiggyBank,
  file:         FileText,
  trending_up:  TrendingUp,
  trending_down:TrendingDown,
  credit:       CreditCard,
  dollar:       DollarSign,
  bar_chart:    BarChart2,
  receipt:      Receipt,
  landmark:     Landmark,
  arrow_up:     ArrowUpCircle,
  arrow_down:   ArrowDownCircle,
  circle_dollar:CircleDollarSign,
};

export type IconKey = keyof typeof ICON_MAP;

// ─── Expense category icon picker ───────────────────────────────────────────

export const EXPENSE_ICON_OPTIONS: { key: string; icon: LucideIcon; label: string }[] = [
  { key: "tag",            icon: Tag,           label: "General"      },
  { key: "wallet",         icon: Wallet,         label: "Wallet"       },
  { key: "piggy_bank",     icon: PiggyBank,      label: "Savings"      },
  { key: "shopping_bag",   icon: ShoppingBag,    label: "Shopping"     },
  { key: "shopping_cart",  icon: ShoppingCart,   label: "Groceries"    },
  { key: "home",           icon: Home,           label: "Housing"      },
  { key: "car",            icon: Car,            label: "Transport"    },
  { key: "utensils",       icon: Utensils,       label: "Food"         },
  { key: "coffee",         icon: Coffee,         label: "Drinks"       },
  { key: "phone",          icon: Phone,          label: "Phone"        },
  { key: "wifi",           icon: Wifi,           label: "Internet"     },
  { key: "zap",            icon: Zap,            label: "Electricity"  },
  { key: "flame",          icon: Flame,          label: "Gas"          },
  { key: "tv",             icon: Tv,             label: "Streaming"    },
  { key: "dumbbell",       icon: Dumbbell,       label: "Fitness"      },
  { key: "pill",           icon: Pill,           label: "Health"       },
  { key: "graduation_cap", icon: GraduationCap,  label: "Education"    },
  { key: "plane",          icon: Plane,          label: "Travel"       },
  { key: "gift",           icon: Gift,           label: "Gifts"        },
  { key: "music",          icon: Music,          label: "Music"        },
  { key: "book_open",      icon: BookOpen,       label: "Books"        },
  { key: "shirt",          icon: Shirt,          label: "Clothing"     },
  { key: "wrench",         icon: Wrench,         label: "Repairs"      },
  { key: "landmark",       icon: Landmark,       label: "Banking"      },
  { key: "credit_card",    icon: CreditCard,     label: "Credit"       },
  { key: "receipt",        icon: Receipt,        label: "Bills"        },
  { key: "heart_handshake",icon: HeartHandshake, label: "Tithe"        },
  { key: "user",           icon: User,           label: "Personal"     },
];

export function getIconByKey(key: string): LucideIcon {
  return EXPENSE_ICON_OPTIONS.find((o) => o.key === key)?.icon ?? Tag;
}

// ─── Keyword fallback for DataTable (no stored key available) ────────────────

const EXPENSE_TYPE_MATCHERS: { keyword: string; icon: LucideIcon }[] = [
  { keyword: "savings",  icon: PiggyBank      },
  { keyword: "tithe",    icon: HeartHandshake  },
  { keyword: "wifi",     icon: Wifi            },
  { keyword: "gasul",    icon: ShoppingCart    },
  { keyword: "personal", icon: User            },
];

export function getExpenseTypeIcon(name: string): LucideIcon {
  const lower = name.toLowerCase();
  return EXPENSE_TYPE_MATCHERS.find((m) => lower.includes(m.keyword))?.icon ?? Tag;
}

// ─── Summary cards static config ─────────────────────────────────────────────

interface DefaultEntry {
  label: string;
  color: string;
  icon: IconKey;
  total: string;
  desc: string;
}

export const DefaultCards: DefaultEntry[] = [
  { label: "Monthly Salary",    color: "#6C63FF", icon: "wallet",   total: "₱0.00",  desc: "" },
  { label: "Total Spent",       color: "#00D4AA", icon: "shopping", total: "₱0.00",  desc: "" },
  { label: "Savings",           color: "#F59E0B", icon: "piggy",    total: "₱0.00",  desc: "" },
  { label: "Remaining Balance", color: "#EC4899", icon: "file",     total: "₱0.00",  desc: "This month" },
];
