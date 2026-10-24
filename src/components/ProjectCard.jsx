import { useState } from "react";
import { cn } from "../lib/cn";
import { Icon } from "./ui/Icon";

export function ProjectCard({ project, onOpen, onToggleSave, saved }) {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <article
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="project-card group relative flex flex-col overflow-hidden border border-white/10 bg-[#0D0E0F]/85 backdrop-blur-xl transition-all duration-500 hover:-translate-y-1.5 hover:border-[#CDBA94]/40 hover:shadow-[0_20px_50px_rgba(0,0,0,0.85),0_0_25px_-5px_rgba(205,186,148,0.15)]"
    >
      {hovered && (
        <div
          className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300"
          style={{
            background: `radial-gradient(280px circle at ${pos.x}px ${pos.y}px, rgba(205, 186, 148, 0.1), transparent 80%)`,
          }}
        />
      )}

      <div className="project-media relative z-10 aspect-[16/10] overflow-hidden bg-black">
        <button
          type="button"
          onClick={() => onOpen(project)}
          className="block h-full w-full outline-none cursor-pointer"
          aria-label={`View case study for ${project.title}`}
        >
          <img
            src={project.image}
            alt={`${project.title} interface preview`}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 opacity-90 group-hover:opacity-100"
          />
        </button>
        <span className="pointer-events-none absolute left-3 top-3 z-[2] border border-white/10 bg-[#070707]/90 px-2.5 py-1 font-mono text-[9px] font-semibold tracking-[0.16em] text-[#CDBA94] uppercase backdrop-blur-md">
          {project.categoryLabel}
        </span>
        <button
          type="button"
          onClick={() => onToggleSave(project)}
          aria-pressed={saved}
          aria-label={saved ? `Remove ${project.title} from shortlist` : `Save ${project.title} to shortlist`}
          className={cn(
            "absolute right-3 top-3 z-[2] grid h-8 w-8 place-items-center border backdrop-blur-md transition-all duration-300 cursor-pointer",
            saved
              ? "border-[#CDBA94] bg-[#CDBA94] text-[#070707]"
              : "border-white/20 bg-black/60 text-[#F4F1EA] hover:border-[#CDBA94] hover:text-[#CDBA94]",
          )}
        >
          <Icon name="bookmark" className="h-3.5 w-3.5" />
        </button>
      </div>

      <div className="relative z-10 flex flex-1 flex-col p-6">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-serif text-[1.28rem] font-medium tracking-tight text-[#F4F1EA] transition-colors group-hover:text-[#CDBA94]">
            {project.title}
          </h3>
          <span className="shrink-0 font-mono text-[10px] tracking-wider text-[#929292]">{project.year}</span>
        </div>
        <p className="mt-2 text-[0.88rem] leading-relaxed font-light text-[#929292]">{project.summary}</p>

        <ul className="mt-5 flex flex-wrap gap-1.5">
          {(project.stack || []).map((item) => (
            <li
              key={item}
              className="border border-white/10 bg-[#070707] px-2.5 py-1 font-mono text-[9px] text-[#929292] tracking-wider"
            >
              {item}
            </li>
          ))}
        </ul>

        <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4">
          <button
            type="button"
            onClick={() => onOpen(project)}
            className="inline-flex items-center gap-1.5 font-sans text-[10px] font-semibold tracking-[0.18em] text-[#CDBA94] uppercase transition-colors hover:text-white cursor-pointer"
          >
            Explore Case Study
            <Icon name="arrow-right" className="project-arrow h-3 w-3 transition-transform group-hover:translate-x-1" />
          </button>
          {saved ? (
            <span className="font-mono text-[10px] text-[#CDBA94] uppercase tracking-wider">• Shortlisted</span>
          ) : (
            <span className="font-mono text-[9px] text-[#929292]/60 uppercase tracking-wider">Verified Build</span>
          )}
        </div>
      </div>
    </article>
  );
}
