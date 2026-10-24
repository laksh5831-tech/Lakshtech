import { useEffect, useRef, useState } from "react";

export function Reveal({
  as: Tag = "div",
  delay = 0,
  variant = "up",
  className,
  children,
  style,
  ...rest
}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }

    let done = false;
    let frame = 0;
    let observer = null;

    const stop = () => {
      observer?.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };

    const reveal = () => {
      if (done) return;
      done = true;
      setVisible(true);
      stop();
    };

    function onScroll() {
      if (done || frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        if (node.getBoundingClientRect().top < window.innerHeight - 48) reveal();
      });
    }

    observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) reveal();
      },
      { threshold: 0.12, rootMargin: "0px 0px -48px 0px" },
    );

    observer.observe(node);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    onScroll();

    return stop;
  }, []);

  return (
    <Tag
      ref={ref}
      data-reveal={variant}
      className={`${visible ? "is-visible" : ""} ${className || ""}`.trim()}
      style={{ "--reveal-delay": `${Math.min(delay, 8) * 70}ms`, ...style }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
