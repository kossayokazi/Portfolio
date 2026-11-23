"use client";
import dynamic from "next/dynamic";
import { useEffect, useState, type ReactNode } from "react";
import { canRunWorld, detectCapability } from "@/lib/world/capability";
import { worldEnabled } from "@/lib/world/flag";
import type { WorldStrings } from "./types";

// Loaded only when the 3D mode actually runs, so classic visitors never download three.js.
const Scene = dynamic(() => import("./Scene"), { ssr: false });

type Mode = "pending" | "classic" | "world";

export default function WorldRoot({ fallback, t }: { fallback: ReactNode; t: WorldStrings }) {
  const [mode, setMode] = useState<Mode>("pending");

  useEffect(() => {
    setMode(worldEnabled() && canRunWorld(detectCapability()) ? "world" : "classic");
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (mode === "world") root.dataset.world = "on";
    return () => { delete root.dataset.world; };
  }, [mode]);

  // "pending" renders the same HTML as the server, so there is no hydration mismatch.
  return mode === "world" ? <Scene t={t} /> : <>{fallback}</>;
}