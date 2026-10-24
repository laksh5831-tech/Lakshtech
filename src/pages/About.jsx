import { usePageMeta } from "../lib/usePageMeta";
import { Link } from "react-router-dom";
import { PageHero } from "../components/PageHero";
import { CtaBand } from "../components/CtaBand";
import { Reveal } from "../components/ui/Reveal";
import { SectionHeading } from "../components/ui/SectionHeading";
import { Button } from "../components/ui/Button";
import { Icon } from "../components/ui/Icon";
import { team, timeline, values } from "../data/site";

export function About() {
  usePageMeta("About the studio", "Meet LakshTech Solutions: a senior product team in Madurai building software clients can own and maintain.");

  return (
    <>
      <PageHero
        title="Engineers who would rather fix it than sell it."
        lead="LakshTech Solutions is a software development company built on senior people, clear scope and code that a client can own without depending on us forever."
        meta={[
          { label: "Founded", value: "2021" },
          { label: "Team", value: "Four senior leads" },
          { label: "Based in", value: "Madurai, Tamil Nadu" },
        ]}
      />

      <section className="section-y bg-[#070707]">
        <div className="container-page">
          <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
            <Reveal>
              <h2 className="max-w-[20ch] font-serif text-3xl md:text-5xl font-medium tracking-tight text-[#F4F1EA] leading-[1.08]">
                From a four-person studio to a delivery partner.
              </h2>
              <div className="mt-6 space-y-4 font-sans text-sm md:text-base font-light text-[#929292] leading-relaxed">
                <p>
                  We started in 2021 with a simple frustration: projects were being handed over as
                  fragile codebases, and the people who paid for them were left guessing.
                </p>
                <p>
                  So we built the opposite. Every project runs with a named squad, a written scope, a
                  two-week sprint cadence and a handover package that includes architecture notes,
                  environment setup and a recorded walkthrough. Clients stay because the work keeps
                  running after we leave.
                </p>
                <p>
                  Today we work with startups, mid-market firms and public-sector teams on websites,
                  mobile products, backend platforms and e-commerce. The technologies change; the way
                  we work does not.
                </p>
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button to="/services" variant="primary" icon="arrow-right">
                  See how we work
                </Button>
                <Button to="/contact" variant="outline">
                  Talk to the team
                </Button>
              </div>
            </Reveal>

            <Reveal delay={1}>
              <div className="grid gap-4">
                <figure className="media-frame overflow-hidden border border-white/10 bg-[#0D0E0F]">
                  <img
                    src="/assets/images/studio/workshop.jpg"
                    width="1200"
                    height="800"
                    alt="Sample photo of a workshop session"
                    loading="lazy"
                    className="aspect-[16/10] w-full object-cover opacity-85"
                  />
                  <figcaption className="flex items-center gap-2 border-t border-white/10 px-4 py-3 font-mono text-[9px] uppercase tracking-wider text-[#929292]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#CDBA94]" />
                    Studio Workshop Session • Madurai
                  </figcaption>
                </figure>
                <div className="grid grid-cols-2 gap-4">
                  <div className="lift-card border border-white/10 bg-[#0D0E0F]/85 p-5">
                    <p className="font-serif text-3xl text-[#F4F1EA] font-medium leading-none">4</p>
                    <p className="mt-2 font-mono text-[10px] uppercase tracking-wider text-[#CDBA94]">
                      Senior leads on every squad
                    </p>
                  </div>
                  <div className="lift-card border border-white/10 bg-[#0D0E0F]/85 p-5">
                    <p className="font-serif text-3xl text-[#F4F1EA] font-medium leading-none">2 wk</p>
                    <p className="mt-2 font-mono text-[10px] uppercase tracking-wider text-[#CDBA94]">
                      Working demo every sprint
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Principles */}
      <section className="section-y border-t border-white/10 bg-[#070707]">
        <div className="container-page">
          <Reveal>
            <SectionHeading
              eyebrow="Studio principles"
              title="What we are working towards."
              lead="Four commitments that decide how we scope, build and hand over work."
            />
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => (
              <Reveal key={value.title} delay={index}>
                <div className="lift-card flex h-full flex-col border border-white/10 bg-[#0D0E0F]/85 backdrop-blur-xl p-6">
                  <span className="font-mono text-xs text-[#CDBA94] font-bold">
                    {String(index + 1).padStart(2, "0")} //
                  </span>
                  <h3 className="mt-3 font-serif text-xl font-medium text-[#F4F1EA]">{value.title}</h3>
                  <p className="mt-2 font-sans text-xs md:text-sm font-light leading-relaxed text-[#929292]">{value.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Chronology */}
      <section className="section-y border-t border-white/10 bg-[#0D0E0F]">
        <div className="container-page">
          <Reveal>
            <SectionHeading
              eyebrow="Studio chronology"
              title="A short timeline."
              lead="Five years of sample history, kept honest about the pace of a small studio."
            />
          </Reveal>
          <ol className="mt-12 border-l border-white/15 pl-6 space-y-8">
            {timeline.map((item, index) => (
              <Reveal as="li" key={item.year} delay={index % 3} className="relative">
                <span className="absolute -left-[31px] top-1.5 h-2.5 w-2.5 rounded-full border border-black bg-[#CDBA94]" />
                <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                  <span className="font-mono text-xs font-bold text-[#CDBA94] uppercase tracking-wider">{item.year}</span>
                  <h3 className="font-serif text-xl font-medium text-[#F4F1EA]">{item.title}</h3>
                </div>
                <p className="mt-2 max-w-[62ch] font-sans text-sm font-light leading-relaxed text-[#929292]">
                  {item.body}
                </p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Team */}
      <section className="section-y border-t border-white/10 bg-[#070707]">
        <div className="container-page">
          <Reveal>
            <SectionHeading
              eyebrow="The atelier"
              title="The people you would actually work with."
              lead="Four sample profiles, all based in Tamil Nadu. Every engagement is staffed from this group, not from a bench."
            />
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((member, index) => (
              <Reveal key={member.name} delay={index}>
                <article className="team-card lift-card group h-full overflow-hidden border border-white/10 bg-[#0D0E0F]/85 backdrop-blur-xl">
                  <div className="aspect-[4/5] w-full overflow-hidden bg-black">
                    <img
                      src={member.image}
                      alt={`Portrait of ${member.name}, ${member.role} based in ${member.location}`}
                      width="600"
                      height="700"
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-85 group-hover:opacity-100"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-serif text-xl font-medium text-[#F4F1EA]">{member.name}</h3>
                    <p className="mt-0.5 font-mono text-xs text-[#CDBA94]">{member.role}</p>
                    <p className="mt-1 flex items-center gap-1.5 font-sans text-xs text-[#929292]">
                      <Icon name="pin" className="h-3 w-3 text-[#CDBA94]" />
                      {member.location}, Tamil Nadu
                    </p>
                    <p className="mt-3 font-sans text-xs font-light leading-relaxed text-[#929292]">{member.bio}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 bg-[#070707] py-12">
        <div className="container-page">
          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm font-light text-[#929292]">
              Want the short version of how we deliver?{" "}
              <Link to="/portfolio" className="font-medium text-[#CDBA94] underline decoration-[#CDBA94]/30 underline-offset-4 hover:decoration-[#CDBA94]">
                Browse the work
              </Link>{" "}
              instead.
            </p>
            <Button to="/contact" variant="outline" icon="arrow-right">Start a project</Button>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
