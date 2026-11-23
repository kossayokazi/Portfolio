export type Capability = { webgl: boolean; reducedMotion: boolean; saveData: boolean };

export function canRunWorld(c: Capability): boolean {
  return c.webgl && !c.reducedMotion && !c.saveData;
}

function hasWebGL(): boolean {
  try {
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl2") ?? canvas.getContext("webgl");
    gl?.getExtension("WEBGL_lose_context")?.loseContext(); // free the probe context
    return Boolean(gl);
  } catch {
    return false;
  }
}

export function detectCapability(): Capability {
  const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
  return {
    webgl: hasWebGL(),
    reducedMotion: matchMedia("(prefers-reduced-motion: reduce)").matches,
    saveData: Boolean(conn?.saveData), // visitors who asked their browser to save data get the light page
  };
}