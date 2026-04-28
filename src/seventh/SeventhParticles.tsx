import { useEffect, useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const PARTICLE_COUNT    = 700;
const FIELD_RADIUS      = 9;
const REPULSION_RADIUS  = 2.0;
const REPULSION_STRENGTH = 1.4;
const RETURN_LERP       = 0.028;
const DISPLACE_LERP     = 0.16;

const VERT = /* glsl */`
  attribute float aSize;
  attribute float aSeed;
  uniform   float uTime;
  varying   float vSeed;
  varying   float vAlpha;

  void main() {
    vSeed = aSeed;
    float twinkle = 0.65 + 0.35 * sin(uTime * 1.2 + aSeed * 12.566);
    vAlpha = twinkle;
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = aSize * (300.0 / -mv.z);
    gl_Position  = projectionMatrix * mv;
  }
`;

const FRAG = /* glsl */`
  uniform vec3  uColorGold;
  uniform vec3  uColorWhite;
  varying float vSeed;
  varying float vAlpha;

  void main() {
    float d     = length(gl_PointCoord - 0.5);
    float alpha = smoothstep(0.5, 0.0, d) * vAlpha;
    vec3  color = mix(uColorGold, uColorWhite, step(0.75, vSeed));
    gl_FragColor = vec4(color, alpha);
  }
`;

export default function SeventhParticles() {
  const { camera } = useThree();
  const pointsRef  = useRef<THREE.Points>(null);

  // Mouse tracked globally — fonctionne même si le canvas est derrière le HTML
  const mouse = useRef({ x: 0, y: 0 });
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      mouse.current.x =  (e.clientX / window.innerWidth)  * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handler, { passive: true });
    return () => window.removeEventListener("mousemove", handler);
  }, []);

  const { positions, anchors, sizes, seeds } = useMemo(() => {
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const anchors   = new Float32Array(PARTICLE_COUNT * 3);
    const sizes     = new Float32Array(PARTICLE_COUNT);
    const seeds     = new Float32Array(PARTICLE_COUNT);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const t      = i / PARTICLE_COUNT;
      const angle  = i * 2.399963229728653; // golden angle
      const radius = Math.sqrt(t) * FIELD_RADIUS;
      const x = Math.cos(angle) * radius;
      const y = (Math.random() - 0.5) * 5;
      const z = Math.sin(angle) * radius * 0.35;

      positions[i*3]   = anchors[i*3]   = x;
      positions[i*3+1] = anchors[i*3+1] = y;
      positions[i*3+2] = anchors[i*3+2] = z;

      const rng  = Math.random();
      sizes[i]   = 0.10 + Math.pow(rng, 7) * 2.2;
      seeds[i]   = Math.random();
    }
    return { positions, anchors, sizes, seeds };
  }, []);

  const uniforms = useMemo(() => ({
    uTime:       { value: 0 },
    uColorGold:  { value: new THREE.Color("#c4a86a") },
    uColorWhite: { value: new THREE.Color("#fff8e8") },
  }), []);

  const mWorld  = useRef(new THREE.Vector3());
  const projM   = useRef(new THREE.Vector3());
  const camDir  = useRef(new THREE.Vector3());

  useFrame(({ clock }, delta) => {
    uniforms.uTime.value = clock.elapsedTime;

    // Project NDC mouse → world z=0
    projM.current.set(mouse.current.x, mouse.current.y, 0.5).unproject(camera);
    camDir.current.copy(projM.current).sub(camera.position).normalize();
    const dist = -camera.position.z / camDir.current.z;
    mWorld.current.copy(camera.position).add(camDir.current.multiplyScalar(dist));

    const k  = 1 - Math.pow(1 - RETURN_LERP,   delta * 60);
    const kd = 1 - Math.pow(1 - DISPLACE_LERP,  delta * 60);
    const mx = mWorld.current.x;
    const my = mWorld.current.y;
    const rr = REPULSION_RADIUS * REPULSION_RADIUS;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3  = i * 3;
      const ax  = anchors[i3], ay = anchors[i3+1], az = anchors[i3+2];
      const dx  = positions[i3]   - mx;
      const dy  = positions[i3+1] - my;
      const d2  = dx*dx + dy*dy;
      let tx = ax, ty = ay;

      if (d2 < rr) {
        const d     = Math.sqrt(d2) + 0.001;
        const force = (REPULSION_RADIUS - d) / REPULSION_RADIUS * REPULSION_STRENGTH;
        tx = ax + (dx/d) * force;
        ty = ay + (dy/d) * force;
      }

      const lk = d2 < rr ? kd : k;
      positions[i3]   += (tx - positions[i3])   * lk;
      positions[i3+1] += (ty - positions[i3+1]) * lk;
      positions[i3+2] += (az - positions[i3+2]) * k;
    }

    const pts = pointsRef.current;
    if (pts) {
      (pts.geometry.attributes["position"] as THREE.BufferAttribute).needsUpdate = true;
    }
  });

  return (
    <points ref={pointsRef} frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-aSize" args={[sizes, 1]} />
        <bufferAttribute attach="attributes-aSeed" args={[seeds, 1]} />
      </bufferGeometry>
      <shaderMaterial
        vertexShader={VERT}
        fragmentShader={FRAG}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
