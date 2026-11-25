"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import { useEffect, useReducer, useRef, useState } from "react";
import type { Mesh } from "three";
import { initialPhase, nextPhase, type Phase } from "@/lib/world/machine";
import { introSeen, markIntroSeen } from "@/lib/world/flag";
import Hud from "./Hud";
import type { WorldStrings } from "./types";

const NEAR = 3.2; // placeholder for the avatar shot (Phase C)
const FAR = 7;    // the world reveal

function Planet() {
  const ref = useRef<Mesh>(null);
  useFrame((_, dt) => { if (ref.current) ref.current.rotation.y += dt * 0.08; });
  return (
    <mesh ref={ref}>
      <icosahedronGeometry args={[1.6, 4]} />
      <meshStandardMaterial color="#4f46e5" roughness={0.9} flatShading />
    </mesh>
  );
}

function CameraRig({ phase, onRevealDone }: { phase: Phase; onRevealDone: () => void }) {
  const done = useRef(false);
  useFrame(({ camera }, dt) => {
    const target = phase === "gate" || phase === "intro" ? NEAR : FAR;
    camera.position.z += (target - camera.position.z) * Math.min(dt * 1.5, 1);
    camera.lookAt(0, 0, 0);
    if (phase === "reveal" && !done.current && Math.abs(FAR - camera.position.z) < 0.05) {
      done.current = true;
      onRevealDone();
    }
  });
  return null;
}

export default function Scene({ t, onFail }: { t: WorldStrings; onFail: () => void }) {
  const [initial] = useState<Phase>(() => initialPhase(introSeen()));
  const [phase, send] = useReducer(nextPhase, initial);

  // Placeholder: in Phase C the intro ends when the audio ends.
  useEffect(() => {
    if (phase !== "intro") return;
    const id = setTimeout(() => send("INTRO_DONE"), 3000);
    return () => clearTimeout(id);
  }, [phase]);

  useEffect(() => { if (phase === "explore") markIntroSeen(); }, [phase]);

  return (
    <div className="fixed inset-0 z-[45] bg-[#05060f]">
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
        <Planet />
        <CameraRig phase={phase} onRevealDone={() => send("REVEAL_DONE")} />
      </Canvas>
      <Hud phase={phase} send={send} t={t} />
    </div>
  );
}