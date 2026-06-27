"use client";

import { useState } from "react";
import { DefaultCards, getExpenseTypeIcon } from "@/lib/data/expenseTracker";
import { SummaryCards } from "@/components/sections/expense/SummaryCards";
import BudgetAllocator from "@/components/sections/expense/budgetAllocator";
import DataTable from "@/components/ui/DataTable";
import Header from "@/components/sections/expense/Header";
import AddExpenseModal from "@/components/forms/AddExpenseModal";
import { Column, RowData } from "@/types/DataTable";
import { GetExpenseTypesResult } from "@/types/ExpenseTracker";
import { GetIncomeTypesResult } from "@/types/IncomeTracker";
import { createExpense } from "@/app/actions/expense";
import { createIncome } from "@/app/actions/income";
import AddIncomeModal from "@/components/forms/AddIncomeModal";

interface Props {
  col: Column[];
  row: RowData[];
  expenseTypes: GetExpenseTypesResult;
  incomeTypes: GetIncomeTypesResult;
}

const ClientWrapper = ({ col, row, expenseTypes, incomeTypes }: Props) => {
  const [addExpense, setAddExpense] = useState(false);
  const [addIncome, setAddIncome] = useState(false);

  const categories = expenseTypes.success ? expenseTypes.data : [];
  const incomeCategories = incomeTypes.success ? incomeTypes.data : [];

  const enrichedColumns = col.map((c) => {
    if (c.key !== "expense_type_name") return c;
    return {
      ...c,
      label: "Type",
      render: (value: string) => {
        const Icon = getExpenseTypeIcon(value);
        return (
          <span title={value}>
            <Icon size={18} className="text-violet-300" />
          </span>
        );
      },
    };
  });

  return (
    <div className="relative h-screen flex flex-col gap-4 p-4 bg-[#100D17]">
      {/* Header */}
      <div className="w-full">
        <Header
          addExpense={addExpense}
          setAddExpense={setAddExpense}
          addIncome={addIncome}
          setAddIncome={setAddIncome}
        />
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
          <DataTable columns={enrichedColumns} rows={row} title="Expenses" />
        </div>
      </div>

      {addExpense && (
        <AddExpenseModal
          categories={categories}
          onClose={() => setAddExpense(false)}
          onSubmit={createExpense}
        />
      )}

      {addIncome && (
        <AddIncomeModal
          categories={incomeCategories}
          onClose={() => setAddIncome(false)}
          onSubmit={createIncome}
        />
      )}
    </div>
  );
};

export default ClientWrapper;
