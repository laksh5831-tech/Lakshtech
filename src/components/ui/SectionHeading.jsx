export function SectionHeading({
  eyebrow,
  title,
  lead,
  action,
  align = "left",
  className = "",
  as: Tag = "h2",
}) {
  const centered = align === "center";
  return (
    <div
      className={`flex flex-col gap-6 md:flex-row md:items-end md:justify-between ${
        centered ? "items-center text-center md:flex-col md:items-center" : ""
      } ${className}`}
    >
      <div className={centered ? "mx-auto max-w-3xl" : "max-w-[44rem]"}>
        {eyebrow ? (
          <div
            className={`flex items-center gap-2 text-xs font-mono uppercase tracking-[0.25em] text-[#CDBA94] mb-3 md:mb-4 ${
              centered ? "justify-center" : ""
            }`}
          >
            <span className="w-1.5 h-1.5 bg-[#CDBA94]" aria-hidden="true" />
            <span>{eyebrow}</span>
          </div>
        ) : null}
        <Tag className="font-serif text-3xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-[#F4F1EA] leading-[1.08]">
          {title}
        </Tag>
        {lead ? (
          <p
            className={`mt-4 font-sans text-sm md:text-base font-light text-[#929292] leading-relaxed ${
              centered ? "mx-auto" : ""
            }`}
          >
            {lead}
          </p>
        ) : null}
        <div
          className={`h-[1px] w-12 bg-[#CDBA94]/50 mt-6 ${centered ? "mx-auto" : ""}`}
          aria-hidden="true"
        />
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}
