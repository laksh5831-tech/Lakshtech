import { usePageMeta } from "../lib/usePageMeta";
import { useState } from "react";
import { PageHero } from "../components/PageHero";
import { CtaBand } from "../components/CtaBand";
import { LogoWall } from "../components/LogoWall";
import { Reveal } from "../components/ui/Reveal";
import { SectionHeading } from "../components/ui/SectionHeading";
import { Button } from "../components/ui/Button";
import { Icon } from "../components/ui/Icon";
import { Tabs } from "../components/ui/Tabs";
import { Accordion } from "../components/ui/Accordion";
import { engagementIncludes, processSteps, serviceFaqs, serviceGroups, services } from "../data/site";

export function Services() {
  usePageMeta("Services", "Website, frontend, backend, mobile, UI/UX and e-commerce development delivered by one senior team.");

  const [group, setGroup] = useState("All");

  const tabs = serviceGroups.map((name) => ({
    value: name,
    label: name,
    count: name === "All" ? services.length : services.filter((service) => service.group === name).length,
  }));

  const visible = group === "All" ? services : services.filter((service) => service.group === group);

  return (
    <>
      <PageHero
        title="Capabilities that cover the whole product."
        lead="Six practices, one team. Pick the discipline you need or hand us the whole build and we will staff it from the same pool of engineers and designers."
        meta={[
          { label: "Disciplines", value: "Six practices" },
          { label: "Squad model", value: "Dedicated, senior" },
          { label: "First reply", value: "One working day" },
        ]}
      >
        <div className="mt-8 flex flex-wrap gap-3">
          <Button to="/contact" variant="primary" icon="arrow-right">
            Start a project
          </Button>
          <Button to="/portfolio" variant="secondary">
            See the work
          </Button>
        </div>
      </PageHero>

      {/* Practices Index Grid */}
      <section className="section-y bg-[#070707]">
        <div className="container-page">
          <Reveal>
            <SectionHeading
              eyebrow="Practice index"
              title="What we deliver."
              lead="Filter by practice to see the detail. Every card lists what is included before you talk to us."
            />
          </Reveal>

          <div className="mt-8">
            <Tabs
              tabs={tabs}
              value={group}
              onChange={setGroup}
              label="Filter services by practice"
            />
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {visible.map((service, index) => (
              <Reveal key={service.slug} delay={index % 3}>
                <article
                  id={service.slug}
                  className="service-card lift-card flex h-full flex-col scroll-mt-28 border border-white/10 bg-[#0D0E0F]/85 backdrop-blur-xl p-7 hover:border-[#CDBA94]/40 hover:shadow-[0_20px_50px_rgba(0,0,0,0.85)]"
                >
                  <div className="flex items-center justify-between">
                    <span className="grid h-11 w-11 place-items-center border border-white/10 bg-[#070707] text-[#CDBA94]">
                      <Icon
                        name={
                          service.group === "Design"
                            ? "spark"
                            : service.group === "Platform"
                              ? "lock"
                              : "grid"
                        }
                        className="h-5 w-5"
                      />
                    </span>
                    <span className="border border-white/10 bg-[#070707] px-2.5 py-1 font-mono text-[9px] uppercase tracking-wider text-[#CDBA94]">
                      {service.group}
                    </span>
                  </div>
                  <h3 className="mt-5 font-serif text-2xl font-medium text-[#F4F1EA]">{service.title}</h3>
                  <p className="mt-2.5 font-sans text-xs md:text-sm font-light leading-relaxed text-[#929292]">
                    {service.summary}
                  </p>
                  <ul className="mt-5 flex-1 space-y-2 border-t border-white/10 pt-4">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2 font-sans text-xs text-[#F4F1EA]/85">
                        <Icon name="check" className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#CDBA94]" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    to="/contact"
                    variant="outline"
                    size="sm"
                    className="mt-6 w-full"
                    icon="arrow-right"
                  >
                    Discuss this service
                  </Button>
                </article>
              </Reveal>
            ))}
          </div>

          <p className="mt-6 font-mono text-[10px] uppercase tracking-wider text-[#929292]" role="status">
            Showing {visible.length} of {services.length} services
            {group !== "All" ? ` in ${group}` : ""}.
          </p>
        </div>
      </section>

      {/* Process Steps */}
      <section className="section-y border-t border-white/10 bg-[#070707]">
        <div className="container-page">
          <Reveal>
            <SectionHeading
              eyebrow="Delivery method"
              title="How an engagement runs."
              lead="Four stages, each with a deliverable you can review before the next one starts."
            />
          </Reveal>
          <ol className="mt-12 grid gap-px overflow-hidden border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step) => (
              <li key={step.step} className="process-step bg-[#0D0E0F] p-7 transition-colors hover:bg-[#14151a]">
                <span className="font-mono text-xs font-bold text-[#CDBA94] uppercase tracking-wider">{step.step} //</span>
                <h3 className="mt-3 font-serif text-xl font-medium text-[#F4F1EA]">{step.title}</h3>
                <p className="mt-2 font-sans text-xs md:text-sm font-light leading-relaxed text-[#929292]">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Baseline Inclusions */}
      <section className="section-y border-t border-white/10 bg-[#070707]">
        <div className="container-page">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <Reveal>
              <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-[#CDBA94] mb-3">
                <span className="w-1.5 h-1.5 bg-[#CDBA94]" />
                <span>ARCHITECTURAL BASELINE</span>
              </div>
              <h2 className="font-serif text-3xl md:text-5xl font-medium tracking-tight text-[#F4F1EA] leading-[1.08]">
                What every engagement includes.
              </h2>
              <p className="mt-5 font-sans text-sm md:text-base font-light text-[#929292] leading-relaxed">
                These are not optional extras. They are the baseline we apply to every project, from
                a single-page fix to a full platform.
              </p>
              <ul className="mt-7 space-y-3.5">
                {engagementIncludes.map((item) => (
                  <li key={item} className="flex items-start gap-3 font-sans text-xs md:text-sm text-[#F4F1EA]/85">
                    <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-[#CDBA94]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <Button to="/contact" variant="primary" icon="arrow-right">
                  Start a project
                </Button>
              </div>
            </Reveal>
            <Reveal delay={1}>
              <figure className="media-frame overflow-hidden border border-white/10 bg-[#0D0E0F]">
                <img
                  src="/assets/images/studio/code.jpg"
                  width="1200"
                  height="800"
                  alt="Sample photo of a code review on a developer workstation"
                  loading="lazy"
                  className="aspect-[4/3] w-full object-cover opacity-85"
                />
                <figcaption className="flex items-center gap-2 border-t border-white/10 px-4 py-3 font-mono text-[9px] uppercase tracking-wider text-[#929292]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#CDBA94]" />
                  Code Review Station • Architecture Quality Gate
                </figcaption>
              </figure>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Tech Stack Logo Wall */}
      <section className="border-t border-white/10 bg-[#0D0E0F] py-16">
        <div className="container-page">
          <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-[#CDBA94] mb-4">
            <span className="w-1.5 h-1.5 bg-[#CDBA94]" />
            <span>BUILT ON MAINSTREAM TOOLS</span>
          </div>
          <div className="mt-4">
            <LogoWall />
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="section-y border-t border-white/10 bg-[#070707]">
        <div className="container-page">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <Reveal>
              <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-[#CDBA94] mb-3">
                <span className="w-1.5 h-1.5 bg-[#CDBA94]" />
                <span>FREQUENT INQUIRIES</span>
              </div>
              <h2 className="font-serif text-3xl md:text-5xl font-medium tracking-tight text-[#F4F1EA] leading-[1.08]">
                Questions we get asked first.
              </h2>
              <p className="mt-4 max-w-[38ch] font-sans text-sm font-light text-[#929292] leading-relaxed">
                If your question is not here, send it through the contact form and an engineer will
                answer it directly.
              </p>
              <div className="mt-6">
                <Button to="/contact" variant="outline" icon="arrow-right">
                  Ask a question
                </Button>
              </div>
            </Reveal>
            <Reveal delay={1}>
              <Accordion items={serviceFaqs} />
            </Reveal>
          </div>
        </div>
      </section>

      <CtaBand
        title="Not sure which service you need?"
        lead="Describe the problem in plain language. We will tell you which practice fits, or whether you need something we do not offer."
        primary={{ label: "Start a project", to: "/contact" }}
        secondary={{ label: "Read about us", to: "/about" }}
      />
    </>
  );
}
