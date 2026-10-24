import { Icon } from "./Icon";

export function Field({
  id,
  label,
  as = "input",
  error,
  hint,
  required = false,
  className = "",
  children,
  ...controlProps
}) {
  const errorId = `${id}-error`;
  const hintId = `${id}-hint`;
  const describedBy = [hint ? hintId : null, error ? errorId : null].filter(Boolean).join(" ");

  const shared = {
    id,
    name: controlProps.name || id,
    "aria-invalid": error ? "true" : undefined,
    "aria-describedby": describedBy || undefined,
    "aria-required": required || undefined,
    className: `field-input ${error ? "border-red-500" : ""}`,
    ...controlProps,
  };

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <label htmlFor={id} className="text-xs font-mono uppercase tracking-wider text-[#F4F1EA] flex items-center justify-between">
        <span>
          {label}
          {required ? (
            <span className="ml-1 text-[#CDBA94]" aria-hidden="true">
              *
            </span>
          ) : null}
        </span>
        {!required ? (
          <span className="font-mono text-[9px] uppercase tracking-wider text-[#929292]/60">optional</span>
        ) : null}
      </label>

      {as === "textarea" ? (
        <textarea rows={5} {...shared} />
      ) : as === "select" ? (
        <select {...shared}>{children}</select>
      ) : (
        <input {...shared} />
      )}

      {hint ? (
        <p id={hintId} className="text-[11px] font-light text-[#929292]">
          {hint}
        </p>
      ) : null}

      {error ? (
        <p id={errorId} className="flex items-center gap-1.5 text-xs text-red-400 font-mono">
          <Icon name="alert" className="h-3.5 w-3.5" />
          <span>{error}</span>
        </p>
      ) : null}
    </div>
  );
}
