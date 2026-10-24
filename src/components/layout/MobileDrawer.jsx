import { useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { brand, navLinks, services } from "../../data/site";
import { cn } from "../../lib/cn";
import { Icon } from "../ui/Icon";
import { Button } from "../ui/Button";

export function MobileDrawer({ open, onClose }) {
  const panelRef = useRef(null);
  const closeRef = useRef(null);
  const [servicesOpen, setServicesOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const timer = setTimeout(() => closeRef.current?.focus(), 40);

    const onKeyDown = (event) => {
      if (event.key === "Escape") onClose();
      if (event.key === "Tab" && panelRef.current) {
        const focusables = panelRef.current.querySelectorAll(
          'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])',
        );
        if (!focusables.length) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      clearTimeout(timer);
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previous;
    };
  }, [open, onClose]);

  useEffect(() => {
    if (!open) setServicesOpen(false);
  }, [open]);

  return (
    <div className={cn("fixed inset-0 z-[130] lg:hidden", open ? "pointer-events-auto" : "pointer-events-none")}>
      <div
        onClick={onClose}
        aria-hidden="true"
        className={cn(
          "absolute inset-0 bg-black/85 backdrop-blur-md transition-opacity duration-300",
          open ? "opacity-100" : "opacity-0",
        )}
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal={open ? "true" : undefined}
        aria-label="Site navigation"
        aria-hidden={!open}
        inert={!open}
        className={cn(
          "absolute right-0 top-0 flex h-full w-[min(24rem,92vw)] flex-col overflow-y-auto border-l border-white/10 bg-[#070707] text-[#F4F1EA] transition-transform duration-300 ease-out shadow-2xl",
          open ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
          <Link to="/" onClick={onClose} className="font-serif text-[1.2rem] font-bold tracking-[0.25em] text-[#F4F1EA] uppercase">
            {brand.shortName}
            <span className="text-[#CDBA94]">.</span>
          </Link>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close navigation menu"
            className="grid h-9 w-9 place-items-center border border-white/15 text-[#929292] transition-colors hover:border-[#CDBA94] hover:text-[#CDBA94] cursor-pointer"
          >
            <Icon name="close" className="h-4 w-4" />
          </button>
        </div>

        <nav aria-label="Mobile" className="flex-1 px-6 py-8">
          <span className="mb-4 block font-mono text-[9px] tracking-[0.3em] text-[#CDBA94] uppercase">
            SITEMAP DIRECTORY
          </span>
          <ul className="flex flex-col gap-1">
            {navLinks.map((link) =>
              link.children === "services" ? (
                <li key={link.to} className="border-b border-white/10 pb-3">
                  <div className="flex items-center justify-between">
                    <NavLink
                      to={link.to}
                      onClick={onClose}
                      className={({ isActive }) =>
                        cn(
                          "flex-1 py-2 font-serif text-[1.6rem] font-medium leading-snug tracking-tight transition-colors",
                          isActive ? "text-[#CDBA94]" : "text-[#F4F1EA] hover:text-[#CDBA94]",
                        )
                      }
                    >
                      {link.label}
                    </NavLink>
                    <button
                      type="button"
                      onClick={() => setServicesOpen((value) => !value)}
                      aria-expanded={servicesOpen}
                      aria-controls="mobile-services"
                      aria-label="Toggle services list"
                      className="grid h-8 w-8 place-items-center border border-white/10 text-[#929292] transition-colors hover:border-[#CDBA94] hover:text-[#CDBA94] cursor-pointer"
                    >
                      <Icon
                        name="chevron-down"
                        className={cn("h-3.5 w-3.5 transition-transform duration-300", servicesOpen && "rotate-180")}
                      />
                    </button>
                  </div>
                  <div
                    id="mobile-services"
                    className={cn(
                      "grid transition-[grid-template-rows] duration-300",
                      servicesOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                    )}
                  >
                    <div className="overflow-hidden">
                      <ul className="mt-2 space-y-1 pb-2">
                        {services.map((service, index) => (
                          <li key={service.slug} className="border-t border-white/5">
                            <Link
                              to={`/services#${service.slug}`}
                              onClick={onClose}
                              className="flex items-center justify-between py-2 text-[0.82rem] font-light text-[#929292] transition-colors hover:text-[#CDBA94]"
                            >
                              <span>
                                <span className="mr-2 font-mono text-[9px] text-[#CDBA94]">
                                  {String(index + 1).padStart(2, "0")}
                                </span>
                                {service.title}
                              </span>
                              <Icon name="arrow-right" className="h-3 w-3 text-[#CDBA94]" />
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </li>
              ) : (
                <li key={link.to} className="border-b border-white/10 pb-3">
                  <NavLink
                    to={link.to}
                    onClick={onClose}
                    className={({ isActive }) =>
                      cn(
                        "block py-2 font-serif text-[1.6rem] font-medium leading-snug tracking-tight transition-colors",
                        isActive ? "text-[#CDBA94]" : "text-[#F4F1EA] hover:text-[#CDBA94]",
                      )
                    }
                  >
                    {link.label}
                  </NavLink>
                </li>
              ),
            )}
          </ul>

          <div className="mt-8 grid gap-3">
            <Button to="/contact" variant="primary" size="md" onClick={onClose} className="w-full">
              Start a project
            </Button>
            <Button
              to="/portfolio?saved=1"
              variant="outline"
              size="md"
              icon="bookmark"
              iconPosition="left"
              onClick={onClose}
              className="w-full"
            >
              Shortlist
            </Button>
          </div>

          <div className="my-8 h-[1px] w-full bg-white/10" />

          <dl className="space-y-3 font-sans text-[0.82rem] text-[#929292]">
            <div className="flex items-start gap-2.5">
              <Icon name="pin" className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#CDBA94]" />
              <dd>
                {brand.addressLines[0]} {brand.addressLines[1]}
              </dd>
            </div>
            <div className="flex items-center gap-2.5">
              <Icon name="mail" className="h-3.5 w-3.5 shrink-0 text-[#CDBA94]" />
              <dd>
                <a href={`mailto:${brand.email}`} className="hover:text-[#CDBA94] transition-colors">
                  {brand.email}
                </a>
              </dd>
            </div>
            <div className="flex items-center gap-2.5">
              <Icon name="phone" className="h-3.5 w-3.5 shrink-0 text-[#CDBA94]" />
              <dd>
                <a href={brand.phoneHref} className="hover:text-[#CDBA94] transition-colors">
                  {brand.phone}
                </a>
              </dd>
            </div>
          </dl>
        </nav>

        <div className="flex items-center justify-between border-t border-white/10 px-6 py-4 font-mono text-[9px] tracking-wider text-[#929292]/60">
          <span>• STUDIO MADURAI</span>
          <span>EST. 2021</span>
        </div>
      </div>
    </div>
  );
}
