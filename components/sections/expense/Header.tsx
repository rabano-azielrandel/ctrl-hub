"use client";

import { Dispatch, SetStateAction } from "react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarIcon, ChevronDown, Plus } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface Props {
  addExpense: Boolean;
  setAddExpense: Dispatch<SetStateAction<boolean>>;
  addIncome: Boolean;
  setAddIncome: Dispatch<SetStateAction<boolean>>;
  selectedMonth: Date;
  onMonthChange: (month: Date) => void;
}

const Header = ({ addExpense, setAddExpense, addIncome, setAddIncome, selectedMonth, onMonthChange }: Props) => {
  const firstDay = new Date(selectedMonth.getFullYear(), selectedMonth.getMonth(), 1);
  const lastDay = new Date(selectedMonth.getFullYear(), selectedMonth.getMonth() + 1, 0);

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
          <div className="flex items-center gap-2 h-11 px-4 bg-[#0A0A2A] border border-[#2d2760] rounded-xl cursor-pointer hover:bg-[#9889dd]/20 transition-colors">
            <CalendarIcon size={16} className="text-[#9889dd]" />
            <span className="text-sm whitespace-nowrap text-white/80">
              {dateLabel}
            </span>
            <ChevronDown size={14} className="text-[#9889dd]" />
          </div>
        </PopoverTrigger>
        <PopoverContent
          className="w-auto p-0 bg-[#13102a] border-[#2d2760]"
          align="end"
        >
          <Calendar
            mode="single"
            month={selectedMonth}
            onMonthChange={onMonthChange}
            onSelect={() => {}}
          />
        </PopoverContent>
      </Popover>

      <Button
        onClick={() => setAddIncome((prev) => !prev)}
        variant={"default"}
        className="h-11 bg-emerald-600 cursor-pointer hover:bg-emerald-600/50"
      >
        <Plus size={16} />
        Add Income
      </Button>

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
