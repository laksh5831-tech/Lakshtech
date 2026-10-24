import { useState } from "react";
import { cn } from "../../lib/cn";

export function SpotlightCard({
  children,
  className,
  spotlightColor = "rgba(205, 186, 148, 0.12)",
  spotlightRadius = 300,
  ...rest
}) {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={cn(
        "group relative overflow-hidden border border-white/10 bg-[#0D0E0F]/80 backdrop-blur-xl p-6 md:p-8 transition-all duration-500 ease-out select-none",
        "hover:-translate-y-1.5 hover:border-[#CDBA94]/40 hover:shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_25px_-5px_rgba(205,186,148,0.12)]",
        className,
      )}
      {...rest}
    >
      {hovered && (
        <div
          className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300"
          style={{
            background: `radial-gradient(${spotlightRadius}px circle at ${pos.x}px ${pos.y}px, ${spotlightColor}, transparent 80%)`,
          }}
        />
      )}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
