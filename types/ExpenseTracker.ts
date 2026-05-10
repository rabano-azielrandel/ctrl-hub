export type Summary = {
  title: string;
  amount: number;
};

export type Category = {
  id: string;
  label: string;
  color: string;
};

export type GetExpenseTypesResult =
  | { success: true; data: Category[] }
  | { success: false; error: string };
