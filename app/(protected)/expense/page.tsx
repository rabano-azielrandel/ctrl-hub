import { DefaultCards } from "@/lib/data/expenseTracker";
import { getExpenses, getExpenseTypes } from "@/app/actions/expense";
import { SummaryCards } from "@/components/sections/expense/SummaryCards";
import { mapToTableFormat } from "@/lib/mappers/projectMappers";
import BudgetAllocator from "@/components/sections/expense/budgetAllocator";
import DataTable from "@/components/ui/DataTable";
import Header from "@/components/sections/expense/Header";
import ClientWrapper from "./ClientWrapper";

export default async function ExpenseTracker() {
  const result = await getExpenses();

  if (!result.success) {
    throw new Error(result.error);
  }

  const { columns, rows } = mapToTableFormat(result.data);

  return (
    <div className="h-screen flex flex-col gap-4 p-4 bg-[#100D17]">
      <ClientWrapper
        col={columns}
        row={rows}
        getExpenseTypes={getExpenseTypes}
      />
    </div>
  );
}
