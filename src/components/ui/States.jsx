import { Icon } from "./Icon";

export function EmptyState({ icon = "search", title, body, action }) {
  return (
    <div
      role="status"
      className="flex flex-col items-center justify-center border border-dashed border-white/15 bg-[#0D0E0F]/80 backdrop-blur-md px-6 py-14 text-center"
    >
      <span className="grid h-12 w-12 place-items-center border border-white/10 bg-[#070707] text-[#CDBA94]">
        <Icon name={icon} className="h-5 w-5" />
      </span>
      <h3 className="mt-4 font-serif text-xl font-medium text-[#F4F1EA]">{title}</h3>
      <p className="mt-2 max-w-sm text-sm font-light leading-relaxed text-[#929292]">{body}</p>
      {action ? <div className="mt-5">{action}</div> : null}
    </div>
  );
}

export function ErrorState({ title = "Something went wrong", body, onRetry }) {
  return (
    <div
      role="alert"
      className="flex flex-col items-center justify-center border border-red-500/30 bg-[#160b0b]/60 backdrop-blur-md px-6 py-14 text-center"
    >
      <span className="grid h-12 w-12 place-items-center border border-red-500/40 bg-red-950/40 text-red-400">
        <Icon name="alert" className="h-5 w-5" />
      </span>
      <h3 className="mt-4 font-serif text-xl font-medium text-red-200">{title}</h3>
      <p className="mt-2 max-w-md text-sm font-light leading-relaxed text-red-300/80">{body}</p>
      {onRetry ? (
        <button
          type="button"
          onClick={onRetry}
          className="mt-5 inline-flex items-center gap-2 border border-[#CDBA94] bg-[#CDBA94] px-5 py-2.5 font-sans text-xs uppercase tracking-wider font-semibold text-[#070707] transition-all hover:bg-[#DFCEAC] cursor-pointer"
        >
          <Icon name="refresh" className="h-4 w-4" />
          Try again
        </button>
      ) : null}
    </div>
  );
}
