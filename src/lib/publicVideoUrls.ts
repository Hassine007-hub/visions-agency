/**
 * Vidéos — uniquement les trois variables NEXT_PUBLIC_* définies dans `.env` / Vercel.
 * Voir `.env.example`.
 */

function trimUrl(value: string | undefined): string | undefined {
  const t = value?.trim()
  return t || undefined
}

/** Fond landing (hero principal du site). */
export function getVideoLandingBgUrl(): string {
  return (
    trimUrl(import.meta.env.NEXT_PUBLIC_VIDEO_LENDING_BG) ??
    '/immersive-travel-technologique.mp4'
  )
}

/** Démo portfolio — projet immobilier luxe. */
export function getVideoDemoAeternaUrl(): string {
  return (
    trimUrl(import.meta.env.NEXT_PUBLIC_VIDEO_DEMO_AERTENA) ??
    '/aeterna-demo.mp4'
  )
}

/** Démo portfolio — club privé (Safran). */
export function getVideoDemoSafranUrl(): string {
  return trimUrl(import.meta.env.NEXT_PUBLIC_VIDEO_DEMO_SAFRAN) ?? '/seventh-demo.mp4'
}
