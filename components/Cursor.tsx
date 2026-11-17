"use client";
import { useEffect, useRef } from "react";

export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (matchMedia("(pointer: coarse)").matches) return;
    const root = document.documentElement;
    root.classList.add("has-cursor");
    const still = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let x = -100, y = -100, rx = -100, ry = -100, raf = 0;
    const card = (t: EventTarget | null) => (t as HTMLElement | null)?.closest?.(".card-hover") as HTMLElement | null;
    const move = (e: PointerEvent) => {
      x = e.clientX; y = e.clientY;
      dot.current!.style.transform = `translate(${x}px,${y}px)`;
      ring.current!.dataset.hot = (e.target as HTMLElement).closest?.("a,button,input,textarea,.card-hover") ? "1" : "0";
      const c = card(e.target);
      if (c && !still) {
        const r = c.getBoundingClientRect(), px = (x - r.left) / r.width, py = (y - r.top) / r.height;
        c.style.setProperty("--rx", `${(0.5 - py) * 8}deg`);
        c.style.setProperty("--ry", `${(px - 0.5) * 8}deg`);
        c.style.setProperty("--mx", `${px * 100}%`);
        c.style.setProperty("--my", `${py * 100}%`);
      }
    };
    const out = (e: PointerEvent) => { const c = card(e.target); if (c) { c.style.setProperty("--rx", "0deg"); c.style.setProperty("--ry", "0deg"); } };
    const loop = () => { rx += (x - rx) * 0.15; ry += (y - ry) * 0.15; ring.current!.style.transform = `translate(${rx}px,${ry}px)`; raf = requestAnimationFrame(loop); };
    addEventListener("pointermove", move); addEventListener("pointerout", out); loop();
    return () => { cancelAnimationFrame(raf); removeEventListener("pointermove", move); removeEventListener("pointerout", out); root.classList.remove("has-cursor"); };
  }, []);
  return (<><div ref={ring} className="cur-ring" data-hot="0" aria-hidden /><div ref={dot} className="cur-dot" aria-hidden /></>);
}