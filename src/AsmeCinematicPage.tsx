import { useCallback, useEffect, useRef, type FormEvent, type RefObject, type MutableRefObject } from 'react'
import { ArrowRight, Globe, Instagram, X } from 'lucide-react'

const VIDEO_SRC =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_115001_bcdaa3b4-03de-47e7-ad63-ae3e392c32d4.mp4'

const FADE_MS = 500
const TAIL_S = 0.55
const LOOP_GAP_MS = 100

/**
 * rAF-based linear fade. Cancels any in-flight rAF. Starts from current opacity.
 */
function useRafOpacityFade(
  wrapperRef: RefObject<HTMLDivElement | null>,
  opacityRef: MutableRefObject<number>
) {
  const rafIdRef = useRef<number | null>(null)

  const setOpacity = useCallback((o: number) => {
    const x = Math.max(0, Math.min(1, o))
    opacityRef.current = x
    const w = wrapperRef.current
    if (w) w.style.opacity = String(x)
  }, [opacityRef, wrapperRef])

  const cancelFade = useCallback(() => {
    if (rafIdRef.current != null) {
      cancelAnimationFrame(rafIdRef.current)
      rafIdRef.current = null
    }
  }, [])

  const fadeTo = useCallback(
    (target: number, durationMs: number, onComplete?: () => void) => {
      cancelFade()
      const from = opacityRef.current
      const t0 = performance.now()
      const step = (now: number) => {
        const elapsed = now - t0
        const p = Math.min(1, elapsed / durationMs)
        setOpacity(from + (target - from) * p)
        if (p < 1) {
          rafIdRef.current = requestAnimationFrame(step)
        } else {
          rafIdRef.current = null
          onComplete?.()
        }
      }
      rafIdRef.current = requestAnimationFrame(step)
    },
    [cancelFade, setOpacity, opacityRef]
  )

  return { setOpacity, cancelFade, fadeTo }
}

function CinematicVideoBackground() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const opacityRef = useRef(0)
  const fadingOutRef = useRef(false)
  const { setOpacity, cancelFade, fadeTo } = useRafOpacityFade(wrapperRef, opacityRef)

  useEffect(() => {
    setOpacity(0)
  }, [setOpacity])

  useEffect(() => {
    const v = videoRef.current
    if (!v) return

    const onLoadedData = () => {
      cancelFade()
      fadeTo(1, FADE_MS)
    }

    const onTimeUpdate = () => {
      const d = v.duration
      if (!d || !Number.isFinite(d)) return
      const remain = d - v.currentTime
      if (remain <= TAIL_S && remain > 0 && v.currentTime > 0.1 && !fadingOutRef.current) {
        fadingOutRef.current = true
        fadeTo(0, FADE_MS)
      }
    }

    const onEnded = () => {
      cancelFade()
      setOpacity(0)
      fadingOutRef.current = false
      window.setTimeout(() => {
        v.currentTime = 0
        v.play().catch(() => {
          // autoplay / permissions
        })
        fadeTo(1, FADE_MS)
      }, LOOP_GAP_MS)
    }

    v.addEventListener('loadeddata', onLoadedData)
    v.addEventListener('timeupdate', onTimeUpdate)
    v.addEventListener('ended', onEnded)
    return () => {
      v.removeEventListener('loadeddata', onLoadedData)
      v.removeEventListener('timeupdate', onTimeUpdate)
      v.removeEventListener('ended', onEnded)
      cancelFade()
    }
  }, [cancelFade, fadeTo, setOpacity])

  return (
    <div ref={wrapperRef} className="absolute inset-0 z-0" style={{ opacity: 0 }}>
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover translate-y-[17%]"
        src={VIDEO_SRC}
        autoPlay
        muted
        playsInline
        preload="auto"
        aria-hidden
      />
    </div>
  )
}

function NavBar() {
  return (
    <nav className="relative z-20 w-full pl-6 pr-6 py-6">
      <div className="liquid-glass flex max-w-5xl items-center justify-between gap-4 rounded-full px-6 py-3">
        <div className="flex min-w-0 items-center gap-8">
          <div className="flex items-center gap-2 text-white">
            <Globe className="shrink-0" size={24} strokeWidth={1.75} aria-hidden />
            <span className="text-lg font-semibold">Asme</span>
          </div>
          <div className="hidden min-w-0 items-center gap-8 md:flex">
            {(['Features', 'Pricing', 'About'] as const).map((label) => (
              <a
                key={label}
                href="#"
                className="whitespace-nowrap text-sm font-medium text-white/80 transition-colors hover:text-white"
              >
                {label}
              </a>
            ))}
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-3">
          <button type="button" className="whitespace-nowrap text-sm font-medium text-white/90 transition hover:text-white">
            Sign Up
          </button>
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-full bg-white px-6 py-2 text-sm font-medium text-zinc-900 transition hover:bg-white/90"
          >
            Login
          </button>
        </div>
      </div>
    </nav>
  )
}

export function AsmeCinematicPage() {
  const onEmailSubmit = (e: FormEvent) => {
    e.preventDefault()
  }

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-black text-white">
      <CinematicVideoBackground />
      <NavBar />
      <main className="relative z-10 flex min-h-0 w-full flex-1 flex-col items-center justify-center px-6 py-16 text-center -translate-y-[12%] motion-reduce:translate-y-0">
        <h1
          className="mb-10 max-w-[16ch] text-balance text-5xl font-normal leading-[1.05] tracking-[-0.02em] text-white md:mb-12 md:max-w-[20ch] md:text-6xl lg:text-7xl"
          style={{ fontFamily: "'Instrument Serif', serif" }}
        >
          Frame the work. Hold the hush.
        </h1>
        <div className="mx-auto w-full max-w-md space-y-6 md:max-w-lg">
          <form onSubmit={onEmailSubmit} className="w-full" noValidate>
            <div className="cinematic-field flex w-full items-center gap-3 rounded-full py-2 pl-6 pr-2">
              <input
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="Your email"
                className="min-w-0 flex-1 border-0 bg-transparent text-base text-white placeholder:text-white/45 focus:outline-none focus:ring-0"
                aria-label="Email address"
              />
              <button
                type="submit"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white p-3 text-black"
                aria-label="Submit email"
              >
                <ArrowRight className="h-5 w-5" size={20} />
              </button>
            </div>
          </form>
          <p className="px-1 text-pretty text-sm font-normal leading-relaxed text-white/80">
            One note, rarely. When the cut is worth the wait.
          </p>
          <div className="flex justify-center">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-full border border-white/20 bg-transparent px-8 py-3 text-sm font-medium text-white/90 transition hover:border-white/40 hover:text-white"
            >
              Manifesto
            </button>
          </div>
        </div>
      </main>
      <footer className="relative z-10 flex justify-center gap-3 pb-12 text-white/75">
        <a
          href="#"
          className="group rounded-full border border-white/12 bg-black/20 p-4 transition hover:border-white/25 hover:text-white"
          aria-label="Instagram"
        >
          <Instagram className="h-5 w-5" size={20} />
        </a>
        <a
          href="#"
          className="group rounded-full border border-white/12 bg-black/20 p-4 transition hover:border-white/25 hover:text-white"
          aria-label="Twitter"
        >
          <X className="h-5 w-5" size={20} />
        </a>
        <a
          href="#"
          className="group rounded-full border border-white/12 bg-black/20 p-4 transition hover:border-white/25 hover:text-white"
          aria-label="Web"
        >
          <Globe className="h-5 w-5" size={20} />
        </a>
      </footer>
    </div>
  )
}
