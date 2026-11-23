const FLAG = "world";
const SEEN = "introSeen";

// Phase A: opt-in with ?world=1 (and ?world=0 to turn it off). Phase G flips the default.
export function worldEnabled(): boolean {
  try {
    const q = new URLSearchParams(location.search).get("world");
    if (q === "1") sessionStorage.setItem(FLAG, "1");
    if (q === "0") sessionStorage.removeItem(FLAG);
    return sessionStorage.getItem(FLAG) === "1";
  } catch {
    return false;
  }
}

export function introSeen(): boolean {
  try { return sessionStorage.getItem(SEEN) === "1"; } catch { return false; }
}

export function markIntroSeen(): void {
  try { sessionStorage.setItem(SEEN, "1"); } catch { /* private mode: the intro just plays again */ }
}