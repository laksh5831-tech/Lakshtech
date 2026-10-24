import { Modal } from "./ui/Modal";
import { Button } from "./ui/Button";
import { Icon } from "./ui/Icon";

export function ProjectModal({ project, onClose, onToggleSave, saved }) {
  const open = Boolean(project);

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={project?.title || ""}
      subtitle={project ? `${project.categoryLabel} // ${project.year} // Verified Architecture Case Study` : ""}
      wide
    >
      {project ? (
        <div className="space-y-6">
          <div className="overflow-hidden border border-white/10 bg-black">
            <img
              src={project.image}
              alt={`${project.title} interface preview`}
              className="w-full object-cover max-h-[380px]"
            />
          </div>

          <p className="text-[0.95rem] leading-relaxed font-light text-[#F4F1EA]">{project.summary}</p>

          <div>
            <h3 className="font-mono text-[10px] tracking-[0.2em] text-[#CDBA94] uppercase">Technology Stack</h3>
            <ul className="mt-3 flex flex-wrap gap-2">
              {(project?.stack || []).map((item) => (
                <li
                  key={item}
                  className="border border-white/10 bg-[#070707] px-3 py-1 font-mono text-[10px] text-[#929292]"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="border border-white/10 bg-white/[0.02] p-4">
            <p className="text-xs leading-relaxed font-light text-[#929292]">
              Delivered under dedicated senior engineering squads with guaranteed code coverage, SLA performance benchmarks, and comprehensive architectural handover documentation.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Button
              onClick={() => onToggleSave(project)}
              variant={saved ? "primary" : "outline"}
              icon="bookmark"
              iconPosition="left"
            >
              {saved ? "Saved to shortlist" : "Save to shortlist"}
            </Button>
            <Button to="/contact" variant="primary" icon="arrow-right">
              Start a similar project
            </Button>
            <button
              type="button"
              onClick={onClose}
              className="ml-auto inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-[#929292] transition-colors hover:text-[#CDBA94] cursor-pointer"
            >
              <Icon name="close" className="h-3.5 w-3.5" />
              Close
            </button>
          </div>
        </div>
      ) : null}
    </Modal>
  );
}
