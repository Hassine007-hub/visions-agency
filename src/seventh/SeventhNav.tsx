import { useEffect, useRef, useState } from "react";

interface Props {
  onMemberClick: () => void;
}

const LINKS = [
  { label: "Les Espaces",  href: "#espaces"  },
  { label: "L'Atmosphère", href: "#lounge"   },
  { label: "L'Adhésion",   href: "#adhesion" },
];

export default function SeventhNav({ onMemberClick }: Props) {
  const [scrolled, setScrolled]  = useState(false);
  const [visible,  setVisible]   = useState(true);
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 60);
      setVisible(y < 60 || y < lastY.current);
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav style={{
      position:           "fixed",
      top:                0,
      left:               0,
      right:              0,
      zIndex:             100,
      display:            "flex",
      alignItems:         "center",
      justifyContent:     "space-between",
      padding:            "1.4rem 3rem",
      background:         scrolled ? "rgba(7,5,9,0.82)" : "transparent",
      backdropFilter:     scrolled ? "blur(18px)" : "none",
      WebkitBackdropFilter: scrolled ? "blur(18px)" : "none",
      borderBottom:       scrolled ? "1px solid rgba(196,168,106,0.08)" : "1px solid transparent",
      transform:          visible ? "translateY(0)" : "translateY(-100%)",
      transition:         "transform 0.45s ease, background 0.4s, border-color 0.4s, backdrop-filter 0.4s",
    }}>
      {/* Logo */}
      <span style={{
        fontFamily:    '"Playfair Display", serif',
        fontSize:      "1.15rem",
        fontStyle:     "italic",
        letterSpacing: "0.18em",
        color:         "rgba(196,168,106,0.85)",
        userSelect:    "none",
      }}>VII</span>

      {/* Liens */}
      <div style={{ display: "flex", gap: "2.5rem", alignItems: "center" }}>
        {LINKS.map(l => (
          <a
            key={l.href}
            href={l.href}
            onClick={e => {
              e.preventDefault();
              document.querySelector(l.href)?.scrollIntoView({ behavior: "smooth" });
            }}
            style={{
              fontFamily:    '"Inter", system-ui',
              fontSize:      "0.62rem",
              letterSpacing: "0.25em",
              textTransform: "uppercase" as const,
              color:         "rgba(240,237,232,0.45)",
              textDecoration: "none",
              transition:    "color 0.3s",
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = "rgba(196,168,106,0.85)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = "rgba(240,237,232,0.45)"; }}
          >{l.label}</a>
        ))}

        {/* CTA */}
        <button
          onClick={onMemberClick}
          style={{
            background:    "none",
            border:        "1px solid rgba(196,168,106,0.35)",
            color:         "rgba(196,168,106,0.8)",
            fontFamily:    '"Inter", system-ui',
            fontSize:      "0.58rem",
            letterSpacing: "0.32em",
            textTransform: "uppercase" as const,
            padding:       "0.6rem 1.4rem",
            cursor:        "pointer",
            transition:    "all 0.35s",
          }}
          onMouseEnter={e => {
            const b = e.currentTarget as HTMLButtonElement;
            b.style.background    = "rgba(196,168,106,0.08)";
            b.style.borderColor   = "rgba(196,168,106,0.7)";
            b.style.color         = "#c4a86a";
          }}
          onMouseLeave={e => {
            const b = e.currentTarget as HTMLButtonElement;
            b.style.background    = "none";
            b.style.borderColor   = "rgba(196,168,106,0.35)";
            b.style.color         = "rgba(196,168,106,0.8)";
          }}
        >Accès Membres</button>
      </div>
    </nav>
  );
}
