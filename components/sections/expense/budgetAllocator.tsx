"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { GetExpenseTypesResult, Category } from "@/types/ExpenseTracker";
import { ChartPie, Plus, Search, Funnel, ChevronDown } from "lucide-react";
import { PieChart, Pie, Cell, Label } from "recharts";

interface Props {
  getExpenseTypes: GetExpenseTypesResult;
}

const BudgetAllocator = ({ getExpenseTypes }: Props) => {
  const categories: Category[] = getExpenseTypes.success
    ? getExpenseTypes.data
    : [];

  const [search, setSearch] = useState("");

  const filteredCategories = categories.filter((cat) =>
    cat.label.toLowerCase().includes(search.toLowerCase()),
  );

  const totalAllocated = categories.reduce((sum) => sum + 2000, 0);
  const totalUsed = categories.reduce((sum) => sum + 1000, 0);
  const usedPct =
    totalAllocated > 0 ? Math.round((totalUsed / totalAllocated) * 100) : 0;

  const donutData = [{ value: usedPct }, { value: 100 - usedPct }];

  return (
    <div className="w-full flex flex-col bg-gradient-to-b from-[#0D0C2F] to-[#070723] rounded-2xl">
      <div className="w-full h-full max-h-[650px] flex flex-col gap-4 p-4">
        {/* Header */}
        <div className="flex justify-between items-center">
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
          >
            <Plus color="#FFFFFF" size={16} />
            <span className="text-sm whitespace-nowrap text-white/80">
              Add Category
            </span>
          </Button>
        </div>

        {/* Stats row */}
        <div className="w-full flex items-center p-3 rounded-lg border border-[#261F52] bg-[#0F0E37]">
          {/* Total Allocated */}
          <div className="flex-1">
            <p className="text-[#C089FD]/80 text-[12px] font-medium">
              Total Allocated
            </p>
            <p className="text-white text-[16px] font-semibold">
              ₱{totalAllocated.toLocaleString()}
            </p>
          </div>

          {/* Donut */}
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
                <Cell fill="url(#donutGrad)" />{" "}
                {/* ← direct hex/url, not CSS var */}
                <Cell fill="#1e1a40" />
              </Pie>
            </PieChart>
          </div>

          {/* Total Used */}
          <div className="flex-1 text-right">
            <p className="text-[#C089FD]/80 text-[12px] font-medium">
              Total Used
            </p>
            <p className="text-white text-[16px] font-semibold">
              ₱{totalUsed.toLocaleString()}
            </p>
          </div>
        </div>

        {/* Search row */}
        <div className="w-full flex justify-between">
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

          <Button
            variant="secondary"
            className="h-11 bg-[#0A0A2A] border border-[#2d2760] cursor-pointer hover:bg-[#9889dd]/60"
          >
            <Funnel color="#FFFFFF" size={16} />
            <span className="text-sm whitespace-nowrap text-white/80 mr-4">
              All
            </span>
            <ChevronDown color="#FFFFFF" size={12} />
          </Button>
        </div>

        {/* Categories list */}
        <div className="flex flex-col gap-2 overflow-y-auto">
          {filteredCategories.length === 0 ? (
            <p className="text-white/40 text-sm text-center py-6">
              No categories found
            </p>
          ) : (
            filteredCategories.map((cat) => {
              const allocated = 2000;
              const used = 1000;
              const pct = Math.round((used / allocated) * 100);
              return (
                <div
                  key={cat.id}
                  className="flex items-center gap-3 p-3 rounded-lg border border-[#261F52] bg-[#0F0E37]"
                >
                  <div
                    className="w-3 h-3 rounded-full shrink-0"
                    style={{ backgroundColor: cat.color }}
                  />
                  <span className="flex-1 text-white text-sm font-medium truncate">
                    {cat.label}
                  </span>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-[#C089FD]/60 text-[10px]">Allocated</p>
                      <p className="text-white text-xs font-semibold">
                        ₱{allocated.toLocaleString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-[#C089FD]/60 text-[10px]">Used</p>
                      <p className="text-white text-xs font-semibold">
                        ₱{used.toLocaleString()}
                      </p>
                    </div>
                    <div className="w-16">
                      <div className="w-full h-1.5 rounded-full bg-[#1e1a40] overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all"
                          style={{
                            width: `${pct}%`,
                            backgroundColor: cat.color,
                          }}
                        />
                      </div>
                      <p className="text-white/40 text-[10px] text-right mt-0.5">
                        {pct}%
                      </p>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Error state */}
        {!getExpenseTypes.success && (
          <p className="text-red-400 text-sm">{getExpenseTypes.error}</p>
        )}
      </div>
    </div>
  );
};

export default BudgetAllocator;
