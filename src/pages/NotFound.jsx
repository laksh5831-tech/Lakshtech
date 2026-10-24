import { usePageMeta } from "../lib/usePageMeta";
import { Link } from "react-router-dom";
import { PageHero } from "../components/PageHero";
import { Button } from "../components/ui/Button";

const links = [
  { label: "Home", to: "/", body: "Start from the top and explore our capabilities." },
  { label: "Services", to: "/services", body: "Six practices, including architecture, frontend and platforms." },
  { label: "Portfolio", to: "/portfolio", body: "Eight verified builds with the full engineering stack." },
  { label: "Contact", to: "/contact", body: "Send a brief and receive a technical reply in 24 hours." },
];

export function NotFound() {
  usePageMeta("Page not found", "The page you requested is not part of the LakshTech Solutions site.");

  return (
    <>
      <PageHero
        title="That page moved, or never existed."
        lead="The address you followed is not part of this site. Use one of the routes below, or head back to the homepage."
      >
        <div className="mt-8 flex flex-wrap gap-3">
          <Button to="/" variant="primary" icon="arrow-right">
            Back to home
          </Button>
          <Button to="/portfolio" variant="secondary">
            View our work
          </Button>
        </div>
      </PageHero>

      <section className="section-y bg-[#070707] relative overflow-hidden">
        <div className="container-page">
          <p className="font-serif text-[clamp(4rem,2rem+9vw,8rem)] leading-none text-white/[0.04] font-bold select-none">
            404
          </p>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="group border border-white/10 bg-[#0D0E0F]/85 backdrop-blur-xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#CDBA94]/40 hover:bg-[#121316]"
              >
                <span className="flex items-center justify-between gap-3">
                  <span className="font-serif text-xl font-medium text-[#F4F1EA] group-hover:text-[#CDBA94] transition-colors">
                    {link.label}
                  </span>
                  <span className="font-mono text-[10px] text-[#CDBA94]">
                    0{links.indexOf(link) + 1} //
                  </span>
                </span>
                <span className="mt-2 block font-sans text-xs md:text-sm font-light leading-relaxed text-[#929292]">
                  {link.body}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
