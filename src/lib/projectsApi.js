import { projects } from "../data/site";

/**
 * Stands in for a real API call. The small delay lets the UI exercise its
 * loading state, and passing `fail: true` exercises the error state.
 */
export function fetchProjects({ signal, fail = false } = {}) {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      if (fail) {
        reject(new Error("The portfolio could not be loaded. Check your connection and retry."));
        return;
      }
      resolve(projects);
    }, 420);

    signal?.addEventListener(
      "abort",
      () => {
        clearTimeout(timer);
        reject(new DOMException("Aborted", "AbortError"));
      },
      { once: true },
    );
  });
}
