import { techLogos } from "../data/site";

export function LogoWall() {
  return (
    <ul className="logo-wall grid grid-cols-4 gap-px overflow-hidden border border-white/10 bg-white/10 sm:grid-cols-6 lg:grid-cols-8">
      {techLogos.map((logo) => (
        <li
          key={logo.slug}
          className="flex items-center justify-center gap-2 bg-[#0D0E0F] px-3 py-4 transition-colors hover:bg-[#141519] group"
          title={logo.label}
        >
          <img
            src={`/assets/images/logos/${logo.slug}.svg`}
            alt=""
            width="26"
            height="26"
            loading="lazy"
            className="h-6 w-6 opacity-45 transition-opacity duration-300 group-hover:opacity-90"
          />
          <span className="hidden text-[0.78rem] text-[#929292] group-hover:text-[#F4F1EA] transition-colors sm:inline font-mono">
            {logo.label}
          </span>
        </li>
      ))}
    </ul>
  );
}
