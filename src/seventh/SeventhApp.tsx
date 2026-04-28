import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Lenis from "lenis";
import SeventhCanvas     from "./SeventhCanvas";
import SeventhLounge     from "./SeventhLounge";
import SeventhMembership from "./SeventhMembership";
import SeventhSpaceCard  from "./SeventhSpaceCard";
import SeventhCursor     from "./SeventhCursor";
import SeventhGrain      from "./SeventhGrain";
import SeventhNav        from "./SeventhNav";

// ── Reveal hook — IntersectionObserver ──────────────────────────────────────
function useReveal(threshold = 0.12) {
  const ref     = useRef<HTMLElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVis(true); },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, vis };
}

// ── Design tokens inline ─────────────────────────────────────────────────────
const GOLD       = "rgba(196,168,106,";
const PARCHMENT  = "rgba(240,237,232,";
const DISPLAY    = '"Playfair Display", "Times New Roman", serif';
const UI         = '"Inter", system-ui, sans-serif';

const goldRule: React.CSSProperties = { width: 36, height: 1, background: `${GOLD}0.55)`, margin: "0 auto" };

const SPACES = [
  { tag: "LE BAR",       title: "L'Art du Verre",      desc: "Une carte de cocktails élaborée par notre mixologiste résident. Chaque création est une invitation au voyage.",          note: "1er étage · Dès 19h" },
  { tag: "SALON PRIVÉ",  title: "L'Espace du Silence",  desc: "Salles confidentielles pour vos échanges les plus précieux. Chaque salon est insonorisé et disponible sur réservation.", note: "2e étage · Sur réservation" },
  { tag: "ROOFTOP",      title: "L'Horizon de Paris",   desc: "Une terrasse exclusive avec vue panoramique sur les toits. Cocktails, couchers de soleil, rencontres singulières.",      note: "7e étage · Coucher de soleil" },
];

const STEPS = [
  ["I",   "Candidature", "Complétez le formulaire d'admission en ligne."],
  ["II",  "Sélection",   "Notre comité examine chaque dossier sous 72h."],
  ["III", "Bienvenue",   "Votre première soirée d'introduction au club."],
];

