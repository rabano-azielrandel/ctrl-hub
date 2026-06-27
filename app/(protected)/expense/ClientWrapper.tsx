"use client";

import { useState } from "react";
import { DefaultCards, getExpenseTypeIcon } from "@/lib/data/expenseTracker";
import { SummaryCards } from "@/components/sections/expense/SummaryCards";
import BudgetAllocator from "@/components/sections/expense/budgetAllocator";
import DataTable from "@/components/ui/DataTable";
import Header from "@/components/sections/expense/Header";
import AddExpenseModal from "@/components/forms/AddExpenseModal";
import AddIncomeModal from "@/components/forms/AddIncomeModal";
import { Column, RowData } from "@/types/DataTable";
import { GetExpenseTypesResult } from "@/types/ExpenseTracker";
import { GetIncomeTypesResult } from "@/types/IncomeTracker";
import { createExpense } from "@/app/actions/expense";
import { createIncome } from "@/app/actions/income";
import {
  getSummary,
  GetSummaryResult,
  SummaryData,
} from "@/app/actions/summary";

interface Props {
  col: Column[];
  row: RowData[];
  expenseTypes: GetExpenseTypesResult;
  incomeTypes: GetIncomeTypesResult;
  summary: GetSummaryResult;
}

function fmtPeso(amount: number) {
  return `₱${amount.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function fmtChange(current: number, last: number) {
  if (last === 0) return "";
  const pct = ((current - last) / last) * 100;
  const arrow = pct >= 0 ? "↑" : "↓";
  return `${arrow} ${Math.abs(pct).toFixed(2)}% vs last month`;
}

const ClientWrapper = ({
  col,
  row,
  expenseTypes,
  incomeTypes,
  summary,
}: Props) => {
  const now = new Date();

  const [addExpense, setAddExpense] = useState(false);
  const [addIncome, setAddIncome] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState<Date>(
    new Date(now.getFullYear(), now.getMonth(), 1),
  );
  const [summaryData, setSummaryData] = useState<SummaryData | null>(
    summary.success ? summary.data : null,
  );

  const handleMonthChange = async (month: Date) => {
    setSelectedMonth(month);
    const result = await getSummary(month.getFullYear(), month.getMonth() + 1);
    if (result.success) setSummaryData(result.data);
  };

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

  const cardDynamic = summaryData
    ? [
        { total: fmtPeso(summaryData.monthlySalary), desc: "" },
        {
          total: fmtPeso(summaryData.totalSpent),
          desc: fmtChange(
            summaryData.totalSpent,
            summaryData.totalSpentLastMonth,
          ),
        },
        {
          total: fmtPeso(summaryData.savings),
          desc: fmtChange(summaryData.savings, summaryData.savingsLastMonth),
        },
        { total: fmtPeso(summaryData.remainingBalance), desc: "This month" },
      ]
    : null;

  return (
    <div className="relative flex flex-col gap-4 p-4 bg-[#100D17]">
      <div className="w-full">
        <Header
          addExpense={addExpense}
          setAddExpense={setAddExpense}
          addIncome={addIncome}
          setAddIncome={setAddIncome}
          selectedMonth={selectedMonth}
          onMonthChange={handleMonthChange}
        />
      </div>

      <div className="flex flex-wrap justify-between items-stretch gap-3">
        {DefaultCards.map((card, index) => (
          <SummaryCards
            key={index}
            label={card.label}
            color={card.color}
            icon={card.icon}
            total={cardDynamic?.[index]?.total ?? card.total}
            desc={cardDynamic?.[index]?.desc ?? card.desc}
            index={index}
          />
        ))}
      </div>

      <div className="flex flex-col lg:flex-row gap-4">
        <div className="w-full lg:w-1/2">
          <BudgetAllocator
            getExpenseTypes={expenseTypes}
            categoryBreakdown={summaryData?.categoryBreakdown ?? []}
            totalSpent={summaryData?.totalSpent ?? 0}
            totalIncome={summaryData?.monthlySalary ?? 0}
          />
        </div>
        <div className="w-full lg:w-1/2 rounded-lg overflow-hidden">
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
