/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly NEXT_PUBLIC_VIDEO_HERO?: string
  readonly NEXT_PUBLIC_VIDEO_SECTION_2?: string
  readonly NEXT_PUBLIC_VIDEO_BACKGROUND?: string
  readonly VITE_VIDEO_HERO?: string
  readonly VITE_VIDEO_AETERNA?: string
  readonly VITE_VIDEO_SEVENTH?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
