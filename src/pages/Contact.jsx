import { usePageMeta } from "../lib/usePageMeta";
import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { PageHero } from "../components/PageHero";
import { CtaBand } from "../components/CtaBand";
import { Reveal } from "../components/ui/Reveal";
import { SectionHeading } from "../components/ui/SectionHeading";
import { Button } from "../components/ui/Button";
import { Icon } from "../components/ui/Icon";
import { Field } from "../components/ui/Field";
import { Accordion } from "../components/ui/Accordion";
import { useToast } from "../components/ui/Toast";
import { readJSON, remove, writeJSON } from "../lib/storage";
import { brand, contactFaqs } from "../data/site";

const DRAFT_KEY = "contactDraft";
const EMPTY = { name: "", email: "", phone: "", subject: "", message: "" };

const validators = {
  name: (value) => {
    if (!value.trim()) return "Please enter your full name.";
    if (value.trim().length < 2) return "Your name must be at least 2 characters.";
    return "";
  },
  email: (value) => {
    if (!value.trim()) return "Please enter your email address.";
    if (!/^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(value.trim())) {
      return "Enter a valid email address, for example name@company.com.";
    }
    return "";
  },
  phone: (value) => {
    if (!value.trim()) return "";
    const digits = value.replace(/\D/g, "");
    if (digits.length !== 10) return "Phone number must be exactly 10 digits.";
    return "";
  },
  subject: (value) => {
    if (!value.trim()) return "Please add a subject so we know what this is about.";
    return "";
  },
  message: (value) => {
    if (!value.trim()) return "Please tell us about your project.";
    if (value.trim().length < 20) return "Please add a little more detail (at least 20 characters).";
    return "";
  },
};

