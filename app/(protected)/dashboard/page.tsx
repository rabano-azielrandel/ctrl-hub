import { EventsPanel } from "@/component/sections/dashboard/events";
import Main from "@/component/sections/dashboard/main";

export default function Dashboard() {
  return (
    <div className="flex">
      <Main />
      <EventsPanel />
    </div>
  );
}
