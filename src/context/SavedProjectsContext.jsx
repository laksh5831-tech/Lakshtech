import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { readJSON, writeJSON } from "../lib/storage";

const KEY = "savedProjects";
const SavedProjectsContext = createContext(null);

export function SavedProjectsProvider({ children }) {
  const [saved, setSaved] = useState(() => {
    const value = readJSON(KEY, []);
    return Array.isArray(value) ? value : [];
  });

  useEffect(() => {
    writeJSON(KEY, saved);
  }, [saved]);

  const toggle = useCallback((slug) => {
    setSaved((current) =>
      current.includes(slug) ? current.filter((item) => item !== slug) : [...current, slug],
    );
  }, []);

  const remove = useCallback((slug) => {
    setSaved((current) => current.filter((item) => item !== slug));
  }, []);

  const clear = useCallback(() => setSaved([]), []);

  const value = useMemo(
    () => ({
      saved,
      count: saved.length,
      isSaved: (slug) => saved.includes(slug),
      toggle,
      remove,
      clear,
    }),
    [saved, toggle, remove, clear],
  );

  return <SavedProjectsContext.Provider value={value}>{children}</SavedProjectsContext.Provider>;
}

export function useSavedProjects() {
  const context = useContext(SavedProjectsContext);
  if (!context) throw new Error("useSavedProjects must be used inside SavedProjectsProvider");
  return context;
}
