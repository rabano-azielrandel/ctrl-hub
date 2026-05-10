"use client";

import { useState, useMemo, useEffect } from "react";
import { Slider } from "@/components/ui/slider";
import { HalfDonut } from "@/components/ui/HalfDonut";
import { Category, GetExpenseTypesResult } from "@/types/ExpenseTracker";
import { X } from "lucide-react";
import Button from "@/components/ui/Button";
import ExpenseTypesModal from "@/components/forms/ExpenseTypeModal";

interface Props {
  getExpenseTypes: () => Promise<GetExpenseTypesResult>;
}

const STEP = 100;

export default function BudgetAllocator({ getExpenseTypes }: Props) {
  const [isAddRowOpen, setAddRow] = useState(false);

  const [categories, setCategories] = useState<Category[]>([]);

  const [values, setValues] = useState<Record<number, number>>({});

  useEffect(() => {
    async function handleData() {
      const result = await getExpenseTypes();

      console.log("client data: ", result);

      if (!result.success) {
        console.error("Failed to fetch expense types:", result.error);
        return;
      }

      const fetchedCategories = result.data;

      setCategories(fetchedCategories);

      /**
       * initialize slider values
       */
      const initialValues = Object.fromEntries(
        fetchedCategories.map((cat) => [cat.id, 0]),
      ) as Record<number, number>;

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

  const handleChange = (id: number, newValue: number) => {
    const current = values[id] ?? 0;

    const diff = newValue - current;

    if (diff > remaining) return;

    setValues((prev) => ({
      ...prev,
      [id]: newValue,
    }));
  };

  return (
    <div className="relative h-full min-w-xl w-full space-y-6 overflow-scroll bg-[#140F2A] p-4">
      {/* HALF DONUTS */}
      <div className="grid grid-cols-6 gap-4">
        {categories.map((cat) => {
          const percent = ((values[cat.id] ?? 0) / monthlySalary) * 100;

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
                className="-mt-2 h-1.5 rounded-full"
                style={{
                  backgroundColor: cat.color,
                }}
              />
            </div>
          );
        })}
      </div>

      {/* TOTAL */}
      <div className="border-t border-white/10 pt-4">
        <div className="flex justify-between text-sm text-white/70">
          <span>Total Allocated</span>

          <span>{((totalAllocated / monthlySalary) * 100).toFixed(0)}%</span>
        </div>

        <div className="mt-2 overflow-hidden rounded-full bg-[#2A2047]">
          <div
            className="h-2 bg-green-400"
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
        <div className="absolute inset-20 z-40 border border-[#9146EA] bg-[#140F2A] p-4 overflow-hidden">
          <div className="flex justify-end">
            <Button
              onClick={() => setAddRow((prev) => !prev)}
              className="flex h-14 w-14 items-center justify-center rounded-full border border-white/50 text-white transition hover:bg-white/10"
            >
              <X size={26} />
            </Button>
          </div>

          <div className="relative h-full w-full">
            <ExpenseTypesModal initialData={categories} />
          </div>
        </div>
      )}
    </div>
  );
}
