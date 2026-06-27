"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { Category } from "@/types/ExpenseTracker";

type Props = {
  categories: Category[];
  onClose: () => void;
  onSubmit: (data: {
    expense_type_id: number;
    amount: number;
    expense_date: string;
    note: string | null;
  }) => Promise<{ success: boolean; error?: string }>;
};

type FormState = {
  expense_type_id: string;
  amount: string;
  expense_date: string;
  note: string;
};

export default function AddExpenseModal({ categories, onClose, onSubmit }: Props) {
  const today = new Date().toISOString().split("T")[0];
  const [form, setForm] = useState<FormState>({
    expense_type_id: categories[0]?.id.toString() ?? "",
    amount: "",
    expense_date: today,
    note: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const set = (field: keyof FormState, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async () => {
    if (!form.amount || !form.expense_type_id || !form.expense_date) {
      setError("Please fill in all required fields.");
      return;
    }
    setLoading(true);
    setError(null);
    const result = await onSubmit({
      expense_type_id: Number(form.expense_type_id),
      amount: Number(form.amount),
      expense_date: form.expense_date,
      note: form.note || null,
    });
    setLoading(false);
    if (result.success) {
      onClose();
    } else {
      setError(result.error ?? "Something went wrong.");
    }
  };

  const selectedCategory = categories.find(
    (c) => c.id.toString() === form.expense_type_id,
  );

  return (
    <div
      className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="w-full max-w-md flex flex-col rounded-3xl border border-violet-900/70 bg-[#090014] p-6 shadow-[0_0_80px_rgba(139,92,246,0.15)] mx-4">
        {/* HEADER */}
        <div className="mb-6 flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white">Add Expense</h2>
            <p className="mt-1 text-sm text-violet-200/70">
              Record a new expense entry.
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded-xl border border-violet-800/60 p-2 text-violet-300/60 hover:bg-violet-500/10 hover:text-white transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* FORM */}
        <div className="flex flex-col gap-4">
          {/* Expense Type */}
          <div className="flex flex-col gap-1">
            <label className="text-xs tracking-widest text-white/60">
              EXPENSE TYPE
            </label>
            <div className="relative flex items-center">
              {selectedCategory && (
                <span
                  className="absolute left-3 size-3 rounded-full shrink-0 pointer-events-none z-10"
                  style={{ backgroundColor: selectedCategory.color }}
                />
              )}
              <select
                value={form.expense_type_id}
                onChange={(e) => set("expense_type_id", e.target.value)}
                className="w-full rounded-xl bg-white/10 border border-white/10 text-white h-10 pl-8 pr-4 text-sm outline-none focus:border-white/30 transition appearance-none cursor-pointer"
              >
                {categories.map((cat) => (
                  <option
                    key={cat.id}
                    value={cat.id}
                    style={{ backgroundColor: "#090014" }}
                  >
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Amount */}
          <Input
            label="AMOUNT"
            type="number"
            placeholder="0.00"
            value={form.amount}
            onChange={(e) => set("amount", e.target.value)}
            icon={<span className="text-sm leading-none">₱</span>}
            iconPosition="left"
          />

          {/* Date */}
          <Input
            label="DATE"
            type="date"
            value={form.expense_date}
            onChange={(e) => set("expense_date", e.target.value)}
            inputClassName="[color-scheme:dark]"
          />

          {/* Note */}
          <div className="flex flex-col gap-1">
            <label className="text-xs tracking-widest text-white/60">
              NOTE{" "}
              <span className="text-white/30 normal-case tracking-normal text-xs">
                (optional)
              </span>
            </label>
            <textarea
              value={form.note}
              onChange={(e) => set("note", e.target.value)}
              placeholder="Add a note..."
              rows={3}
              className="w-full rounded-xl bg-white/10 border border-white/10 text-white px-4 py-3 text-sm placeholder:text-white/60 outline-none focus:border-white/30 transition resize-none"
            />
          </div>

          {error && <p className="text-sm text-red-400">{error}</p>}
        </div>

        {/* FOOTER */}
        <div className="mt-6 flex gap-3">
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
            {loading ? "Saving..." : "Save Expense"}
          </Button>
        </div>
      </div>
    </div>
  );
}
