"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { GetExpenseTypesResult, Category } from "@/types/ExpenseTracker";
import { CategorySpend } from "@/app/actions/summary";
import { createExpenseType } from "@/app/actions/expense";
import { EXPENSE_ICON_OPTIONS, getIconByKey } from "@/lib/data/expenseTracker";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  ChartPie,
  Plus,
  Search,
  Funnel,
  ChevronDown,
  X,
  Check,
} from "lucide-react";
import { PieChart, Pie, Cell, Label } from "recharts";

type FilterMode = "all" | "active" | "inactive";

interface Props {
  getExpenseTypes: GetExpenseTypesResult;
  categoryBreakdown: CategorySpend[];
  totalSpent: number;
  totalIncome: number;
}

// ─── Add Category Modal ───────────────────────────────────────────────────────

function AddCategoryModal({
  onClose,
  onSuccess,
}: {
  onClose: () => void;
  onSuccess: () => void;
}) {
  const [name, setName] = useState("");
  const [selectedIcon, setSelectedIcon] = useState("tag");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!name.trim()) {
      setError("Category name is required.");
      return;
    }
    setLoading(true);
    setError(null);
    const result = await createExpenseType(name.trim(), selectedIcon);
    setLoading(false);
    if (result.success) {
      onSuccess();
    } else {
      setError(result.error ?? "Something went wrong.");
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="w-full max-w-sm flex flex-col rounded-3xl border border-violet-900/70 bg-[#090014] p-6 shadow-[0_0_80px_rgba(139,92,246,0.15)] mx-4">
        {/* Header */}
        <div className="mb-5 flex items-start justify-between">
          <div>
            <h2 className="text-xl font-bold text-white">Add Category</h2>
            <p className="mt-1 text-sm text-violet-200/70">
              Create a new expense category.
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded-xl border border-violet-800/60 p-2 text-violet-300/60 hover:bg-violet-500/10 hover:text-white transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* Name */}
        <Input
          label="CATEGORY NAME"
          placeholder="e.g. Utilities"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
        />

        {/* Icon picker */}
        <div className="mt-4 flex flex-col gap-2">
          <label className="text-xs tracking-widest text-white/60">ICON</label>
          <div className="grid grid-cols-4 sm:grid-cols-7 gap-1.5 max-h-44 overflow-y-auto pr-1">
            {EXPENSE_ICON_OPTIONS.map((opt) => {
              const Icon = opt.icon;
              const isSelected = selectedIcon === opt.key;
              return (
                <button
                  key={opt.key}
                  type="button"
                  title={opt.label}
                  onClick={() => setSelectedIcon(opt.key)}
                  className={`
                    flex items-center justify-center rounded-xl p-2.5 transition-all
                    ${
                      isSelected
                        ? "bg-violet-600/40 border border-violet-500 text-white"
                        : "bg-white/5 border border-white/10 text-white/50 hover:bg-white/10 hover:text-white/80"
                    }
                  `}
                >
                  <Icon size={18} />
                </button>
              );
            })}
          </div>
          {/* Selected icon label */}
          <p className="text-xs text-violet-300/60">
            Selected:{" "}
            <span className="text-violet-300">
              {EXPENSE_ICON_OPTIONS.find((o) => o.key === selectedIcon)
                ?.label ?? "General"}
            </span>
          </p>
        </div>

        {error && <p className="mt-3 text-sm text-red-400">{error}</p>}

        {/* Footer */}
        <div className="mt-5 flex gap-3">
          <Button
            type="button"
            variant="secondary"
            size="lg"
            onClick={onClose}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            type="button"
            size="lg"
            onClick={handleSubmit}
            disabled={loading}
            className="flex-1 bg-[#670DF6] hover:bg-[#670DF6]/70"
          >
            {loading ? "Saving..." : "Add Category"}
          </Button>
        </div>
      </div>
    </div>
  );
}

// ─── Filter options ───────────────────────────────────────────────────────────

