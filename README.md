# AeroLab — Milestone 0: Visual Prototype

Interactive 2D virtual wind tunnel. This milestone is the static interface
foundation: toolbar, control sidebar, simulation viewport, and metrics panel,
with a NACA 0012 airfoil rendered and rotatable by angle of attack.

**No fluid simulation runs yet.** Wind speed and angle-of-attack controls
update the UI state and airfoil orientation only. Reynolds number, lift, and
drag readouts are intentionally shown as `—` until Version 2 (D2Q9 Lattice
Boltzmann solver) and Version 3 (aerodynamic analysis) land — see the project
launch document, Section 5.

## Getting started

```bash
npm install
npm run dev
```

Then open the printed local URL (typically `http://localhost:5173`).

To type-check and produce a production build:

```bash
npm run build
```

## Architecture

```
src/
├── main.tsx              # React root
├── App.tsx                # Shell: toolbar + sidebar + viewport + metrics
├── components/
│   ├── Toolbar.tsx         # Wordmark, status pill, pause/reset/screenshot
│   ├── Sidebar.tsx          # Wind speed, angle-of-attack, viz mode controls
│   ├── AoaGauge.tsx          # Analog angle-of-attack dial (signature element)
│   ├── Viewport.tsx           # Canvas/SVG viewport, corner bezel, FPS loop
│   └── MetricsPanel.tsx        # Bottom instrument-style readout strip
├── features/
│   └── airfoil/naca.ts      # NACA 4-digit geometry generator
├── state/
│   └── store.ts               # Zustand store — UI/control state only
└── styles/globals.css          # Tailwind base + design tokens
```

Simulation state, rendering, and UI are already kept separate at this stage:
`state/store.ts` holds only control values (wind speed, angle of attack, viz
mode, pause, FPS), and `features/` is where the real solver will live once
Version 2 begins, without needing to touch the component layer.

## Design tokens

- **Base** `#12151A` / **Panel** `#1A1E25` / **Border** `#2A303B`
- **Ink** `#E7E9EE` (primary text) / `#8B92A3` (muted) / `#5A6070` (faint)
- **Amber** `#E8A33D` — control accent, gauge needle, active states
- **Flow** `#4FA8D8` — reserved for velocity-field visualization in Version 2
- **Signal** stable `#5FBE8A`, warn `#D9634A` — reserved for stability
  monitoring in the solver
- Type: Space Grotesk (display), IBM Plex Sans (body), IBM Plex Mono (all
  numeric readouts)

## Verification checklist

- [x] `npm run build` completes with no TypeScript errors
- [x] Application renders toolbar, sidebar, viewport, and metrics panel
- [x] NACA 0012 airfoil renders centered in the viewport
- [x] Angle-of-attack slider visibly rotates the airfoil and updates the gauge
- [x] Wind-speed slider updates its readout in the sidebar and viewport corner
- [x] Visualization mode selector switches active state between four modes
- [x] Pause/resume toggles the status pill and freezes the FPS counter
- [x] Reset restores default wind speed, angle of attack, and frame count
- [x] FPS readout reflects real `requestAnimationFrame` timing, not a static number
- [x] Reynolds number, Cl, Cd are shown as `—`, not fabricated values
- [ ] Screenshot export (camera icon) — wired as a placeholder button, not yet implemented