// ── Component ─────────────────────────────────────────────────────────────────
export default function SeventhApp() {
  const [modal, setModal] = useState(false);
  const espaces  = useReveal(0.08);
  const lounge   = useReveal(0.18);
  const adhesion = useReveal(0.12);

  // Parallax refs — hero layers
  const pTag   = useRef<HTMLDivElement>(null);
  const pTitle = useRef<HTMLDivElement>(null);
  const pSub   = useRef<HTMLDivElement>(null);
  const pCta   = useRef<HTMLDivElement>(null);

  // Lenis smooth scroll
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.08, smoothWheel: true, wheelMultiplier: 0.8 });
    let id: number;
    const loop = (t: number) => { lenis.raf(t); id = requestAnimationFrame(loop); };
    id = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(id); lenis.destroy(); };
  }, []);

  // Parallax scroll — vitesses différentes par couche
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      if (pTag.current)   pTag.current.style.transform   = `translateY(${y * 0.08}px)`;
      if (pTitle.current) pTitle.current.style.transform = `translateY(${y * 0.18}px)`;
      if (pSub.current)   pSub.current.style.transform   = `translateY(${y * 0.30}px)`;
      if (pCta.current)   pCta.current.style.transform   = `translateY(${y * 0.42}px)`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div style={{ background: "#070509", minHeight: "100vh", position: "relative" }}>

      <SeventhCursor />
      <SeventhGrain />
      <SeventhNav onMemberClick={() => setModal(true)} />
      <SeventhCanvas />

      {/* ── Contenu scrollable ── */}
      <div style={{ position: "relative", zIndex: 1 }}>

        {/* ═══════════════════════════════ HERO ═══════════════════════════════ */}
        <section style={{
          height:         "100vh",
          display:        "flex",
          flexDirection:  "column",
          alignItems:     "center",
          justifyContent: "center",
          textAlign:      "center",
          padding:        "0 2rem",
          position:       "relative",
        }}>
          <div ref={pTag} style={{ willChange: "transform" }}>
            <p style={{ fontFamily: UI, fontSize: "0.58rem", letterSpacing: "0.55em", color: `${GOLD}0.5)`, marginBottom: "1.5rem", textTransform: "uppercase" }}>
              Club Privé · Sur Invitation
            </p>
          </div>

          <div ref={pTitle} style={{ willChange: "transform" }}>
          <motion.h1
            style={{
              fontFamily:    DISPLAY,
              fontSize:      "clamp(4.5rem, 11vw, 9rem)",
              fontWeight:    500,
              letterSpacing: "0.28em",
              color:         "#f0ede8",
              margin:        "0 0 1.75rem",
              lineHeight:    1,
              display:       "flex",
              overflow:      "hidden",
            }}
            initial="hidden"
            animate="show"
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08, delayChildren: 0.4 } } }}
          >
            {"SEVENTH".split("").map((l, i) => (
              <motion.span
                key={i}
                style={{ display: "inline-block" }}
                variants={{
                  hidden: { y: "110%", opacity: 0 },
                  show:   { y: "0%",   opacity: 1, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } },
                }}
              >{l}</motion.span>
            ))}
          </motion.h1>
          </div>

          <div style={goldRule} />

          <div ref={pSub} style={{ willChange: "transform" }}>
            <p style={{
              fontFamily:    UI,
              fontSize:      "0.8rem",
              letterSpacing: "0.12em",
              color:         `${PARCHMENT}0.4)`,
              margin:        "1.5rem 0 3rem",
              maxWidth:      320,
              lineHeight:    1.85,
            }}>
              Un cercle restreint.<br />Des rencontres singulières.<br />Paris, 7e arrondissement.
            </p>
          </div>

          <div ref={pCta} style={{ willChange: "transform" }}>
          <button
            onClick={() => setModal(true)}
            onMouseEnter={e => {
              (e.currentTarget as HTMLButtonElement).style.background = `${GOLD}0.08)`;
              (e.currentTarget as HTMLButtonElement).style.borderColor = `${GOLD}0.75)`;
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLButtonElement).style.background = "none";
              (e.currentTarget as HTMLButtonElement).style.borderColor = `${GOLD}0.4)`;
            }}
            style={{
              background:    "none",
              border:        `1px solid ${GOLD}0.4)`,
              color:         "#c4a86a",
              fontFamily:    UI,
              fontSize:      "0.62rem",
              letterSpacing: "0.38em",
              textTransform: "uppercase",
              padding:       "1rem 2.8rem",
              cursor:        "pointer",
              transition:    "all 0.4s",
            }}
          >
            Demander l'accès
          </button>
          </div>

          {/* Scroll hint */}
          <div style={{ position: "absolute", bottom: "2.5rem", left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem" }}>
            <p style={{ fontFamily: UI, fontSize: "0.52rem", letterSpacing: "0.4em", color: `${GOLD}0.3)`, margin: 0 }}>DÉCOUVRIR</p>
            <div style={{ width: 1, height: 36, background: `linear-gradient(to bottom, ${GOLD}0.35), transparent)` }} />
          </div>
        </section>

        {/* ══════════════════════════ LES ESPACES ═════════════════════════════ */}
        <section
          id="espaces"
          ref={espaces.ref as React.RefObject<HTMLElement>}
          style={{ padding: "8rem 2rem", minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center" }}
        >
          <p style={{ fontFamily: UI, fontSize: "0.58rem", letterSpacing: "0.5em", color: `${GOLD}0.45)`, marginBottom: "0.8rem" }}>LES ESPACES</p>
          <h2 style={{ fontFamily: DISPLAY, fontSize: "clamp(1.8rem, 4.5vw, 3rem)", fontStyle: "italic", fontWeight: 400, color: "#f0ede8", marginBottom: "5rem", textAlign: "center" }}>
            Trois territoires, une même exigence
          </h2>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1px", maxWidth: 980, width: "100%", perspective: "1200px" }}>
            {SPACES.map((s, i) => (
              <SeventhSpaceCard
                key={i}
                tag={s.tag}
                title={s.title}
                desc={s.desc}
                note={s.note}
                style={{
                  opacity:    espaces.vis ? 1 : 0,
                  transform:  espaces.vis ? "translateY(0) scale(1)" : "translateY(32px) scale(0.95)",
                  transition: `opacity 0.9s ${i * 0.18}s ease, transform 0.9s ${i * 0.18}s ease`,
                }}
              />
            ))}
          </div>
        </section>

        {/* ════════════════════════ L'ATMOSPHÈRE — Lounge 3D ══════════════════ */}
        <section
          id="lounge"
          ref={lounge.ref as React.RefObject<HTMLElement>}
          style={{ height: "100vh", position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}
        >
          {/* Scène bougies R3F inline */}
          <div style={{ position: "absolute", inset: 0 }}>
            <SeventhLounge />
          </div>

          {/* Vignette */}
          <div style={{
            position:      "absolute",
            inset:         0,
            background:    "radial-gradient(ellipse at center, transparent 25%, rgba(7,5,9,0.88) 100%)",
            pointerEvents: "none",
          }} />

          {/* Overlay texte */}
          <div style={{
            position:   "relative",
            textAlign:  "center",
            padding:    "0 2rem",
            opacity:    lounge.vis ? 1 : 0,
            transform:  lounge.vis ? "translateY(0) scale(1)" : "translateY(22px) scale(0.97)",
            transition: "opacity 1.4s 0.4s ease, transform 1.4s 0.4s ease",
          }}>
            <p style={{ fontFamily: UI, fontSize: "0.58rem", letterSpacing: "0.5em", color: `${GOLD}0.45)`, marginBottom: "0.8rem" }}>L'ATMOSPHÈRE</p>
            <h2 style={{ fontFamily: DISPLAY, fontSize: "clamp(2rem, 5vw, 3.2rem)", fontStyle: "italic", fontWeight: 400, color: "#f0ede8", lineHeight: 1.25, marginBottom: "1.5rem" }}>
              L'art du silence<br />au cœur du bruit
            </h2>
            <div style={goldRule} />
            <p style={{ fontFamily: UI, fontSize: "0.75rem", color: `${PARCHMENT}0.35)`, letterSpacing: "0.1em", marginTop: "1.5rem" }}>
              Ouvert du mardi au samedi · 18h — 2h
            </p>
          </div>
        </section>

        {/* ══════════════════════════ L'ADHÉSION ══════════════════════════════ */}
        <section
          id="adhesion"
          ref={adhesion.ref as React.RefObject<HTMLElement>}
          style={{ minHeight: "80vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "8rem 2rem", textAlign: "center" }}
        >
          <p style={{ fontFamily: UI, fontSize: "0.58rem", letterSpacing: "0.5em", color: `${GOLD}0.45)`, marginBottom: "0.8rem" }}>L'ADHÉSION</p>
          <h2 style={{ fontFamily: DISPLAY, fontSize: "clamp(1.8rem, 4.5vw, 3rem)", fontWeight: 500, color: "#f0ede8", marginBottom: "4.5rem" }}>
            Un processus de sélection,<br />non une inscription
          </h2>

          {/* 3 étapes */}
          <div style={{ display: "flex", maxWidth: 760, width: "100%", borderTop: `1px solid ${GOLD}0.1)`, marginBottom: "4.5rem" }}>
            {STEPS.map(([num, title, desc], i) => (
              <div key={i} style={{
                flex:        1,
                padding:     "2.5rem 1.5rem",
                borderRight: i < 2 ? `1px solid ${GOLD}0.08)` : "none",
                opacity:     adhesion.vis ? 1 : 0,
                transform:   adhesion.vis ? "translateY(0) scale(1)" : "translateY(20px) scale(0.96)",
                transition:  `opacity 0.9s ${i * 0.22}s ease, transform 0.9s ${i * 0.22}s ease`,
              }}>
                <p style={{ fontFamily: DISPLAY, fontSize: "1.1rem", fontStyle: "italic", color: `${GOLD}0.4)`, marginBottom: "1rem" }}>{num}</p>
                <h3 style={{ fontFamily: DISPLAY, fontSize: "0.95rem", fontWeight: 500, color: "#f0ede8", marginBottom: "0.75rem" }}>{title}</h3>
                <p style={{ fontFamily: UI, fontSize: "0.76rem", color: `${PARCHMENT}0.4)`, lineHeight: 1.8 }}>{desc}</p>
              </div>
            ))}
          </div>

          <button
            onClick={() => setModal(true)}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = `${GOLD}0.1)`; }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = `${GOLD}0.05)`; }}
            style={{
              background:    `${GOLD}0.05)`,
              border:        `1px solid ${GOLD}0.35)`,
              color:         "#c4a86a",
              fontFamily:    UI,
              fontSize:      "0.62rem",
              letterSpacing: "0.38em",
              textTransform: "uppercase",
              padding:       "1.1rem 3.2rem",
              cursor:        "pointer",
              transition:    "background 0.4s",
            }}
          >
            Déposer ma candidature
          </button>

          {/* Footer */}
          <p style={{ fontFamily: UI, fontSize: "0.55rem", letterSpacing: "0.28em", color: `${GOLD}0.2)`, marginTop: "6rem" }}>
            SEVENTH · PARIS · MMXXVI
          </p>
        </section>
      </div>

      {/* ── Modal adhésion ── */}
      {modal && <SeventhMembership onClose={() => setModal(false)} />}
    </div>
  );
}
