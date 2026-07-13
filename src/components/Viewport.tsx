import { useEffect, useRef } from "react";
import { useSimStore } from "../state/store";
import { naca00xxToSvgPath } from "../features/airfoil/naca";

const AIRFOIL_PATH = naca00xxToSvgPath(0.12, 200);

function CornerTicks() {
  const corners = [
    { top: 0, left: 0, rotate: 0 },
    { top: 0, right: 0, rotate: 90 },
    { bottom: 0, right: 0, rotate: 180 },
    { bottom: 0, left: 0, rotate: 270 },
  ];
  return (
    <>
      {corners.map((c, i) => (
        <svg
          key={i}
          width="22"
          height="22"
          viewBox="0 0 22 22"
          className="absolute text-ink-faint"
          style={{
            top: c.top,
            left: c.left,
            right: c.right,
            bottom: c.bottom,
            transform: `rotate(${c.rotate}deg)`,
          }}
        >
          <path d="M1 1H1V9" stroke="currentColor" strokeWidth="1.5" fill="none" />
          <path d="M1 1H9" stroke="currentColor" strokeWidth="1.5" fill="none" />
        </svg>
      ))}
    </>
  );
}

export function Viewport() {
  const windSpeed = useSimStore((s) => s.windSpeed);
  const aoa = useSimStore((s) => s.angleOfAttack);
  const vizMode = useSimStore((s) => s.vizMode);
  const isPaused = useSimStore((s) => s.isPaused);
  const fps = useSimStore((s) => s.fps);
  const tick = useSimStore((s) => s.tick);

  const rafRef = useRef<number>();
  const lastTimeRef = useRef<number>(performance.now());
  const frameTimesRef = useRef<number[]>([]);

  useEffect(() => {
    function loop(now: number) {
      const dt = now - lastTimeRef.current;
      lastTimeRef.current = now;
      const times = frameTimesRef.current;
      times.push(dt);
      if (times.length > 30) times.shift();
      const avgDt = times.reduce((a, b) => a + b, 0) / times.length;
      if (!isPaused) {
        tick(avgDt > 0 ? Math.round(1000 / avgDt) : 0);
      }
      rafRef.current = requestAnimationFrame(loop);
    }
    rafRef.current = requestAnimationFrame(loop);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isPaused, tick]);

  return (
    <div className="relative flex-1 overflow-hidden bg-base">
      <div className="bg-grid-fine bg-grid-fine absolute inset-0 opacity-60" />

      <div className="absolute inset-4">
        <CornerTicks />
      </div>

      {/* status readouts */}
      <div className="absolute right-6 top-5 flex flex-col items-end gap-1">
        <span className="readout text-xs text-ink-muted">
          FPS <span className="text-ink">{fps.toString().padStart(2, "0")}</span>
        </span>
        <span className="tick-label text-ink-faint">
          {vizMode} MODE
        </span>
      </div>

      <div className="absolute left-6 top-5 flex flex-col gap-1">
        <span className="tick-label text-ink-faint">NACA 0012</span>
        <span className="readout text-xs text-ink-muted">
          U∞ <span className="text-ink">{windSpeed.toFixed(1)}</span> m/s
        </span>
      </div>

      {isPaused && (
        <div className="absolute left-1/2 top-5 -translate-x-1/2 rounded-full border border-base-border bg-base-raised px-3 py-1">
          <span className="tick-label text-ink-muted">Paused</span>
        </div>
      )}

      {/* airfoil, rotated by angle of attack — purely static geometry in Milestone 0 */}
      <div className="flex h-full w-full items-center justify-center">
        <svg viewBox="-40 -60 280 120" className="w-[70%] max-w-[560px]">
          <line x1="-40" y1="0" x2="240" y2="0" stroke="#2A303B" strokeWidth="1" strokeDasharray="3 4" />
          <g transform={`rotate(${-aoa})`}>
            <path d={AIRFOIL_PATH} fill="#20252E" stroke="#E8A33D" strokeWidth="1.4" />
          </g>
        </svg>
      </div>

      <div className="absolute bottom-5 left-1/2 -translate-x-1/2">
        <span className="tick-label text-ink-faint">
          Visual prototype — flow field not yet simulated
        </span>
      </div>
    </div>
  );
}
