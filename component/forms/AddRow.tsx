"use client";

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
  return (
    <div className="w-40 flex flex-col">
      <h2>{tableName}</h2>
      {cols.map((item, index) => (
        <div key={index} className="flex">
          <Input
            label={item.label}
            type="text"
            value={""}
            placeholder={item.key}
          />
        </div>
      ))}
    </div>
  );
}
