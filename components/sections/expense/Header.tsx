"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarIcon, Plus } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface Props {
  addExpense: Boolean;
  setAddExpense: Dispatch<SetStateAction<boolean>>;
}

const Header = ({ addExpense, setAddExpense }: Props) => {
  const now = new Date();
  const [month, setMonth] = useState<Date>(
    new Date(now.getFullYear(), now.getMonth(), 1),
  );

  const firstDay = new Date(month.getFullYear(), month.getMonth(), 1);
  const lastDay = new Date(month.getFullYear(), month.getMonth() + 1, 0);

  const fmt = new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  const dateLabel = `${fmt.format(firstDay)} – ${fmt.format(lastDay)}`;

  return (
    <div className="flex justify-end items-center gap-3 ml-auto">
      {/* Calendar */}
      <Popover>
        <PopoverTrigger>
          <Button
            variant="secondary"
            className="h-11 bg-[#0A0A2A] border border-[#2d2760] cursor-pointer hover:bg-[#9889dd]/60"
          >
            <CalendarIcon size={16} className="text-[#9889dd]" />
            <span className="text-sm whitespace-nowrap text-white/80">
              {dateLabel}
            </span>
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-auto p-0 bg-[#13102a] border-[#2d2760]"
          align="end"
        >
          <Calendar
            mode="single"
            month={month}
            onMonthChange={setMonth}
            onSelect={() => {}}
          />
        </PopoverContent>
      </Popover>

      <Button
        onClick={() => setAddExpense((prev) => !prev)}
        variant={"default"}
        className="h-11 bg-[#670DF6] cursor-pointer hover:bg-[#670DF6]/50"
      >
        <Plus size={16} />
        Add Expense
      </Button>
    </div>
  );
};

export default Header;
