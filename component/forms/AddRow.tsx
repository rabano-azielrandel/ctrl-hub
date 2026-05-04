"use client";

import { useState } from "react";
import Button from "../ui/Button";
import Input from "../ui/Input";
import { CheckCircle, XCircle, X } from "lucide-react";

type colsObj = {
  key: string;
  label: string;
};

type Notification = {
  type: "success" | "error";
  message: string;
};

interface Props {
  tableName: string;
  cols: colsObj[];
  addRowFunc: (values: Record<string, string>) => Promise<
    | {
        success: true;
      }
    | { success: false; error: string }
  >;
}

export default function AddRow({ cols, tableName, addRowFunc }: Props) {
  const [values, setValues] = useState<Record<string, string>>({});
  const [notification, setNotification] = useState<Notification | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (key: string, value: string) => {
    setValues((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const notify = (type: "success" | "error", message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 4000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);

    const res = await addRowFunc(values);

    setLoading(false);

    if (!res.success) {
      notify("error", res.error);
      return;
    }

    notify("success", "Row added successfully!");

    // reset form
    setValues({});
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-2xl space-y-2 p-4 relative"
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

      {/* Title */}
      <h2 className="text-lg font-medium p-2 rounded-md border border-violet-900/40">
        {tableName}
      </h2>

      {/* Inputs */}
      <div className="p-4 mb-10 rounded-md border border-violet-900/40">
        <div className="grid grid-cols-3 gap-4 p-4 max-h-64 overflow-y-auto">
          {cols.map((item) => (
            <Input
              key={item.key}
              label={item.label}
              value={values[item.key] || ""}
              onChange={(e) => handleChange(item.key, e.target.value)}
            />
          ))}
        </div>
      </div>

      {/* Submit */}
      <Button type="submit" disabled={loading}>
        {loading ? "Saving..." : "Submit"}
      </Button>
    </form>
  );
}
