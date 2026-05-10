import Performance from "@/components/sections/analytics/performance";

export default function Analytics() {
  return (
    <div className="flex flex-col gap-4 p-4 bg-[#140C2A]">
      <p className="text-white text-2xl font-bold">ANALYTICS</p>

      <Performance />
    </div>
  );
}
