"use client";
import { Html } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import { Quaternion, Vector3, type Group, type Mesh } from "three";
import type { Phase } from "@/lib/world/machine";
import { buildAtmosphereMaterial, buildPlanetGeometry, PLANET_RADIUS } from "@/lib/world/planet";
import { STATIONS, STATION_BY_ID, positionOf, type StationId } from "@/lib/world/stations";
import type { WorldLabels } from "./types";

const Y_AXIS = new Vector3(0, 1, 0);
const X_AXIS = new Vector3(1, 0, 0);
const FACE = new Vector3(0, 0, 1);

type Props = {
  phase: Phase;
  active: StationId | null;
  labels: WorldLabels;
  onSelect: (id: StationId) => void;
  onDrag: () => void;
};

export default function Planet({ phase, active, labels, onSelect, onDrag }: Props) {
  const gl = useThree((s) => s.gl);
  const group = useRef<Group>(null);
  const planet = useRef<Mesh>(null!); // non-null: drei's occlude prop expects a ref that is always set
  const dragging = useRef(false);
  const scratch = useMemo(() => ({ dir: new Vector3(), target: new Quaternion() }), []);
  const geometry = useMemo(() => buildPlanetGeometry(), []);
  const atmosphere = useMemo(() => buildAtmosphereMaterial(), []);

  useEffect(() => () => { geometry.dispose(); atmosphere.dispose(); }, [geometry, atmosphere]);

  // Drag to spin the planet. A tiny movement still counts as a click, not a drag.
  useEffect(() => {
    if (phase !== "explore") return;
    const el = gl.domElement;
    let last: { x: number; y: number } | null = null;
    let travelled = 0;

    const down = (e: PointerEvent) => { last = { x: e.clientX, y: e.clientY }; travelled = 0; };
    const move = (e: PointerEvent) => {
      const g = group.current;
      if (!last || !g) return;
      const dx = e.clientX - last.x;
      const dy = e.clientY - last.y;
      last = { x: e.clientX, y: e.clientY };
      travelled += Math.abs(dx) + Math.abs(dy);
      if (travelled < 4) return;
      if (!dragging.current) { dragging.current = true; onDrag(); }
      g.rotateOnWorldAxis(Y_AXIS, dx * 0.006);
      g.rotateOnWorldAxis(X_AXIS, dy * 0.006);
    };
    const up = () => { last = null; dragging.current = false; };

    el.addEventListener("pointerdown", down);
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    window.addEventListener("pointercancel", up);
    return () => {
      el.removeEventListener("pointerdown", down);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
      window.removeEventListener("pointercancel", up);
    };
  }, [gl, phase, onDrag]);

  useFrame((state, dt) => {
    const g = group.current;
    if (!g) return;
    const k = Math.min(dt * 3, 1);

    if (active && !dragging.current) {
      // Turn the planet so the chosen place faces the camera.
      const s = STATION_BY_ID[active];
      scratch.dir.set(...positionOf(s.lat, s.lon, 1)).normalize();
      scratch.target.setFromUnitVectors(scratch.dir, FACE);
      g.quaternion.slerp(scratch.target, k);
    } else if (!dragging.current) {
      g.rotateOnWorldAxis(Y_AXIS, dt * 0.06); // slow idle spin
    }

    // Slide the planet aside so the info panel never covers the chosen place.
    const wide = state.size.width / state.size.height > 1;
    g.position.x += ((active && wide ? -1.3 : 0) - g.position.x) * k;
    g.position.y += ((active && !wide ? 1 : 0) - g.position.y) * k;
  });

  return (
    <group ref={group}>
      <mesh ref={planet} geometry={geometry}>
        <meshStandardMaterial vertexColors roughness={0.9} flatShading />
      </mesh>
      <mesh material={atmosphere}>
        <sphereGeometry args={[PLANET_RADIUS * 1.18, 48, 48]} />
      </mesh>

      {phase === "explore" &&
        STATIONS.map((s) => (
          <group key={s.id} position={positionOf(s.lat, s.lon, PLANET_RADIUS + 0.03)}>
            <mesh>
              <sphereGeometry args={[0.04, 12, 12]} />
              <meshBasicMaterial color={active === s.id ? "#ffffff" : "#c4b5fd"} />
            </mesh>
            <Html position={[0, 0.12, 0]} center occlude={[planet]} zIndexRange={[10, 0]}>
              {/* Decorative: the bottom navigation is the accessible way to reach each place. */}
              <button
                type="button"
                tabIndex={-1}
                aria-hidden="true"
                onClick={() => onSelect(s.id)}
                className={`whitespace-nowrap rounded-full border px-3 py-1 text-xs backdrop-blur-md transition ${active === s.id ? "border-accent bg-accent/20 text-fg" : "border-line bg-bg/60 text-muted hover:text-fg"}`}
              >
                {labels[s.id]}
              </button>
            </Html>
          </group>
        ))}
    </group>
  );
}