import { resolveLogoVisionsUrl, resolveLogoVisionsVideoUrl } from '@/lib/publicLogoUrls'

const ALT_LOGO = 'Logo Visions Agency'

type LogoStillProps = {
  width: number
  height: number
  className?: string
  loading?: 'lazy' | 'eager'
}

/** Logo raster depuis Blob ; Vite : pas de next/image — img + dimensions pour limiter le CLS. */
export function LogoVisionsStill({ width, height, className, loading = 'lazy' }: LogoStillProps) {
  const src = resolveLogoVisionsUrl()
  if (!src) {
    return (
      <span
        className={className}
        style={{
          display: 'inline-block',
          width,
          height,
          background: 'transparent',
        }}
        aria-hidden
      />
    )
  }
  return (
    <img
      src={src}
      alt={ALT_LOGO}
      width={width}
      height={height}
      loading={loading}
      decoding="async"
      className={className}
      style={{ objectFit: 'contain', display: 'block' }}
    />
  )
}

type LogoAnimProps = {
  size: number
  /** Opacité du média vidéo (le fond du cercle reste opaque). */
  opacity?: number
}

export function LogoVisionsAnimVideo({ size, opacity = 1 }: LogoAnimProps) {
  const src = resolveLogoVisionsVideoUrl()
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        background: '#000',
        flexShrink: 0,
      }}
      aria-hidden
    >
      {src ? (
        <video
          src={src}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          width={size}
          height={size}
          style={{
            objectFit: 'contain',
            display: 'block',
            width: '100%',
            height: '100%',
            opacity,
          }}
          aria-hidden
        />
      ) : null}
    </div>
  )
}
