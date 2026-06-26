"use client";

import { useState } from "react";
import { DefaultCards } from "@/lib/data/expenseTracker";
import { SummaryCards } from "@/components/sections/expense/SummaryCards";
import BudgetAllocator from "@/components/sections/expense/budgetAllocator";
import DataTable from "@/components/ui/DataTable";
import Header from "@/components/sections/expense/Header";
import AddExpenseModal from "@/components/forms/AddExpenseModal";
import { Column, RowData } from "@/types/DataTable";
import { GetExpenseTypesResult } from "@/types/ExpenseTracker";
import { createExpense } from "@/app/actions/expense";

interface Props {
  col: Column[];
  row: RowData[];
  expenseTypes: GetExpenseTypesResult; // ← data, not a function
}

const ClientWrapper = ({ col, row, expenseTypes }: Props) => {
  const [addExpense, setAddExpense] = useState(false);

  const categories = expenseTypes.success ? expenseTypes.data : [];

  return (
    <div className="relative h-screen flex flex-col gap-4 p-4 bg-[#100D17]">
      {/* Header */}
      <div className="w-full">
        <Header addExpense={addExpense} setAddExpense={setAddExpense} />
      </div>
      {/* Summary */}
      <div className="flex justify-between items-center">
        {DefaultCards.map((card, index) => (
          <SummaryCards
            key={index}
            label={card.label}
            color={card.color}
            icon={card.icon}
            total={card.total}
            desc={card.desc}
            index={index}
          />
        ))}
      </div>

      <div className="h-[85%] flex gap-4">
        <div className="w-full">
          <BudgetAllocator getExpenseTypes={expenseTypes} />
        </div>
        <div className="w-full rounded-lg overflow-hidden">
          <DataTable columns={col} rows={row} title="Expenses" />
        </div>
      </div>

      {addExpense && (
        <AddExpenseModal
          categories={categories}
          onClose={() => setAddExpense(false)}
          onSubmit={createExpense}
        />
      )}
    </div>
  );
};

export default ClientWrapper;
