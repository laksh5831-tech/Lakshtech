import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Header } from "./Header";
import { MobileDrawer } from "./MobileDrawer";
import { Footer } from "./Footer";
import { Icon } from "../ui/Icon";
import { ScrollProgress } from "../ui/ScrollProgress";

export function Layout({ children }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname, hash } = useLocation();

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname, hash]);

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: "instant" });
      return;
    }

    const id = hash.slice(1);
    const timer = window.setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 120);

    return () => window.clearTimeout(timer);
  }, [pathname, hash]);

  return (
    <div className="min-h-screen bg-[#070707] text-[#F4F1EA] flex flex-col selection:bg-[#CDBA94]/20 selection:text-[#F4F1EA]">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[200] focus:border focus:border-[#CDBA94] focus:bg-[#070707] focus:px-4 focus:py-2 focus:text-[#CDBA94]"
      >
        Skip to content
      </a>
      <ScrollProgress />
      <Header menuOpen={menuOpen} onOpenMenu={() => setMenuOpen(true)} />
      <MobileDrawer open={menuOpen} onClose={() => setMenuOpen(false)} />
      <main
        key={pathname}
        id="main"
        tabIndex={-1}
        className="page-transition flex-1 outline-none"
      >
        {children}
      </main>
      <Footer />
      <ScrollTopButton />
    </div>
  );
}

function ScrollTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 700);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Scroll back to top"
      className={`fixed bottom-6 right-6 z-[90] grid h-11 w-11 place-items-center border border-white/15 bg-[#0D0E0F]/90 backdrop-blur-md text-[#F4F1EA] shadow-[0_10px_25px_rgba(0,0,0,0.85)] transition-all duration-300 hover:border-[#CDBA94] hover:text-[#CDBA94] cursor-pointer ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
      }`}
    >
      <Icon name="arrow-up" className="h-4 w-4" />
    </button>
  );
}
