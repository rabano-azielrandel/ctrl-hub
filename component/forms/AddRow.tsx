"use client";

import { useState } from "react";
import Button from "../ui/Button";
import Input from "../ui/Input";

type colsObj = {
  key: string;
  label: string;
};

interface Props {
  tableName: string;
  cols: colsObj[];
}

export default function AddRow({ cols, tableName }: Props) {
  const [values, setValues] = useState<Record<string, string>>({});

  const handleChange = (key: string, value: string) => {
    setValues((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <form className="w-full max-w-2xl p-4">
      <h2>{tableName}</h2>

      <div className="p-4 mb-10">
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

      <Button type="submit">Submit</Button>
    </form>
  );
}
