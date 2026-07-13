

import { AnimationLoop } from "./AnimationLoop";

export class AeroLabEngine {
  private readonly loop: AnimationLoop;
  private elapsedTimeSeconds = 0;

  constructor() {
    this.loop = new AnimationLoop(
      this.update.bind(this),
      this.render.bind(this),
    );
  }

  start(): void {
    this.loop.start();
  }

  stop(): void {
    this.loop.stop();
  }

  private update(deltaTimeSeconds: number): void {
    this.elapsedTimeSeconds += deltaTimeSeconds;
  }

  private render(): void {
    // Rendering will be added next.
  }
}