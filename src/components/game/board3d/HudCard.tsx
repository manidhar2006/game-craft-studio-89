import type { ReactNode } from "react";

interface Props {
  accent?: string;
  children: ReactNode;
  className?: string;
}

export function HudCard({ accent = "#3affd9", children, className = "" }: Props) {
  return (
    <div
      className={`rounded-xl border bg-[#04050b]/85 px-4 py-3 backdrop-blur ${className}`}
      style={{
        borderColor: `${accent}66`,
        boxShadow: `0 0 0 1px ${accent}33, 0 0 24px -4px ${accent}88`,
      }}
    >
      {children}
    </div>
  );
}
