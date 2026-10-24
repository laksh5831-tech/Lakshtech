import { useRef } from "react";

export function Tabs({ tabs, value, onChange, label, className = "" }) {
  const listRef = useRef(null);

  const handleKeyDown = (event) => {
    const currentIndex = tabs.findIndex((tab) => tab.value === value);
    let nextIndex = null;

    if (event.key === "ArrowRight") nextIndex = (currentIndex + 1) % tabs.length;
    if (event.key === "ArrowLeft") nextIndex = (currentIndex - 1 + tabs.length) % tabs.length;
    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = tabs.length - 1;

    if (nextIndex !== null) {
      event.preventDefault();
      onChange(tabs[nextIndex].value);
      const buttons = listRef.current?.querySelectorAll('[role="tab"]');
      buttons?.[nextIndex]?.focus();
    }
  };

  return (
    <div
      ref={listRef}
      role="tablist"
      aria-label={label}
      onKeyDown={handleKeyDown}
      className={`flex flex-wrap gap-2 ${className}`}
    >
      {tabs.map((tab) => {
        const selected = tab.value === value;
        return (
          <button
            key={tab.value}
            role="tab"
            type="button"
            aria-selected={selected}
            tabIndex={selected ? 0 : -1}
            onClick={() => onChange(tab.value)}
            className={`font-sans uppercase tracking-[0.15em] text-xs px-4 py-2.5 transition-all duration-300 cursor-pointer ${
              selected
                ? "border border-[#CDBA94] bg-[#CDBA94] text-[#070707] font-semibold shadow-[0_0_20px_rgba(205,186,148,0.25)]"
                : "border border-white/12 bg-[#0D0E0F]/80 backdrop-blur-md text-[#929292] hover:border-[#CDBA94]/50 hover:text-[#F4F1EA]"
            }`}
          >
            {tab.label}
            {typeof tab.count === "number" ? (
              <span className={`ml-2 font-mono text-[10px] ${selected ? "text-[#070707]/80" : "text-[#CDBA94]"}`}>
                ({tab.count})
              </span>
            ) : null}
          </button>
        );
      })}
    </div>
  );
}
