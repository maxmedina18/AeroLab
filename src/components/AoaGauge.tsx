interface AoaGaugeProps {
  value: number; // degrees, range -20..20
  min?: number;
  max?: number;
}

/**
 * Analog-style dial for angle of attack. Reads like an instrument gauge
 * rather than a generic slider — the needle sweeps a 140° arc.
 */
export function AoaGauge({ value, min = -20, max = 20 }: AoaGaugeProps) {
  const clamped = Math.max(min, Math.min(max, value));
  const t = (clamped - min) / (max - min); // 0..1
  const startAngle = -160; // degrees, svg convention (0 = +x axis)
  const sweep = 140;
  const angle = startAngle + t * sweep;
  const rad = (angle * Math.PI) / 180;

  const cx = 60;
  const cy = 58;
  const r = 42;
  const needleX = cx + r * 0.82 * Math.cos(rad);
  const needleY = cy + r * 0.82 * Math.sin(rad);

  const ticks = Array.from({ length: 9 }, (_, i) => {
    const tt = i / 8;
    const a = ((startAngle + tt * sweep) * Math.PI) / 180;
    const inner = r - 6;
    const outer = r;
    return {
      x1: cx + inner * Math.cos(a),
      y1: cy + inner * Math.sin(a),
      x2: cx + outer * Math.cos(a),
      y2: cy + outer * Math.sin(a),
      major: i % 2 === 0,
    };
  });

  const arcStart = {
    x: cx + r * Math.cos((startAngle * Math.PI) / 180),
    y: cy + r * Math.sin((startAngle * Math.PI) / 180),
  };
  const arcEnd = {
    x: cx + r * Math.cos(((startAngle + sweep) * Math.PI) / 180),
    y: cy + r * Math.sin(((startAngle + sweep) * Math.PI) / 180),
  };

  return (
    <svg viewBox="0 0 120 80" className="w-full">
      <path
        d={`M ${arcStart.x} ${arcStart.y} A ${r} ${r} 0 0 1 ${arcEnd.x} ${arcEnd.y}`}
        fill="none"
        stroke="#2A303B"
        strokeWidth="2"
        strokeLinecap="round"
      />
      {ticks.map((t, i) => (
        <line
          key={i}
          x1={t.x1}
          y1={t.y1}
          x2={t.x2}
          y2={t.y2}
          stroke={t.major ? "#8B92A3" : "#4A505C"}
          strokeWidth={t.major ? 1.4 : 1}
        />
      ))}
      {/* zero reference tick, emphasized */}
      <line
        x1={cx + (r - 8) * Math.cos(((startAngle + sweep / 2) * Math.PI) / 180)}
        y1={cy + (r - 8) * Math.sin(((startAngle + sweep / 2) * Math.PI) / 180)}
        x2={cx + r * Math.cos(((startAngle + sweep / 2) * Math.PI) / 180)}
        y2={cy + r * Math.sin(((startAngle + sweep / 2) * Math.PI) / 180)}
        stroke="#E8A33D"
        strokeWidth="1.6"
      />
      <line
        x1={cx}
        y1={cy}
        x2={needleX}
        y2={needleY}
        stroke="#E8A33D"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx={cx} cy={cy} r="3.5" fill="#E8A33D" />
      <circle cx={cx} cy={cy} r="1.4" fill="#12151A" />
    </svg>
  );
}
