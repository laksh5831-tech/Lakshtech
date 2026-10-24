import { useId, useState } from "react";
import { Icon } from "./Icon";

export function Accordion({ items, defaultOpen = 0 }) {
  const baseId = useId();
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="divide-y divide-white/10 border-y border-white/10">
      {items.map((item, index) => {
        const isOpen = open === index;
        const panelId = `${baseId}-panel-${index}`;
        const buttonId = `${baseId}-button-${index}`;
        return (
          <div key={item.q} className="py-2">
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? -1 : index)}
                className="flex w-full items-start justify-between gap-6 py-4 text-left transition-colors hover:text-[#CDBA94] group cursor-pointer"
              >
                <div className="flex items-start gap-4">
                  <span className="font-mono text-[10px] tracking-wider text-[#CDBA94] pt-1">
                    {String(index + 1).padStart(2, "0")} //
                  </span>
                  <span className="font-serif text-lg md:text-xl font-medium text-[#F4F1EA] group-hover:text-[#CDBA94] transition-colors">
                    {item.q}
                  </span>
                </div>
                <span
                  className={`mt-0.5 grid h-8 w-8 shrink-0 place-items-center border border-white/15 text-[#929292] transition-all duration-300 group-hover:border-[#CDBA94] group-hover:text-[#CDBA94] ${
                    isOpen ? "rotate-180 border-[#CDBA94] text-[#CDBA94]" : ""
                  }`}
                >
                  <Icon name="chevron-down" className="h-4 w-4" />
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              aria-hidden={!isOpen}
              className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <p className="max-w-[52rem] pb-6 pl-10 pr-6 text-sm md:text-base font-light leading-relaxed text-[#929292]">
                  {item.a}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
