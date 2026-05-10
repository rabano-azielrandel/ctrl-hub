export function HalfDonut({
  value,
  color,
  label,
}: {
  value: number;
  color: string;
  label: string;
}) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative w-16 h-8 overflow-hidden">
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: `conic-gradient(${color} ${value * 1.8}deg, #2A2047 0deg)`,
          }}
        />
        <div className="absolute inset-1 bg-[#140F2A] rounded-full" />
      </div>

      <div className="text-xs text-center">
        <div style={{ color }}>{value.toFixed(0)}%</div>
        <div className="text-white/50">{label}</div>
      </div>
    </div>
  );
}
