import { useRef, useState } from "react";

interface Props {
  tag:   string;
  title: string;
  desc:  string;
  note:  string;
  style?: React.CSSProperties;
}

export default function SeventhSpaceCard({ tag, title, desc, note, style }: Props) {
  const ref    = useRef<HTMLDivElement>(null);
  const [pos,  setPos]     = useState({ x: 0, y: 0 });
  const [glow, setGlow]    = useState(0);
  const [rot,  setRot]     = useState({ x: 0, y: 0 });

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect   = ref.current.getBoundingClientRect();
    const x      = e.clientX - rect.left;
    const y      = e.clientY - rect.top;
    const cx     = rect.width  / 2;
    const cy     = rect.height / 2;
    setPos({ x, y });
    setRot({
      x: -((y - cy) / cy) * 6,   // tilt vertical ±6°
      y:  ((x - cx) / cx) * 6,   // tilt horizontal ±6°
    });
  };

  const onEnter = () => setGlow(1);
  const onLeave = () => { setGlow(0); setRot({ x: 0, y: 0 }); };

  return (
    <div
      style={{
        perspective: "800px",
        ...style,
      }}
    >
      <div
        ref={ref}
        onMouseMove={onMove}
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
        style={{
          position:        "relative",
          height:          "100%",
          padding:         "2.8rem 2rem",
          background:      "rgba(7,5,9,0.6)",
          border:          "1px solid rgba(196,168,106,0.14)",
          backdropFilter:  "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          overflow:        "hidden",
          cursor:          "default",
          transform:       `rotateX(${rot.x}deg) rotateY(${rot.y}deg)`,
          transformStyle:  "preserve-3d",
          transition:      glow ? "transform 0.05s linear" : "transform 0.5s ease, border-color 0.4s",
          borderColor:     glow ? "rgba(196,168,106,0.32)" : "rgba(196,168,106,0.14)",
          willChange:      "transform",
        }}
      >
        {/* Spotlight doré — suit le curseur */}
        <div
          aria-hidden
          style={{
            position:        "absolute",
            inset:           "-1px",
            pointerEvents:   "none",
            opacity:         glow,
            transition:      glow ? "opacity 0.15s" : "opacity 0.5s",
            background:      `radial-gradient(520px circle at ${pos.x}px ${pos.y}px, rgba(196,168,106,0.09), transparent 55%)`,
          }}
        />

        {/* Reflet de bord — liseret or en haut */}
        <div
          aria-hidden
          style={{
            position:      "absolute",
            top:           0, left: 0, right: 0,
            height:        "1px",
            pointerEvents: "none",
            opacity:       glow * 0.8,
            transition:    "opacity 0.4s",
            background:    `linear-gradient(to right, transparent, rgba(196,168,106,0.55) ${(pos.x / (ref.current?.offsetWidth || 300)) * 100}%, transparent)`,
          }}
        />

        {/* Contenu */}
        <div style={{ position: "relative", zIndex: 1 }}>
          <p style={{
            fontFamily:    '"Inter", system-ui',
            fontSize:      "0.52rem",
            letterSpacing: "0.45em",
            color:         "rgba(196,168,106,0.45)",
            marginBottom:  "1.5rem",
            textTransform: "uppercase" as const,
          }}>{tag}</p>

          <h3 style={{
            fontFamily: '"Playfair Display", serif',
            fontSize:   "1.4rem",
            fontWeight: 500,
            color:      "#f0ede8",
            margin:     "0 0 1rem",
          }}>{title}</h3>

          <p style={{
            fontFamily:  '"Inter", system-ui',
            fontSize:    "0.8rem",
            color:       "rgba(240,237,232,0.44)",
            lineHeight:  1.85,
            marginBottom: "2.5rem",
          }}>{desc}</p>

          <p style={{
            fontFamily:    '"Inter", system-ui',
            fontSize:      "0.58rem",
            letterSpacing: "0.22em",
            color:         "rgba(196,168,106,0.32)",
          }}>{note}</p>
        </div>
      </div>
    </div>
  );
}
