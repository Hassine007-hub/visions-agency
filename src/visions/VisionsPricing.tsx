import { useEffect } from 'react'

/* ── Icons ── */
const Check = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
    <path d="M2 7.5L5.5 11L12 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)
const Clock = () => (
  <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden>
    <circle cx="6.5" cy="6.5" r="5.5" stroke="currentColor" strokeWidth="1.2" />
    <path d="M6.5 4V7L8.5 8.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
  </svg>
)
const Star = () => (
  <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor" aria-hidden>
    <polygon points="5,1 6.2,4 9.5,4 6.9,6.2 7.8,9.5 5,7.5 2.2,9.5 3.1,6.2 0.5,4 3.8,4" />
  </svg>
)

function LogoAnim({ size = 80 }: { size?: number }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        background: '#0d0d0f',
        flexShrink: 0,
      }}
      aria-hidden
    >
      <video
        src="/visions-logo-anim.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        width={size}
        height={size}
        style={{ objectFit: 'contain', display: 'block', width: '100%', height: '100%' }}
      />
    </div>
  )
}

function HRule() {
  return <div className="visions-h-rule" />
}

/* ── Card sub-parts ── */
function CardName({ children }: { children: string }) {
  return (
    <p style={{ fontSize: '.7rem', letterSpacing: '.25em', textTransform: 'uppercase', color: 'var(--visions-fg-muted)', fontWeight: 400 }}>
      {children}
    </p>
  )
}
function CardPrice({ children }: { children: string }) {
  return (
    <p style={{ fontFamily: 'var(--visions-font-head)', fontStyle: 'italic', fontSize: '2.2rem', lineHeight: 1, color: 'var(--visions-fg)', letterSpacing: '-.03em', marginTop: '.25rem' }}>
      {children}
    </p>
  )
}
function CardDesc({ children }: { children: string }) {
  return (
    <p style={{ fontSize: '.88rem', color: 'var(--visions-fg-muted)', lineHeight: 1.6, fontWeight: 300 }}>
      {children}
    </p>
  )
}
function RetainerName({ children }: { children: string }) {
  return (
    <p style={{ fontSize: '.7rem', letterSpacing: '.22em', textTransform: 'uppercase', color: 'var(--visions-fg-muted)', fontWeight: 400 }}>
      {children}
    </p>
  )
}
function RetainerSub({ children }: { children: React.ReactNode }) {
  return (
    <p style={{ fontSize: '.83rem', color: 'var(--visions-fg-subtle)', fontWeight: 300, lineHeight: 1.55 }}>
      {children}
    </p>
  )
}
function RetainerPrice({ amount }: { amount: string }) {
  return (
    <div style={{ textAlign: 'right', flexShrink: 0 }}>
      <span style={{ fontFamily: 'var(--visions-font-head)', fontStyle: 'italic', fontSize: '1.8rem', color: 'var(--visions-fg)', letterSpacing: '-.02em', display: 'block', lineHeight: 1 }}>
        {amount}
      </span>
      <span style={{ fontSize: '.72rem', color: 'var(--visions-fg-subtle)', fontWeight: 300 }}>/mois</span>
    </div>
  )
}
function RetainerHead({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem' }}>
      {children}
    </div>
  )
}
function Features({ items }: { items: string[] }) {
  return (
    <ul className="visions-card-features">
      {items.map(f => <li key={f}><Check />{f}</li>)}
    </ul>
  )
}
function Delay({ children }: { children: string }) {
  return (
    <div className="visions-card-delay"><Clock />{children}</div>
  )
}
function ExtrasTable({ rows }: { rows: [string, string][] }) {
  return (
    <div className="visions-glass" style={{ borderRadius: 'var(--visions-radius)', overflow: 'hidden' }}>
      <div style={{ padding: '1.5rem 1.75rem .75rem', borderBottom: '1px solid rgba(255,255,255,.05)' }}>
        <p style={{ fontSize: '.68rem', letterSpacing: '.25em', textTransform: 'uppercase', color: 'var(--visions-fg-subtle)', fontWeight: 400 }}>
          Extras à la carte
        </p>
      </div>
      <table className="visions-extras-table">
        <tbody>
          {rows.map(([label, price]) => (
            <tr key={label}><td>{label}</td><td>{price}</td></tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
function CarteTable({ rows }: { rows: [string, string][] }) {
  return (
    <div className="visions-glass" style={{ borderRadius: 'var(--visions-radius)', overflow: 'hidden' }}>
      <div style={{ padding: '1.5rem 1.75rem .75rem', borderBottom: '1px solid rgba(255,255,255,.05)' }}>
        <p style={{ fontSize: '.68rem', letterSpacing: '.25em', textTransform: 'uppercase', color: 'var(--visions-fg-subtle)', fontWeight: 400 }}>
          Production à la carte — hors retainer
        </p>
      </div>
      <table className="visions-extras-table">
        <tbody>
          {rows.map(([label, price]) => (
            <tr key={label}><td>{label}</td><td>{price}</td></tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

/* ── Section head ── */
function SectionHead({ index, title, sub }: { index: string; title: string; sub?: string }) {
  return (
    <div className="visions-reveal" style={{ marginBottom: '3rem' }}>
      <p className="visions-section-label">{index}</p>
      <h3 className="visions-section-title">{title}</h3>
      {sub && <p className="visions-section-sub">{sub}</p>}
    </div>
  )
}

/* ── Condition icons ── */
const CondIcons = {
  grid: (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <rect x="2" y="2" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.3"/>
      <rect x="10" y="2" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.3"/>
      <rect x="2" y="10" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.3"/>
      <rect x="10" y="10" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.3"/>
    </svg>
  ),
  plus: (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M9 2v14M2 9h14" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
    </svg>
  ),
  check: (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M4 9.5L7.5 13L14 5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  info: (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <circle cx="9" cy="9" r="7" stroke="currentColor" strokeWidth="1.3"/>
      <path d="M9 5.5V10.5M9 12.5V13" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
    </svg>
  ),
  shield: (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M3 9C3 5.686 5.686 3 9 3s6 2.686 6 6-2.686 6-6 6-6-2.686-6-6z" stroke="currentColor" strokeWidth="1.3"/>
      <path d="M7 9l1.5 1.5L11.5 7" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
}

const CONDITIONS = [
  {
    icon: CondIcons.grid, title: 'Paiement — Sites',
    body: <><strong>40%</strong> à la commande · <strong>30%</strong> à la validation de la maquette · <strong>30%</strong> à la livraison.</>,
  },
  {
    icon: CondIcons.plus, title: 'Paiement — Retainers',
    body: <>Facturation le <strong>1er du mois</strong>, paiement sous 7 jours. Engagement minimum <strong>3 mois</strong>.</>,
  },
  {
    icon: CondIcons.check, title: 'Révisions',
    body: <>Sites : <strong>2 rounds design + 1 round intégration</strong>. Réseaux : <strong>1 révision / contenu</strong>. Au-delà : 90 €/h.</>,
  },
  {
    icon: CondIcons.info, title: 'Non inclus par défaut',
    body: <>Nom de domaine · Rédaction des textes · Shooting photo/vidéo · Budget publicitaire · Licences d'assets premium.</>,
  },
  {
    icon: CondIcons.shield, title: 'Propriété intellectuelle',
    body: <>Droits d'utilisation complets transférés à la réception du solde. Le code source vous est remis. VISIONS conserve le droit de présenter le projet dans son portfolio.</>,
  },
]

/* ── Main component ── */
export function VisionsPricing() {
  useEffect(() => {
    const section = document.getElementById('pricing')
    if (!section) return

    // Spotlight cursor sur toutes les cards
    const cards = section.querySelectorAll<HTMLElement>('.visions-price-card, .visions-retainer-card')
    const cleanups: (() => void)[] = []

    cards.forEach(card => {
      const overlay = document.createElement('div')
      overlay.style.cssText = [
        'position:absolute', 'inset:0', 'pointer-events:none',
        'opacity:0', 'transition:opacity 300ms ease',
        'z-index:2', 'border-radius:inherit',
      ].join(';')
      card.appendChild(overlay)

      const onMove = (e: MouseEvent) => {
        const r = card.getBoundingClientRect()
        const x = e.clientX - r.left
        const y = e.clientY - r.top
        overlay.style.background = `radial-gradient(480px circle at ${x}px ${y}px, rgba(212,175,122,.13), transparent 40%)`
      }
      const onEnter = () => { overlay.style.opacity = '1' }
      const onLeave = () => { overlay.style.opacity = '0' }

      card.addEventListener('mousemove', onMove)
      card.addEventListener('mouseenter', onEnter)
      card.addEventListener('mouseleave', onLeave)

      cleanups.push(() => {
        card.removeEventListener('mousemove', onMove)
        card.removeEventListener('mouseenter', onEnter)
        card.removeEventListener('mouseleave', onLeave)
        if (card.contains(overlay)) card.removeChild(overlay)
      })
    })

    const reveals = section.querySelectorAll('.visions-reveal')
    const io = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) {
          ;(e.target as HTMLElement).classList.add('visible')
          io.unobserve(e.target)
        }
      }),
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    )
    reveals.forEach((el, i) => {
      ;(el as HTMLElement).style.transitionDelay = `${(i % 3) * 80}ms`
      io.observe(el)
    })
    return () => {
      io.disconnect()
      cleanups.forEach(fn => fn())
    }
  }, [])

  return (
    <div
      id="pricing"
      style={{
        background: 'var(--visions-bg)',
        color: 'var(--visions-fg)',
        fontFamily: 'var(--visions-font-body)',
        fontWeight: 300,
        fontSize: '16px',
        lineHeight: 1.65,
        WebkitFontSmoothing: 'antialiased',
        overflowX: 'hidden',
        position: 'relative',
      }}
    >
      {/* Halos */}
      <div aria-hidden style={{ position: 'fixed', top: '-20vh', left: '-15vw', width: '70vw', height: '70vw', background: 'radial-gradient(ellipse, hsl(42,40%,60%,.06) 0%, transparent 70%)', pointerEvents: 'none', zIndex: 0 }} />
      <div aria-hidden style={{ position: 'fixed', bottom: '-20vh', right: '-15vw', width: '65vw', height: '65vw', background: 'radial-gradient(ellipse, hsl(280,60%,60%,.05) 0%, transparent 70%)', pointerEvents: 'none', zIndex: 0 }} />

      {/* ── HEADER ── */}
      <header style={{ padding: '4.5rem 0 2.5rem', textAlign: 'center', position: 'relative', zIndex: 1 }}>
        <div className="max-w-5xl mx-auto px-6">
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '.75rem', marginBottom: '3rem' }}>
            <LogoAnim size={160} />
          </div>
          <h2 style={{ fontFamily: 'var(--visions-font-head)', fontStyle: 'italic', fontSize: 'clamp(2.8rem, 6vw, 5rem)', fontWeight: 400, lineHeight: .92, letterSpacing: '-.03em', color: 'var(--visions-fg)', marginBottom: '1.25rem' }}>
            Ce que vous <span style={{ color: 'var(--visions-gold)' }}>investissez</span>
            <br />dans votre image
          </h2>
          <p style={{ fontSize: '1rem', color: 'var(--visions-fg-muted)', maxWidth: '480px', margin: '0 auto 2.5rem', fontWeight: 300, lineHeight: 1.65 }}>
            Tarifs transparents. Qualité non négociable.<br />
            Un interlocuteur unique du brief à la livraison.
          </p>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '.5rem', padding: '.45rem 1.1rem', borderRadius: '9999px', background: 'rgba(255,255,255,.05)', fontSize: '.72rem', letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--visions-fg-muted)', backdropFilter: 'blur(8px)', boxShadow: 'inset 0 1px 1px rgba(255,255,255,.08)' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--visions-gold)', boxShadow: '0 0 8px var(--visions-gold)', flexShrink: 0 }} />
            Grille tarifaire — 2026
          </span>
        </div>
      </header>

      <HRule />

      {/* ── 01 SITES WEB ── */}
      <section style={{ padding: '5rem 0', position: 'relative', zIndex: 1 }}>
        <div className="max-w-5xl mx-auto px-6">
          <SectionHead
            index="01 — Sites web"
            title="Projets one-shot"
            sub="Conçus sur mesure. Aucun template, aucun raccourci. Déployés sur Vercel avec les meilleures pratiques Next.js."
          />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>

            <div className="visions-price-card visions-glass visions-reveal">
              <div><CardName>Vitrine Premium</CardName><CardPrice>2 500 – 4 500 €</CardPrice></div>
              <CardDesc>5 à 8 pages sur-mesure, design custom, mobile-first, SEO de base. Formulaire de contact inclus. Déploiement Vercel.</CardDesc>
              <Features items={['Design entièrement sur mesure', 'Mobile-first · Lighthouse ≥ 90', 'Formulaire de contact', '2 rounds de révisions inclus']} />
              <Delay>Délai : 3 – 4 semaines</Delay>
            </div>

            <div className="visions-price-card visions-glass visions-glass-gold visions-reveal" style={{ background: 'var(--visions-glass-bg-hi)' }}>
              <div className="visions-card-tag"><Star />Recommandé</div>
              <div><CardName>Site + CMS</CardName><CardPrice>4 500 – 8 000 €</CardPrice></div>
              <CardDesc>Tout ce qui précède, plus Sanity CMS intégré. Vos équipes modifient textes et images sans toucher au code.</CardDesc>
              <Features items={["Sanity CMS — édition intuitive", "Formation d'utilisation (1h)", "Schémas de contenu documentés", "2 rounds de révisions inclus"]} />
              <Delay>Délai : 4 – 6 semaines</Delay>
            </div>

            <div className="visions-price-card visions-glass visions-reveal">
              <div><CardName>App / E-commerce</CardName><CardPrice>8 000 – 18 000 €</CardPrice></div>
              <CardDesc>Authentification, paiement Stripe, dashboard, base de données Supabase. Périmètre défini sur devis.</CardDesc>
              <Features items={["Espace membre / authentification", "Paiement Stripe + webhooks", "Base de données Supabase + RLS", "Dashboard client ou admin"]} />
              <Delay>Délai : 6 – 10 semaines</Delay>
            </div>

          </div>
          <div style={{ marginTop: '1.25rem' }}>
            <ExtrasTable rows={[
              ['Page supplémentaire hors scope', '250 – 500 €'],
              ['Intégration outil tiers (Calendly, Mailchimp…)', '200 – 400 €'],
              ['Multilingue — par langue additionnelle', '400 – 800 €'],
              ['Optimisation SEO avancée', '500 – 1 200 €'],
              ['Migration depuis site existant', '500 – 1 500 €'],
            ]} />
          </div>
        </div>
      </section>

      <HRule />

      {/* ── 02 RÉSEAUX SOCIAUX ── */}
      <section style={{ padding: '5rem 0', position: 'relative', zIndex: 1 }}>
        <div className="max-w-5xl mx-auto px-6">
          <SectionHead
            index="02 — Réseaux sociaux"
            title="Retainers mensuels"
            sub="Engagement minimum 3 mois. Résiliation avec préavis d'un mois. Contenu produit et publié par VISIONS."
          />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem', marginBottom: '1.25rem' }}>

            <div className="visions-retainer-card visions-glass visions-reveal">
              <RetainerHead>
                <div><RetainerName>Essentiel</RetainerName><RetainerSub>Présence régulière,<br />visuels soignés</RetainerSub></div>
                <RetainerPrice amount="900 €" />
              </RetainerHead>
              <div className="visions-divider" />
              <Features items={['8 visuels / mois', 'Stories (5 / mois)', 'Calendrier éditorial', '1 révision / contenu']} />
            </div>

            <div className="visions-retainer-card visions-glass visions-glass-gold visions-reveal">
              <div className="visions-card-tag" style={{ marginBottom: '.5rem' }}><Star />Populaire</div>
              <RetainerHead>
                <div><RetainerName>Premium</RetainerName><RetainerSub>Visuels + vidéos,<br />stratégie éditoriale</RetainerSub></div>
                <RetainerPrice amount="1 800 €" />
              </RetainerHead>
              <div className="visions-divider" />
              <Features items={['12 visuels / mois', '4 Réels motion design', 'Stories (10 / mois)', 'Stratégie + reporting mensuel', '1 révision / contenu']} />
            </div>

            <div className="visions-retainer-card visions-glass visions-reveal">
              <div>
                <RetainerName>Full Service</RetainerName>
                <RetainerSub>Gestion complète + publicité</RetainerSub>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <RetainerPrice amount="3 200 €" />
              </div>
              <div className="visions-divider" />
              <Features items={['Volume Premium inclus', 'Gestion communauté (5j/7)', 'Campagnes Meta / TikTok Ads*', 'Session stratégique mensuelle', 'Rapport détaillé + recommandations']} />
              <p style={{ fontSize: '.72rem', color: 'var(--visions-fg-subtle)' }}>
                * Budget publicitaire non inclus — minimum recommandé 300 €/mois
              </p>
            </div>

          </div>
          <CarteTable rows={[
            ['Reel / Short 15 – 60s (motion design)', '400 – 700 €'],
            ['Pack Lancement (5 Réels + 10 visuels)', '2 000 – 3 500 €'],
            ['Logo animé + pack intro/outro', '800 – 1 500 €'],
            ['3 templates Stories réutilisables', '500 – 900 €'],
            ['Audit réseaux + recommandations', '350 €'],
          ]} />
        </div>
      </section>

      <HRule />

      {/* ── 03 MAINTENANCE ── */}
      <section style={{ padding: '5rem 0', position: 'relative', zIndex: 1 }}>
        <div className="max-w-5xl mx-auto px-6">
          <SectionHead
            index="03 — Maintenance"
            title="Sérénité au quotidien"
            sub="Proposé systématiquement après chaque livraison. Votre site évolue, reste sécurisé, et vous restez prioritaire."
          />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem' }}>

            <div className="visions-retainer-card visions-glass visions-reveal">
              <RetainerHead>
                <div><RetainerName>Sérénité</RetainerName><RetainerSub>Mises à jour + 1h de contenu</RetainerSub></div>
                <RetainerPrice amount="250 €" />
              </RetainerHead>
              <div className="visions-divider" />
              <Features items={['Mises à jour techniques + sécurité', '1h de modifications de contenu', 'Support email — réponse sous 48h']} />
            </div>

            <div className="visions-retainer-card visions-glass visions-glass-gold visions-reveal">
              <RetainerHead>
                <div><RetainerName>Évolutions</RetainerName><RetainerSub>Développement continu + priorité</RetainerSub></div>
                <RetainerPrice amount="500 €" />
              </RetainerHead>
              <div className="visions-divider" />
              <Features items={["Tout ce qui précède", "3h de développement incluses", "Support prioritaire — réponse sous 24h", "Débordement : 90 €/h"]} />
            </div>

          </div>
        </div>
      </section>

      <HRule />

      {/* ── 04 CONDITIONS ── */}
      <section style={{ padding: '5rem 0', position: 'relative', zIndex: 1 }}>
        <div className="max-w-5xl mx-auto px-6">
          <SectionHead index="04 — Conditions" title="Fonctionnement" />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' }}>
            {CONDITIONS.map(({ icon, title, body }) => (
              <div key={title} className="visions-cond-block visions-glass visions-reveal">
                <div className="visions-cond-icon" aria-hidden>{icon}</div>
                <p className="visions-cond-title">{title}</p>
                <p className="visions-cond-body">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <HRule />

      {/* ── FOOTER ── */}
      <footer style={{ padding: '4rem 0 3rem', textAlign: 'center', position: 'relative', zIndex: 1 }}>
        <div className="max-w-5xl mx-auto px-6">
          <div style={{ marginBottom: '1.25rem', display: 'flex', justifyContent: 'center' }}>
            <img
              src="/visions-logo.png"
              alt="VISIONS"
              width={180}
              height={180}
              style={{ objectFit: 'contain', display: 'block' }}
            />
          </div>
          <p style={{ fontSize: '.83rem', color: 'var(--visions-fg-subtle)', fontWeight: 300 }}>
            Qualité d'exécution · Vélocité d'une équipe tech · Interlocuteur unique
          </p>
          <p style={{ marginTop: '.75rem' }}>
            <a href="mailto:hassineb@outlook.fr" style={{ color: 'var(--visions-gold)', textDecoration: 'none', fontSize: '.83rem' }}>
              hassineb@outlook.fr
            </a>
          </p>
        </div>
      </footer>
    </div>
  )
}
