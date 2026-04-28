import { useState } from 'react'
import { getVideoBackgroundUrl } from '@/lib/publicVideoUrls'
import {
  Search,
  User,
  Menu,
  X,
  Play,
  ChevronLeft,
  ChevronRight,
  Star,
  Clock,
  Calendar,
} from 'lucide-react'

const NAV_LINKS = ['Équipement', 'Vêtements', 'Sécurité', 'Guides', 'Expéditions']

export function CinematicHero() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const videoBackgroundSrc = getVideoBackgroundUrl()

  return (
    <div className="bg-black h-screen w-full overflow-hidden flex flex-col" style={{ fontFamily: "'Inter', sans-serif" }}>

      {/* ── VIDEO BACKGROUND ── */}
      <div className="fixed inset-0 bg-black" style={{ zIndex: 0 }} aria-hidden />
      <video
        src={videoBackgroundSrc}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="fixed inset-0 w-full h-full object-cover"
        style={{ zIndex: 1 }}
        aria-hidden
      />

      {/* ── BOTTOM BLUR OVERLAY (mask, no gradient darkening) ── */}
      <div
        className="fixed inset-0 pointer-events-none backdrop-blur-xl"
        style={{
          zIndex: 2,
          WebkitMaskImage: 'linear-gradient(to top, black 0%, transparent 45%)',
          maskImage: 'linear-gradient(to top, black 0%, transparent 45%)',
        }}
      />

      {/* ── NAVBAR ── */}
      <nav
        className="relative flex items-center justify-between px-4 sm:px-6 md:px-12 py-4 md:py-6"
        style={{ zIndex: 50 }}
      >
        {/* Logo */}
        <span
          className="text-white font-semibold text-lg md:text-xl tracking-widest animate-blur-fade-up"
          style={{ animationDelay: '0ms' }}
        >
          SUMMITS
        </span>

        {/* Nav links — desktop only */}
        <div className="hidden lg:flex items-center gap-6 xl:gap-8">
          {NAV_LINKS.map((link, i) => (
            <a
              key={link}
              href="#"
              className="text-white/80 text-sm hover:text-gray-300 transition-colors animate-blur-fade-up"
              style={{ animationDelay: `${100 + i * 50}ms` }}
            >
              {link}
            </a>
          ))}
        </div>

        {/* Right — Search + User (sm+), Hamburger (below lg) */}
        <div className="flex items-center gap-2 md:gap-3">
          {/* Search button — sm+ */}
          <button
            className="hidden sm:flex items-center gap-2 liquid-glass text-white text-sm font-medium px-4 md:px-6 py-2 rounded-full animate-blur-fade-up"
            style={{ animationDelay: '350ms' }}
          >
            <Search size={18} />
            <span>Rechercher</span>
          </button>

          {/* User button — sm+ */}
          <button
            className="hidden sm:flex items-center justify-center w-10 h-10 liquid-glass text-white rounded-full animate-blur-fade-up"
            style={{ animationDelay: '400ms' }}
          >
            <User size={18} />
          </button>

          {/* Hamburger — below lg */}
          <button
            onClick={() => setIsMenuOpen(v => !v)}
            className="lg:hidden relative flex items-center justify-center w-10 h-10 liquid-glass text-white rounded-full animate-blur-fade-up"
            style={{ animationDelay: '350ms' }}
            aria-label="Toggle menu"
          >
            <span
              className={`absolute transition-all duration-500 ease-out ${
                isMenuOpen ? 'opacity-0 rotate-180 scale-50' : 'opacity-100 rotate-0 scale-100'
              }`}
            >
              <Menu size={18} />
            </span>
            <span
              className={`absolute transition-all duration-500 ease-out ${
                isMenuOpen ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-180 scale-50'
              }`}
            >
              <X size={18} />
            </span>
          </button>
        </div>
      </nav>

      {/* ── MOBILE MENU ── */}
      <div
        className={`lg:hidden absolute left-0 right-0 z-40 bg-gray-900/95 backdrop-blur-lg border-t border-b border-gray-800 shadow-2xl transition-all duration-500 ease-out ${
          isMenuOpen
            ? 'translate-y-0 opacity-100'
            : '-translate-y-4 opacity-0 pointer-events-none'
        }`}
        style={{ top: '72px' }}
      >
        <div className="flex flex-col px-4 py-3">
          {NAV_LINKS.map((link, i) => (
            <a
              key={link}
              href="#"
              className="py-3 px-3 rounded-lg text-white/80 hover:bg-gray-800/50 text-sm transition-all duration-300"
              style={{
                transform: isMenuOpen ? 'translateX(0)' : 'translateX(-12px)',
                opacity: isMenuOpen ? 1 : 0,
                transitionDelay: `${i * 50}ms`,
              }}
            >
              {link}
            </a>
          ))}

          {/* Search + User — below sm only */}
          <div
            className="sm:hidden flex items-center gap-3 pt-3 mt-2 border-t border-gray-800"
            style={{
              transform: isMenuOpen ? 'translateX(0)' : 'translateX(-12px)',
              opacity: isMenuOpen ? 1 : 0,
              transitionDelay: '250ms',
              transition: 'all 300ms ease-out',
            }}
          >
            <button className="flex items-center gap-2 liquid-glass text-white text-sm font-medium px-4 py-2 rounded-full flex-1 justify-center">
              <Search size={16} />
              <span>Search</span>
            </button>
            <button className="flex items-center justify-center w-10 h-10 liquid-glass text-white rounded-full">
              <User size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* ── HERO CONTENT ── */}
      <div
        className="relative flex-1 flex flex-col justify-end px-4 sm:px-6 md:px-12 pb-8 md:pb-16"
        style={{ zIndex: 10 }}
      >
        <div className="flex flex-col md:flex-row items-end gap-8">

          {/* ── LEFT SIDE ── */}
          <div className="flex-1">
            {/* Metadata row */}
            <div
              className="flex flex-wrap items-center gap-3 sm:gap-6 mb-6 md:mb-8 text-white text-xs sm:text-sm animate-blur-fade-up"
              style={{ animationDelay: '300ms' }}
            >
              <span className="flex items-center gap-1.5">
                <Star size={16} className="fill-white sm:w-5 sm:h-5" />
                <span className="font-medium">Haute Montagne</span>
              </span>
              <span className="flex items-center gap-1.5">
                <Clock size={16} className="sm:w-5 sm:h-5" />
                <span>Livraison 24h</span>
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar size={16} className="sm:w-5 sm:h-5" />
                <span>Saison 2025–2026</span>
              </span>
            </div>

            {/* Title */}
            <h1
              className="text-white text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-normal mb-4 md:mb-6 animate-blur-fade-up"
              style={{
                letterSpacing: '-0.04em',
                animationDelay: '400ms',
                lineHeight: 1.05,
              }}
            >
              L'équipement<br />qui ne cède pas.
            </h1>

            {/* Description */}
            <p
              className="text-gray-400 text-base sm:text-lg md:text-xl mb-6 md:mb-12 max-w-2xl animate-blur-fade-up"
              style={{ animationDelay: '500ms' }}
            >
              Conçu pour les crêtes. Testé en conditions extrêmes. Chaque pièce survit là où rien d'autre ne tient.
            </p>

            {/* CTA buttons */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
              <button
                className="flex items-center gap-2 bg-white text-black rounded-full font-medium px-6 sm:px-8 py-2.5 sm:py-3 hover:bg-gray-200 transition-colors animate-blur-fade-up"
                style={{ animationDelay: '600ms' }}
              >
                <Play size={18} className="fill-black" />
                <span>Explorer la collection</span>
              </button>
              <button
                className="liquid-glass text-white rounded-full font-medium px-6 sm:px-8 py-2.5 sm:py-3 animate-blur-fade-up"
                style={{ animationDelay: '700ms' }}
              >
                Nos guides
              </button>
            </div>
          </div>

          {/* ── RIGHT SIDE — navigation arrows ── */}
          <div className="flex items-center gap-3 md:flex-shrink-0">
            <button
              className="liquid-glass text-white flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-full animate-blur-fade-up"
              style={{ animationDelay: '800ms' }}
            >
              <ChevronLeft size={18} />
              <span className="text-sm font-medium">Précédent</span>
            </button>
            <button
              className="liquid-glass text-white flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-full animate-blur-fade-up"
              style={{ animationDelay: '900ms' }}
            >
              <span className="text-sm font-medium">Suivant</span>
              <ChevronRight size={18} />
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}
