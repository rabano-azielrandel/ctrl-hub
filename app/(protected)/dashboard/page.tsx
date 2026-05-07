import { EventsPanel } from "@/components/sections/dashboard/events";
import Main from "@/components/sections/dashboard/main";

export default function Dashboard() {
  return (
    <div className="flex">
      <Main />
      <EventsPanel />
    </div>
  );
}
