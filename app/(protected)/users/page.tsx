import DataTable from "@/component/ui/DataTable";
import { getUsers } from "@/app/actions/userActions";
import { mapToTableFormat } from "@/lib/mappers/projectMappers";

export default async function Users() {
  const raw = await getUsers();

  if (!raw.success) {
    return <div>{raw.error}</div>;
  }

  const { columns: newColumns, rows: newRows } = mapToTableFormat(raw.data);

  return (
    <div className="p-4 bg-[#140C2A]">
      <DataTable title={"users"} columns={newColumns} rows={newRows} />
    </div>
  );
}
