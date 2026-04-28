'use client'
import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { brand, products } from './brand'

interface TextOverlaysProps {
  containerRef: React.RefObject<HTMLDivElement>
}

function ProductLabel({
  product,
  index,
  containerRef,
}: {
  product: typeof products[number]
  index: number
  containerRef: React.RefObject<HTMLDivElement>
}) {
  // Mapping scroll → opacité par produit
  // Parfum : 0→0.08 fade-in, 0.08→0.20 visible, 0.20→0.30 fade-out
  // Bougie  : 0.32→0.40 fade-in, 0.40→0.55 visible, 0.55→0.65 fade-out
  // Bague   : 0.68→0.76 fade-in, 0.76→0.95 visible, 0.95→1.0 fade-out
  const ranges = [
    [0, 0.06, 0.16, 0.28, 0.35],
    [0.30, 0.38, 0.50, 0.62, 0.70],
    [0.65, 0.73, 0.82, 0.95, 1.0],
  ]
  const [r0, r1, r2, r3, r4] = ranges[index]

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  const opacity = useTransform(
    scrollYProgress,
    [r0, r1, r2, r3, r4],
    [0, 1, 1, 0, 0]
  )
  const y = useTransform(
    scrollYProgress,
    [r0, r1, r3, r4],
    ['28px', '0px', '0px', '-20px']
  )

  return (
    <motion.div
      style={{ opacity, y }}
      className="absolute bottom-14 left-0 right-0 flex flex-col items-center gap-2 pointer-events-none"
    >
      {/* Numéro */}
      <span
        className="text-xs font-light tracking-[0.5em] uppercase"
        style={{ color: product.accent }}
      >
        0{index + 1}
      </span>

      {/* Nom produit — grand serif */}
      <h2
        className="font-['Instrument_Serif'] italic text-center leading-tight"
        style={{
          fontSize: 'clamp(2.2rem, 5vw, 4rem)',
          color: brand.text,
          letterSpacing: '-0.01em',
        }}
      >
        {product.name}
      </h2>

      {/* Sous-titre */}
      <p
        className="text-xs font-light tracking-[0.3em] uppercase"
        style={{ color: brand.textMuted }}
      >
        {product.subtitle}
      </p>

      {/* Ligne déco */}
      <div
        className="mt-1 w-12 h-px"
        style={{ background: `linear-gradient(to right, transparent, ${product.accent}, transparent)` }}
      />
    </motion.div>
  )
}

function CTAOverlay({ containerRef }: { containerRef: React.RefObject<HTMLDivElement> }) {
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  const opacity = useTransform(scrollYProgress, [0.90, 0.97], [0, 1])
  const scale  = useTransform(scrollYProgress, [0.90, 0.97], [0.96, 1])

  return (
    <motion.div
      style={{ opacity, scale }}
      className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
      // pointer-events only active at end
    >
      <div className="flex flex-col items-center gap-6 text-center px-8">
        <p className="text-xs uppercase tracking-widest" style={{ color: brand.accent }}>
          VISIONS — AI-Native Creative Agency
        </p>
        <h2
          className="font-['Instrument_Serif'] italic leading-tight"
          style={{
            fontSize: 'clamp(3rem, 8vw, 6.5rem)',
            color: brand.text,
            letterSpacing: '-0.02em',
          }}
        >
          Votre marque<br />mérite ça.
        </h2>
        <p className="text-sm font-light" style={{ color: brand.textMuted }}>
          Ce site existe. Pour de vrai.
        </p>
      </div>
    </motion.div>
  )
}

export function TextOverlays({ containerRef }: TextOverlaysProps) {
  return (
    <div className="fixed inset-0 z-10 pointer-events-none">
      {products.map((product, i) => (
        <ProductLabel
          key={product.id}
          product={product}
          index={i}
          containerRef={containerRef}
        />
      ))}
      <CTAOverlay containerRef={containerRef} />
    </div>
  )
}
