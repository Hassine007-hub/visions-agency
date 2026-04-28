import { useRef, useState, useEffect } from 'react'
import { getVideoDemoAeternaUrl, getVideoDemoSafranUrl } from '@/lib/publicVideoUrls'

function buildProjects() {
  return [
    {
      id: 'aeterna',
      index: '01',
      name: 'AETERNA',
      category: 'Immobilier Luxe',
      desc: "Site immersif pour une marque immobilière haut de gamme — scroll vidéo 1080p, modales glassmorphism, animation cinématique.",
      tags: ['Next.js', 'R3F', 'GSAP', 'Supabase'],
      video: getVideoDemoAeternaUrl(),
    },
    {
      id: 'safran',
      index: '02',
      name: 'SAFRAN',
      category: 'Club Privé',
      desc: "Expérience web 3D full-immersive pour un private members club — particules or, bokeh orbs, cursor magnétique, cartes tilt.",
      tags: ['React', 'Three.js', 'GLSL', 'R3F'],
      video: getVideoDemoSafranUrl(),
    },
  ] as const
}

type ProjectItem = ReturnType<typeof buildProjects>[number]

const PROJECTS = buildProjects()

function ProjectCard({ project }: { project: ProjectItem }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    if (hovered) {
      v.currentTime = 0
      v.play().catch(() => {})
    } else {
      v.pause()
    }
  }, [hovered])

  return (
    <div
      className="visions-reveal"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ cursor: 'default' }}
    >
      {/* Video thumbnail */}
      <div
        style={{
          position: 'relative',
          borderRadius: 'var(--visions-radius)',
          overflow: 'hidden',
          aspectRatio: '16/9',
          background: '#0d0d0f',
        }}
      >
        <video
          ref={videoRef}
          src={project.video}
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
            transition: 'transform .7s cubic-bezier(.22,1,.36,1), opacity .5s ease',
            transform: hovered ? 'scale(1.03)' : 'scale(1)',
            opacity: hovered ? 1 : 0.85,
          }}
        />

        {/* Glass overlay on hover */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(10,10,10,.7) 0%, transparent 55%)',
            opacity: hovered ? 1 : 0,
            transition: 'opacity .4s ease',
          }}
        />

        {/* Index badge */}
        <div
          style={{
            position: 'absolute',
            top: '1.25rem',
            left: '1.25rem',
            fontSize: '.65rem',
            letterSpacing: '.25em',
            textTransform: 'uppercase' as const,
            color: 'var(--visions-gold)',
            fontWeight: 400,
            opacity: hovered ? 1 : 0.7,
            transition: 'opacity .3s',
          }}
        >
          {project.index}
        </div>

        {/* Tags on hover */}
        <div
          style={{
            position: 'absolute',
            bottom: '1.25rem',
            left: '1.25rem',
            display: 'flex',
            gap: '.5rem',
            flexWrap: 'wrap' as const,
            opacity: hovered ? 1 : 0,
            transform: hovered ? 'translateY(0)' : 'translateY(8px)',
            transition: 'opacity .4s ease, transform .4s ease',
          }}
        >
          {project.tags.map(tag => (
            <span
              key={tag}
              style={{
                fontSize: '.65rem',
                letterSpacing: '.15em',
                textTransform: 'uppercase' as const,
                color: 'rgba(240,237,232,.7)',
                padding: '.2rem .65rem',
                borderRadius: '9999px',
                background: 'rgba(255,255,255,.08)',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(255,255,255,.08)',
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Meta */}
      <div style={{ marginTop: '1.25rem' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: '1rem', marginBottom: '.5rem' }}>
          <h3
            style={{
              fontFamily: 'var(--visions-font-head)',
              fontStyle: 'italic',
              fontSize: 'clamp(1.4rem, 2.5vw, 1.8rem)',
              fontWeight: 400,
              letterSpacing: '-.02em',
              color: 'var(--visions-fg)',
              lineHeight: 1,
            }}
          >
            {project.name}
          </h3>
          <span
            style={{
              fontSize: '.68rem',
              letterSpacing: '.2em',
              textTransform: 'uppercase' as const,
              color: 'var(--visions-gold)',
              fontWeight: 400,
              flexShrink: 0,
            }}
          >
            {project.category}
          </span>
        </div>
        <p style={{ fontSize: '.88rem', color: 'var(--visions-fg-muted)', lineHeight: 1.6, fontWeight: 300, maxWidth: '560px' }}>
          {project.desc}
        </p>
      </div>
    </div>
  )
}

export function VisionsPortfolio() {
  useEffect(() => {
    const section = document.getElementById('portfolio')
    if (!section) return
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
      ;(el as HTMLElement).style.transitionDelay = `${(i % 3) * 100}ms`
      io.observe(el)
    })
    return () => io.disconnect()
  }, [])

  return (
    <section
      id="portfolio"
      style={{
        background: 'var(--visions-bg)',
        color: 'var(--visions-fg)',
        fontFamily: 'var(--visions-font-body)',
        fontWeight: 300,
        padding: '5rem 0',
        position: 'relative',
        zIndex: 1,
      }}
    >
      <div className="max-w-5xl mx-auto px-6">

        {/* Section head */}
        <div className="visions-reveal" style={{ marginBottom: '3.5rem' }}>
          <p className="visions-section-label">Portfolio</p>
          <h2 className="visions-section-title">Réalisations</h2>
          <p className="visions-section-sub">
            Chaque projet est conçu sur mesure — aucun template, aucun raccourci.
          </p>
        </div>

        {/* Watermark logo centré */}
        <div className="visions-reveal" style={{ display: 'flex', justifyContent: 'center', marginBottom: '3rem', position: 'relative', background: '#0d0d0f', borderRadius: '50%' }}>
          <video
            src="/visions-logo-anim.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-hidden
            style={{ width: '220px', height: '220px', objectFit: 'contain', display: 'block', opacity: 0.45 }}
          />
        </div>

        {/* Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(480px, 1fr))', gap: '3rem' }}>
          {PROJECTS.map(p => <ProjectCard key={p.id} project={p} />)}
        </div>

        {/* "Plus à venir" placeholder */}
        <div
          className="visions-reveal"
          style={{
            marginTop: '3rem',
            borderRadius: 'var(--visions-radius)',
            border: '1px dashed rgba(255,255,255,.08)',
            padding: '3rem',
            textAlign: 'center',
            color: 'var(--visions-fg-subtle)',
            fontSize: '.83rem',
            letterSpacing: '.08em',
          }}
        >
          D'autres projets arrivent bientôt —{' '}
          <a href="mailto:hassineb@outlook.fr" style={{ color: 'var(--visions-gold)', textDecoration: 'none' }}>
            parlons du vôtre
          </a>
        </div>

      </div>
    </section>
  )
}
