import { getExpenses, getExpenseTypes } from "@/app/actions/expense";
import { getIncomeTypes } from "@/app/actions/income";
import { mapToTableFormat } from "@/lib/mappers/projectMappers";
import ClientWrapper from "./ClientWrapper";

export default async function ExpenseTracker() {
  const [expenseResult, expenseTypesResult, incomeTypesResult] = await Promise.all([
    getExpenses(),
    getExpenseTypes(),
    getIncomeTypes(),
  ]);

  if (!expenseResult.success) throw new Error(expenseResult.error);

  const { columns, rows } = mapToTableFormat(expenseResult.data);

  return (
    <div className="h-screen flex flex-col gap-4 p-4 bg-[#100D17]">
      <ClientWrapper
        col={columns}
        row={rows}
        expenseTypes={expenseTypesResult}
        incomeTypes={incomeTypesResult}
      />
    </div>
  );
}
