import { useEffect } from "react";

const SUFFIX = "LakshTech Solutions";

export function usePageMeta(title, description) {
  useEffect(() => {
    document.title = title ? `${title} | ${SUFFIX}` : SUFFIX;

    if (description) {
      let tag = document.querySelector('meta[name="description"]');
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute("name", "description");
        document.head.appendChild(tag);
      }
      tag.setAttribute("content", description);
    }
  }, [title, description]);
}
