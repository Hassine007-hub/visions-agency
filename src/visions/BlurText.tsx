import { useEffect, useRef, useState } from 'react'
import { motion, type Variants } from 'framer-motion'

const wordVariants: Variants = {
  hidden: { filter: 'blur(10px)', opacity: 0, y: 50 },
  visible: {
    filter: ['blur(10px)', 'blur(5px)', 'blur(0px)'],
    opacity: [0, 0.5, 1],
    y: [50, -5, 0],
  },
}

interface BlurTextProps {
  text: string
  className?: string
  style?: React.CSSProperties
  staggerMs?: number
  duration?: number
  initialDelay?: number
}

export function BlurText({
  text,
  className,
  style,
  staggerMs = 100,
  duration = 0.7,
  initialDelay = 0,
}: BlurTextProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const words = text.split(/\s+/).filter(Boolean)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true) },
      { threshold: 0.01 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <span
      ref={ref}
      className={className}
      style={{ display: 'flex', flexWrap: 'wrap', rowGap: '0.05em', ...style }}
    >
      {words.map((word, i) => (
        <motion.span
          key={word + i}
          style={{ display: 'inline-block', marginRight: '0.28em' }}
          initial="hidden"
          animate={isVisible ? 'visible' : 'hidden'}
          variants={wordVariants}
          transition={{
            delay: initialDelay + (i * staggerMs) / 1000,
            duration,
            times: [0, 0.5, 1],
            ease: 'easeOut',
          }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  )
}
