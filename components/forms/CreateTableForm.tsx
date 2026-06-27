"use client";

import { useState } from "react";
import { FieldDefinition } from "@/types/TableFields";
import { Button } from "../ui/Button";
import { CheckCircle, XCircle, X } from "lucide-react";

type UIField = FieldDefinition & { id: string };

type Notification = {
  type: "success" | "error";
  message: string;
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
  const [notification, setNotification] = useState<Notification | null>(null);
  const [loading, setLoading] = useState(false);

  const notify = (type: "success" | "error", message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 4000); // auto-dismiss after 4s
  };

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

    if (!tableName) {
      notify("error", "Table name can't be empty!");
      return;
    }

    setLoading(true);

    const formatted: FieldDefinition[] = fields.map(({ id, ...rest }) => ({
      ...rest,
      default: rest.default === "" ? undefined : rest.default,
    }));

    const res = await createTable(tableName, formatted);
    setLoading(false);

    if (!res.success) {
      notify("error", res.error);
      return;
    }

    notify("success", `Table "${tableName}" created successfully!`);

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
      className="w-full max-w-[600px] p-6 rounded-2xl bg-[#10091d] border border-violet-800/60"
    >
      {/* Notification */}
      {notification && (
        <div
          className={`flex items-center justify-between gap-3 mb-4 px-4 py-3 rounded-xl border text-sm
            ${
              notification.type === "success"
                ? "bg-green-900/30 border-green-700/50 text-green-300"
                : "bg-red-900/30 border-red-700/50 text-red-300"
            }`}
        >
          <div className="flex items-center gap-2">
            {notification.type === "success" ? (
              <CheckCircle size={16} />
            ) : (
              <XCircle size={16} />
            )}
            <span>{notification.message}</span>
          </div>
          <button type="button" onClick={() => setNotification(null)}>
            <X size={14} className="opacity-60 hover:opacity-100" />
          </button>
        </div>
      )}

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
      <div className="mb-2 text-xs text-violet-400/60">
        ℹ️{" "}
        <span className="font-mono">
          id, created_at, and created_by are added automatically.
        </span>
        <br />
        ℹ️{" "}
        <span className="font-mono">
          int and boolean types must have default value.
        </span>
      </div>
      <div className="space-y-3 max-h-[320px] overflow-y-auto">
        {fields.map((field) => (
          <div
            key={field.id}
            className="flex flex-col gap-2 border border-violet-800/40 p-3 rounded-xl"
          >
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
                className="px-3 py-2 rounded-lg bg-[#10091D] text-white border border-violet-800/40"
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
              <Button
                onClick={() => removeField(field.id)}
                variant="secondary"
                size="sm"
                className="w-10 text-red-400"
              >
                ✕
              </Button>
            </div>
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
      <div className="flex justify-end mt-3">
        <Button
          onClick={addField}
          variant="secondary"
          size="sm"
          className="w-fit text-sm text-violet-400 hover:text-violet-200"
        >
          + Add field
        </Button>
      </div>

      {/* Submit */}
      <div className="flex justify-end mt-6">
        <Button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Table"}
        </Button>
      </div>
    </form>
  );
}
