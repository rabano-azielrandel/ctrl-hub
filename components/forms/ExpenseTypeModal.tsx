"use client";

import { useMemo, useState } from "react";
import { GripVertical, Trash2, Plus } from "lucide-react";

import { Button } from "../ui/Button";
import Input from "../ui/Input";

export type Category = {
  id: number;
  label: string;
  color: string;
};

type Props = {
  initialData: Category[];
  onSubmit?: (payload: {
    created: Category[];
    updated: Category[];
    deleted: number[];
  }) => void;
};

export default function ExpenseTypesModal({ initialData, onSubmit }: Props) {
  const [expenseTypes, setExpenseTypes] = useState<Category[]>(initialData);

  const [deletedIds, setDeletedIds] = useState<number[]>([]);

  const [newType, setNewType] = useState({
    label: "",
    color: "#B67DF1",
  });

  /**
   * original data reference
   */
  const originalMap = useMemo(() => {
    return new Map(initialData.map((item) => [item.id, item]));
  }, [initialData]);

  /**
   * update existing item
   */
  const updateType = (index: number, field: keyof Category, value: string) => {
    setExpenseTypes((prev) =>
      prev.map((item, i) =>
        i === index
          ? {
              ...item,
              [field]: value,
            }
          : item,
      ),
    );
  };

  /**
   * delete item
   */
  const deleteType = (index: number) => {
    const item = expenseTypes[index];

    setDeletedIds((prev) => [...prev, item.id]);

    setExpenseTypes((prev) => prev.filter((_, i) => i !== index));
  };

  /**
   * add new category
   */
  const addExpenseType = () => {
    if (!newType.label.trim()) return;

    setExpenseTypes((prev) => [
      ...prev,
      {
        id: Date.now(),
        label: newType.label,
        color: newType.color,
      },
    ]);

    setNewType({
      label: "",
      color: "#B67DF1",
    });
  };

  /**
   * build payload
   */
  const handleSubmit = () => {
    const created = expenseTypes.filter((item) => !originalMap.has(item.id));

    const updated = expenseTypes.filter((item) => {
      const original = originalMap.get(item.id);

      if (!original) return false;

      return original.label !== item.label || original.color !== item.color;
    });

    const payload = {
      created,
      updated,
      deleted: deletedIds,
    };

    console.log(payload);

    onSubmit?.(payload);
  };

  return (
    <div className="absolute inset-0 overflow-y-auto p-4">
      <div className="flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-3xl border border-violet-900/70 bg-[#090014] p-5 shadow-[0_0_80px_rgba(139,92,246,0.15)]">
        {/* HEADER */}
        <div className="mb-6 flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white">Expense Types</h2>

            <p className="mt-2 text-sm text-violet-200/70">
              Manage your expense categories. Changes (add, edit, delete) will
              be sent to the server.
            </p>
          </div>
        </div>

        {/* LIST */}
        <div className="flex-1 overflow-y-auto rounded-3xl border border-violet-700/60 p-4">
          <div className="space-y-3">
            {expenseTypes.map((item, index) => (
              <div
                key={item.id}
                className="flex items-center gap-3 rounded-2xl border border-violet-800/60 bg-[#120022]/60 px-4 py-3"
              >
                {/* DRAG */}
                <GripVertical
                  className="shrink-0 text-violet-300/60"
                  size={18}
                />

                {/* COLOR */}
                <input
                  type="color"
                  value={item.color}
                  onChange={(e) => updateType(index, "color", e.target.value)}
                  className="h-10 w-10 shrink-0 cursor-pointer rounded-lg border-none bg-transparent"
                />

                {/* LABEL */}
                <Input
                  value={item.label}
                  onChange={(e) => updateType(index, "label", e.target.value)}
                  placeholder="Expense type"
                  className="flex-1"
                  inputClassName="bg-transparent border-none h-auto px-0 py-0 text-lg"
                />

                {/* DELETE */}
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  onClick={() => deleteType(index)}
                  className="h-11 w-11 shrink-0 border-red-500/30 bg-red-500/10 p-0 text-red-400 hover:bg-red-500/20"
                >
                  <Trash2 size={18} />
                </Button>
              </div>
            ))}
          </div>

          {/* ADD NEW */}
          <div className="mt-4 rounded-2xl border border-violet-700/60 p-4">
            <p className="mb-4 text-lg font-semibold text-white">
              Add new expense type
            </p>

            <div className="flex flex-col gap-4 xl:flex-row">
              {/* LABEL */}
              <Input
                placeholder="Expense type"
                value={newType.label}
                onChange={(e) =>
                  setNewType((prev) => ({
                    ...prev,
                    label: e.target.value,
                  }))
                }
                className="flex-1"
                inputClassName="bg-[#120022] border-violet-800"
              />

              {/* COLOR */}
              <div className="relative flex w-full items-center gap-3 rounded-xl border border-violet-800 bg-[#120022] px-3 py-2 xl:w-[180px]">
                <input
                  type="text"
                  value={newType.color}
                  onChange={(e) =>
                    setNewType((prev) => ({
                      ...prev,
                      color: e.target.value,
                    }))
                  }
                  className="flex-1 bg-transparent text-sm font-semibold text-white outline-none"
                />

                <input
                  type="color"
                  value={newType.color}
                  onChange={(e) =>
                    setNewType((prev) => ({
                      ...prev,
                      color: e.target.value,
                    }))
                  }
                  className="absolute right-2 h-8 w-8 shrink-0 cursor-pointer appearance-none overflow-hidden rounded-md border border-white/10 bg-transparent p-0"
                />
              </div>

              {/* ADD BUTTON */}
              <Button
                type="button"
                variant="secondary"
                onClick={addExpenseType}
                className="w-full xl:w-auto"
              >
                <Plus size={18} />
                Add type
              </Button>
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <Button type="button" size="lg" onClick={handleSubmit} className="mt-4">
          Save Expense Types
        </Button>
      </div>
    </div>
  );
}
