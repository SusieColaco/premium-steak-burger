export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-4 flex items-center gap-3">
      <span className="h-px flex-1 bg-warm-400/25" />
      <h2 className="font-display shrink-0 text-xs font-semibold uppercase tracking-[0.25em] text-cream-050">
        {children}
      </h2>
      <span className="h-px flex-1 bg-warm-400/25" />
    </div>
  );
}
