/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly NEXT_PUBLIC_VIDEO_LENDING_BG?: string
  readonly NEXT_PUBLIC_VIDEO_DEMO_AERTENA?: string
  readonly NEXT_PUBLIC_VIDEO_DEMO_SEVENTH?: string
  readonly NEXT_PUBLIC_LOGO_VISIONS?: string
  readonly NEXT_PUBLIC_LOGO_VISIONS_VIDEO?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
