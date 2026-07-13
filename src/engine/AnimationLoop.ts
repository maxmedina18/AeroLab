export type UpdateCallback = (deltaTimeSeconds: number) => void;
export type RenderCallback = () => void;

export class AnimationLoop {
  private animationFrameId: number | null = null;
  private previousTimestamp: number | null = null;
  private running = false;

  constructor(
    private readonly update: UpdateCallback,
    private readonly render: RenderCallback,
  ) {}

  start(): void {
    if (this.running) return;

    this.running = true;
    this.previousTimestamp = null;
    this.animationFrameId = requestAnimationFrame(this.tick);
  }

  stop(): void {
    this.running = false;
    this.previousTimestamp = null;

    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
  }

  private readonly tick = (timestamp: number): void => {
    if (!this.running) return;

    if (this.previousTimestamp === null) {
      this.previousTimestamp = timestamp;
    }

    const rawDeltaTimeSeconds =
      (timestamp - this.previousTimestamp) / 1000;

    this.previousTimestamp = timestamp;

    // Prevent huge simulation jumps after tab switching or debugger pauses.
    const deltaTimeSeconds = Math.min(rawDeltaTimeSeconds, 0.05);

    this.update(deltaTimeSeconds);
    this.render();

    this.animationFrameId = requestAnimationFrame(this.tick);
  };
}