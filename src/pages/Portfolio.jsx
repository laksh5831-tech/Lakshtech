import { usePageMeta } from "../lib/usePageMeta";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { PageHero } from "../components/PageHero";
import { CtaBand } from "../components/CtaBand";
import { ProjectCard } from "../components/ProjectCard";
import { ProjectModal } from "../components/ProjectModal";
import { Reveal } from "../components/ui/Reveal";
import { Icon } from "../components/ui/Icon";
import { SectionHeading } from "../components/ui/SectionHeading";
import { Button } from "../components/ui/Button";
import { Skeleton } from "../components/ui/Skeleton";
import { EmptyState, ErrorState } from "../components/ui/States";
import { useSavedProjects } from "../context/SavedProjectsContext";
import { useToast } from "../components/ui/Toast";
import { fetchProjects } from "../lib/projectsApi";
import { categories } from "../data/site";

const sortOptions = [
  { value: "newest", label: "Newest first" },
  { value: "oldest", label: "Oldest first" },
  { value: "title", label: "Title A to Z" },
];

export function Portfolio() {
  usePageMeta("Portfolio", "Eight sample projects across web, mobile, design and commerce, with the stack behind each build.");

  const [searchParams] = useSearchParams();
  const simulate = searchParams.get("simulate");

  const [status, setStatus] = useState("loading");
  const [items, setItems] = useState([]);
  const [reload, setReload] = useState(0);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("newest");
  const [savedOnly, setSavedOnly] = useState(false);
  const [active, setActive] = useState(null);

  const { saved, isSaved, toggle } = useSavedProjects();
  const { push } = useToast();

  useEffect(() => {
    const controller = new AbortController();
    setStatus("loading");

    fetchProjects({ signal: controller.signal, fail: simulate === "error" })
      .then((data) => {
        setItems(data);
        setStatus("ready");
      })
      .catch((error) => {
        if (error.name === "AbortError") return;
        setStatus("error");
      });

    return () => controller.abort();
  }, [reload, simulate]);

  useEffect(() => {
    if (searchParams.get("saved") === "1") setSavedOnly(true);
  }, [searchParams]);

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();

    let list = items.filter((project) => {
      if (category !== "all" && project.category !== category) return false;
      if (savedOnly && !saved.includes(project.slug)) return false;
      if (!term) return true;
      const haystack = [project.title, project.summary, project.categoryLabel, ...project.stack]
        .join(" ")
        .toLowerCase();
      return haystack.includes(term);
    });

    list = [...list].sort((a, b) => {
      if (sort === "newest") return b.year - a.year;
      if (sort === "oldest") return a.year - b.year;
      return a.title.localeCompare(b.title);
    });

    return list;
  }, [items, query, category, sort, savedOnly, saved]);

  const counts = useMemo(() => {
    const map = { all: items.length };
    categories.forEach((entry) => {
      if (entry.value === "all") return;
      map[entry.value] = items.filter((project) => project.category === entry.value).length;
    });
    return map;
  }, [items]);

  const hasFilters = Boolean(query.trim()) || category !== "all" || savedOnly || sort !== "newest";

  const clearFilters = useCallback(() => {
    setQuery("");
    setCategory("all");
    setSort("newest");
    setSavedOnly(false);
  }, []);

  const onToggleSave = (project) => {
    toggle(project.slug);
    push(isSaved(project.slug) ? `${project.title} removed from shortlist` : `${project.title} saved to shortlist`);
  };

  return (
    <>
      <PageHero
        title="Work that shipped and stayed shipped."
        lead="Eight sample projects across web, mobile, design and commerce. Search the archive, filter by discipline and open any card for the stack and the brief."
        meta={[
          { label: "Projects", value: "Eight samples" },
          { label: "Disciplines", value: "Five categories" },
          { label: "Latest", value: "2025" },
        ]}
      />

      <section className="section-y bg-[#070707]">
        <div className="container-page">
          <SectionHeading
            eyebrow="Work archive"
            title="Selected work, unpacked."
            lead="Search by title or stack, filter by discipline and open any card for the brief behind the build."
            className="mb-10"
          />

          {/* Luxury Dark Glass Filter Toolbar */}
          <div className="border border-white/10 bg-[#0D0E0F]/85 backdrop-blur-xl p-5 md:p-6 shadow-[0_20px_50px_rgba(0,0,0,0.85)]">
            <div className="grid gap-4 lg:grid-cols-[1.4fr_1fr_1fr_auto]">
              <div className="relative">
                <Icon
                  name="search"
                  className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#929292]"
                />
                <input
                  type="search"
                  placeholder="Search by title, stack, or outcome..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full border border-white/12 bg-[#070707] py-2.5 pl-10 pr-4 text-xs font-sans text-[#F4F1EA] placeholder-[#929292] focus:border-[#CDBA94] focus:outline-none"
                />
              </div>

              <div>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  aria-label="Filter by discipline"
                  className="w-full border border-white/12 bg-[#070707] py-2.5 px-3 text-xs font-mono uppercase tracking-wider text-[#F4F1EA] focus:border-[#CDBA94] focus:outline-none cursor-pointer"
                >
                  {categories.map((entry) => (
                    <option key={entry.value} value={entry.value} className="bg-[#070707] text-[#F4F1EA]">
                      {entry.label} ({counts[entry.value] || 0})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  aria-label="Sort order"
                  className="w-full border border-white/12 bg-[#070707] py-2.5 px-3 text-xs font-mono uppercase tracking-wider text-[#F4F1EA] focus:border-[#CDBA94] focus:outline-none cursor-pointer"
                >
                  {sortOptions.map((opt) => (
                    <option key={opt.value} value={opt.value} className="bg-[#070707] text-[#F4F1EA]">
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <button
                  type="button"
                  onClick={() => setSavedOnly(!savedOnly)}
                  aria-pressed={savedOnly}
                  className={`flex w-full items-center justify-center gap-2 border px-4 py-2.5 font-sans text-xs uppercase tracking-wider font-semibold transition-all cursor-pointer ${
                    savedOnly
                      ? "border-[#CDBA94] bg-[#CDBA94] text-[#070707]"
                      : "border-white/15 bg-white/[0.02] text-[#F4F1EA] hover:border-[#CDBA94] hover:text-[#CDBA94]"
                  }`}
                >
                  <Icon name="bookmark" className="h-3.5 w-3.5" />
                  Shortlist ({saved.length})
                </button>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-4 font-mono text-[10px] tracking-wider text-[#929292]">
              <p role="status" aria-live="polite">
                {status === "loading"
                  ? "Loading projects..."
                  : status === "error"
                    ? "Projects could not be loaded."
                    : `${filtered.length} of ${items.length} builds cataloged`}
              </p>
              {hasFilters ? (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="inline-flex items-center gap-1.5 text-[#CDBA94] hover:text-white transition-colors cursor-pointer"
                >
                  <Icon name="close" className="h-3.5 w-3.5" />
                  Clear filters
                </button>
              ) : null}
            </div>
          </div>

          <div className="mt-12">
            {status === "loading" ? (
              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3" aria-busy="true">
                {Array.from({ length: 6 }).map((_, index) => (
                  <div key={index} className="overflow-hidden border border-white/10 bg-[#0D0E0F]">
                    <Skeleton className="aspect-[16/10]" />
                    <div className="space-y-3 p-5">
                      <Skeleton className="h-4 w-2/3" />
                      <Skeleton className="h-3 w-full" />
                      <Skeleton className="h-3 w-5/6" />
                      <div className="flex gap-2 pt-2">
                        <Skeleton className="h-6 w-16" />
                        <Skeleton className="h-6 w-20" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : status === "error" ? (
              <ErrorState
                title="We could not load the portfolio."
                body="The project list failed to respond. This demo simulates a network error so the recovery path can be tested."
                onRetry={() => setReload((value) => value + 1)}
              />
            ) : filtered.length === 0 ? (
              savedOnly && saved.length === 0 ? (
                <EmptyState
                  icon="bookmark"
                  title="Your shortlist is empty."
                  body="Open any project and choose Save to shortlist, then switch on the Shortlist filter to see it here. Your picks are kept in this browser."
                  action={
                    <Button onClick={() => setSavedOnly(false)} variant="primary">
                      Browse all projects
                    </Button>
                  }
                />
              ) : (
                <EmptyState
                  title="No projects match those filters."
                  body="Try a shorter search term, pick a different discipline, or clear the filters to see the full archive."
                  action={
                    <Button onClick={clearFilters} variant="primary" icon="close">
                      Clear filters
                    </Button>
                  }
                />
              )
            ) : (
              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {filtered.map((project, index) => (
                  <Reveal key={project.slug} delay={index % 3}>
                    <ProjectCard
                      project={project}
                      onOpen={setActive}
                      onToggleSave={onToggleSave}
                      saved={isSaved(project.slug)}
                    />
                  </Reveal>
                ))}
              </div>
            )}
          </div>

          <p className="mt-12 max-w-[70ch] font-mono text-[10px] text-[#929292]/60">
            All projects, screens, metrics and client names on this page are sample content created
            for a demonstration build. Portfolio data loads through a mocked request so loading,
            empty and error states can be reviewed.
          </p>
        </div>
      </section>

      <CtaBand
        title="Have a project like these?"
        lead="Send the brief. We will reply with a suggested team, an approach and a rough timeline within one working day."
        primary={{ label: "Start a project", to: "/contact" }}
        secondary={{ label: "View our services", to: "/services" }}
      />

      <ProjectModal
        project={active}
        onClose={() => setActive(null)}
        onToggleSave={onToggleSave}
        saved={active ? isSaved(active.slug) : false}
      />
    </>
  );
}
