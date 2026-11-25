"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import { useCallback, useEffect, useReducer, useRef, useState } from "react";
import { initialPhase, nextPhase, type Phase } from "@/lib/world/machine";
import { introSeen, markIntroSeen } from "@/lib/world/flag";
import { stationFromHash, type StationId } from "@/lib/world/stations";
import Hud from "./Hud";
import Planet from "./Planet";
import type { WorldContent } from "./types";

const NEAR = 3.2;  // placeholder for the avatar shot (Phase C)
const FAR = 7;     // the whole planet
const FOCUS = 4.8; // close enough to read a place

function CameraRig({ phase, active, onRevealDone }: { phase: Phase; active: StationId | null; onRevealDone: () => void }) {
  const done = useRef(false);
  useFrame(({ camera }, dt) => {
    const target = phase === "gate" || phase === "intro" ? NEAR : phase === "explore" && active ? FOCUS : FAR;
    camera.position.z += (target - camera.position.z) * Math.min(dt * 1.5, 1);
    camera.lookAt(0, 0, 0);
    if (phase === "reveal" && !done.current && Math.abs(FAR - camera.position.z) < 0.05) {
      done.current = true;
      onRevealDone();
    }
  });
  return null;
}

export default function Scene({ onFail, ...content }: WorldContent & { onFail: () => void }) {
  const [initial] = useState<Phase>(() => initialPhase(introSeen()));
  const [phase, send] = useReducer(nextPhase, initial);
  const [active, setActive] = useState<StationId | null>(() => stationFromHash(location.hash));

  const select = useCallback((id: StationId | null) => {
    setActive(id);
    history.replaceState(null, "", id ? `#${id}` : `${location.pathname}${location.search}`);
  }, []);
  const clear = useCallback(() => select(null), [select]);

  useEffect(() => {
    const onHash = () => setActive(stationFromHash(location.hash));
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  // Placeholder: in Phase C the intro ends when the audio ends.
  useEffect(() => {
    if (phase !== "intro") return;
    const id = setTimeout(() => send("INTRO_DONE"), 3000);
    return () => clearTimeout(id);
  }, [phase]);

  useEffect(() => { if (phase === "explore") markIntroSeen(); }, [phase]);

  // A place is only "open" once the intro is over, so a #hash link can't move the planet early.
  const focus = phase === "explore" ? active : null;

  return (
    <div className="fixed inset-0 z-[45] touch-none bg-[#05060f]">
      <Canvas
        dpr={[1, 1.5]}
        gl={{ powerPreference: "high-performance" }}
        camera={{ position: [0, 0, initial === "explore" ? FAR : NEAR], fov: 50 }}
        onCreated={({ gl }) => {
          // Phones can drop the GPU context under memory pressure: fall back instead of freezing.
          gl.domElement.addEventListener("webglcontextlost", (e) => { e.preventDefault(); onFail(); }, { once: true });
        }}
      >
        <color attach="background" args={["#05060f"]} />
        <ambientLight intensity={0.4} color="#7c3aed" />
        <directionalLight position={[5, 3, 5]} intensity={2} color="#a5b4fc" />
        <Stars radius={60} depth={40} count={1500} factor={3} fade speed={0.4} />
        <Planet phase={phase} active={focus} labels={content.labels} onSelect={select} onDrag={clear} />
        <CameraRig phase={phase} active={focus} onRevealDone={() => send("REVEAL_DONE")} />
      </Canvas>
      <Hud {...content} phase={phase} send={send} active={active} select={select} />
    </div>
  );
}