import { Sidebar } from "@/component/panel/Sidebar";
import { EventsPanel } from "@/component/sections/dashboard/events";
import Main from "@/component/sections/dashboard/main";

export default function Dashboard() {
  return (
    <div className="flex">
      <Sidebar />
      <Main />
      <EventsPanel />
    </div>
  );
}
