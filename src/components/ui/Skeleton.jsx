export function Skeleton({ className = "" }) {
  return (
    <div
      aria-hidden="true"
      className={`animate-pulse bg-white/10 ${className}`}
    />
  );
}

export function SkeletonCard() {
  return (
    <div className="overflow-hidden border border-white/10 bg-[#0D0E0F]/80 p-6">
      <div className="aspect-[16/10] w-full bg-white/5 animate-pulse" />
      <div className="space-y-3 pt-5">
        <div className="h-3 w-24 bg-white/10 animate-pulse" />
        <div className="h-5 w-2/3 bg-white/10 animate-pulse" />
        <div className="h-3 w-full bg-white/10 animate-pulse" />
        <div className="h-3 w-5/6 bg-white/10 animate-pulse" />
        <div className="flex gap-2 pt-2">
          <div className="h-6 w-16 bg-white/10 animate-pulse" />
          <div className="h-6 w-20 bg-white/10 animate-pulse" />
        </div>
      </div>
    </div>
  );
}

export function SkeletonPortfolio({ count = 6 }) {
  return (
    <div
      className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3"
      role="status"
      aria-live="polite"
      aria-label="Loading projects"
    >
      {Array.from({ length: count }).map((_, index) => (
        <SkeletonCard key={index} />
      ))}
    </div>
  );
}
