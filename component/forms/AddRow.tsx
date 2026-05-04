import React from "react";
import Input from "../ui/Input";

interface Props {
  cols: string[];
}

export default function AddRow({ cols }: Props) {
  return (
    <div className="flex flex-col">
      {cols.map((item, index) => (
        <div key={index} className="flex">
          <Input label={item} type="text" value={""} placeholder="" />
        </div>
      ))}
    </div>
  );
}
