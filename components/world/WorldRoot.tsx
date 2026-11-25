"use client";
import dynamic from "next/dynamic";
import { useEffect, useState, useSyncExternalStore, type ReactNode } from "react";
import { canRunWorld, detectCapability } from "@/lib/world/capability";
import { worldEnabled } from "@/lib/world/flag";
import type { WorldStrings } from "./types";
import WorldBoundary from "./WorldBoundary";

// Loaded only when the 3D mode actually runs, so classic visitors never download three.js.
const Scene = dynamic(() => import("./Scene"), {
  ssr: false,
  loading: () => <div className="fixed inset-0 z-[45] bg-[#05060f]" aria-busy="true" />,
});

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
  const [failed, setFailed] = useState(false);
  const active = mode === "world" && !failed;

  useEffect(() => {
    if (!active) return;
    const root = document.documentElement;
    root.dataset.world = "on";
    // The page header and footer sit behind the scene: keep keyboard focus out of them.
    const hidden = Array.from(document.querySelectorAll<HTMLElement>("body > header, body > footer"));
    hidden.forEach((el) => el.setAttribute("inert", ""));
    return () => {
      delete root.dataset.world;
      hidden.forEach((el) => el.removeAttribute("inert"));
    };
  }, [active]);

  // "pending" renders the same HTML as the server, so there is no hydration mismatch.
  if (!active) return <>{fallback}</>;
  return (
    <WorldBoundary fallback={fallback} onError={() => setFailed(true)}>
      <Scene t={t} onFail={() => setFailed(true)} />
    </WorldBoundary>
  );
}