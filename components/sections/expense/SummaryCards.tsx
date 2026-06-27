"use client";

import { IconKey, ICON_MAP, DefaultCards } from "@/lib/data/expenseTracker";
import { Wallet } from "lucide-react";

export interface Props {
  color?: string;
  icon?: IconKey;
  bgIcon?: string;
  total?: string;
  desc?: string;
  label?: string;
  index?: number;
  waveVariant?: 1 | 2 | 3 | 4;
}

// Wave SVG Variants
const WAVE_PATHS: Record<1 | 2 | 3 | 4, string> = {
  1: "M0,60 C60,20 120,80 200,50 C240,35 260,70 300,60 L300,120 L0,120 Z",
  2: "M0,80 C40,40 80,90 130,55 C170,25 220,75 300,45 L300,120 L0,120 Z",
  3: "M0,100 C50,100 80,30 150,40 C200,48 240,60 300,50 L300,120 L0,120 Z",
  4: "M0,90 C80,90 140,95 200,60 C240,35 270,50 300,55 L300,120 L0,120 Z",
};

function Wave({ variant, color }: { variant: 1 | 2 | 3 | 4; color: string }) {
  const id = `wg-${variant}-${color.replace("#", "")}`;
  const path = WAVE_PATHS[variant];
  return (
    <svg
      viewBox="0 0 300 120"
      preserveAspectRatio="none"
      className="absolute bottom-0 left-0 w-full h-[45%] pointer-events-none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.18" />
          <stop offset="100%" stopColor={color} stopOpacity="0.05" />
        </linearGradient>
        <filter id={`${id}-blur`} x="-20%" y="-100%" width="140%" height="400%">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
        </filter>
      </defs>
      <path d={path} fill={color} opacity={0.07} filter={`url(#${id}-blur)`} />
      <path d={path} fill={`url(#${id})`} />
      <path
        d={path}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        opacity={0.5}
      />
      <path
        d={path}
        fill="none"
        stroke="white"
        strokeWidth="0.5"
        opacity={0.15}
      />
    </svg>
  );
}

// Glowing Border

function GlassBorder({ color }: { color: string }) {
  return (
    <>
      <span
        aria-hidden
        className="absolute inset-x-0 top-0 h-px pointer-events-none"
        style={{
          background: `linear-gradient(90deg, transparent 0%, ${color}44 15%, ${color}CC 50%, ${color}44 85%, transparent 100%)`,
        }}
      />
      <span
        aria-hidden
        className="absolute inset-y-0 left-0 w-px pointer-events-none"
        style={{
          background: `linear-gradient(180deg, transparent 0%, ${color}44 15%, ${color}88 55%, transparent 100%)`,
        }}
      />
      <span
        aria-hidden
        className="absolute inset-y-0 right-0 w-px pointer-events-none"
        style={{
          background: `linear-gradient(180deg, transparent 0%, ${color}44 15%, ${color}88 55%, transparent 100%)`,
        }}
      />
      <span
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-px pointer-events-none"
        style={{
          background: `linear-gradient(90deg, transparent 0%, ${color}22 30%, ${color}55 50%, ${color}22 70%, transparent 100%)`,
        }}
      />
    </>
  );
}

// SummaryCards

export function SummaryCards(props: Props) {
  const idx = (props.index ?? 0) % 4;
  const d = DefaultCards[idx];

  const color = props.color ?? d.color;
  const iconKey = props.icon ?? d.icon;
  const Icon = ICON_MAP[iconKey] ?? Wallet;
  const bgIconColor = props.bgIcon ?? color;
  const total = props.total ?? d.total;
  const desc = props.desc ?? d.desc;
  const label = props.label ?? d.label;
  const waveVariant: 1 | 2 | 3 | 4 =
    props.waveVariant ?? (((idx % 4) + 1) as 1 | 2 | 3 | 4);

  const isPositive = desc.startsWith("↑");
  const isNegative = desc.startsWith("↓");

  return (
    <div
      className="relative overflow-hidden rounded-2xl flex flex-col justify-between p-4 flex-1 min-w-[160px] min-h-[120px] select-none transition-transform duration-200 hover:-translate-y-0.5"
      style={{
        background: `
          radial-gradient(ellipse at 0% 0%,    ${color}1A 0%, transparent 55%),
          radial-gradient(ellipse at 100% 100%, ${color}0F 0%, transparent 50%),
          linear-gradient(135deg, #1e1b38cc 0%, #12101fdd 60%, #1a1730cc 100%)
        `,
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        boxShadow: `0 4px 32px 0 ${color}25, 0 1px 6px 0 #00000070`,
      }}
    >
      <GlassBorder color={color} />

      {/* Ghost background icon */}
      <div
        aria-hidden
        className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
        style={{ color: bgIconColor, opacity: 0.07 }}
      >
        <Icon size={76} strokeWidth={1.1} />
      </div>

      {/* Header — circular icon badge + label */}
      <div className="relative z-10 flex items-center gap-3 mb-3">
        <div
          className="flex items-center justify-center rounded-full w-10 h-10 shrink-0"
          style={{
            background: `radial-gradient(circle at 35% 35%, ${color}55 0%, ${color}33 60%, ${color}18 100%)`,
            boxShadow: `0 0 0 1px ${color}44, 0 2px 8px ${color}33`,
          }}
        >
          <Icon size={20} style={{ color }} strokeWidth={1.8} />
        </div>
        <span
          className="text-sm font-semibold leading-tight"
          style={{ color: `${color}DD` }}
        >
          {label}
        </span>
      </div>

      {/* Value + description */}
      <div className="relative z-10">
        <p
          className="text-[1.6rem] font-bold tracking-tight leading-none"
          style={{ color: "#fff", textShadow: `0 0 24px ${color}55` }}
        >
          {total}
        </p>
        {desc && (
          <p
            className="text-xs font-medium mt-1.5"
            style={{
              color: isPositive
                ? "#86efac"
                : isNegative
                  ? "#fca5a5"
                  : "rgba(255,255,255,0.4)",
            }}
          >
            {desc}
          </p>
        )}
      </div>

      <Wave variant={waveVariant} color={color} />
    </div>
  );
}
