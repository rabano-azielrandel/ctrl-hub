"use client";

import { useState, useMemo, useEffect } from "react";
import { Slider } from "@/components/ui/slider";
import { HalfDonut } from "@/components/ui/HalfDonut";
import { Category, GetExpenseTypesResult } from "@/types/ExpenseTracker";
import Button from "@/components/ui/Button";

interface Props {
  getExpenseTypes: () => Promise<GetExpenseTypesResult>;
}

const STEP = 100;

export default function BudgetAllocator({ getExpenseTypes }: Props) {
  const [isAddRowOpen, setAddRow] = useState(false);
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
    <div className="relative bg-[#140F2A] p-4 w-full min-w-xl h-full space-y-6 overflow-scroll">
      {/* HALF DONUTS */}
      <div className="grid grid-cols-6 gap-4">
        {categories.map((cat) => {
          const percent = (values[cat.id] / monthlySalary) * 100;

          return (
            <div key={cat.id} className="flex flex-col items-center">
              <HalfDonut value={percent} color={cat.color} label={cat.label} />
            </div>
          );
        })}
      </div>
      {/* SLIDERS */}
      <div className="h-60 w-full space-y-4 overflow-scroll">
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
      {/* ACTION BUTTONS */}
      <div className="flex justify-end p-4">
        <Button
          onClick={() => setAddRow((prev) => !prev)}
          className="w-30 text-medium"
        >
          Edit Rows
        </Button>
      </div>

      {/* FORM */}
      {isAddRowOpen && (
        <div className="absolute inset-20 flex flex-col p-4 bg-[#140F2A] border border-[#9146EA]">
          <div className="flex justify-end">
            <Button
              onClick={() => setAddRow((prev) => !prev)}
              className="w-12 text-bold rounded-full"
            >
              X
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
