import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { services } from "../data/site";
import { Icon } from "./ui/Icon";

function ServiceVisual({ slug }) {
  if (slug === "backend-development") {
    return (
      <div className="relative h-full overflow-hidden bg-[#070707] p-5 font-mono text-[10px] leading-relaxed text-[#929292]">
        <div className="mb-4 flex gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-[#CDBA94]" />
          <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
          <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
        </div>
        <p className="text-[#CDBA94]">const system = &#123;</p>
        <p className="pl-3">runtime: &apos;node-cluster&apos;,</p>
        <p className="pl-3">scaling: &apos;horizontal-auto&apos;,</p>
        <p className="pl-3">auth: &apos;oauth2-jwt-verified&apos;,</p>
        <p className="pl-3 text-[#F4F1EA]">observability: &apos;telemetry-ready&apos;</p>
        <p className="text-[#CDBA94]">&#125;;</p>
        <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between border-t border-white/10 pt-3">
          <span className="text-[9px] uppercase tracking-wider text-[#929292]">P99 LATENCY</span>
          <span className="text-[#CDBA94] font-bold">38MS</span>
        </div>
      </div>
    );
  }

  if (slug === "mobile-app-development") {
    return (
      <div className="relative grid h-full place-items-center overflow-hidden bg-[#070707]">
        <div className="absolute inset-x-0 top-1/2 h-px bg-white/10" />
        <div className="relative h-[85%] w-[48%] border border-white/20 bg-[#0D0E0F] p-2.5 shadow-[0_15px_30px_rgba(0,0,0,0.9)]">
          <div className="mx-auto mb-2.5 h-1 w-8 rounded-full bg-white/20" />
          <div className="h-14 border border-white/10 bg-black/40 p-2">
            <div className="h-1.5 w-12 bg-[#CDBA94]" />
            <div className="mt-2 h-1 w-16 bg-white/20" />
          </div>
          <div className="mt-2 grid grid-cols-2 gap-1.5">
            <div className="h-9 bg-white/5 border border-white/5" />
            <div className="h-9 bg-white/5 border border-white/5" />
            <div className="col-span-2 h-14 bg-white/5 border border-white/5" />
          </div>
          <div className="absolute bottom-3 left-2.5 right-2.5 h-4 bg-[#CDBA94]" />
        </div>
      </div>
    );
  }

  if (slug === "ui-ux-design") {
    return (
      <div className="relative h-full overflow-hidden bg-[#070707] p-4">
        <div className="grid h-full grid-cols-3 grid-rows-3 gap-2">
          <div className="col-span-2 row-span-2 border border-white/15 bg-[#0D0E0F] p-3">
            <div className="h-1.5 w-10 bg-[#CDBA94]" />
            <div className="mt-3 h-3 w-4/5 bg-white/15" />
            <div className="mt-2 h-1 w-full bg-white/10" />
            <div className="mt-1 h-1 w-2/3 bg-white/10" />
            <div className="mt-4 flex gap-1.5">
              <span className="h-4 w-12 bg-[#CDBA94]" />
              <span className="h-4 w-9 border border-white/20" />
            </div>
          </div>
          <div className="border border-[#CDBA94]/40 bg-[#CDBA94]/10" />
          <div className="border border-white/10 bg-[#0D0E0F]" />
          <div className="col-span-2 border border-white/10 bg-[#0D0E0F]" />
          <div className="border border-white/10 bg-[#CDBA94]/20" />
        </div>
        <span className="mono-label absolute bottom-2 right-3 text-[#929292]">SYSTEM / 08PT</span>
      </div>
    );
  }

  if (slug === "ecommerce-development") {
    return (
      <div className="relative h-full overflow-hidden bg-[#070707] p-4">
        <div className="mb-3 flex items-center justify-between border-b border-white/10 pb-2">
          <span className="font-serif text-[12px] text-[#F4F1EA]">CHECKOUT CODES</span>
          <span className="mono-label text-[#CDBA94]">Cart (02)</span>
        </div>
        <div className="grid h-[calc(100%-2.1rem)] grid-cols-2 gap-2">
          {[0, 1, 2, 3].map((item) => (
            <div key={item} className="border border-white/10 bg-[#0D0E0F] p-2">
              <div className="h-10 bg-black" />
              <div className="mt-2 h-1 w-2/3 bg-white/20" />
              <div className="mt-1 h-1 w-1/3 bg-[#CDBA94]" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (slug === "frontend-development") {
    return (
      <div className="relative h-full overflow-hidden bg-[#070707] p-4">
        <div className="flex h-full gap-2">
          <div className="w-1/4 border border-white/10 bg-white/[0.03] p-2">
            <div className="h-1 w-8 bg-[#CDBA94]" />
            <div className="mt-3 space-y-1.5">
              {[0, 1, 2, 3].map((item) => (
                <div key={item} className="h-1 w-full bg-white/10" />
              ))}
            </div>
          </div>
          <div className="flex-1 border border-white/10 bg-[#0D0E0F] p-3">
            <div className="mb-3 flex gap-1.5">
              {[0, 1, 2].map((item) => (
                <span key={item} className="h-1.5 w-1.5 rounded-full bg-white/20" />
              ))}
            </div>
            <div className="space-y-2">
              <div className="h-3 w-3/4 bg-white/20" />
              <div className="h-16 border border-[#CDBA94]/20 bg-[#CDBA94]/5" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // website-development fallback
  return (
    <div className="relative h-full overflow-hidden bg-[#070707] p-4">
      <div className="h-full border border-white/10 bg-[#0D0E0F] p-3">
        <div className="mb-2 flex items-center justify-between border-b border-white/10 pb-2">
          <span className="mono-label text-[#CDBA94]">DOM / 60FPS</span>
          <span className="h-1.5 w-1.5 rounded-full bg-[#CDBA94] animate-pulse" />
        </div>
        <div className="space-y-2">
          <div className="h-4 w-1/2 bg-[#F4F1EA]/20" />
          <div className="h-1.5 w-3/4 bg-white/10" />
          <div className="mt-4 grid grid-cols-3 gap-2">
            <div className="h-12 bg-white/5 border border-white/5" />
            <div className="h-12 bg-white/5 border border-white/5" />
            <div className="h-12 bg-white/5 border border-white/5" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function PinnedServices() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;

    const update = () => {
      frame = 0;
      const desktop = window.matchMedia("(min-width: 1024px)").matches;
      if (!desktop || reduced.matches) {
        section.style.height = "";
        track.style.transform = "";
        return;
      }
      const maxShift = Math.max(0, track.scrollWidth - window.innerWidth + 48);
      section.style.height = `${window.innerHeight + maxShift}px`;
      const rect = section.getBoundingClientRect();
      const scrollable = Math.max(1, rect.height - window.innerHeight);
      const progress = Math.min(1, Math.max(0, -rect.top / scrollable));
      track.style.transform = `translate3d(${-progress * maxShift}px,0,0)`;
    };

    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    reduced.addEventListener?.("change", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      reduced.removeEventListener?.("change", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section ref={sectionRef} id="materials" className="relative bg-[#070707] border-t border-white/10">
      <div className="service-pin lg:sticky lg:top-0 lg:flex lg:h-screen lg:flex-col lg:justify-center lg:overflow-hidden">
        <div className="container-page pt-20 pb-8 lg:pt-24 lg:pb-10">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-[#CDBA94] mb-4">
                <span className="w-1.5 h-1.5 bg-[#CDBA94]" />
                <span>ACT 01 // CORE DISCIPLINES</span>
              </div>
              <h2 className="font-serif text-[clamp(2.2rem,1.4rem+2.6vw,3.8rem)] leading-[1.05] font-medium tracking-tight text-[#F4F1EA]">
                The elements of dependable software.
              </h2>
            </div>
            <p className="max-w-sm text-[0.92rem] leading-relaxed font-light text-[#929292] md:pb-2">
              Six practices, one accountable team. Each engagement is staffed with senior makers
              from the first sketch to the final handover.
            </p>
          </div>
          <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-4">
            <span className="font-mono text-[10px] uppercase tracking-wider text-[#929292]">
              PRACTICE INDEX // 01 TO 06
            </span>
            <span className="font-mono text-[10px] uppercase tracking-wider text-[#CDBA94]">
              Scroll to traverse →
            </span>
          </div>
        </div>

        <div className="service-track-wrap overflow-hidden pb-16 lg:pb-16">
          <div
            ref={trackRef}
            className="service-track flex w-max snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-4 lg:overflow-visible lg:px-0 lg:pb-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            style={{ paddingLeft: "max(1.5rem, calc((100vw - 1280px) / 2 + 3rem))" }}
          >
            {services.map((service, index) => (
              <article
                key={service.slug}
                className="flex w-[84vw] max-w-[380px] shrink-0 snap-center flex-col border border-white/10 bg-[#0D0E0F]/85 backdrop-blur-xl p-5 shadow-[0_20px_50px_rgba(0,0,0,0.85)] transition-all duration-500 hover:-translate-y-2 hover:border-[#CDBA94]/40 hover:shadow-[0_25px_60px_rgba(0,0,0,0.95),0_0_25px_-5px_rgba(205,186,148,0.15)] sm:w-[380px] lg:w-[340px] lg:p-6 xl:w-[375px]"
              >
                <div className="mb-5 aspect-[16/9] overflow-hidden border border-white/10">
                  <ServiceVisual slug={service.slug} />
                </div>
                <span className="font-mono text-[10px] tracking-wider text-[#CDBA94] uppercase">
                  {String(index + 1).padStart(2, "0")} // {service.group}
                </span>
                <h3 className="mt-2 font-serif text-[1.4rem] leading-tight font-medium text-[#F4F1EA]">
                  {service.title}
                </h3>
                <p className="mt-3 line-clamp-4 text-[0.84rem] leading-relaxed font-light text-[#929292]">
                  {service.summary}
                </p>
                <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4">
                  <span className="font-mono text-[9px] uppercase tracking-wider text-[#929292]">
                    Delivery Spec
                  </span>
                  <Link
                    to={`/services#${service.slug}`}
                    className="group inline-flex items-center gap-1.5 font-sans text-[10px] font-semibold tracking-[0.16em] text-[#CDBA94] uppercase hover:text-white transition-colors"
                  >
                    Explore Spec
                    <Icon name="arrow-right" className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </article>
            ))}
            <div className="hidden w-24 shrink-0 lg:block" aria-hidden="true" />
          </div>
        </div>
      </div>
    </section>
  );
}
