import { Link } from "react-router-dom";
import { cn } from "../../lib/cn";
import { Icon } from "./Icon";

const base =
  "group relative inline-flex items-center justify-center font-sans font-medium tracking-[0.18em] text-xs uppercase transition-all duration-300 focus:outline-none select-none disabled:opacity-40 disabled:pointer-events-none cursor-pointer overflow-hidden active:scale-[0.98]";

const variants = {
  primary:
    "bg-[#CDBA94] text-[#070707] border border-[#CDBA94] hover:bg-[#DFCEAC] hover:border-[#DFCEAC] hover:shadow-[0_0_25px_rgba(205,186,148,0.35)]",
  accent:
    "bg-[#CDBA94] text-[#070707] border border-[#CDBA94] hover:bg-[#DFCEAC] hover:border-[#DFCEAC] hover:shadow-[0_0_25px_rgba(205,186,148,0.35)]",
  secondary:
    "border border-white/20 text-[#F4F1EA] hover:border-[#CDBA94] hover:text-[#CDBA94] bg-white/[0.02] hover:bg-white/[0.06]",
  outline:
    "border border-white/20 text-[#F4F1EA] hover:border-[#CDBA94] hover:text-[#CDBA94] bg-white/[0.02] hover:bg-white/[0.06]",
  "gold-outline":
    "border border-[#CDBA94]/50 text-[#CDBA94] hover:bg-[#CDBA94] hover:text-[#070707] bg-transparent",
  "outline-light":
    "border border-white/20 text-[#F4F1EA] hover:border-[#CDBA94] hover:text-[#CDBA94] bg-white/[0.02] hover:bg-white/[0.06]",
  ghost:
    "text-[#F4F1EA] hover:text-[#CDBA94] hover:bg-white/[0.04] border border-transparent",
  "ghost-light":
    "text-[#929292] hover:text-[#F4F1EA] hover:bg-white/[0.04]",
};

const sizes = {
  sm: "px-5 py-2.5 text-[11px]",
  md: "px-7 py-3.5 text-xs",
  lg: "px-9 py-4 text-xs",
  xl: "px-11 py-5 text-sm",
};

export function Button({
  to,
  href,
  variant = "primary",
  size = "md",
  className,
  children,
  icon,
  iconPosition = "right",
  ...rest
}) {
  const classes = cn(base, variants[variant] || variants.primary, sizes[size] || sizes.md, className);

  const content = (
    <>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:animate-[shimmer_1.5s_infinite]"
      />
      <span className="relative z-10 inline-flex items-center gap-2">
        {icon && iconPosition === "left" ? (
          <Icon name={icon} className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-x-0.5" />
        ) : null}
        <span>{children}</span>
        {icon && iconPosition === "right" ? (
          <Icon name={icon} className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
        ) : null}
      </span>
    </>
  );

  if (to) {
    return (
      <Link to={to} className={classes} {...rest}>
        {content}
      </Link>
    );
  }
  if (href) {
    return (
      <a href={href} className={classes} {...rest}>
        {content}
      </a>
    );
  }
  return (
    <button type="button" className={classes} {...rest}>
      {content}
    </button>
  );
}
