import { AnimatedHeading } from "./ui/AnimatedHeading";

export function PageHero({ title, lead, meta, children }) {
  return (
    <section className="relative overflow-hidden border-b border-white/10 bg-[#070707]">
      {/* Background ambient radial glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-[450px] w-[800px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(205,186,148,0.12),transparent_70%)] blur-3xl"
      />

      {/* Concentric ambient orbital rings */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-36 -top-36 h-[540px] w-[540px] rounded-full border border-[#CDBA94]/15"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 -top-16 h-[360px] w-[360px] rounded-full border border-[#CDBA94]/10 border-dashed"
      />

      <span className="font-mono text-[9px] tracking-[0.25em] text-[#CDBA94] pointer-events-none absolute right-8 top-32 hidden uppercase lg:block">
        ATELIER / MADURAI / IN
      </span>

      <div className="container-page relative z-10 pt-36 pb-16 md:pt-44 md:pb-24">
        <div className="max-w-4xl">
          <div className="flex items-center gap-2 font-mono text-[10px] tracking-[0.25em] text-[#CDBA94] uppercase mb-5">
            <span className="w-1.5 h-1.5 bg-[#CDBA94]" />
            <span>LAKSHTECH SOLUTIONS // ARCHIVE</span>
          </div>
          <AnimatedHeading
            text={title}
            delay={60}
            className="max-w-[22ch] font-serif text-4xl md:text-6xl lg:text-7xl font-medium tracking-tight text-[#F4F1EA] leading-[1.08]"
          />
          {lead ? (
            <p className="mt-6 max-w-2xl font-sans text-sm md:text-base font-light text-[#929292] leading-relaxed">
              {lead}
            </p>
          ) : null}
          {children ? <div className="mt-8">{children}</div> : null}
        </div>

        {meta ? (
          <dl className="mt-14 grid gap-6 border-t border-white/10 pt-8 sm:grid-cols-3">
            {meta.map((item) => (
              <div key={item.label}>
                <dt className="font-mono text-[10px] tracking-widest text-[#CDBA94] uppercase">
                  {item.label}
                </dt>
                <dd className="mt-2 font-serif text-lg md:text-2xl font-medium text-[#F4F1EA]">
                  {item.value}
                </dd>
              </div>
            ))}
          </dl>
        ) : null}
      </div>
    </section>
  );
}
