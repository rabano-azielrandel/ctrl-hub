import {
  summaryCards,
  expenseColors,
  borderColors,
} from "@/lib/data/expenseTracker";

export default function ExpenseTracker() {
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
              {item.amount}
            </p>
          </div>
        ))}
      </div>
      <div className="h-[85%] bg-blue-400">a</div>
    </div>
  );
}
