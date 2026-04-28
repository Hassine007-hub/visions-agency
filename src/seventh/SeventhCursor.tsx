import { useEffect, useRef } from "react";

export default function SeventhCursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let mx = window.innerWidth  / 2;
    let my = window.innerHeight / 2;
    let cx = mx, cy = my;
    let scale = 1;
    let targetScale = 1;
    let rafId: number;

    const onMove = (e: MouseEvent) => { mx = e.clientX; my = e.clientY; };

    const onEnter = () => { targetScale = 2.2; };
    const onLeave = () => { targetScale = 1; };

    // Attache les listeners sur tous les interactifs
    const attachHover = () => {
      document.querySelectorAll("button, a, [data-cursor]").forEach(el => {
        el.addEventListener("mouseenter", onEnter);
        el.addEventListener("mouseleave", onLeave);
      });
    };
    attachHover();

    // Loop lerp
    const loop = () => {
      cx += (mx - cx) * 0.12;
      cy += (my - cy) * 0.12;
      scale += (targetScale - scale) * 0.1;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${cx - 20}px, ${cy - 20}px) scale(${scale})`;
      }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mx - 3}px, ${my - 3}px)`;
      }
      rafId = requestAnimationFrame(loop);
    };
    rafId = requestAnimationFrame(loop);

    window.addEventListener("mousemove", onMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      {/* Anneau avec lag */}
      <div
        ref={ringRef}
        aria-hidden
        style={{
          position:        "fixed",
          top:             0,
          left:            0,
          width:           40,
          height:          40,
          borderRadius:    "50%",
          border:          "1px solid rgba(196,168,106,0.55)",
          pointerEvents:   "none",
          zIndex:          9999,
          willChange:      "transform",
          mixBlendMode:    "difference" as const,
          transition:      "border-color 0.3s",
        }}
      />
      {/* Point précis — suit directement */}
      <div
        ref={dotRef}
        aria-hidden
        style={{
          position:      "fixed",
          top:           0,
          left:          0,
          width:         6,
          height:        6,
          borderRadius:  "50%",
          background:    "rgba(196,168,106,0.9)",
          pointerEvents: "none",
          zIndex:        9999,
          willChange:    "transform",
        }}
      />
      {/* Masque le curseur natif */}
      <style>{`* { cursor: none !important; }`}</style>
    </>
  );
}
