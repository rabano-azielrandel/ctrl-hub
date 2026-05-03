"use client";

import { useState } from "react";
import { FieldDefinition, CreateTableResult } from "@/types/TableFields";
import Button from "@/component/ui/Button";

// Extend backend type for UI use
type UIField = FieldDefinition & {
  id: string;
};

interface Props {
  createTable: (
    tableName: string,
    fields: FieldDefinition[],
  ) => Promise<{ success: true } | { success: false; error: string }>;
}

export default function NewTableModal({ createTable }: Props) {
  const [tableName, setTableName] = useState("");
  const [fields, setFields] = useState<UIField[]>([
    {
      id: crypto.randomUUID(),
      name: "",
      type: "text",
      nullable: false,
      default: "",
    },
  ]);

  // Fully typed updater
  const updateField = <K extends keyof UIField>(
    id: string,
    key: K,
    value: UIField[K],
  ) => {
    setFields((prev) =>
      prev.map((f) => (f.id === id ? { ...f, [key]: value } : f)),
    );
  };

  const addField = () => {
    setFields((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        name: "",
        type: "text",
        nullable: false,
        default: "",
      },
    ]);
  };

  const removeField = (id: string) => {
    setFields((prev) => prev.filter((f) => f.id !== id));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // remove UI-only "id"
    const formatted: FieldDefinition[] = fields.map(({ id, ...rest }) => rest);

    const res = await createTable(tableName, formatted);

    if (!res.success) {
      alert(res.error);
      return;
    }

    // optional reset
    setTableName("");
    setFields([
      {
        id: crypto.randomUUID(),
        name: "",
        type: "text",
        nullable: false,
        default: "",
      },
    ]);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-[600px] p-6 rounded-2xl bg-[#10091d] border border-violet-800/60"
    >
      {/* Table Name */}
      <div className="mb-4">
        <label className="text-sm text-violet-300">Table Name</label>
        <input
          value={tableName}
          onChange={(e) => setTableName(e.target.value)}
          className="w-full mt-1 px-3 py-2 rounded-xl bg-[#0f0a1f] border border-violet-800/60"
        />
      </div>

      {/* Fields */}
      <div className="space-y-3 max-h-[320px] overflow-y-auto">
        {fields.map((field) => (
          <div
            key={field.id}
            className="flex flex-col gap-2 border border-violet-800/40 p-3 rounded-xl"
          >
            {/* Main Row */}
            <div className="flex gap-2 items-center">
              <input
                placeholder="field_name"
                value={field.name}
                onChange={(e) => updateField(field.id, "name", e.target.value)}
                className="flex-1 px-3 py-2 rounded-lg bg-transparent border border-violet-800/40"
              />

              <select
                value={field.type}
                onChange={(e) =>
                  updateField(
                    field.id,
                    "type",
                    e.target.value as FieldDefinition["type"],
                  )
                }
                className="px-3 py-2 rounded-lg bg-transparent border border-violet-800/40"
              >
                {[
                  "text",
                  "uuid",
                  "int4",
                  "int8",
                  "bool",
                  "timestamptz",
                  "jsonb",
                  "numeric",
                ].map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>

              <button
                type="button"
                onClick={() => removeField(field.id)}
                className="text-red-400"
              >
                ✕
              </button>
            </div>

            {/* Advanced */}
            <div className="flex items-center gap-4 text-sm text-violet-300">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={field.nullable}
                  onChange={(e) =>
                    updateField(field.id, "nullable", e.target.checked)
                  }
                />
                Nullable
              </label>

              <input
                placeholder="default value"
                value={field.default || ""}
                onChange={(e) =>
                  updateField(field.id, "default", e.target.value)
                }
                className="px-2 py-1 rounded bg-transparent border border-violet-800/40"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Add Field */}
      <button
        type="button"
        onClick={addField}
        className="mt-3 text-sm text-violet-400 hover:text-violet-200"
      >
        + Add field
      </button>

      {/* Submit */}
      <div className="flex justify-end mt-6">
        <Button type="submit">Create Table</Button>
      </div>
    </form>
  );
}
