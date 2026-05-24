import { DefaultCards } from "@/lib/data/expenseTracker";
import { getExpenses, getExpenseTypes } from "@/app/actions/expense";
import { SummaryCards } from "@/components/sections/expense/SummaryCards";
import { mapToTableFormat } from "@/lib/mappers/projectMappers";
import BudgetAllocator from "@/components/sections/expense/budgetAllocator";
import DataTable from "@/components/ui/DataTable";
import Header from "@/components/sections/expense/Header";

export default async function ExpenseTracker() {
  const result = await getExpenses();

  if (!result.success) {
    throw new Error(result.error);
  }

  const { columns, rows } = mapToTableFormat(result.data);

  return (
    <div className="h-screen flex flex-col gap-4 p-4 bg-[#100D17]">
      {/* Header */}
      <div className="w-full">
        <Header />
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
