import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { resolveLandingBgVideoUrl } from '@/lib/publicVideoUrls'
import { BlurText } from './BlurText'

function AnimatedBadge({ children }: { children: string }) {
  return (
    <div
      className="animate-blur-fade-up"
      style={{
        display: 'inline-flex',
        alignSelf: 'flex-start',
        width: 'fit-content',
        alignItems: 'center',
        gap: '0.5rem',
        padding: '0.25rem 0.7rem',
        borderRadius: '9999px',
        border: '1px solid rgba(212,175,122,.25)',
        background: 'rgba(212,175,122,.07)',
        fontSize: '0.68rem',
        letterSpacing: '0.25em',
        textTransform: 'uppercase',
        color: 'var(--visions-gold)',
        marginBottom: '1.5rem',
        position: 'relative',
        overflow: 'hidden',
        animationDelay: '200ms',
      }}
    >
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'linear-gradient(90deg, transparent, rgba(212,175,122,.25), transparent)',
        animation: 'badgeShimmer 2.8s ease-in-out infinite',
      }} />
      <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--visions-gold)', boxShadow: '0 0 7px var(--visions-gold)', flexShrink: 0 }} />
      <span style={{ position: 'relative', zIndex: 1 }}>{children}</span>
    </div>
  )
}

const NAV = [
  { label: 'Services',   href: '#' },
  { label: 'Portfolio',  href: '#portfolio' },
  { label: 'Tarifs',     href: '#pricing' },
  { label: 'Contact',    href: 'mailto:hassineb@outlook.fr' },
]


export function VisionsHero() {
  const [menuOpen, setMenuOpen] = useState(false)
  const landingBgSrc = resolveLandingBgVideoUrl()

  return (
    <section
      className="relative isolate h-screen w-full overflow-hidden flex flex-col"
      style={{ fontFamily: 'var(--visions-font-body)' }}
    >
      <div
        className="fixed inset-0 bg-black"
        style={{ zIndex: -2 }}
        aria-hidden
      />
      {landingBgSrc ? (
        <video
          src={landingBgSrc}
          muted
          autoPlay
          loop
          playsInline
          preload="metadata"
          className="fixed inset-0 h-full w-full object-cover"
          style={{ zIndex: -1 }}
          aria-hidden
        />
      ) : null}

      {/* Dark gradient overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 1,
          background: 'linear-gradient(to bottom, rgba(10,10,10,.65) 0%, rgba(10,10,10,.1) 40%, rgba(10,10,10,.85) 100%)',
        }}
      />

      {/* Bottom blur mask */}
      <div
        className="absolute inset-0 pointer-events-none backdrop-blur-2xl"
        style={{
          zIndex: 2,
          WebkitMaskImage: 'linear-gradient(to top, black 0%, transparent 38%)',
          maskImage: 'linear-gradient(to top, black 0%, transparent 38%)',
        }}
      />

      {/* Navbar */}
      <nav className="relative flex items-center justify-center px-6 md:px-12 py-6" style={{ zIndex: 50 }}>
        <div className="hidden lg:flex items-center gap-8">
          {NAV.map(({ label, href }, i) => (
            <a
              key={label} href={href}
              className="text-white/60 text-sm hover:text-white/90 transition-colors animate-blur-fade-up"
              style={{ animationDelay: `${130 + i * 60}ms` }}
            >
              {label}
            </a>
          ))}
        </div>

        <a
          href="mailto:hassineb@outlook.fr"
          className="hidden lg:inline-flex items-center liquid-glass text-white/75 text-sm font-medium px-6 py-2.5 rounded-full animate-blur-fade-up hover:text-white transition-colors absolute right-6 md:right-12"
          style={{ animationDelay: '430ms' }}
        >
          Prendre contact
        </a>

        <button
          onClick={() => setMenuOpen(v => !v)}
          className="lg:hidden liquid-glass w-10 h-10 rounded-full flex items-center justify-center text-white animate-blur-fade-up relative"
          style={{ animationDelay: '300ms' }}
          aria-label="Menu"
        >
          <span className={`absolute transition-all duration-500 ${menuOpen ? 'opacity-0 scale-50 rotate-180' : 'opacity-100 scale-100 rotate-0'}`}><Menu size={17} /></span>
          <span className={`absolute transition-all duration-500 ${menuOpen ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-50 -rotate-180'}`}><X size={17} /></span>
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className={`lg:hidden absolute left-0 right-0 z-40 bg-[#0A0A0A]/96 backdrop-blur-xl border-b border-white/[0.06] transition-all duration-500 ease-out ${menuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'}`}
        style={{ top: '76px' }}
      >
        <div className="flex flex-col px-6 py-3">
          {NAV.map(({ label, href }) => (
            <a key={label} href={href} onClick={() => setMenuOpen(false)}
              className="py-3 text-white/60 hover:text-white text-sm transition-colors">
              {label}
            </a>
          ))}
        </div>
      </div>

      {/* Hero content */}
      <div
        className="relative flex-1 flex flex-col justify-end px-6 md:px-12 pb-16 md:pb-24"
        style={{ zIndex: 10 }}
      >
        <AnimatedBadge>AI-Native Creative Agency</AnimatedBadge>

        <h1
          className="text-white mb-6"
          style={{
            fontFamily: 'var(--visions-font-head)',
            fontStyle: 'italic',
            fontSize: 'clamp(3.2rem, 8.5vw, 7rem)',
            lineHeight: 0.92,
            letterSpacing: '-0.03em',
            fontWeight: 400,
          }}
        >
          <BlurText text="Design de" staggerMs={100} duration={0.8} initialDelay={0.3} />
          <BlurText text="haute exécution." staggerMs={100} duration={0.8} initialDelay={0.55} />
        </h1>

        <p
          className="mb-10 max-w-md animate-blur-fade-up"
          style={{ color: 'rgba(240,237,232,.48)', fontSize: '1rem', lineHeight: 1.7, fontWeight: 300, animationDelay: '540ms' }}
        >
          La qualité visuelle d'une grande agence.<br />
          La vélocité d'une équipe tech. Un seul interlocuteur.
        </p>

        <div className="flex flex-wrap items-center gap-3 animate-blur-fade-up" style={{ animationDelay: '660ms' }}>
          <a
            href="#pricing"
            className="bg-white text-black rounded-full font-medium px-7 py-3 text-sm hover:bg-white/90 transition-colors"
          >
            Voir les tarifs
          </a>
          <a
            href="#portfolio"
            className="liquid-glass text-white/75 rounded-full font-medium px-7 py-3 text-sm hover:text-white transition-colors"
          >
            Nos réalisations →
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 pointer-events-none animate-blur-fade-up"
        style={{ zIndex: 10, animationDelay: '950ms' }}
      >
        <div
          className="w-px h-10 mx-auto"
          style={{
            background: 'linear-gradient(to bottom, rgba(240,237,232,.4), transparent)',
            animation: 'scrollPulse 2s ease-in-out infinite',
          }}
        />
      </div>
    </section>
  )
}
