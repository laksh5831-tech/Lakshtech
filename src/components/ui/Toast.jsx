import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { Icon } from "./Icon";

const ToastContext = createContext(null);

let nextId = 1;

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const dismiss = useCallback((id) => {
    setToasts((current) => current.filter((toast) => toast.id !== id));
  }, []);

  const push = useCallback(
    (message, tone = "success") => {
      const id = nextId++;
      setToasts((current) => [...current.slice(-2), { id, message, tone }]);
      window.setTimeout(() => dismiss(id), 3600);
    },
    [dismiss],
  );

  const value = useMemo(() => ({ push }), [push]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div
        className="pointer-events-none fixed inset-x-0 bottom-6 z-[140] flex flex-col items-center gap-2 px-4"
        aria-live="polite"
        aria-atomic="false"
      >
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className="animate-toast pointer-events-auto flex max-w-md items-center gap-3 border border-white/15 bg-[#0D0E0F]/95 backdrop-blur-2xl px-4 py-3 text-xs text-[#F4F1EA] shadow-[0_20px_50px_rgba(0,0,0,0.95)] font-sans"
          >
            <span
              className={`grid h-6 w-6 shrink-0 place-items-center ${
                toast.tone === "error" ? "bg-red-950 text-red-400 border border-red-500/40" : "bg-[#CDBA94] text-[#070707]"
              }`}
            >
              <Icon name={toast.tone === "error" ? "alert" : "check"} className="h-3.5 w-3.5" />
            </span>
            <span className="leading-snug flex-1 font-light">{toast.message}</span>
            <button
              type="button"
              onClick={() => dismiss(toast.id)}
              aria-label="Dismiss notification"
              className="ml-2 text-[#929292] transition-colors hover:text-[#CDBA94] cursor-pointer"
            >
              <Icon name="close" className="h-3.5 w-3.5" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToast must be used inside ToastProvider");
  return context;
}
