/**
 * NACA 4-digit airfoil geometry.
 * Reference: standard NACA thickness distribution (Abbott & von Doenhoff).
 * Milestone 0 uses this purely for static rendering — no flow coupling yet.
 */

export interface AirfoilPoint {
  x: number;
  y: number;
}

/**
 * Generates upper/lower surface points for a symmetric NACA 00XX airfoil
 * (camber terms omitted for 0012 since m = p = 0).
 *
 * @param thickness  max thickness as fraction of chord (0.12 for "0012")
 * @param chord      chord length in the same units as the returned points
 * @param numPoints  points per surface (cosine-spaced for leading-edge resolution)
 */
export function generateNaca00xx(
  thickness: number,
  chord: number,
  numPoints = 80
): { upper: AirfoilPoint[]; lower: AirfoilPoint[] } {
  const upper: AirfoilPoint[] = [];
  const lower: AirfoilPoint[] = [];

  for (let i = 0; i <= numPoints; i++) {
    // cosine spacing clusters points near leading/trailing edge
    const beta = (i / numPoints) * Math.PI;
    const xFrac = (1 - Math.cos(beta)) / 2; // 0..1

    const yt =
      5 *
      thickness *
      (0.2969 * Math.sqrt(xFrac) -
        0.126 * xFrac -
        0.3516 * xFrac ** 2 +
        0.2843 * xFrac ** 3 -
        0.1015 * xFrac ** 4);

    upper.push({ x: xFrac * chord, y: yt * chord });
    lower.push({ x: xFrac * chord, y: -yt * chord });
  }

  return { upper, lower };
}

/** Builds a closed SVG path string from the airfoil surfaces, in local (chord) space. */
export function naca00xxToSvgPath(thickness: number, chord: number): string {
  const { upper, lower } = generateNaca00xx(thickness, chord);
  const upperPath = upper.map((p) => `${p.x.toFixed(2)},${(-p.y).toFixed(2)}`).join(" L ");
  const lowerPath = [...lower]
    .reverse()
    .map((p) => `${p.x.toFixed(2)},${(-p.y).toFixed(2)}`)
    .join(" L ");
  return `M ${upperPath} L ${lowerPath} Z`;
}