const FILTER_OPTIONS: { label: string; value: FilterMode }[] = [
  { label: "All", value: "all" },
  { label: "Active", value: "active" },
  { label: "Inactive", value: "inactive" },
];

// ─── BudgetAllocator ──────────────────────────────────────────────────────────

const BudgetAllocator = ({
  getExpenseTypes,
  categoryBreakdown,
  totalSpent,
  totalIncome,
}: Props) => {
  const router = useRouter();
  const categories: Category[] = getExpenseTypes.success
    ? getExpenseTypes.data
    : [];

  const [search, setSearch] = useState("");
  const [filterMode, setFilterMode] = useState<FilterMode>("all");
  const [showAddModal, setShowAddModal] = useState(false);

  const usedPct =
    totalIncome > 0
      ? Math.min(Math.round((totalSpent / totalIncome) * 100), 100)
      : 0;
  const donutData = [{ value: usedPct }, { value: 100 - usedPct }];

  const allItems = categories.map((cat) => {
    const match = categoryBreakdown.find(
      (b) => b.name.toLowerCase() === cat.label.toLowerCase(),
    );
    return {
      name: cat.label,
      color: cat.color,
      icon: cat.icon,
      spent: match?.spent ?? 0,
    };
  });

  const displayItems = allItems
    .filter((item) => item.name.toLowerCase().includes(search.toLowerCase()))
    .filter((item) => {
      if (filterMode === "active") return item.spent > 0;
      if (filterMode === "inactive") return item.spent === 0;
      return true;
    })
    .sort((a, b) => b.spent - a.spent);

  return (
    <>
      <div className="w-full flex flex-col bg-gradient-to-b from-[#0D0C2F] to-[#070723] rounded-2xl">
        <div className="w-full flex flex-col gap-4 p-4">
          {/* Header */}
          <div className="flex flex-col lg:flex-row justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-fit flex items-center p-2 rounded-xl bg-[#270386]">
                <ChartPie color="#C39CFD" size={20} />
              </div>
              <span className="text-nowrap text-white text-[18px] font-bold">
                Budget Categories
              </span>
            </div>
            <Button
              variant="secondary"
              className="h-11 bg-[#0A0A2A] border border-[#2d2760] cursor-pointer hover:bg-[#9889dd]/60"
              onClick={() => setShowAddModal(true)}
            >
              <Plus color="#FFFFFF" size={16} />
              <span className="text-sm whitespace-nowrap text-white/80">
                Add Category
              </span>
            </Button>
          </div>

          {/* Stats row */}
          <div className="w-full flex items-center p-3 rounded-lg border border-[#261F52] bg-[#0F0E37]">
            <div className="flex-1">
              <p className="text-[#C089FD]/80 text-[12px] font-medium">
                Total Income
              </p>
              <p className="text-white text-[16px] font-semibold">
                ₱
                {totalIncome.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                })}
              </p>
            </div>

            <div className="relative w-[64px] h-[64px] flex items-center justify-center shrink-0">
              <PieChart width={64} height={64}>
                <defs>
                  <linearGradient id="donutGrad" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#a855f7" />
                    <stop offset="100%" stopColor="#7c3aed" />
                  </linearGradient>
                </defs>
                <Pie
                  data={donutData}
                  cx="50%"
                  cy="50%"
                  innerRadius={22}
                  outerRadius={30}
                  startAngle={90}
                  endAngle={-270}
                  dataKey="value"
                  strokeWidth={0}
                >
                  <Label
                    content={({ viewBox }) => {
                      if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                        return (
                          <text
                            x={viewBox.cx}
                            y={viewBox.cy}
                            textAnchor="middle"
                            dominantBaseline="middle"
                          >
                            <tspan
                              x={viewBox.cx}
                              y={viewBox.cy}
                              style={{
                                fill: "white",
                                fontSize: "13px",
                                fontWeight: "bold",
                              }}
                            >
                              {usedPct}%
                            </tspan>
                          </text>
                        );
                      }
                    }}
                  />
                  <Cell fill="url(#donutGrad)" />
                  <Cell fill="#1e1a40" />
                </Pie>
              </PieChart>
            </div>

            <div className="flex-1 text-right">
              <p className="text-[#C089FD]/80 text-[12px] font-medium">
                Total Spent
              </p>
              <p className="text-white text-[16px] font-semibold">
                ₱
                {totalSpent.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                })}
              </p>
            </div>
          </div>

          {/* Search + Filter row */}
          <div className="w-full flex justify-between gap-3">
            <div className="w-[50%]">
              <Input
                placeholder="Search Category"
                icon={<Search size={18} />}
                iconPosition="right"
                size="md"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <Popover>
              <PopoverTrigger>
                <div className="flex items-center gap-2 h-11 px-3 bg-[#0A0A2A] border border-[#2d2760] rounded-md cursor-pointer hover:bg-[#9889dd]/20 transition-colors">
                  <Funnel color="#FFFFFF" size={16} />
                  <span className="text-sm whitespace-nowrap text-white/80">
                    {FILTER_OPTIONS.find((o) => o.value === filterMode)?.label}
                  </span>
                  <ChevronDown color="#FFFFFF" size={12} />
                </div>
              </PopoverTrigger>
              <PopoverContent
                className="w-36 p-1 bg-[#13102a] border-[#2d2760]"
                align="end"
              >
                {FILTER_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setFilterMode(opt.value)}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm text-white/80 hover:bg-violet-500/20 hover:text-white transition-colors"
                  >
                    {opt.label}
                    {filterMode === opt.value && (
                      <Check size={14} className="text-violet-400" />
                    )}
                  </button>
                ))}
              </PopoverContent>
            </Popover>
          </div>

          {/* Categories list */}
          <div className="flex flex-col gap-2 overflow-y-auto">
            {displayItems.length === 0 ? (
              <p className="text-white/40 text-sm text-center py-6">
                {categories.length === 0
                  ? "No categories yet — add one above"
                  : "No categories match your filter"}
              </p>
            ) : (
              displayItems.map((item) => {
                const Icon = getIconByKey(item.icon);
                const pct =
                  totalSpent > 0
                    ? Math.round((item.spent / totalSpent) * 100)
                    : 0;
                return (
                  <div
                    key={item.name}
                    className="flex items-center gap-3 p-3 rounded-lg border border-[#261F52] bg-[#0F0E37]"
                  >
                    <div
                      className="flex items-center justify-center w-8 h-8 rounded-lg shrink-0"
                      style={{ backgroundColor: `${item.color}22` }}
                    >
                      <Icon size={16} style={{ color: item.color }} />
                    </div>
                    <span className="flex-1 text-white text-sm font-medium truncate">
                      {item.name}
                    </span>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-[#C089FD]/60 text-[10px]">Spent</p>
                        <p className="text-white text-xs font-semibold">
                          ₱
                          {item.spent.toLocaleString("en-US", {
                            minimumFractionDigits: 2,
                          })}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-[#C089FD]/60 text-[10px]">
                          % of Total
                        </p>
                        <p className="text-white text-xs font-semibold">
                          {pct}%
                        </p>
                      </div>
                      <div className="w-16">
                        <div className="w-full h-1.5 rounded-full bg-[#1e1a40] overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all"
                            style={{
                              width: `${pct}%`,
                              backgroundColor: item.color,
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {!getExpenseTypes.success && (
            <p className="text-red-400 text-sm">{getExpenseTypes.error}</p>
          )}
        </div>
      </div>

      {showAddModal && (
        <AddCategoryModal
          onClose={() => setShowAddModal(false)}
          onSuccess={() => {
            setShowAddModal(false);
            router.refresh();
          }}
        />
      )}
    </>
  );
};

export default BudgetAllocator;
