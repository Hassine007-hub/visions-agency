/**
 * Vercel Blob URLs — définies dans .env / dashboard Vercel.
 * Préfixe NEXT_PUBLIC_ exposé via import.meta.env (voir vite.config.ts envPrefix).
 * Chaîne de secours VITE_* pour compat avec les anciennes variables locales.
 */

function trimUrl(value: string | undefined): string | undefined {
  const t = value?.trim()
  return t || undefined
}

export function getVideoHeroUrl(): string {
  return (
    trimUrl(import.meta.env.NEXT_PUBLIC_VIDEO_HERO) ??
    trimUrl(import.meta.env.VITE_VIDEO_HERO) ??
    '/immersive-travel-technologique.mp4'
  )
}

export function getVideoBackgroundUrl(): string {
  return (
    trimUrl(import.meta.env.NEXT_PUBLIC_VIDEO_BACKGROUND) ??
    '/montagne-neige.mp4'
  )
}

/** Section portfolio (#portfolio) — première carte démo (AETERNA). */
export function getVideoSection2Url(): string {
  return (
    trimUrl(import.meta.env.NEXT_PUBLIC_VIDEO_SECTION_2) ??
    trimUrl(import.meta.env.VITE_VIDEO_AETERNA) ??
    '/aeterna-demo.mp4'
  )
}

export function getVideoSeventhUrl(): string {
  return trimUrl(import.meta.env.VITE_VIDEO_SEVENTH) ?? '/seventh-demo.mp4'
}
