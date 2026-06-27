import { EventsPanel } from "@/components/sections/dashboard/events";
import Main from "@/components/sections/dashboard/main";

export default function Dashboard() {
  return (
    <div className="flex h-full overflow-hidden">
      <Main />
      <div className="hidden lg:block shrink-0">
        <EventsPanel />
      </div>
    </div>
  );
}
