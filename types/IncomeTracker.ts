export type IncomeCategory = {
  id: number;
  label: string;
  color: string;
};

export type GetIncomeTypesResult =
  | { success: true; data: IncomeCategory[] }
  | { success: false; error: string };
