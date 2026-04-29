/**
 * Logos VISIONS — `NEXT_PUBLIC_*` alignés sur Vercel.
 * Next.js : `process.env.NEXT_PUBLIC_*` · Vite : `import.meta.env.NEXT_PUBLIC_*`.
 */

function trimUrl(value: string | undefined): string | undefined {
  const t = value?.trim()
  return t || undefined
}

/** Logo statique (PNG / SVG / WebP selon l’URL Blob). */
export function resolveLogoVisionsUrl(): string | undefined {
  return trimUrl(import.meta.env.NEXT_PUBLIC_LOGO_VISIONS)
}

/** Logo animé (vidéo courte, ex. MP4 sur Blob). */
export function resolveLogoVisionsVideoUrl(): string | undefined {
  return trimUrl(import.meta.env.NEXT_PUBLIC_LOGO_VISIONS_VIDEO)
}

export function hasLogoVisionsStillAsset(): boolean {
  return Boolean(trimUrl(import.meta.env.NEXT_PUBLIC_LOGO_VISIONS))
}
