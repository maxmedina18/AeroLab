import { useSimStore, VizMode } from "../state/store";
import { AoaGauge } from "./AoaGauge";

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <div className="tick-label mb-3 text-ink-faint">{children}</div>;
}

function Slider({
  value,
  min,
  max,
  step,
  onChange,
}: {
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
}) {
  return (
    <input
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      className="h-1 w-full cursor-pointer appearance-none rounded-full bg-base-border accent-amber"
    />
  );
}

const VIZ_MODES: { key: VizMode; label: string }[] = [
  { key: "streamlines", label: "Streamlines" },
  { key: "velocity", label: "Velocity" },
  { key: "smoke", label: "Smoke" },
  { key: "pressure", label: "Pressure" },
];

export function Sidebar() {
  const windSpeed = useSimStore((s) => s.windSpeed);
  const setWindSpeed = useSimStore((s) => s.setWindSpeed);
  const aoa = useSimStore((s) => s.angleOfAttack);
  const setAoa = useSimStore((s) => s.setAngleOfAttack);
  const vizMode = useSimStore((s) => s.vizMode);
  const setVizMode = useSimStore((s) => s.setVizMode);

  return (
    <aside className="flex w-[280px] shrink-0 flex-col gap-7 overflow-y-auto border-r border-base-border bg-base-panel p-5">
      <div>
        <SectionLabel>Flow Conditions</SectionLabel>
        <div className="rounded-lg border border-base-border bg-base p-4">
          <div className="flex items-baseline justify-between">
            <span className="text-sm text-ink-muted">Wind speed</span>
            <span className="readout text-lg text-ink">
              {windSpeed.toFixed(1)} <span className="text-xs text-ink-faint">m/s</span>
            </span>
          </div>
          <div className="mt-3">
            <Slider value={windSpeed} min={1} max={40} step={0.5} onChange={setWindSpeed} />
          </div>
          <div className="mt-1.5 flex justify-between text-[10px] text-ink-faint">
            <span>1</span>
            <span>40</span>
          </div>
        </div>
      </div>

      <div>
        <SectionLabel>Geometry</SectionLabel>
        <div className="rounded-lg border border-base-border bg-base p-4">
          <AoaGauge value={aoa} />
          <div className="mt-1 flex items-baseline justify-between">
            <span className="text-sm text-ink-muted">Angle of attack</span>
            <span className="readout text-lg text-ink">
              {aoa > 0 ? "+" : ""}
              {aoa.toFixed(1)}
              <span className="text-xs text-ink-faint">°</span>
            </span>
          </div>
          <div className="mt-3">
            <Slider value={aoa} min={-20} max={20} step={0.5} onChange={setAoa} />
          </div>
          <div className="mt-1.5 flex justify-between text-[10px] text-ink-faint">
            <span>-20°</span>
            <span>+20°</span>
          </div>
        </div>
      </div>

      <div>
        <SectionLabel>Visualization</SectionLabel>
        <div className="grid grid-cols-2 gap-1.5">
          {VIZ_MODES.map((m) => (
            <button
              key={m.key}
              onClick={() => setVizMode(m.key)}
              className={`rounded-md border px-3 py-2 text-left text-sm transition-colors ${
                vizMode === m.key
                  ? "border-amber-dim bg-amber/10 text-amber"
                  : "border-base-border bg-base text-ink-muted hover:border-ink-faint hover:text-ink"
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-auto rounded-lg border border-base-border bg-base p-3">
        <p className="text-xs leading-relaxed text-ink-faint">
          Milestone 0 — static visual prototype. Flow field, particles, and
          coefficients are not yet computed by a solver.
        </p>
      </div>
    </aside>
  );
}
