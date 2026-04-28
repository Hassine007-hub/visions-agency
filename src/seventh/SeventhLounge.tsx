import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { EffectComposer, Bloom, DepthOfField } from "@react-three/postprocessing";
import * as THREE from "three";

// ── RNG seedé — positions stables au hot-reload ────────────────────────────
function rng(seed: number) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) & 0xffffffff;
    return (s >>> 0) / 0xffffffff;
  };
}

const COLORS = [
  "#ffb347", // amber chaud
  "#c4a86a", // or SEVENTH
  "#ff9940", // orange flamme
  "#fff3d4", // blanc crème
  "#e8c87a", // or pâle
  "#ffd090", // or chaud
];

interface OrbDef {
  pos:   [number, number, number];
  size:  number;
  color: THREE.Color;
  speed: number;
  phase: number;
  ampY:  number;
  ampX:  number;
}

function buildOrbs(count: number): OrbDef[] {
  const r = rng(7);
  return Array.from({ length: count }, () => ({
    pos:   [(r() - 0.5) * 7, (r() - 0.5) * 3.5, -(r() * 5.5)] as [number, number, number],
    size:  0.035 + r() * 0.32,
    color: new THREE.Color(COLORS[Math.floor(r() * COLORS.length)]),
    speed: 0.10 + r() * 0.22,
    phase: r() * Math.PI * 2,
    ampY:  0.08 + r() * 0.22,
    ampX:  0.04 + r() * 0.12,
  }));
}

// Pré-calculé une seule fois — stable entre renders
const ORBS = buildOrbs(16);

// ── Orbe individuel ────────────────────────────────────────────────────────
function Orb({ o }: { o: OrbDef }) {
  const ref  = useRef<THREE.Mesh>(null);
  const by   = o.pos[1];
  const bx   = o.pos[0];

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.elapsedTime;
    ref.current.position.y = by + Math.sin(t * o.speed       + o.phase)       * o.ampY;
    ref.current.position.x = bx + Math.sin(t * o.speed * 0.6 + o.phase + 1.3) * o.ampX;
  });

  return (
    <mesh ref={ref} position={o.pos}>
      <sphereGeometry args={[o.size, 14, 14]} />
      <meshStandardMaterial
        color={o.color}
        emissive={o.color}
        emissiveIntensity={1.6}
        roughness={1}
        metalness={0}
        toneMapped={false}
      />
    </mesh>
  );
}

// ── Scène ──────────────────────────────────────────────────────────────────
function BokehScene() {
  return (
    <>
      {ORBS.map((o, i) => <Orb key={i} o={o} />)}

      <EffectComposer>
        {/* DOF : focus sur les orbes à z≈0, flou bokeh sur les orbes profonds */}
        <DepthOfField
          focusDistance={0.018}
          focalLength={0.028}
          bokehScale={7}
        />
        <Bloom
          luminanceThreshold={0.08}
          luminanceSmoothing={0.85}
          intensity={1.6}
        />
      </EffectComposer>
    </>
  );
}

// ── Export ─────────────────────────────────────────────────────────────────
export default function SeventhLounge() {
  return (
    <Canvas
      camera={{ position: [0, 0, 3.5], fov: 58, near: 0.1, far: 60 }}
      gl={{
        antialias:           true,
        alpha:               true,
        toneMapping:         THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.1,
      }}
      style={{ width: "100%", height: "100%" }}
    >
      <BokehScene />
    </Canvas>
  );
}
