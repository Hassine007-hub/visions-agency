/**
 * Vidéos agence VISIONS — uniquement trois variables alignées sur Vercel.
 *
 * Next.js : `process.env.NEXT_PUBLIC_*`
 * Vite (ce projet) : `import.meta.env.NEXT_PUBLIC_*` — mêmes noms que sur Vercel.
 *
 * Aucune URL locale en secours : si une variable est vide, la valeur résolue est
 * `undefined` ; les composants affichent un fond noir sans monter de `<video src="">`.
 */

function trimUrl(value: string | undefined): string | undefined {
  const t = value?.trim()
  return t || undefined
}

/** Fond plein écran — landing / cinematic utilisant la même source. */
export function resolveLandingBgVideoUrl(): string | undefined {
  return trimUrl(import.meta.env.NEXT_PUBLIC_VIDEO_LENDING_BG)
}

/** Carte portfolio — immobilier luxe AETERNA. */
export function resolveDemoAeternaVideoUrl(): string | undefined {
  return trimUrl(import.meta.env.NEXT_PUBLIC_VIDEO_DEMO_AERTENA)
}

/** Carte portfolio — club privé Seventh. */
export function resolveDemoSeventhVideoUrl(): string | undefined {
  return trimUrl(import.meta.env.NEXT_PUBLIC_VIDEO_DEMO_SEVENTH)
}
