/**
 * SeventhFlame — CandleFlame adapté pour Vite/R3F standalone.
 * Différence vs Remotion : clock.elapsedTime au lieu de frame/fps.
 */
import { useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const VERT = /* glsl */`
  varying vec2  vUv;
  uniform float uTime;
  uniform float uSway;

  void main() {
    vUv = uv;
    float swayX = sin(uTime * 3.2 + uv.y * 4.0) * uSway * uv.y * uv.y;
    vec3  pos   = position;
    pos.x += swayX;
    float taper = 1.0 - smoothstep(0.3, 1.0, uv.y) * 0.7;
    pos.x *= taper;
    pos.z *= taper;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const FRAG = /* glsl */`
  varying vec2 vUv;
  uniform float uTime;
  uniform vec3  uColorBase;
  uniform vec3  uColorTip;

  float hash(vec2 p) {
    p = fract(p * vec2(234.34, 435.345));
    p += dot(p, p + 34.23);
    return fract(p.x * p.y);
  }
  float noise(vec2 p) {
    vec2 i = floor(p); vec2 f = fract(p);
    f = f*f*(3.0 - 2.0*f);
    return mix(
      mix(hash(i), hash(i+vec2(1,0)), f.x),
      mix(hash(i+vec2(0,1)), hash(i+vec2(1,1)), f.x), f.y);
  }

  void main() {
    float n1  = noise(vUv * vec2(2.0,3.0) + vec2(0.0, -uTime*1.8));
    float n2  = noise(vUv * vec2(4.0,5.0) + vec2(0.5, -uTime*2.4));
    float turb = n1*0.6 + n2*0.4;
    float cx   = abs(vUv.x - 0.5) * 2.0;
    float flame = 1.0 - smoothstep(0.0, 1.0, cx / (1.0 - vUv.y*0.6 + 0.01));
    flame *= 1.0 - smoothstep(0.6, 1.0, vUv.y);
    float t    = clamp(vUv.y*0.7 + turb*0.3, 0.0, 1.0);
    vec3  col  = mix(uColorBase, uColorTip, t);
    float core = clamp((1.0 - cx*2.0) * (1.0 - vUv.y*1.5), 0.0, 1.0);
    col = mix(col, vec3(1.0, 0.98, 0.9), core*0.6);
    gl_FragColor = vec4(col, flame * (0.75 + turb*0.25));
  }
`;

interface Props {
  position?:  [number, number, number];
  scale?:     number;
  colorBase?: string;
  colorTip?:  string;
  swayAmp?:   number;
}

export default function SeventhFlame({
  position  = [0, 0, 0],
  scale     = 1,
  colorBase = "#ff7a00",
  colorTip  = "#ffee80",
  swayAmp   = 0.04,
}: Props) {
  const uniforms = useMemo(() => ({
    uTime:      { value: 0 },
    uSway:      { value: swayAmp },
    uColorBase: { value: new THREE.Color(colorBase) },
    uColorTip:  { value: new THREE.Color(colorTip) },
  }), [swayAmp, colorBase, colorTip]);

  useFrame(({ clock }) => { uniforms.uTime.value = clock.elapsedTime; });

  const geo = useMemo(() => new THREE.PlaneGeometry(1, 1.6, 8, 24), []);

  return (
    <mesh position={position} scale={scale} geometry={geo}>
      <shaderMaterial
        vertexShader={VERT}
        fragmentShader={FRAG}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        side={THREE.DoubleSide}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}
