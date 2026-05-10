import { summaryCards, borderColors } from "@/lib/data/expenseTracker";
import { getExpenses, getExpenseTypes } from "@/app/actions/expense";
import BudgetAllocator from "@/components/sections/expense/budgetAllocator";
import DataTable from "@/components/ui/DataTable";
import { mapToTableFormat } from "@/lib/mappers/projectMappers";

export default async function ExpenseTracker() {
  const result = await getExpenses();

  if (!result.success) {
    throw new Error(result.error);
  }

  const { columns, rows } = mapToTableFormat(result.data);

  return (
    <div className="h-screen flex flex-col gap-4 p-4 bg-[#100D17]">
      {/* Summary */}
      <div className="h-[15%] flex gap-4 p-4">
        {summaryCards.map((item, index) => (
          <div
            key={index}
            className="relative w-40 flex flex-col justify-center items-center rounded-lg border border-[#7b6fa0] bg-[#17112A] overflow-hidden"
          >
            <div
              className={`absolute top-0 w-full rounded-lg border-1 ${borderColors[index]}`}
            />

            <h3 className="h-10 flex items-center text-[#7b6fa0] text-center text-sm font-medium leading-tight">
              {item.title.toUpperCase()}
            </h3>

            <p className="text-[#F7F7F7] text-center text-sm font-medium">
              ₱{item.amount}
            </p>
          </div>
        ))}
      </div>
      <div className="h-[85%] flex gap-4">
        <div className="w-full flex justify-center items-center">
          <BudgetAllocator getExpenseTypes={getExpenseTypes} />
        </div>
        <div className="w-full rounded-lg overflow-hidden">
          <DataTable columns={columns} rows={rows} title="Expenses" />
        </div>
      </div>
    </div>
  );
}
