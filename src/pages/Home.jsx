import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { usePageMeta } from "../lib/usePageMeta";
import {
  capabilitiesDetailed,
  engagementIncludes,
  processSteps,
  projects,
  serviceFaqs,
  services,
  stats,
  testimonials,
  brand,
} from "../data/site";
import { Button } from "../components/ui/Button";
import { Icon } from "../components/ui/Icon";
import { Reveal } from "../components/ui/Reveal";
import { SectionHeading } from "../components/ui/SectionHeading";
import { ProjectCard } from "../components/ProjectCard";
import { ProjectModal } from "../components/ProjectModal";
import { LogoWall } from "../components/LogoWall";
import { PinnedServices } from "../components/PinnedServices";
import { useSavedProjects } from "../context/SavedProjectsContext";
import { useToast } from "../components/ui/Toast";
import { cn } from "../lib/cn";

const specs = [
  { label: "Engagement model", value: "Fixed scope or dedicated sprint squad, agreed in writing" },
  { label: "Sprint cadence", value: "Two-week cycles with a working demo at every close" },
  { label: "Accessibility", value: "WCAG 2.1 AA contrast, keyboard and screen reader checks" },
  { label: "Performance", value: "Core Web Vitals budgets set before the first build" },
  { label: "Handover", value: "Repository, infrastructure, runbook and recorded walkthrough" },
  { label: "Quality gate", value: "Code review on every change, automated tests on critical paths" },
  { label: "Security", value: "Role-based access, audit trails and dependency review" },
  { label: "Support", value: "Optional retainer for monitoring, fixes and continuous iteration" },
];

function SoftwareCore() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[480px] lg:max-w-[540px] flex items-center justify-center select-none">
      {/* Ambient background champagne glow */}
      <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(205,186,148,0.14),transparent_70%)] blur-3xl pointer-events-none" />

      {/* Outer slow-spinning orbital ring */}
      <div className="absolute h-[90%] w-[90%] rounded-full border border-white/10 flex items-center justify-center animate-[spin_120s_linear_infinite] pointer-events-none">
        <span className="absolute -top-1.5 h-3 w-3 border border-[#CDBA94]/60 bg-[#070707]" />
        <span className="absolute -bottom-1.5 h-3 w-3 border border-[#CDBA94]/60 bg-[#070707]" />
      </div>

      {/* Middle reverse dashed orbital ring */}
      <div className="absolute h-[74%] w-[74%] rounded-full border border-[#CDBA94]/30 border-dashed animate-[spin_40s_linear_infinite_reverse] pointer-events-none" />

      {/* Inner precision dial core */}
      <div className="relative h-[56%] w-[56%] rounded-full border border-white/15 bg-[#0D0E0F] shadow-[0_25px_60px_rgba(0,0,0,0.95)] overflow-hidden flex items-center justify-center">
        <div className="blueprint-grid absolute inset-0 opacity-40 pointer-events-none" />

        <svg viewBox="0 0 300 300" className="absolute inset-0 h-full w-full text-[#CDBA94]" fill="none" aria-hidden="true">
          <circle cx="150" cy="150" r="130" stroke="currentColor" strokeOpacity=".2" strokeDasharray="2 6" />
          <circle cx="150" cy="150" r="95" stroke="currentColor" strokeOpacity=".3" />
          <circle cx="150" cy="150" r="60" stroke="currentColor" strokeOpacity=".4" strokeDasharray="1 4" />
          <path d="M150 10v280M10 150h280" stroke="currentColor" strokeOpacity=".15" />
          <path d="M45 45l210 210M255 45L45 255" stroke="currentColor" strokeOpacity=".08" />

          {/* Calibre indicators */}
          <g className="origin-center animate-[spin_50s_linear_infinite]">
            <circle cx="150" cy="150" r="110" stroke="currentColor" strokeOpacity=".3" strokeDasharray="1 12" />
            {[0, 60, 120, 180, 240, 300].map((deg) => (
              <g key={deg} transform={`rotate(${deg} 150 150)`}>
                <line x1="150" y1="40" x2="150" y2="52" stroke="currentColor" strokeOpacity=".6" strokeWidth="1.2" />
              </g>
            ))}
          </g>
        </svg>

        {/* Center atelier monogram */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center p-4">
          <span className="font-mono text-[9px] font-bold tracking-[0.25em] text-[#CDBA94] uppercase">
            LT // 2026
          </span>
          <span className="mt-1 font-serif text-[1.15rem] font-bold tracking-[0.2em] text-[#F4F1EA] uppercase">
            LAKSHTECH
          </span>
          <span className="mt-0.5 font-mono text-[7px] tracking-[0.2em] text-[#929292] uppercase">
            ATELIER // MADURAI
          </span>
        </div>
      </div>

      {/* Floating telemetry pill - Top Right */}
      <div className="absolute -right-2 top-8 z-20 border border-white/12 bg-[#0D0E0F]/95 px-3.5 py-2.5 shadow-[0_15px_35px_rgba(0,0,0,0.9)] backdrop-blur-md">
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-[#CDBA94] animate-pulse" />
          <span className="font-mono text-[8px] font-semibold tracking-wider text-[#F4F1EA] uppercase">
            RUNTIME: ZERO DEFECT
          </span>
        </div>
        <div className="mt-1 font-mono text-[7px] text-[#929292] tracking-wider">
          P99 &lt; 45MS • 60 FPS MOTION
        </div>
      </div>

      {/* Floating telemetry pill - Bottom Left */}
      <div className="absolute -left-2 bottom-10 z-20 border border-white/12 bg-[#0D0E0F]/95 px-3.5 py-2.5 shadow-[0_15px_35px_rgba(0,0,0,0.9)] backdrop-blur-md">
        <div className="font-mono text-[8px] tracking-wider text-[#929292] uppercase">
          CODE REGISTRY: LT-SYS
        </div>
        <div className="mt-0.5 font-mono text-[8px] font-bold text-[#CDBA94] uppercase">
          WCAG 2.1 AA COMPLIANT
        </div>
      </div>
    </div>
  );
}

