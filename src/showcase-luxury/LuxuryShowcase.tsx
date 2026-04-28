'use client'
import { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import { Scene3D } from './Scene3D'
import { TextOverlays } from './TextOverlays'
import { brand } from './brand'

export function LuxuryShowcase() {
  const scrollRef = useRef<number>(0)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.07, smoothWheel: true })

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    // Mise à jour du scrollRef via Lenis (pas de setState)
    lenis.on('scroll', ({ progress }: { progress: number }) => {
      scrollRef.current = progress
    })

    return () => lenis.destroy()
  }, [])

  return (
    <div style={{ background: brand.bg }}>
      {/* Canvas fixe — plein écran */}
      <div className="fixed inset-0 z-0">
        <Scene3D scrollRef={scrollRef} />
      </div>

      {/* Overlays texte fixes */}
      <TextOverlays containerRef={containerRef} />

      {/* Scroll indicator */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-20 pointer-events-none flex flex-col items-center gap-2">
        <div
          className="w-px h-10"
          style={{
            background: `linear-gradient(to bottom, ${brand.accent}90, transparent)`,
            animation: 'scrollPulse 2s ease-in-out infinite',
          }}
        />
        <style>{`
          @keyframes scrollPulse {
            0%, 100% { transform: scaleY(0.3); opacity: 0.3; }
            50% { transform: scaleY(1); opacity: 1; }
          }
        `}</style>
      </div>

      {/* Ghost scroll container — 500vh */}
      <div
        ref={containerRef}
        className="relative z-20"
        style={{ height: '500vh' }}
      />
    </div>
  )
}
