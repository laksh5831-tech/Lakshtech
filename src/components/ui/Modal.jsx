import { useCallback, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { Icon } from "./Icon";

export function Modal({ open, onClose, title, subtitle, children, wide = false }) {
  const dialogRef = useRef(null);
  const closeRef = useRef(null);
  const previouslyFocused = useRef(null);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  const trapFocus = useCallback((event) => {
    if (event.key !== "Tab") return;
    const focusables = dialogRef.current?.querySelectorAll(
      'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])',
    );
    if (!focusables || focusables.length === 0) return;
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }, []);

  useEffect(() => {
    if (!open) return;

    previouslyFocused.current = document.activeElement;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";

    const timer = setTimeout(() => closeRef.current?.focus(), 30);

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onCloseRef.current();
      } else {
        trapFocus(event);
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      clearTimeout(timer);
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = overflow;
      previouslyFocused.current?.focus?.();
    };
  }, [open, trapFocus]);

  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 z-[120] flex items-end justify-center p-0 sm:items-center sm:p-6">
      <div
        className="modal-backdrop absolute inset-0 bg-black/85 backdrop-blur-xl"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className={`animate-modal relative flex max-h-[92vh] w-full flex-col overflow-hidden border border-white/15 bg-[#0D0E0F]/95 backdrop-blur-2xl text-[#F4F1EA] shadow-[0_30px_70px_rgba(0,0,0,0.95)] sm:rounded-sm ${
          wide ? "max-w-3xl" : "max-w-xl"
        }`}
      >
        <div className="flex items-start justify-between gap-6 border-b border-white/10 px-6 py-5">
          <div>
            <h2 id="modal-title" className="font-serif text-xl sm:text-2xl text-[#F4F1EA]">
              {title}
            </h2>
            {subtitle ? <p className="mt-1 font-mono text-[10px] uppercase tracking-wider text-[#CDBA94]">{subtitle}</p> : null}
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="grid h-9 w-9 shrink-0 place-items-center border border-white/15 text-[#929292] transition-colors hover:border-[#CDBA94] hover:text-[#CDBA94] cursor-pointer"
          >
            <Icon name="close" className="h-4 w-4" />
          </button>
        </div>
        <div className="overflow-y-auto px-6 py-6">{children}</div>
      </div>
    </div>,
    document.body,
  );
}
