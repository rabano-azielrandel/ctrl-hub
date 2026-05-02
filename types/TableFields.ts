export type FieldDefinition = {
  name: string;
  type: "text" | "uuid" | "int4" | "int8" | "bool" | "timestamptz" | "jsonb" | "numeric";
  nullable?: boolean;
  default?: string;
};

export type CreateTableResult =
  | { success: true }
  | { success: false; error: string };