import { useSimStore } from "../state/store";

function IconPause() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <rect x="3" y="2" width="3" height="10" fill="currentColor" />
      <rect x="8" y="2" width="3" height="10" fill="currentColor" />
    </svg>
  );
}

function IconPlay() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M4 2L12 7L4 12V2Z" fill="currentColor" />
    </svg>
  );
}

function IconReset() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.4">
      <path d="M12 7A5 5 0 1 1 9.5 2.6" strokeLinecap="round" />
      <path d="M9 1.5L9.8 3.6L7.6 4.1" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconCamera() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.4">
      <rect x="1.5" y="4" width="11" height="8" rx="1" />
      <path d="M5 4L6 2.5H8L9 4" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="7" cy="8" r="2.2" />
    </svg>
  );
}

export function Toolbar() {
  const isPaused = useSimStore((s) => s.isPaused);
  const togglePause = useSimStore((s) => s.togglePause);
  const reset = useSimStore((s) => s.reset);

  return (
    <header className="flex h-14 shrink-0 items-center justify-between border-b border-base-border bg-base-panel px-5">
      <div className="flex items-baseline gap-3">
        <h1 className="font-display text-[17px] font-semibold tracking-tight text-ink">
          Aero<span className="text-amber">Lab</span>
        </h1>
        <span className="hidden text-xs text-ink-faint sm:inline">Virtual Wind Tunnel</span>
      </div>

      <div className="flex items-center gap-2 rounded-full border border-base-border bg-base px-3 py-1">
        <span
          className={`h-1.5 w-1.5 rounded-full ${
            isPaused ? "bg-ink-faint" : "bg-amber animate-pulse"
          }`}
        />
        <span className="tick-label text-ink-muted">
          {isPaused ? "Prototype — Idle" : "Prototype — No Solver Active"}
        </span>
      </div>

      <div className="flex items-center gap-1.5">
        <button
          onClick={togglePause}
          className="flex h-8 w-8 items-center justify-center rounded-md border border-base-border bg-base-raised text-ink-muted transition-colors hover:border-amber-dim hover:text-amber"
          aria-label={isPaused ? "Resume" : "Pause"}
        >
          {isPaused ? <IconPlay /> : <IconPause />}
        </button>
        <button
          onClick={reset}
          className="flex h-8 w-8 items-center justify-center rounded-md border border-base-border bg-base-raised text-ink-muted transition-colors hover:border-amber-dim hover:text-amber"
          aria-label="Reset"
        >
          <IconReset />
        </button>
        <button
          className="flex h-8 w-8 items-center justify-center rounded-md border border-base-border bg-base-raised text-ink-muted transition-colors hover:border-amber-dim hover:text-amber"
          aria-label="Export screenshot"
        >
          <IconCamera />
        </button>
      </div>
    </header>
  );
}
