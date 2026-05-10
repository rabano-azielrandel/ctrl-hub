export type Summary = {
  title: string;
  amount: number;
};

export type Category = {
  id: number;
  label: string;
  color: string;
};

export type GetExpenseTypesResult =
  | { success: true; data: Category[] }
  | { success: false; error: string };