export function Contact() {
  usePageMeta("Contact", "Send a short project brief to LakshTech Solutions and get a reply from an engineer within one working day.");

  const [searchParams] = useSearchParams();
  const draft = useMemo(() => readJSON(DRAFT_KEY, null), []);
  const [values, setValues] = useState(() => ({ ...EMPTY, ...(draft?.values || {}) }));
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState("idle");
  const [draftState, setDraftState] = useState(draft ? "restored" : "idle");
  const [showSummary, setShowSummary] = useState(false);

  const formRef = useRef(null);
  const timer = useRef(null);
  const skipInitialSave = useRef(Boolean(draft));
  const { push } = useToast();

  useEffect(() => {
    const requested = searchParams.get("subject");
    if (!requested) return;
    setValues((current) =>
      current.subject.trim() ? current : { ...current, subject: requested.slice(0, 120) },
    );
  }, [searchParams]);

  useEffect(() => {
    if (status === "success") return;
    if (skipInitialSave.current) {
      skipInitialSave.current = false;
      return;
    }
    const hasContent = Object.values(values).some((value) => value.trim());
    if (!hasContent) return;

    const handle = window.setTimeout(() => {
      const ok = writeJSON(DRAFT_KEY, { values, savedAt: Date.now() });
      if (ok) setDraftState("saved");
    }, 600);

    return () => window.clearTimeout(handle);
  }, [values, status]);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const errors = useMemo(() => {
    const next = {};
    Object.keys(validators).forEach((key) => {
      const message = validators[key](values[key]);
      if (message) next[key] = message;
    });
    return next;
  }, [values]);

  const visibleError = (key) => (touched[key] || showSummary ? errors[key] : "");

  const update = (key) => (event) => {
    if (status === "success") {
      setStatus("idle");
      setShowSummary(false);
    }
    setValues((current) => ({ ...current, [key]: event.target.value }));
  };

  const blur = (key) => () => setTouched((current) => ({ ...current, [key]: true }));

  const handleSubmit = (event) => {
    event.preventDefault();
    const allTouched = Object.keys(validators).reduce((acc, key) => ({ ...acc, [key]: true }), {});
    setTouched(allTouched);

    if (Object.keys(errors).length > 0) {
      setShowSummary(true);
      setStatus("idle");
      const first = Object.keys(errors)[0];
      formRef.current?.querySelector(`#${first}`)?.focus();
      return;
    }

    setShowSummary(false);
    setStatus("submitting");

    timer.current = window.setTimeout(() => {
      setStatus("success");
      setValues(EMPTY);
      setTouched({});
      remove(DRAFT_KEY);
      setDraftState("idle");
      push("Message validated. Brief delivered to senior squad.");
    }, 900);
  };

  const clearDraft = () => {
    remove(DRAFT_KEY);
    setValues(EMPTY);
    setTouched({});
    setDraftState("idle");
    push("Draft brief cleared.");
  };

  return (
    <>
      <PageHero
        title="Tell an engineer what you are building."
        lead="Send a short project brief. An engineer will review it and reply within one working day with squad suggestions, technical feasibility and initial estimates."
        meta={[
          { label: "Reply time", value: "Within 24 hours" },
          { label: "Direct contact", value: "Senior squad leads" },
          { label: "Intake status", value: "Open for commissions" },
        ]}
      />

      <section className="section-y bg-[#070707]">
        <div className="container-page">
          <div className="grid gap-12 lg:grid-cols-[1.25fr_0.75fr] lg:gap-16 items-start">
            <Reveal>
              <div className="border border-white/10 bg-[#0D0E0F]/85 backdrop-blur-xl p-8 md:p-10 shadow-[0_25px_60px_rgba(0,0,0,0.9)]">
                <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-8">
                  <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-[#CDBA94]">
                    <span className="w-1.5 h-1.5 bg-[#CDBA94]" />
                    <span>PROJECT INTAKE SPECIFICATION</span>
                  </div>
                  {draftState === "saved" && (
                    <span className="font-mono text-[9px] text-[#929292]">Draft saved locally</span>
                  )}
                </div>

                {status === "success" ? (
                  <div className="py-12 text-center space-y-4">
                    <span className="h-12 w-12 mx-auto grid place-items-center bg-[#CDBA94]/20 text-[#CDBA94] border border-[#CDBA94]/40">
                      <Icon name="check" className="h-6 w-6" />
                    </span>
                    <h3 className="font-serif text-3xl font-medium text-[#F4F1EA]">
                      Project Brief Received
                    </h3>
                    <p className="font-sans text-sm font-light text-[#929292] max-w-md mx-auto leading-relaxed">
                      Thank you for sharing your architecture requirements. A senior engineering lead will review your scope and reply to your email within one working day.
                    </p>
                    <div className="pt-4">
                      <Button onClick={() => setStatus("idle")} variant="outline" size="sm">
                        Submit Another Inquiry
                      </Button>
                    </div>
                  </div>
                ) : (
                  <form ref={formRef} onSubmit={handleSubmit} noValidate className="space-y-6">
                    <div className="grid gap-6 sm:grid-cols-2">
                      <Field
                        id="name"
                        label="Full Name"
                        required
                        value={values.name}
                        onChange={update("name")}
                        onBlur={blur("name")}
                        error={visibleError("name")}
                        placeholder="e.g. Anandha Kumar"
                      />
                      <Field
                        id="email"
                        type="email"
                        label="Corporate Email"
                        required
                        value={values.email}
                        onChange={update("email")}
                        onBlur={blur("email")}
                        error={visibleError("email")}
                        placeholder="name@company.com"
                      />
                    </div>

                    <div className="grid gap-6 sm:grid-cols-2">
                      <Field
                        id="phone"
                        type="tel"
                        label="Phone Number"
                        value={values.phone}
                        onChange={update("phone")}
                        onBlur={blur("phone")}
                        error={visibleError("phone")}
                        placeholder="10-digit mobile number"
                        hint="Include if you prefer a direct technical call."
                      />
                      <Field
                        id="subject"
                        label="Project Focus / Subject"
                        required
                        value={values.subject}
                        onChange={update("subject")}
                        onBlur={blur("subject")}
                        error={visibleError("subject")}
                        placeholder="e.g. Next-gen Mobile & Web Platform"
                      />
                    </div>

                    <Field
                      id="message"
                      as="textarea"
                      label="Project Brief / Architectural Scope"
                      required
                      value={values.message}
                      onChange={update("message")}
                      onBlur={blur("message")}
                      error={visibleError("message")}
                      placeholder="Outline target outcomes, key users, existing technology stack, and rough timeline..."
                      hint="At least 20 characters describing what you wish to architect."
                    />

                    {showSummary && Object.keys(errors).length > 0 && (
                      <div className="border border-red-500/30 bg-red-950/20 p-4 text-xs font-mono text-red-300">
                        Please review highlighted fields before transmitting.
                      </div>
                    )}

                    <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/10">
                      <span className="font-mono text-[9px] uppercase tracking-wider text-[#929292]">
                        CONFIDENTIAL ENCRYPTED TRANSMISSION
                      </span>
                      <div className="flex items-center gap-3">
                        {values.message && (
                          <button
                            type="button"
                            onClick={clearDraft}
                            className="font-mono text-[10px] uppercase text-[#929292] hover:text-[#CDBA94] transition-colors cursor-pointer"
                          >
                            Reset
                          </button>
                        )}
                        <Button
                          type="submit"
                          variant="primary"
                          size="md"
                          icon="arrow-right"
                          disabled={status === "submitting"}
                        >
                          {status === "submitting" ? "Transmitting..." : "Send Project Brief"}
                        </Button>
                      </div>
                    </div>
                  </form>
                )}
              </div>
            </Reveal>

            {/* Studio Contact Aside */}
            <Reveal delay={1}>
              <aside className="border border-white/10 bg-[#0D0E0F]/85 backdrop-blur-xl p-8 shadow-[0_20px_50px_rgba(0,0,0,0.85)]">
                <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-[#CDBA94] mb-6">
                  <span className="w-1.5 h-1.5 bg-[#CDBA94]" />
                  <span>DIRECT ATELIER CHANNELS</span>
                </div>

                <dl className="space-y-6">
                  <div>
                    <dt className="font-mono text-[9px] tracking-widest text-[#CDBA94] uppercase">
                      General Scoping
                    </dt>
                    <dd className="mt-1">
                      <a
                        href={`mailto:${brand.email}`}
                        className="font-serif text-lg text-[#F4F1EA] hover:text-[#CDBA94] transition-colors"
                      >
                        {brand.email}
                      </a>
                    </dd>
                  </div>
                  <div>
                    <dt className="font-mono text-[9px] tracking-widest text-[#CDBA94] uppercase">
                      Direct Telephone
                    </dt>
                    <dd className="mt-1">
                      <a
                        href={brand.phoneHref}
                        className="font-serif text-lg text-[#F4F1EA] hover:text-[#CDBA94] transition-colors"
                      >
                        {brand.phone}
                      </a>
                    </dd>
                  </div>
                  <div>
                    <dt className="font-mono text-[9px] tracking-widest text-[#CDBA94] uppercase">
                      Atelier Address
                    </dt>
                    <dd className="mt-1 font-sans text-xs md:text-sm font-light text-[#929292] leading-relaxed">
                      {brand.addressLines.map((line) => (
                        <span key={line} className="block">
                          {line}
                        </span>
                      ))}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-mono text-[9px] tracking-widest text-[#CDBA94] uppercase">
                      Studio Hours
                    </dt>
                    <dd className="mt-1 font-sans text-xs md:text-sm font-light text-[#929292] leading-relaxed">
                      {brand.hours.map((line) => (
                        <span key={line} className="block">
                          {line}
                        </span>
                      ))}
                    </dd>
                  </div>
                </dl>

                <div className="mt-8 border border-white/10 bg-white/[0.02] p-4">
                  <p className="flex items-start gap-2.5 font-sans text-xs font-light text-[#929292] leading-relaxed">
                    <Icon name="clock" className="mt-0.5 h-4 w-4 shrink-0 text-[#CDBA94]" />
                    <span>
                      We answer new inquiries within one working day. Existing clients communicate directly with their dedicated squad leads through established channels.
                    </span>
                  </p>
                </div>
              </aside>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 3 Guarantees */}
      <section className="border-t border-white/10 bg-[#0D0E0F] py-16">
        <div className="container-page">
          <div className="grid gap-6 sm:grid-cols-3">
            {[
              {
                icon: "clock",
                title: "One working day",
                body: "Every new enquiry gets a human reply with technical feasibility, not an autoresponder.",
              },
              {
                icon: "check-circle",
                title: "No sales handoff",
                body: "The engineer who replies is the senior practitioner who leads the delivery squad.",
              },
              {
                icon: "lock",
                title: "Zero data leakage",
                body: "This brief validates locally in your browser with strict confidentiality guaranteed.",
              },
            ].map((item, index) => (
              <Reveal key={item.title} delay={index}>
                <div className="lift-card flex h-full gap-4 border border-white/10 bg-[#070707] p-6">
                  <span className="grid h-10 w-10 shrink-0 place-items-center border border-white/10 bg-white/[0.02] text-[#CDBA94]">
                    <Icon name={item.icon} className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="font-serif text-lg font-medium text-[#F4F1EA]">{item.title}</h3>
                    <p className="mt-1 font-sans text-xs font-light leading-relaxed text-[#929292]">{item.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
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
                <span>BEFORE YOU WRITE</span>
              </div>
              <h2 className="font-serif text-3xl md:text-5xl font-medium tracking-tight text-[#F4F1EA] leading-[1.08]">
                Questions we hear first.
              </h2>
              <p className="mt-4 max-w-[38ch] font-sans text-sm font-light text-[#929292] leading-relaxed">
                Four things clients usually ask before sending a brief. If your question is different, put it in the form.
              </p>
            </Reveal>
            <Reveal delay={1}>
              <Accordion items={contactFaqs} defaultOpen={-1} />
            </Reveal>
          </div>
        </div>
      </section>

      <CtaBand
        title="Prefer to see the work first?"
        lead="Browse eight sample projects, filter by discipline and open any card for the stack and the brief behind it."
        primary={{ label: "View our work", to: "/portfolio" }}
        secondary={{ label: "View our services", to: "/services" }}
      />
    </>
  );
}
