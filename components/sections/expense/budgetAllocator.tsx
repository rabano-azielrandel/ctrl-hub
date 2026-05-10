"use client";

import { useState, useMemo, useEffect } from "react";
import { Slider } from "@/components/ui/slider";
import { HalfDonut } from "@/components/ui/HalfDonut";
import { Category, GetExpenseTypesResult } from "@/types/ExpenseTracker";

interface Props {
  getExpenseTypes: () => Promise<GetExpenseTypesResult>;
}

const STEP = 100;

export default function BudgetAllocator({ getExpenseTypes }: Props) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [values, setValues] = useState<Record<string, number>>({});

  useEffect(() => {
    async function handleData() {
      const result = await getExpenseTypes();

      if (!result.success) {
        console.error("Failed to fetch expense types:", result.error);
        return;
      }

      const fetchedCategories = result.data;
      setCategories(fetchedCategories);

      // Initialize values to 0 for each dynamic category
      const initialValues = Object.fromEntries(
        fetchedCategories.map((cat) => [cat.id, 0]),
      );
      setValues(initialValues);
    }

    handleData();
  }, [getExpenseTypes]);

  const monthlySalary = 20000;

  const totalAllocated = useMemo(
    () => Object.values(values).reduce((a, b) => a + b, 0),
    [values],
  );

  const remaining = monthlySalary - totalAllocated;

  const handleChange = (id: string, newValue: number) => {
    const current = values[id];
    const diff = newValue - current;

    if (diff > remaining) return;

    setValues((prev) => ({
      ...prev,
      [id]: newValue,
    }));
  };

  return (
    <div className="bg-[#140F2A] p-6 rounded-2xl w-full max-w-xl space-y-6">
      {/* HALF DONUTS */}
      <div className="flex justify-between">
        {categories.slice(0, 4).map((cat) => {
          const percent = (values[cat.id] / monthlySalary) * 100;

          return (
            <HalfDonut
              key={cat.id}
              value={percent}
              color={cat.color}
              label={cat.label}
            />
          );
        })}
      </div>

      {/* SLIDERS */}
      <div className="space-y-4">
        {categories.map((cat) => {
          const percent = ((values[cat.id] ?? 0) / monthlySalary) * 100;

          return (
            <div key={cat.id} className="space-y-1">
              <div className="flex justify-between text-sm">
                <span style={{ color: cat.color }}>{cat.label}</span>
                <span className="text-white/70">
                  {percent.toFixed(0)}% · ₱
                  {(values[cat.id] ?? 0).toLocaleString()}
                </span>
              </div>

              <Slider
                min={0}
                max={monthlySalary}
                step={STEP}
                value={[values[cat.id] ?? 0]}
                onValueChange={(val) =>
                  handleChange(cat.id, Array.isArray(val) ? val[0] : val)
                }
                color=""
                className="w-full"
              />

              <div
                className="h-1.5 rounded-full -mt-2"
                style={{ backgroundColor: cat.color }}
              />
            </div>
          );
        })}
      </div>

      {/* TOTAL */}
      <div className="pt-4 border-t border-white/10">
        <div className="flex justify-between text-sm text-white/70">
          <span>Total Allocated</span>
          <span>{((totalAllocated / monthlySalary) * 100).toFixed(0)}%</span>
        </div>

        <div className="h-2 bg-[#2A2047] rounded-full mt-2 overflow-hidden">
          <div
            className="h-full bg-green-400"
            style={{
              width: `${(totalAllocated / monthlySalary) * 100}%`,
            }}
          />
        </div>
      </div>
    </div>
  );
}
