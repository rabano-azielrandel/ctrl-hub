import { Sidebar } from "@/component/panel/Sidebar";
import Main from "@/component/sections/dashboard/main";

export default function Dashboard() {
  return (
    <div className="flex">
      <Sidebar />
      <Main />
      <Sidebar />
    </div>
  );
}
