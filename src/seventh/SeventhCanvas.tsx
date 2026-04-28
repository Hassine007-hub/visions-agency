import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";
import SeventhParticles from "./SeventhParticles";

// ── Sphères de premier plan — bloom fort = halos sans artefacts carré ──────
function rng(seed: number) {
  let s = seed;
  return () => { s = (s * 1664525 + 1013904223) & 0xffffffff; return (s >>> 0) / 0xffffffff; };
}

const FG_COLORS = ["#ffb347", "#c4a86a", "#fff3d4", "#e8c87a", "#ffd090"];

interface SphereData {
  pos:   [number, number, number];
  size:  number;
  color: THREE.Color;
  speed: number;
  phase: number;
}

function buildSpheres(): SphereData[] {
  const r = rng(23);
  return Array.from({ length: 6 }, () => ({
    pos:   [(r() - 0.5) * 8, (r() - 0.5) * 4.5, 2.5 + r() * 2] as [number, number, number],
    size:  0.06 + r() * 0.12,
    color: new THREE.Color(FG_COLORS[Math.floor(r() * FG_COLORS.length)]),
    speed: 0.07 + r() * 0.12,
    phase: r() * Math.PI * 2,
  }));
}

const SPHERES = buildSpheres();

function ForegroundSphere({ d }: { d: SphereData }) {
  const ref = useRef<THREE.Mesh>(null);
  const by  = d.pos[1];
  const bx  = d.pos[0];

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.elapsedTime;
    ref.current.position.y = by + Math.sin(t * d.speed       + d.phase)       * 0.2;
    ref.current.position.x = bx + Math.sin(t * d.speed * 0.6 + d.phase + 1.1) * 0.12;
  });

  return (
    <mesh ref={ref} position={d.pos}>
      <sphereGeometry args={[d.size, 12, 12]} />
      <meshBasicMaterial
        color={d.color}
        toneMapped={false}
      />
    </mesh>
  );
}

export default function SeventhCanvas() {
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }}>
      <Canvas
        camera={{ position: [0, 0, 7], fov: 52 }}
        gl={{
          antialias:           true,
          alpha:               false,
          toneMapping:         THREE.ACESFilmicToneMapping,
          toneMappingExposure: 0.85,
        }}
        style={{ background: "#070509", width: "100%", height: "100%", pointerEvents: "auto" }}
      >
        <fog attach="fog" args={["#070509", 10, 22]} />
        <SeventhParticles />
        {SPHERES.map((d, i) => <ForegroundSphere key={i} d={d} />)}
        <EffectComposer>
          <Bloom luminanceThreshold={0.08} luminanceSmoothing={0.85} intensity={1.8} />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
