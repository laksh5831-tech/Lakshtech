import { Button } from "./ui/Button";
import { Icon } from "./ui/Icon";
import { Reveal } from "./ui/Reveal";

const points = [
  "A named engineering squad from the first scoping call to handover",
  "A written architectural scope before any code is produced",
  "Documentation and runbooks your team can actually maintain",
];

export function CtaBand({
  title = "Tell us what you are building.",
  lead = "Send a short brief and an engineer will reply within one working day with a suggested squad, an approach and actionable estimates.",
  primary = { label: "Start a project", to: "/contact" },
  secondary = { label: "View our services", to: "/services" },
}) {
  return (
    <section className="relative overflow-hidden border-t border-white/10 bg-[#070707] py-24 md:py-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-[450px] w-[850px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(205,186,148,0.1),transparent_70%)] blur-3xl"
      />
      <div className="container-page relative z-10">
        <div className="grid items-start gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <Reveal>
            <div className="flex items-center gap-2 font-mono text-[10px] md:text-xs uppercase tracking-[0.25em] text-[#CDBA94] mb-4">
              <span className="w-1.5 h-1.5 bg-[#CDBA94]" />
              <span>A CONSIDERED NEXT STEP</span>
            </div>
            <h2 className="max-w-[20ch] font-serif text-3xl md:text-5xl lg:text-6xl font-medium tracking-tight text-[#F4F1EA] leading-[1.08]">
              {title}
            </h2>
            <p className="mt-5 max-w-[48ch] font-sans text-sm md:text-base font-light text-[#929292] leading-relaxed">
              {lead}
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button to={primary.to} variant="primary" size="lg" icon="arrow-right">
                {primary.label}
              </Button>
              <Button to={secondary.to} variant="secondary" size="lg">
                {secondary.label}
              </Button>
            </div>
          </Reveal>

          <Reveal delay={1}>
            <div className="border border-white/12 bg-[#0D0E0F]/85 backdrop-blur-xl p-6 md:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <span className="font-mono text-[9px] tracking-widest text-[#929292] uppercase font-semibold">
                  ENGAGEMENT CHECKLIST
                </span>
                <span className="font-mono text-[9px] text-[#CDBA94] font-bold">LS // 04</span>
              </div>
              <ul className="divide-y divide-white/10">
                {points.map((point, index) => (
                  <li key={point} className="flex items-start gap-3 py-4">
                    <span className="font-mono text-[10px] text-[#CDBA94] font-bold">0{index + 1}</span>
                    <span className="font-sans text-xs md:text-sm font-light text-[#F4F1EA]/80 leading-relaxed">
                      {point}
                    </span>
                    <Icon name="check" className="ml-auto mt-0.5 h-3.5 w-3.5 shrink-0 text-[#CDBA94]" />
                  </li>
                ))}
              </ul>
              <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 border-t border-white/10 pt-4 font-mono text-[9px] tracking-wider text-[#929292]">
                <a href="mailto:hello@lakshtech.example" className="hover:text-[#CDBA94] transition-colors">
                  hello@lakshtech.example
                </a>
                <a href="tel:+919000000000" className="hover:text-[#CDBA94] transition-colors">
                  +91 90000 00000
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
