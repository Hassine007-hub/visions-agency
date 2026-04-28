import { useMemo } from "react";

const KF = "seventh-grain";

export default function SeventhGrain() {
  const backgroundImage = useMemo(() => {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><filter id="g"><feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" seed="9" stitchTiles="stitch"/></filter><rect width="100%" height="100%" filter="url(#g)"/></svg>`;
    return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
  }, []);

  return (
    <>
      <style>{`
        @keyframes ${KF} {
          0%,100% { opacity:1; transform:translate(0,0); }
          33%     { transform:translate(-0.12%,0.09%); }
          66%     { transform:translate(0.09%,-0.08%); }
        }
      `}</style>
      <div
        aria-hidden
        style={{
          position:         "fixed",
          inset:            0,
          zIndex:           50,
          pointerEvents:    "none",
          mixBlendMode:     "soft-light",
          opacity:          0.028,
          backgroundRepeat: "repeat",
          backgroundSize:   "180px 180px",
          backgroundImage,
          animation:        `${KF} 0.7s steps(1) infinite`,
          willChange:       "transform",
        }}
      />
    </>
  );
}