function HomeFaq() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="relative bg-[#070707] py-24 md:py-36 overflow-hidden border-t border-white/10">
      <div className="container-page relative z-10">
        <Reveal>
          <SectionHeading
            eyebrow="SPECIFICATION FAQ"
            title="Questions before you begin."
            lead="Straightforward answers about scope, team composition, technology choices and intellectual property."
            align="center"
          />
        </Reveal>

        <div className="mt-14 max-w-3xl mx-auto divide-y divide-white/10 border-y border-white/10">
          {serviceFaqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={faq.question} className="py-6">
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  className="flex w-full items-start justify-between gap-4 text-left outline-none group cursor-pointer"
                >
                  <div className="flex items-start gap-4">
                    <span className="font-mono text-[10px] tracking-wider text-[#CDBA94] pt-1">
                      {String(index + 1).padStart(2, "0")} //
                    </span>
                    <h3 className="font-serif text-lg md:text-xl font-medium text-[#F4F1EA] transition-colors group-hover:text-[#CDBA94]">
                      {faq.question}
                    </h3>
                  </div>
                  <span className="grid h-8 w-8 shrink-0 place-items-center border border-white/15 text-[#929292] transition-colors group-hover:border-[#CDBA94] group-hover:text-[#CDBA94]">
                    <Icon
                      name="chevron-down"
                      className={cn("h-3.5 w-3.5 transition-transform duration-300", isOpen && "rotate-180")}
                    />
                  </span>
                </button>
                {isOpen && (
                  <div className="mt-4 pl-9 pr-6 text-sm md:text-base font-light text-[#929292] leading-relaxed">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const [current, setCurrent] = useState(0);
  const item = testimonials[current];

  return (
    <section className="relative bg-[#070707] py-24 md:py-36 overflow-hidden select-none border-t border-white/10">
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-serif text-[18vw] font-bold text-white/[0.015] tracking-[0.2em] uppercase select-none">
        JOURNAL
      </div>
      <div className="container-page relative z-10 max-w-4xl mx-auto flex flex-col items-center text-center">
        <div className="flex items-center gap-2 font-mono text-[10px] md:text-xs uppercase tracking-[0.25em] text-[#CDBA94] mb-8">
          <span className="w-1.5 h-1.5 bg-[#CDBA94]" />
          <span>ATELIER CLIENT JOURNAL</span>
        </div>
        <div className="relative min-h-[160px] md:min-h-[180px] flex items-center justify-center">
          <p className="font-serif text-2xl md:text-4xl lg:text-5xl font-medium text-[#F4F1EA] leading-snug md:leading-tight italic">
            &ldquo;{item.quote}&rdquo;
          </p>
        </div>
        <div className="mt-8 flex flex-col items-center">
          <span className="font-serif text-lg font-medium text-[#F4F1EA]">{item.author}</span>
          <span className="mt-1 font-mono text-[10px] tracking-wider text-[#CDBA94] uppercase">
            {item.role} • {item.company}
          </span>
          <span className="mt-0.5 text-xs text-[#929292]">{item.projectContext}</span>
        </div>

        {/* Carousel controls */}
        <div className="mt-10 flex items-center gap-3">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setCurrent(idx)}
              aria-label={`Go to testimonial ${idx + 1}`}
              className={cn(
                "h-1.5 transition-all duration-300 cursor-pointer",
                current === idx ? "w-8 bg-[#CDBA94]" : "w-2 bg-white/20 hover:bg-white/40",
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export function Home() {
  usePageMeta("Home", "LakshTech Solutions is a software development atelier building dependable web, mobile, backend and e-commerce platforms.");

  const [activeProject, setActiveProject] = useState(null);
  const { saved, toggle } = useSavedProjects();
  const { push } = useToast();

  const handleToggleSave = (project) => {
    toggle(project.slug);
    push(
      saved.includes(project.slug)
        ? `Removed ${project.title} from shortlist`
        : `Saved ${project.title} to shortlist`,
    );
  };

  return (
    <>
      {/* 1. HERO SECTION - Premium Dark Obsidian Architecture */}
      <section id="hero" className="relative min-h-[100dvh] w-full bg-[#070707] flex items-center pt-28 pb-20 overflow-hidden">
        {/* Radial ambient champagne gold glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85vw] h-[85vw] md:w-[55vw] md:h-[55vw] bg-[radial-gradient(circle,rgba(205,186,148,0.12),transparent_70%)] pointer-events-none blur-3xl z-0" />

        <div className="container-page relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          <div className="lg:col-span-6 flex flex-col justify-center items-start text-left">
            <div className="flex items-center gap-2 font-mono text-[10px] md:text-xs uppercase tracking-[0.25em] text-[#CDBA94] mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#CDBA94] animate-pulse" />
              <span>PRECISION DIGITAL ENGINEERING • 2026 EDITION</span>
            </div>
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight text-[#F4F1EA] mb-6 leading-[1.04]">
              Digital systems, <span className="gold-gradient-text italic font-normal">engineered.</span>
            </h1>
            <p className="font-sans text-sm md:text-base text-[#929292] font-light leading-relaxed mb-10 max-w-lg">
              LakshTech Solutions is an engineering atelier building dependable web, mobile, backend,
              and e-commerce products for ambitious teams who demand precision and durability.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Button to="/contact" variant="primary" size="lg" icon="arrow-right">
                Start a project
              </Button>
              <Button to="/portfolio" variant="secondary" size="lg">
                Explore Collection
              </Button>
            </div>

            {/* Quick status bar */}
            <div className="mt-12 flex flex-wrap items-center gap-6 border-t border-white/10 pt-6 font-mono text-[9px] tracking-wider text-[#929292]">
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#CDBA94] animate-pulse" />
                <span className="text-[#F4F1EA]">ATELIER STATUS: OPEN FOR COMMISSIONS</span>
              </div>
              <div>MADURAI FLAGSHIP CADENCE</div>
            </div>
          </div>

          <div className="lg:col-span-6 flex justify-center items-center">
            <SoftwareCore />
          </div>
        </div>
      </section>

      {/* Quick Telemetry Bar */}
      <section className="bg-[#0D0E0F] border-y border-white/10 py-8 relative">
        <div className="container-page">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex flex-col">
              <span className="font-serif text-3xl md:text-4xl font-medium text-[#F4F1EA]">99.8%</span>
              <span className="mt-1 font-mono text-[9px] uppercase tracking-wider text-[#CDBA94]">
                P99 Runtime Reliability
              </span>
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-3xl md:text-4xl font-medium text-[#F4F1EA]">50+</span>
              <span className="mt-1 font-mono text-[9px] uppercase tracking-wider text-[#CDBA94]">
                Digital Systems Shipped
              </span>
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-3xl md:text-4xl font-medium text-[#F4F1EA]">15+</span>
              <span className="mt-1 font-mono text-[9px] uppercase tracking-wider text-[#CDBA94]">
                Enterprise Client Partners
              </span>
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-3xl md:text-4xl font-medium text-[#F4F1EA]">&lt;45ms</span>
              <span className="mt-1 font-mono text-[9px] uppercase tracking-wider text-[#CDBA94]">
                Average Endpoint Latency
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. PINNED SERVICES - Interactive Horizontal Scroll Carousel */}
      <PinnedServices />

      {/* 3. PRECISION SECTION - Engineering Standards */}
      <section id="precision" className="relative bg-[#070707] py-24 md:py-36 border-t border-white/10">
        <div className="container-page">
          <Reveal>
            <SectionHeading
              eyebrow="ACT 02 // TECHNICAL DISCIPLINE"
              title="The Master of Movements."
              lead="Every modern digital product lives or dies by its architecture. At LakshTech, we engineer systems with tolerances measured in single milliseconds, marrying clean interfaces with resilient backend engines."
              align="center"
            />
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mt-14 md:mt-20">
            {/* Left sticky column */}
            <div className="lg:col-span-5 lg:sticky lg:top-32 flex flex-col items-center justify-center bg-[#0D0E0F]/85 backdrop-blur-xl border border-white/12 p-6 md:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.85)]">
              <div className="w-full mb-6 border-b border-white/10 pb-4 flex justify-between items-center text-[10px] font-mono tracking-widest text-[#929292]">
                <span>DRAWING REGISTRY: LT-V81_SYS</span>
                <span className="text-[#CDBA94] animate-pulse font-bold">• ARCHITECTURAL CODE</span>
              </div>

              <div className="w-full space-y-4">
                <div className="p-4 bg-[#070707] border border-white/10">
                  <span className="font-mono text-[9px] text-[#CDBA94] uppercase tracking-widest block">FOCUS STAT</span>
                  <div className="flex items-baseline justify-between mt-1">
                    <span className="font-serif text-xl text-[#F4F1EA] font-medium">Sprint Cadence</span>
                    <span className="font-mono text-sm font-bold text-[#CDBA94]">14 DAYS</span>
                  </div>
                </div>
                <div className="p-4 bg-[#070707] border border-white/10">
                  <span className="font-mono text-[9px] text-[#CDBA94] uppercase tracking-widest block">LATENCY THRESHOLD</span>
                  <div className="flex items-baseline justify-between mt-1">
                    <span className="font-serif text-xl text-[#F4F1EA] font-medium">API Response Rate</span>
                    <span className="font-mono text-sm font-bold text-[#CDBA94]">&lt; 45 MS</span>
                  </div>
                </div>
                <div className="p-4 bg-[#070707] border border-white/10">
                  <span className="font-mono text-[9px] text-[#CDBA94] uppercase tracking-widest block">STANDARDS GRADE</span>
                  <div className="flex items-baseline justify-between mt-1">
                    <span className="font-serif text-xl text-[#F4F1EA] font-medium">Accessibility Rating</span>
                    <span className="font-mono text-sm font-bold text-[#CDBA94]">WCAG 2.1 AA</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right detailed list */}
            <div className="lg:col-span-7 space-y-6">
              {services.map((service, idx) => (
                <Reveal key={service.slug} delay={idx * 0.08}>
                  <div className="p-6 md:p-8 bg-[#0D0E0F]/85 backdrop-blur-xl border border-white/10 transition-all duration-300 hover:border-[#CDBA94]/40 hover:bg-[#0D0E0F]">
                    <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
                      <span className="font-mono text-[10px] tracking-widest text-[#CDBA94] uppercase font-semibold">
                        0{idx + 1} // {service.group}
                      </span>
                      <span className="font-mono text-[9px] text-[#929292]/70 uppercase">SPECIFIED BUILD</span>
                    </div>
                    <h3 className="font-serif text-2xl font-medium text-[#F4F1EA]">{service.title}</h3>
                    <p className="mt-3 font-sans text-sm font-light text-[#929292] leading-relaxed">
                      {service.summary}
                    </p>
                    {service.features && (
                      <ul className="mt-4 space-y-2">
                        {service.features.map((feat) => (
                          <li key={feat} className="flex items-center gap-2 font-sans text-xs text-[#929292]">
                            <span className="h-1 w-1 rounded-full bg-[#CDBA94] shrink-0" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                    <div className="mt-6 pt-4 border-t border-white/10 flex justify-end">
                      <Link
                        to={`/services#${service.slug}`}
                        className="inline-flex items-center gap-1.5 font-sans text-[10px] font-semibold tracking-wider text-[#CDBA94] uppercase hover:text-white transition-colors"
                      >
                        View Practice Specifications
                        <Icon name="arrow-right" className="h-3 w-3" />
                      </Link>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. HERITAGE & SCROLL MANIFESTO - 4 Acts */}
      <section id="heritage" className="relative bg-[#070707] py-24 md:py-36 overflow-hidden select-none border-t border-white/10">
        <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-serif text-[18vw] font-bold text-white/[0.015] tracking-[0.2em] uppercase select-none">
          PRECISION
        </div>
        <div className="container-page relative z-10 flex flex-col items-center">
          <div className="flex items-center gap-2 font-mono text-[10px] md:text-xs uppercase tracking-[0.25em] text-[#CDBA94] mb-8">
            <span className="w-1.5 h-1.5 bg-[#CDBA94]" />
            <span>THE LAKSHTECH MANIFESTO // 4 ACTS</span>
          </div>
          <div className="text-center mb-16 md:mb-24 max-w-4xl mx-auto">
            <p className="font-serif text-2xl md:text-4xl lg:text-5xl font-medium text-[#F4F1EA] leading-snug md:leading-tight italic">
              &ldquo;Simplicity is the final tier of complexity. We do not design our software to shout from the screen; we engineer systems that whisper dependability to those who rely on them.&rdquo;
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 w-full border-t border-white/10 pt-12">
            <div className="space-y-3 p-5 bg-[#0D0E0F]/60 border border-white/10">
              <span className="font-mono text-[10px] tracking-widest text-[#CDBA94] uppercase block">ACT 01 // DISCIPLINE</span>
              <h3 className="font-serif text-xl font-medium text-[#F4F1EA]">Precision Engineering</h3>
              <p className="font-sans text-xs font-light text-[#929292] leading-relaxed">
                Codebases constructed with strict type boundaries, automated testing pipelines, and explicit performance budgets.
              </p>
            </div>
            <div className="space-y-3 p-5 bg-[#0D0E0F]/60 border border-white/10">
              <span className="font-mono text-[10px] tracking-widest text-[#CDBA94] uppercase block">ACT 02 // ROOTS</span>
              <h3 className="font-serif text-xl font-medium text-[#F4F1EA]">Rooted in Madurai</h3>
              <p className="font-sans text-xs font-light text-[#929292] leading-relaxed">
                Senior engineering leads working with disciplined focus, collaborating directly with global client squads.
              </p>
            </div>
            <div className="space-y-3 p-5 bg-[#0D0E0F]/60 border border-white/10">
              <span className="font-mono text-[10px] tracking-widest text-[#CDBA94] uppercase block">ACT 03 // AESTHETICS</span>
              <h3 className="font-serif text-xl font-medium text-[#F4F1EA]">Aesthetic Restraint</h3>
              <p className="font-sans text-xs font-light text-[#929292] leading-relaxed">
                Clear typography, intentional whitespace, and refined micro-interactions that elevate rather than distract.
              </p>
            </div>
            <div className="space-y-3 p-5 bg-[#0D0E0F]/60 border border-white/10">
              <span className="font-mono text-[10px] tracking-widest text-[#CDBA94] uppercase block">ACT 04 // OWNERSHIP</span>
              <h3 className="font-serif text-xl font-medium text-[#F4F1EA]">Zero Debt Handover</h3>
              <p className="font-sans text-xs font-light text-[#929292] leading-relaxed">
                Repositories, infrastructure, runbooks, and recorded walkthroughs delivered so your team can maintain the build forever.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. VERIFIED BUILDS - Case Studies Showcase */}
      <section id="collection" className="bg-[#070707] py-24 md:py-36 relative overflow-hidden border-t border-white/10">
        <div className="container-page">
          <Reveal>
            <SectionHeading
              eyebrow="SECTION 05 // VERIFIED RELEASES"
              title="Crafted with Passion. Engineered to Scale."
              lead="A selection of recent applications, platforms, and digital products engineered across web, mobile, and backend disciplines."
              align="center"
              action={
                <Button to="/portfolio" variant="gold-outline" size="sm">
                  Full Archives
                </Button>
              }
            />
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mt-12 md:mt-16">
            {projects.slice(0, 6).map((project) => (
              <ProjectCard
                key={project.slug}
                project={project}
                onOpen={setActiveProject}
                onToggleSave={handleToggleSave}
                saved={saved.includes(project.slug)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 6. ENGINEERING APPARATUS - Logo Wall */}
      <section id="showcase" className="bg-[#0D0E0F] py-24 md:py-32 relative overflow-hidden border-t border-white/10">
        <div className="container-page">
          <Reveal>
            <SectionHeading
              eyebrow="ENGINEERING APPARATUS"
              title="Modern Stacks. Zero Lock-In."
              lead="We select technologies based on longevity, developer productivity, and hosting cost predictability."
              align="center"
            />
          </Reveal>

          <div className="mt-12 md:mt-16">
            <LogoWall />
          </div>
        </div>
      </section>

      {/* 7. SPECIFICATION LOG */}
      <section id="specs" className="bg-[#070707] py-24 md:py-36 border-t border-b border-white/10 relative">
        <div className="container-page">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5">
              <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-[#CDBA94] mb-3">
                <span className="w-1.5 h-1.5 bg-[#CDBA94]" />
                <span>SPECIFICATION LOG</span>
              </div>
              <h2 className="font-serif text-3xl md:text-5xl font-medium tracking-tight text-[#F4F1EA] leading-[1.1]">
                Delivery guarantees, agreed in writing.
              </h2>
              <p className="mt-4 font-sans text-sm md:text-base font-light text-[#929292] leading-relaxed">
                Before any code is committed, our team locks in explicit service parameters, testing coverage, and ownership terms.
              </p>
              <div className="mt-8">
                <Button to="/services" variant="primary">
                  Review All Practices
                </Button>
              </div>
            </div>

            <div className="lg:col-span-7 divide-y divide-white/10 border-y border-white/10">
              {specs.map((item) => (
                <div key={item.label} className="grid grid-cols-1 sm:grid-cols-3 gap-2 py-4 items-start">
                  <span className="font-mono text-[10px] font-semibold text-[#CDBA94] uppercase tracking-wider">
                    {item.label}
                  </span>
                  <p className="sm:col-span-2 font-sans text-xs md:text-sm font-light text-[#929292] leading-relaxed">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-white/10 pt-10">
            {stats.map((stat) => (
              <div key={stat.label} className="p-4 bg-[#0D0E0F] border border-white/10">
                <span className="font-serif text-3xl md:text-4xl font-medium text-[#F4F1EA]">
                  {stat.value}{stat.suffix}
                </span>
                <span className="mt-2 block font-mono text-[9px] tracking-wider text-[#CDBA94] uppercase">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. CLIENT JOURNAL TESTIMONIALS */}
      <Testimonials />

      {/* 9. FAQ ACCORDION */}
      <HomeFaq />

      {/* 10. FINAL LUXURY RESERVE / INTAKE SECTION */}
      <section id="reserve" className="relative bg-[#070707] py-28 md:py-44 overflow-hidden border-t border-white/10">
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[75vw] w-[75vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(205,186,148,0.1),transparent_70%)] blur-3xl" />
        <div className="container-page relative z-10 flex flex-col items-center text-center">
          <div className="flex items-center gap-2 font-mono text-[10px] md:text-xs uppercase tracking-[0.25em] text-[#CDBA94] mb-4">
            <span className="w-1.5 h-1.5 bg-[#CDBA94]" />
            <span>SECTION 09 • YOUR ENGAGEMENT BEGINS</span>
          </div>
          <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl font-medium tracking-tight text-[#F4F1EA] max-w-4xl leading-[1.05]">
            Build what outlasts <span className="gold-gradient-text italic font-normal">the launch.</span>
          </h2>
          <p className="mt-6 max-w-xl font-sans text-sm md:text-base font-light text-[#929292] leading-relaxed">
            Share a short brief. A senior engineer replies within one working day with an architectural squad,
            an outline approach, and actionable estimates.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Button to="/contact" variant="primary" size="lg" icon="arrow-right">
              Start a project
            </Button>
            <Button to="/portfolio" variant="secondary" size="lg">
              View our work
            </Button>
          </div>

          <div className="mt-14 w-full max-w-xl border border-white/15 bg-[#0D0E0F]/90 backdrop-blur-xl p-6 text-left shadow-[0_25px_60px_rgba(0,0,0,0.9)]">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <span className="font-mono text-[9px] tracking-widest text-[#929292] uppercase font-semibold">
                PROJECT INTAKE SHEET
              </span>
              <span className="font-mono text-[9px] text-[#CDBA94] font-bold">BATCH 04 // ACTIVE</span>
            </div>
            <div className="mt-4 grid gap-2 font-mono text-[10px] text-[#929292] sm:grid-cols-2">
              <p><span className="text-[#CDBA94]">01 //</span> Scope &amp; Target Outcome</p>
              <p><span className="text-[#CDBA94]">02 //</span> Users &amp; Architecture</p>
              <p><span className="text-[#CDBA94]">03 //</span> Timeline &amp; Release Cadence</p>
              <p><span className="text-[#CDBA94]">04 //</span> Budget &amp; Resource Model</p>
            </div>
            <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-3">
              <span className="font-mono text-[9px] text-[#929292]/60 uppercase">RESPONSE // WITHIN 1 WORKING DAY</span>
              <Link to="/contact" className="inline-flex items-center gap-1.5 font-sans text-[10px] font-semibold tracking-wider text-[#CDBA94] uppercase hover:text-white transition-colors">
                Open Brief <Icon name="arrow-right" className="h-3 w-3" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Case study modal */}
      <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
    </>
  );
}
