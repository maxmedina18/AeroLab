import { useSimStore } from "../state/store";

function Readout({
  label,
  value,
  unit,
  pending = false,
}: {
  label: string;
  value: string;
  unit?: string;
  pending?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1 border-r border-base-border px-5 py-3 last:border-r-0">
      <span className="tick-label text-ink-faint">{label}</span>
      <span className={`readout text-base ${pending ? "text-ink-faint" : "text-ink"}`}>
        {value}
        {unit && <span className="ml-1 text-xs text-ink-faint">{unit}</span>}
      </span>
    </div>
  );
}

export function MetricsPanel() {
  const windSpeed = useSimStore((s) => s.windSpeed);
  const aoa = useSimStore((s) => s.angleOfAttack);
  const fps = useSimStore((s) => s.fps);
  const frame = useSimStore((s) => s.frame);

  return (
    <footer className="flex h-16 shrink-0 items-stretch overflow-x-auto border-t border-base-border bg-base-panel">
      <Readout label="Wind Speed" value={windSpeed.toFixed(1)} unit="m/s" />
      <Readout label="Angle of Attack" value={`${aoa > 0 ? "+" : ""}${aoa.toFixed(1)}`} unit="deg" />
      <Readout label="Reynolds Number" value="—" pending />
      <Readout label="Lift Coefficient" value="—" pending />
      <Readout label="Drag Coefficient" value="—" pending />
      <Readout label="Frame" value={frame.toString()} />
      <Readout label="FPS" value={fps.toString()} />
    </footer>
  );
}
