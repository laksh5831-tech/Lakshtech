import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { brand, navLinks, services } from "../../data/site";
import { cn } from "../../lib/cn";
import { Icon } from "../ui/Icon";
import { Button } from "../ui/Button";
import { useSavedProjects } from "../../context/SavedProjectsContext";

export function Header({ onOpenMenu, menuOpen = false }) {
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation();
  const { count } = useSavedProjects();

  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      if (!frame) {
        frame = window.requestAnimationFrame(() => {
          frame = 0;
          setScrolled(window.scrollY > 30);
          const doc = document.documentElement;
          const max = doc.scrollHeight - window.innerHeight;
          setScrollProgress(max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0);
        });
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    setDropdownOpen(false);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    if (!dropdownOpen) return;
    const onPointerDown = (event) => {
      if (!dropdownRef.current?.contains(event.target)) setDropdownOpen(false);
    };
    const onKeyDown = (event) => {
      if (event.key === "Escape") setDropdownOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [dropdownOpen]);

  return (
    <header
      className={cn(
        "fixed left-0 top-0 z-[100] w-full transition-all duration-500",
        scrolled
          ? "border-b border-white/[0.08] bg-[#070707]/85 py-3.5 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.8)]"
          : "border-b border-white/[0.04] bg-gradient-to-b from-black/80 via-black/40 to-transparent py-5 sm:py-6",
      )}
    >
      <div className="container-page flex items-center justify-between gap-8">
        <Link
          to="/"
          className="group inline-flex shrink-0 items-baseline gap-2.5 outline-none"
          aria-label={`${brand.name} home`}
        >
          <span className="font-serif text-xl sm:text-2xl font-bold tracking-[0.28em] text-[#F4F1EA] group-hover:text-white transition-colors">
            {brand.shortName}
          </span>
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#CDBA94] font-mono font-medium">
            SOLUTIONS
          </span>
        </Link>

        <nav className="hidden items-center gap-7 lg:gap-9 xl:gap-11 lg:flex" aria-label="Primary">
          <ul className="flex items-center gap-6 lg:gap-8 xl:gap-10">
            {navLinks.map((link) =>
              link.children === "services" ? (
                <li
                  key={link.to}
                  ref={dropdownRef}
                  className="relative"
                  onMouseEnter={() => setDropdownOpen(true)}
                  onMouseLeave={() => setDropdownOpen(false)}
                >
                  <div className="flex items-center gap-1">
                    <NavLink
                      to={link.to}
                      className={({ isActive }) =>
                        cn(
                          "relative px-1 py-2 font-sans text-xs uppercase tracking-[0.2em] transition-colors duration-300 outline-none select-none flex items-center gap-1.5 group",
                          isActive
                            ? "text-[#CDBA94] font-semibold"
                            : "text-[#F4F1EA]/80 hover:text-[#F4F1EA]",
                        )
                      }
                    >
                      <span>{link.label}</span>
                      <Icon
                        name="chevron-down"
                        className={cn(
                          "h-3 w-3 text-[#CDBA94] transition-transform duration-300",
                          dropdownOpen ? "rotate-180" : "",
                        )}
                      />
                      <span
                        className={cn(
                          "absolute bottom-0 left-0 h-[1px] bg-[#CDBA94] transition-all duration-300",
                          dropdownOpen ? "w-full" : "w-0 group-hover:w-full",
                        )}
                      />
                    </NavLink>
                  </div>

                  <div
                    id="services-menu"
                    className={cn(
                      "absolute left-1/2 top-full w-[560px] -translate-x-1/2 pt-3 transition-all duration-300",
                      dropdownOpen
                        ? "visible opacity-100 translate-y-0"
                        : "invisible -translate-y-2 opacity-0 pointer-events-none",
                    )}
                  >
                    <div className="overflow-hidden border border-white/12 bg-[#0D0E0F]/95 backdrop-blur-2xl p-4 shadow-[0_20px_50px_rgba(0,0,0,0.9)]">
                      <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-[0.25em] text-[#CDBA94] px-3 py-1.5 mb-2 border-b border-white/10">
                        <span>PRACTICE INDEX // 6 DISCIPLINES</span>
                        <span className="text-[#929292]">SENIOR SQUADS</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        {services.map((service, index) => (
                          <Link
                            key={service.slug}
                            to={`/services#${service.slug}`}
                            onClick={() => setDropdownOpen(false)}
                            className="group flex flex-col gap-1 p-3 border border-transparent hover:border-white/10 hover:bg-white/[0.04] transition-all duration-300"
                          >
                            <span className="font-mono text-[9px] tracking-[0.2em] text-[#CDBA94] uppercase">
                              {String(index + 1).padStart(2, "0")} // {service.group}
                            </span>
                            <span className="flex items-center justify-between font-serif text-[0.95rem] font-medium text-[#F4F1EA] group-hover:text-[#CDBA94] transition-colors">
                              {service.title}
                              <Icon
                                name="arrow-right"
                                className="h-3.5 w-3.5 -translate-x-1 text-[#CDBA94] opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                              />
                            </span>
                            <span className="line-clamp-1 text-[11px] font-light text-[#929292]">
                              {service.summary}
                            </span>
                          </Link>
                        ))}
                      </div>
                      <div className="mt-3 flex items-center justify-between border-t border-white/10 pt-3 px-3">
                        <span className="text-[11px] font-light text-[#929292]">
                          Direct scoping inquiry with senior engineers
                        </span>
                        <Link
                          to="/contact"
                          onClick={() => setDropdownOpen(false)}
                          className="inline-flex items-center gap-1.5 font-sans text-[10px] font-semibold tracking-[0.18em] text-[#CDBA94] uppercase hover:text-white transition-colors"
                        >
                          Book Scoping Session
                          <Icon name="arrow-right" className="h-3 w-3" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </li>
              ) : (
                <li key={link.to}>
                  <NavLink
                    to={link.to}
                    className={({ isActive }) =>
                      cn(
                        "relative px-1 py-2 font-sans text-xs uppercase tracking-[0.2em] transition-colors duration-300 outline-none select-none group block",
                        isActive
                          ? "text-[#CDBA94] font-semibold"
                          : "text-[#F4F1EA]/80 hover:text-[#F4F1EA]",
                      )
                    }
                  >
                    <span>{link.label}</span>
                    <span
                      className={cn(
                        "absolute bottom-0 left-0 h-[1px] bg-[#CDBA94] transition-all duration-300",
                        "w-0 group-hover:w-full",
                      )}
                    />
                  </NavLink>
                </li>
              ),
            )}
          </ul>

          <span className="h-4 w-px bg-white/15 mx-1" aria-hidden="true" />

          <Link
            to="/portfolio?saved=1"
            className="hidden items-center gap-2 font-sans text-xs uppercase tracking-[0.18em] text-[#929292] transition-colors hover:text-[#CDBA94] xl:inline-flex"
            aria-label={`Saved projects: ${count}`}
          >
            <Icon name="bookmark" className="h-3.5 w-3.5 text-[#CDBA94]" />
            Shortlist
            <span className="font-mono tabular-nums text-[#CDBA94]">({count})</span>
          </Link>

          <Button to="/contact" variant="primary" size="sm">
            Start a project
          </Button>
        </nav>

        <button
          type="button"
          onClick={onOpenMenu}
          aria-label="Toggle Menu"
          aria-expanded={menuOpen}
          className="grid h-10 w-10 place-items-center border border-white/15 bg-white/[0.02] text-[#F4F1EA] transition-colors hover:border-[#CDBA94] hover:text-[#CDBA94] lg:hidden cursor-pointer"
        >
          <Icon name={menuOpen ? "close" : "menu"} className="h-5 w-5" />
        </button>
      </div>

      {/* Reference scroll progress line attached to header */}
      <div className="absolute bottom-0 left-0 h-[1px] w-full bg-white/[0.08]">
        <div
          className="h-full bg-[#CDBA94] transition-all duration-100 ease-out"
          style={{ width: `${scrollProgress * 100}%` }}
        />
      </div>
    </header>
  );
}
