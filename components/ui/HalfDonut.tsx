export function HalfDonut({
  value,
  color,
  label,
}: {
  value: number;
  color: string;
  label: string;
}) {
  const radius = 30;
  const stroke = 6;
  const cx = 36;
  const cy = 36;

  // Half circle arc: left to right along the top
  const circumference = Math.PI * radius; // half circumference
  const progress = (value / 100) * circumference;

  // Arc path: starts bottom-left, goes up and over to bottom-right
  const arcPath = `M ${cx - radius},${cy} A ${radius},${radius} 0 0,1 ${cx + radius},${cy}`;

  return (
    <div className="flex flex-col items-center gap-1">
      <div className="relative">
        <svg width={72} height={42} viewBox="0 0 72 42">
          {/* Background track */}
          <path
            d={arcPath}
            fill="none"
            stroke="#2A2047"
            strokeWidth={stroke}
            strokeLinecap="round"
          />
          {/* Colored progress */}
          <path
            d={arcPath}
            fill="none"
            stroke={color}
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={`${progress} ${circumference}`}
          />
        </svg>
      </div>

      <div className="text-xs text-center leading-tight">
        <div style={{ color }} className="font-semibold">
          {value.toFixed(0)}%
        </div>
        <div className="text-white/50">{label}</div>
      </div>
    </div>
  );
}
