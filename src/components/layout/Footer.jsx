import { useState } from "react";
import { Link } from "react-router-dom";
import { brand, navLinks, services } from "../../data/site";
import { Icon } from "../ui/Icon";
import { Modal } from "../ui/Modal";

export function Footer() {
  const year = new Date().getFullYear();
  const [policyOpen, setPolicyOpen] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (newsletterEmail) setSubscribed(true);
  };

  return (
    <footer className="relative bg-[#070707] text-[#F4F1EA] pt-24 pb-12 border-t border-white/[0.12] overflow-hidden">
      {/* Background ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 left-1/2 h-[340px] w-[750px] -translate-x-1/2 rounded-full bg-[#CDBA94]/[0.05] blur-[130px]"
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        {/* Atelier / Studio Hubs Header */}
        <div className="pb-16 border-b border-white/10">
          <div className="text-xs font-mono uppercase tracking-[0.25em] text-[#CDBA94] mb-6 flex items-center gap-2">
            <Icon name="pin" className="w-3.5 h-3.5" />
            <span>GLOBAL HUBS &amp; ENGINEERING STUDIOS</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="space-y-1">
              <div className="font-serif text-lg text-[#F4F1EA] font-medium">Madurai Flagship</div>
              <div className="text-xs text-[#929292] font-light leading-relaxed">
                {brand.addressLines[0]} {brand.addressLines[1]}
              </div>
              <div className="text-[11px] font-mono text-[#CDBA94]/90">{brand.phone}</div>
            </div>
            <div className="space-y-1">
              <div className="font-serif text-lg text-[#F4F1EA] font-medium">Client Delivery Hub</div>
              <div className="text-xs text-[#929292] font-light leading-relaxed">
                South India Technology Corridor • Tamil Nadu
              </div>
              <div className="text-[11px] font-mono text-[#CDBA94]/90">{brand.email}</div>
            </div>
            <div className="space-y-1">
              <div className="font-serif text-lg text-[#F4F1EA] font-medium">Sprint Operating Hours</div>
              <div className="text-xs text-[#929292] font-light leading-relaxed">
                {brand.hours[0]} • Dedicated Senior Squads
              </div>
              <div className="text-[11px] font-mono text-[#CDBA94]/90">{brand.hours[1]}</div>
            </div>
            <div className="space-y-1">
              <div className="font-serif text-lg text-[#F4F1EA] font-medium">Architecture Scoping</div>
              <div className="text-xs text-[#929292] font-light leading-relaxed">
                Responses within one working day by senior engineers
              </div>
              <div className="text-[11px] font-mono text-[#CDBA94]/90">{brand.projectsEmail}</div>
            </div>
          </div>
        </div>

        {/* Multi-column grid */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 border-b border-white/10">
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-baseline space-x-2.5">
              <span className="font-serif text-3xl font-bold tracking-[0.25em] text-[#F4F1EA]">
                {brand.shortName}
              </span>
              <span className="text-xs uppercase tracking-[0.28em] text-[#CDBA94] font-medium font-mono">
                SOLUTIONS
              </span>
            </div>
            <p className="text-xs text-[#929292] max-w-sm leading-relaxed font-light">
              A precision software engineering atelier organized around dedicated senior squads. We architect, engineer, and hand over digital systems built to endure.
            </p>
            <div className="pt-2 max-w-md">
              <div className="text-[11px] font-mono uppercase tracking-widest text-[#CDBA94] mb-1">
                THE LAKSHTECH DISPATCH
              </div>
              <p className="text-xs text-[#929292] mb-3">
                Receive confidential technical blueprints and engineering insights.
              </p>
              {subscribed ? (
                <div className="flex items-center space-x-2 text-xs font-mono text-[#CDBA94] bg-white/5 p-3 border border-[#CDBA94]/40">
                  <Icon name="check-circle" className="w-4 h-4" />
                  <span>Technical briefing dispatched to {newsletterEmail}</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex items-stretch gap-2">
                  <input
                    type="email"
                    required
                    placeholder="Enter corporate email address"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    className="flex-1 bg-[#121316] border border-white/15 px-4 py-2.5 text-xs text-[#F4F1EA] placeholder-white/30 focus:border-[#CDBA94] focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2.5 bg-[#CDBA94] text-[#070707] text-[11px] font-mono uppercase tracking-wider font-semibold hover:bg-[#DFCEAC] transition-colors cursor-pointer"
                  >
                    Join
                  </button>
                </form>
              )}
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div className="space-y-4">
              <div className="text-xs font-mono uppercase tracking-[0.2em] text-[#F4F1EA] font-semibold">
                DIRECTORY
              </div>
              <ul className="space-y-2.5">
                {navLinks.map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className="text-xs text-[#929292] hover:text-[#CDBA94] transition-colors uppercase tracking-wider font-sans block"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    to="/portfolio?saved=1"
                    className="text-xs text-[#929292] hover:text-[#CDBA94] transition-colors uppercase tracking-wider font-sans block"
                  >
                    Shortlist
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <div className="text-xs font-mono uppercase tracking-[0.2em] text-[#F4F1EA] font-semibold">
                PRACTICES
              </div>
              <ul className="space-y-2.5">
                {services.map((service) => (
                  <li key={service.slug}>
                    <Link
                      to={`/services#${service.slug}`}
                      className="text-xs text-[#929292] hover:text-[#CDBA94] transition-colors font-light block"
                    >
                      {service.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <div className="text-xs font-mono uppercase tracking-[0.2em] text-[#F4F1EA] font-semibold">
                GOVERNANCE
              </div>
              <ul className="space-y-2.5 text-xs text-[#929292] font-light">
                <li>
                  <button
                    type="button"
                    onClick={() => setPolicyOpen(true)}
                    className="hover:text-[#CDBA94] transition-colors text-left cursor-pointer"
                  >
                    Client Data Privacy
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => setPolicyOpen(true)}
                    className="hover:text-[#CDBA94] transition-colors text-left cursor-pointer"
                  >
                    Quality Standards
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => setPolicyOpen(true)}
                    className="hover:text-[#CDBA94] transition-colors text-left cursor-pointer"
                  >
                    Architecture Warranty
                  </button>
                </li>
                <li>
                  <span className="text-[#929292]/50">ISO / WCAG 2.1 AA Aligned</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom copyright & telemetry bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 font-mono text-[10px] tracking-wider text-[#929292]/60">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#CDBA94] animate-pulse" />
            <span className="text-[#F4F1EA]/80">ALL CORE RUNTIMES OPERATIONAL</span>
          </div>
          <div>MADURAI / TAMIL NADU / INDIA • EST. {brand.founded}</div>
          <div>© {year} {brand.name.toUpperCase()}. ALL RIGHTS RESERVED.</div>
        </div>
      </div>

      <Modal open={policyOpen} onClose={() => setPolicyOpen(false)} title="Privacy & Atelier Policy">
        <div className="space-y-4 text-[0.85rem] leading-relaxed font-light text-[#929292]">
          <p className="border-b border-white/10 pb-3 font-mono text-[10px] text-[#CDBA94] uppercase">
            REVISION 2026.04 • CLIENT DATA PRIVACY NOTICE
          </p>
          <p>
            LakshTech Solutions is committed to respecting your privacy and protecting any personal information you share through this website.
          </p>
          <section>
            <h3 className="text-sm font-semibold text-[#F4F1EA]">Information We Collect</h3>
            <p className="mt-1">
              The project inquiry form on this website validates your entries locally in the browser. When you contact us directly by email or phone, we receive the specifications you choose to share, such as contact information and architectural requirements.
            </p>
          </section>
          <section>
            <h3 className="text-sm font-semibold text-[#F4F1EA]">Local Storage</h3>
            <p className="mt-1">
              We use local storage exclusively for your project shortlist and brief draft. This data remains safely on your device and is never transmitted without your explicit action.
            </p>
          </section>
          <section>
            <h3 className="text-sm font-semibold text-[#F4F1EA]">Direct Contact</h3>
            <p className="mt-1">
              Questions regarding privacy policy can be addressed directly to{" "}
              <a href={`mailto:${brand.email}`} className="text-[#CDBA94] hover:underline">
                {brand.email}
              </a>
              .
            </p>
          </section>
        </div>
      </Modal>
    </footer>
  );
}
