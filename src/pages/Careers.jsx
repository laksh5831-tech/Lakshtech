import { useState } from "react";
import { Link } from "react-router-dom";
import { usePageMeta } from "../lib/usePageMeta";
import { PageHero } from "../components/PageHero";
import { CtaBand } from "../components/CtaBand";
import { Reveal } from "../components/ui/Reveal";
import { SectionHeading } from "../components/ui/SectionHeading";
import { Button } from "../components/ui/Button";
import { Icon } from "../components/ui/Icon";
import { Modal } from "../components/ui/Modal";
import { useToast } from "../components/ui/Toast";
import { careerHiringProcess, careerPerks, careersOpenings, brand } from "../data/site";
import { cn } from "../lib/cn";

export function Careers() {
  usePageMeta(
    "Careers at the Atelier",
    "Join LakshTech Solutions: senior-led engineering squads in Madurai building dependable digital systems with high craft and no crunch.",
  );

  const [activeJob, setActiveJob] = useState(null);
  const [applyModalOpen, setApplyModalOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState("");
  const [candidateForm, setCandidateForm] = useState({
    name: "",
    email: "",
    portfolio: "",
    note: "",
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const { push } = useToast();

  const handleOpenApply = (job) => {
    setSelectedRole(job ? job.title : "General Speculative Application");
    setApplyModalOpen(true);
    setFormSubmitted(false);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!candidateForm.name || !candidateForm.email) return;

    setFormSubmitted(true);
    push(`Application received for ${selectedRole}. We will review your profile.`);
    setTimeout(() => {
      setApplyModalOpen(false);
      setCandidateForm({ name: "", email: "", portfolio: "", note: "" });
      setFormSubmitted(false);
    }, 1800);
  };

  return (
    <>
      <PageHero
        title="Engineers and designers who value craft over crunch."
        lead="We are a boutique software atelier. No 70-hour weeks, no throwaway code, no endless layers of management. Just senior craftspeople building dependable systems."
        meta={[
          { label: "Squad Model", value: "Senior-Led Squads" },
          { label: "Base Atelier", value: "Madurai / Hybrid" },
          { label: "Open Roles", value: `${careersOpenings.length} Active Openings` },
        ]}
      >
        <div className="mt-8 flex flex-wrap gap-4">
          <Button
            href="#openings"
            variant="primary"
            icon="arrow-right"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("openings")?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            View Open Commissions
          </Button>
          <Button to="/about" variant="secondary">
            Read Studio Philosophy
          </Button>
        </div>
      </PageHero>

      {/* 1. CULTURE & VALUES SECTION */}
      <section className="relative bg-[#070707] py-24 md:py-36 border-b border-white/10">
        <div className="container-page">
          <Reveal>
            <SectionHeading
              eyebrow="ATELIER PRINCIPLES"
              title="A different kind of engineering studio."
              lead="We built LakshTech to be the kind of workplace we always wanted: focused, technically rigorous, and deeply respectful of human time."
              align="center"
            />
          </Reveal>

          <div className="mt-14 md:mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {careerPerks.map((perk, index) => (
              <Reveal key={perk.number} delay={index * 0.1}>
                <div className="p-6 md:p-8 bg-[#0D0E0F]/85 backdrop-blur-xl border border-white/10 h-full flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:border-[#CDBA94]/40 hover:shadow-[0_20px_50px_rgba(0,0,0,0.85)]">
                  <div>
                    <span className="font-mono text-xs font-bold text-[#CDBA94] tracking-widest block mb-4">
                      {perk.number} //
                    </span>
                    <h3 className="font-serif text-xl font-medium text-[#F4F1EA] mb-3">
                      {perk.title}
                    </h3>
                    <p className="font-sans text-xs md:text-sm font-light text-[#929292] leading-relaxed">
                      {perk.description}
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-white/10 font-mono text-[9px] text-[#929292]/50 tracking-wider uppercase">
                    STANDARD MANDATE
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 2. OPENINGS LIST */}
      <section id="openings" className="relative bg-[#070707] py-24 md:py-36 border-b border-white/10">
        <div className="container-page">
          <Reveal>
            <SectionHeading
              eyebrow="COMMISSIONS & ROLES"
              title="Current Atelier Openings."
              lead="Review active engineering openings. Every hire works directly on live client systems from month one."
              align="left"
            />
          </Reveal>

          <div className="mt-12 space-y-6">
            {careersOpenings.map((opening) => (
              <Reveal key={opening.id}>
                <div className="p-6 md:p-8 bg-[#0D0E0F]/85 backdrop-blur-xl border border-white/10 transition-all duration-300 hover:border-[#CDBA94]/40">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6 mb-6">
                    <div>
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-[10px] tracking-wider text-[#CDBA94] uppercase">
                          {opening.type} • {opening.location}
                        </span>
                        <span className="h-1 w-1 rounded-full bg-white/20" />
                        <span className="font-mono text-[10px] text-[#929292]">EXP: {opening.experience}</span>
                      </div>
                      <h3 className="font-serif text-2xl md:text-3xl font-medium text-[#F4F1EA] mt-2">
                        {opening.title}
                      </h3>
                      <p className="font-mono text-xs text-[#CDBA94] mt-1">{opening.compensation}</p>
                    </div>
                    <Button onClick={() => handleOpenApply(opening)} variant="primary" size="md">
                      Apply for Commission
                    </Button>
                  </div>

                  <p className="font-sans text-xs md:text-sm font-light text-[#929292] leading-relaxed mb-6">
                    {opening.summary}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-white/10">
                    <div>
                      <span className="font-mono text-[10px] uppercase tracking-wider text-[#CDBA94] block mb-2 font-semibold">
                        KEY CRAFT MANDATE
                      </span>
                      <ul className="space-y-1.5 font-sans text-xs text-[#929292]">
                        {(opening.deliverables || opening.responsibilities || []).slice(0, 3).map((r) => (
                          <li key={r} className="flex items-start gap-2">
                            <span className="h-1.5 w-1.5 rounded-full bg-[#CDBA94] shrink-0 mt-1.5" />
                            <span>{r}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <span className="font-mono text-[10px] uppercase tracking-wider text-[#CDBA94] block mb-2 font-semibold">
                        TECHNICAL REQUIREMENTS
                      </span>
                      <ul className="space-y-1.5 font-sans text-xs text-[#929292]">
                        {(opening.requirements || []).slice(0, 3).map((req) => (
                          <li key={req} className="flex items-start gap-2">
                            <span className="h-1.5 w-1.5 rounded-full bg-[#CDBA94] shrink-0 mt-1.5" />
                            <span>{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 3. HIRING CADENCE */}
      <section className="relative bg-[#0D0E0F] py-24 md:py-36 border-b border-white/10">
        <div className="container-page">
          <Reveal>
            <SectionHeading
              eyebrow="SELECTION CADENCE"
              title="Four clear steps. No endless loops."
              lead="We keep our hiring process respectful, technical, and fast. You talk to actual engineers who build code daily."
              align="center"
            />
          </Reveal>

          <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {careerHiringProcess.map((step) => (
              <Reveal key={step.step}>
                <div className="p-6 bg-[#070707] border border-white/10 h-full flex flex-col justify-between">
                  <div>
                    <span className="font-mono text-xs font-bold text-[#CDBA94] tracking-widest block mb-4">
                      {step.step} //
                    </span>
                    <h3 className="font-serif text-xl font-medium text-[#F4F1EA] mb-3">
                      {step.title}
                    </h3>
                    <p className="font-sans text-xs md:text-sm font-light text-[#929292] leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                  <div className="mt-6 pt-3 border-t border-white/10 font-mono text-[9px] text-[#CDBA94] uppercase tracking-wider">
                    FEEDBACK IN 24H
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 4. SPECULATIVE CALLOUT */}
      <CtaBand
        title="Don't see your specific discipline?"
        lead="We are always looking to meet exceptional frontend architects, backend engineers, and design systems specialists who care about craftsmanship."
        primary={{ label: "Send a Speculative Brief", to: "/contact" }}
        secondary={{ label: "View Our Work", to: "/portfolio" }}
      />

      {/* Application Modal */}
      <Modal
        open={applyModalOpen}
        onClose={() => setApplyModalOpen(false)}
        title={`Apply for: ${selectedRole}`}
      >
        {formSubmitted ? (
          <div className="p-8 text-center space-y-3">
            <span className="h-10 w-10 mx-auto grid place-items-center bg-[#CDBA94]/20 text-[#CDBA94] border border-[#CDBA94]/40">
              <Icon name="check" className="h-5 w-5" />
            </span>
            <h3 className="font-serif text-xl font-medium text-[#F4F1EA]">Brief Received</h3>
            <p className="font-sans text-xs text-[#929292] max-w-sm mx-auto">
              Thank you for sharing your profile. Our senior engineering squad reviews all applications
              and will reply within 2 working days.
            </p>
          </div>
        ) : (
          <form onSubmit={handleFormSubmit} className="space-y-4 pt-2">
            <div>
              <label htmlFor="app-name" className="block font-mono text-[10px] uppercase tracking-wider text-[#929292] mb-1">
                Full Name *
              </label>
              <input
                id="app-name"
                required
                type="text"
                value={candidateForm.name}
                onChange={(e) => setCandidateForm({ ...candidateForm, name: e.target.value })}
                placeholder="e.g. Priya Sundaram"
                className="field-input"
              />
            </div>

            <div>
              <label htmlFor="app-email" className="block font-mono text-[10px] uppercase tracking-wider text-[#929292] mb-1">
                Email Address *
              </label>
              <input
                id="app-email"
                required
                type="email"
                value={candidateForm.email}
                onChange={(e) => setCandidateForm({ ...candidateForm, email: e.target.value })}
                placeholder="name@domain.com"
                className="field-input"
              />
            </div>

            <div>
              <label htmlFor="app-portfolio" className="block font-mono text-[10px] uppercase tracking-wider text-[#929292] mb-1">
                GitHub / Portfolio / LinkedIn URL
              </label>
              <input
                id="app-portfolio"
                type="url"
                value={candidateForm.portfolio}
                onChange={(e) => setCandidateForm({ ...candidateForm, portfolio: e.target.value })}
                placeholder="https://github.com/username or portfolio link"
                className="field-input"
              />
            </div>

            <div>
              <label htmlFor="app-note" className="block font-mono text-[10px] uppercase tracking-wider text-[#929292] mb-1">
                A Short Note About What You Build
              </label>
              <textarea
                id="app-note"
                rows={4}
                value={candidateForm.note}
                onChange={(e) => setCandidateForm({ ...candidateForm, note: e.target.value })}
                placeholder="Tell us about a technical challenge you recently solved or code you are proud of."
                className="field-input"
              />
            </div>

            <div className="pt-3 flex items-center justify-between border-t border-white/10">
              <span className="font-mono text-[9px] text-[#929292]/50 uppercase">
                DIRECT TO ENGINEERING LEADS
              </span>
              <Button type="submit" variant="primary" size="md">
                Transmit Application
              </Button>
            </div>
          </form>
        )}
      </Modal>
    </>
  );
}
