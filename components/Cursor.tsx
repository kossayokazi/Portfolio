"use client";
import { useEffect, useRef } from "react";

export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (matchMedia("(pointer: coarse)").matches) return;
    const d = dot.current, r = ring.current;
    if (!d || !r) return;
    const root = document.documentElement;
    root.classList.add("has-cursor");
    const still = matchMedia("(prefers-reduced-motion: reduce)").matches;

    let x = -100, y = -100, rx = -100, ry = -100, scale = 1, target = 1;
    let last = performance.now(), raf = 0, seen = false;
    let card: HTMLElement | null = null;
    const reset = (c: HTMLElement | null) => { c?.style.setProperty("--rx", "0deg"); c?.style.setProperty("--ry", "0deg"); };

    const onMove = (e: PointerEvent) => {
      x = e.clientX; y = e.clientY;
      if (!seen) { seen = true; rx = x; ry = y; }
      const c = (e.target as Element | null)?.closest?.(".card-hover") as HTMLElement | null;
      if (c !== card) { reset(card); card = c; }
    };
    const onOver = (e: PointerEvent) => {
      const el = e.target as Element | null;
      target = el?.closest?.("a,button,[role=button],.card-hover") ? 1.8 : 1;
      const field = !!el?.closest?.("input,textarea");
      d.style.opacity = r.style.opacity = field ? "0" : "1";
    };
    const onLeave = () => { d.style.opacity = r.style.opacity = "0"; };

    const loop = (now: number) => {
      const dt = Math.min(now - last, 64); last = now;
      const k = 1 - Math.exp(-dt / 45); // same feel at any frame rate
      rx += (x - rx) * k; ry += (y - ry) * k; scale += (target - scale) * Math.min(k * 1.5, 1);
      d.style.transform = `translate3d(${x}px,${y}px,0)`;
      r.style.transform = `translate3d(${rx}px,${ry}px,0) scale(${scale})`;
      if (card && !still) {
        const b = card.getBoundingClientRect();
        const px = (x - b.left) / b.width, py = (y - b.top) / b.height;
        card.style.setProperty("--rx", `${(0.5 - py) * 8}deg`);
        card.style.setProperty("--ry", `${(px - 0.5) * 8}deg`);
        card.style.setProperty("--mx", `${px * 100}%`);
        card.style.setProperty("--my", `${py * 100}%`);
      }
      raf = requestAnimationFrame(loop);
    };

    addEventListener("pointermove", onMove);
    addEventListener("pointerover", onOver);
    root.addEventListener("mouseleave", onLeave);
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf); reset(card);
      removeEventListener("pointermove", onMove);
      removeEventListener("pointerover", onOver);
      root.removeEventListener("mouseleave", onLeave);
      root.classList.remove("has-cursor");
    };
  }, []);

  return (<><div ref={ring} className="cur-ring" aria-hidden /><div ref={dot} className="cur-dot" aria-hidden /></>);
}