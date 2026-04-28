import { useState } from "react";

interface Props { onClose: () => void; }

const inputStyle: React.CSSProperties = {
  width:         "100%",
  background:    "rgba(196,168,106,0.05)",
  border:        "1px solid rgba(196,168,106,0.18)",
  color:         "#f0ede8",
  fontFamily:    "Inter, system-ui",
  fontSize:      "0.85rem",
  letterSpacing: "0.03em",
  padding:       "0.8rem 1rem",
  outline:       "none",
  borderRadius:  0,
  transition:    "border-color 0.3s",
  boxSizing:     "border-box" as const,
};

const btnPrimary: React.CSSProperties = {
  flex:          2,
  padding:       "0.9rem",
  background:    "none",
  border:        "1px solid rgba(196,168,106,0.45)",
  color:         "#c4a86a",
  fontFamily:    "Inter, system-ui",
  fontSize:      "0.65rem",
  letterSpacing: "0.35em",
  textTransform: "uppercase" as const,
  cursor:        "pointer",
  transition:    "all 0.3s",
};

const btnSecondary: React.CSSProperties = {
  ...btnPrimary,
  flex:        1,
  borderColor: "rgba(196,168,106,0.18)",
  color:       "rgba(196,168,106,0.4)",
};

type FormData = {
  name: string; email: string; phone: string;
  interest: string; message: string;
};

export default function SeventhMembership({ onClose }: Props) {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormData>({ name: "", email: "", phone: "", interest: "", message: "" });
  const set = (k: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }));

  return (
    <div
      onClick={(e) => e.target === e.currentTarget && onClose()}
      style={{
        position:           "fixed",
        inset:              0,
        zIndex:             200,
        display:            "flex",
        alignItems:         "center",
        justifyContent:     "center",
        background:         "rgba(7,5,9,0.92)",
        backdropFilter:     "blur(18px)",
        WebkitBackdropFilter: "blur(18px)",
      }}
    >
      <div style={{
        width:              "min(520px, 90vw)",
        background:         "rgba(12,8,20,0.76)",
        border:             "1px solid rgba(196,168,106,0.18)",
        backdropFilter:     "blur(28px)",
        WebkitBackdropFilter: "blur(28px)",
        padding:            "3rem 2.5rem",
        position:           "relative",
      }}>
        {/* Close */}
        <button onClick={onClose} style={{ position: "absolute", top: "1.25rem", right: "1.25rem", background: "none", border: "none", color: "rgba(196,168,106,0.45)", fontSize: "1.1rem", cursor: "pointer", lineHeight: 1, padding: 0 }}>✕</button>

        {/* Progress bar */}
        <div style={{ display: "flex", gap: "4px", marginBottom: "2.5rem" }}>
          {[0, 1, 2].map(i => (
            <div key={i} style={{ flex: 1, height: 1, background: i <= step ? "rgba(196,168,106,0.75)" : "rgba(196,168,106,0.15)", transition: "background 0.5s" }} />
          ))}
        </div>

        {/* ── Step 0 */}
        {step === 0 && <>
          <p style={{ fontFamily: "Playfair Display, serif", fontSize: "0.62rem", letterSpacing: "0.35em", color: "rgba(196,168,106,0.5)", marginBottom: "0.4rem" }}>ÉTAPE I</p>
          <h2 style={{ fontFamily: "Playfair Display, serif", fontSize: "1.65rem", fontWeight: 500, color: "#f0ede8", margin: "0 0 2rem" }}>Votre identité</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.9rem" }}>
            <input style={inputStyle} placeholder="Nom complet" value={form.name}  onChange={set("name")}  />
            <input style={inputStyle} placeholder="Adresse email" type="email" value={form.email} onChange={set("email")} />
            <input style={inputStyle} placeholder="Téléphone" value={form.phone} onChange={set("phone")} />
          </div>
          <button onClick={() => setStep(1)} style={{ ...btnPrimary, width: "100%", marginTop: "2rem" }}>Continuer →</button>
        </>}

        {/* ── Step 1 */}
        {step === 1 && <>
          <p style={{ fontFamily: "Playfair Display, serif", fontSize: "0.62rem", letterSpacing: "0.35em", color: "rgba(196,168,106,0.5)", marginBottom: "0.4rem" }}>ÉTAPE II</p>
          <h2 style={{ fontFamily: "Playfair Display, serif", fontSize: "1.65rem", fontWeight: 500, color: "#f0ede8", margin: "0 0 2rem" }}>Votre intérêt</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.9rem" }}>
            <select style={{ ...inputStyle, appearance: "none" as const }} value={form.interest} onChange={set("interest")}>
              <option value="">Centre d'intérêt principal</option>
              <option value="bar">Bar &amp; Mixologie</option>
              <option value="salon">Salon Privé &amp; Networking</option>
              <option value="rooftop">Rooftop &amp; Événements</option>
              <option value="all">Accès complet</option>
            </select>
            <textarea
              style={{ ...inputStyle, minHeight: 100, resize: "none" }}
              placeholder="Dites-nous en plus sur vous…"
              value={form.message}
              onChange={set("message")}
            />
          </div>
          <div style={{ display: "flex", gap: "0.75rem", marginTop: "2rem" }}>
            <button onClick={() => setStep(0)} style={btnSecondary}>← Retour</button>
            <button onClick={() => setStep(2)} style={btnPrimary}>Continuer →</button>
          </div>
        </>}

        {/* ── Step 2 */}
        {step === 2 && <>
          <p style={{ fontFamily: "Playfair Display, serif", fontSize: "0.62rem", letterSpacing: "0.35em", color: "rgba(196,168,106,0.5)", marginBottom: "0.4rem" }}>ÉTAPE III</p>
          <h2 style={{ fontFamily: "Playfair Display, serif", fontSize: "1.65rem", fontWeight: 500, color: "#f0ede8", margin: "0 0 1rem" }}>Candidature envoyée</h2>
          <p style={{ fontFamily: "Inter", fontSize: "0.82rem", color: "rgba(240,237,232,0.5)", lineHeight: 1.8, marginBottom: "2rem" }}>
            Notre comité de sélection vous contactera sous 72 heures.<br />
            Seventh est un cercle restreint — chaque dossier est examiné avec attention.
          </p>
          <div style={{ borderTop: "1px solid rgba(196,168,106,0.12)", paddingTop: "1.5rem", marginBottom: "2rem" }}>
            <p style={{ fontFamily: "Playfair Display, serif", fontSize: "0.58rem", letterSpacing: "0.3em", color: "rgba(196,168,106,0.4)", marginBottom: "0.75rem" }}>VOTRE CANDIDATURE</p>
            <p style={{ fontFamily: "Inter", fontSize: "0.88rem", color: "#f0ede8", margin: "0 0 0.25rem" }}>{form.name || "—"}</p>
            <p style={{ fontFamily: "Inter", fontSize: "0.8rem",  color: "rgba(240,237,232,0.45)", margin: 0 }}>{form.email || "—"}</p>
          </div>
          <button onClick={onClose} style={{ ...btnPrimary, width: "100%", background: "rgba(196,168,106,0.06)" }}>Fermer</button>
        </>}
      </div>
    </div>
  );
}
