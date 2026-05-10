"use client";

import { useState, useMemo, useEffect } from "react";
import { Slider } from "@/components/ui/slider";
import { HalfDonut } from "@/components/ui/HalfDonut";
import { categories } from "@/lib/data/expenseTracker";

interface Props {
  getExpenseTypes: () => Promise<Record<string, any>[]>;
}

const STEP = 100;

export default function BudgetAllocator({ getExpenseTypes }: Props) {
  const [raw, setRaw] = useState<Record<string, any>[]>([]);

  useEffect(() => {
    async function handleData() {
      const data = await getExpenseTypes();
      setRaw(data);
    }

    handleData();
  }, [getExpenseTypes]);

  console.log("new data: ", raw);

  const monthlySalary = 20000;

  const [values, setValues] = useState<Record<string, number>>({
    housing: 0,
    food: 0,
    transport: 0,
    savings: 0,
    leisure: 0,
    others: 0,
  });

  const totalAllocated = useMemo(
    () => Object.values(values).reduce((a, b) => a + b, 0),
    [values],
  );

  const remaining = monthlySalary - totalAllocated;

  const handleChange = (id: string, newValue: number) => {
    const current = values[id];
    const diff = newValue - current;

    // prevent overflow
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
          const percent = (values[cat.id] / monthlySalary) * 100;

          return (
            <div key={cat.id} className="space-y-1">
              <div className="flex justify-between text-sm">
                <span style={{ color: cat.color }}>{cat.label}</span>
                <span className="text-white/70">
                  {percent.toFixed(0)}% · ₱{values[cat.id].toLocaleString()}
                </span>
              </div>

              <Slider
                min={0}
                max={monthlySalary}
                step={STEP}
                value={[values[cat.id]]}
                onValueChange={(val) =>
                  handleChange(cat.id, Array.isArray(val) ? val[0] : val)
                }
                color=""
                className="w-full"
              >
                {/* pass color via style */}
              </Slider>

              {/* colored track override */}
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
