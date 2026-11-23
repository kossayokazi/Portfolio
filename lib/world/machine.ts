export type Phase = "gate" | "intro" | "reveal" | "explore";
export type WorldEvent = "START" | "SKIP" | "INTRO_DONE" | "REVEAL_DONE";

export function nextPhase(phase: Phase, event: WorldEvent): Phase {
  switch (phase) {
    case "gate":
      return event === "START" ? "intro" : event === "SKIP" ? "explore" : phase;
    case "intro":
      return event === "INTRO_DONE" ? "reveal" : event === "SKIP" ? "explore" : phase;
    case "reveal":
      return event === "REVEAL_DONE" || event === "SKIP" ? "explore" : phase;
    default:
      return phase;
  }
}

// Once per visit: a visitor who already saw the intro goes straight to the world.
export const initialPhase = (seen: boolean): Phase => (seen ? "explore" : "gate");