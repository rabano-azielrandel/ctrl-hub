export type Summary = {
  title: string;
  amount: number;
};

export type Category = {
  id: number;
  label: string;
  color: string;
};

export type Expenses = {
  id: number;
  expense_name: string;
  amount: number;
  note: string | null;
  expense_date: Date;
};

export type GetExpenseTypesResult =
  | { success: true; data: Category[] }
  | { success: false; error: string };

export type GetExpensesResult =
  | { success: true; data: Expenses[] }
  | { success: false; error: string };
