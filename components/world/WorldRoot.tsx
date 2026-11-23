"use client";
import dynamic from "next/dynamic";
import { useEffect, useSyncExternalStore, type ReactNode } from "react";
import { canRunWorld, detectCapability } from "@/lib/world/capability";
import { worldEnabled } from "@/lib/world/flag";
import type { WorldStrings } from "./types";

// Loaded only when the 3D mode actually runs, so classic visitors never download three.js.
const Scene = dynamic(() => import("./Scene"), { ssr: false });

type Mode = "pending" | "classic" | "world";

let cached: Mode | undefined;
function getClientMode(): Mode {
  // Computed once: the WebGL probe and the flag read must not repeat on every render.
  cached ??= worldEnabled() && canRunWorld(detectCapability()) ? "world" : "classic";
  return cached;
}
const subscribe = () => () => {};
const getServerMode = (): Mode => "pending";

export default function WorldRoot({ fallback, t }: { fallback: ReactNode; t: WorldStrings }) {
  const mode = useSyncExternalStore(subscribe, getClientMode, getServerMode);

  useEffect(() => {
    if (mode !== "world") return;
    const root = document.documentElement;
    root.dataset.world = "on";
    return () => { delete root.dataset.world; };
  }, [mode]);

  // "pending" renders the same HTML as the server, so there is no hydration mismatch.
  return mode === "world" ? <Scene t={t} /> : <>{fallback}</>;
}