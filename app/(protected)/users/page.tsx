import DataTable from "@/component/ui/DataTable";
import { getUsers } from "@/app/actions/userActions";
import { mapToTableFormat } from "@/lib/mappers/projectMappers";

export default async function Users() {
  const raw = await getUsers();
  const { columns: newColumns, rows: newRows } = mapToTableFormat(raw);

  return (
    <div className="p-4 bg-[#140C2A]">
      <DataTable title={"users"} columns={} rows={} />
    </div>
  );
}
