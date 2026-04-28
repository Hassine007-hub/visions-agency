export const brand = {
  name: 'LUMIÈRE',
  tagline: 'The Art of Living',
  bg: '#060506',
  bgMid: '#0d0b0e',
  accent: '#c9a96e',
  accentLight: '#e8d4a8',
  text: '#f2ede6',
  textMuted: 'rgba(242,237,230,0.45)',
  glass: 'rgba(255,255,255,0.03)',
  glassBorder: 'rgba(255,255,255,0.09)',
} as const

export const products = [
  {
    id: 'parfum',
    name: 'Parfum N°1',
    subtitle: 'Oud Ambré',
    description: 'Une fragrance qui marque le temps.',
    model: '/models/parfum.glb',
    accent: '#c9a96e',
  },
  {
    id: 'bougie',
    name: 'Bougie Ambre',
    subtitle: 'Cire de Soja',
    description: 'Chaleur, silence, présence.',
    model: '/models/bougie.glb',
    accent: '#d4a877',
  },
  {
    id: 'bague',
    name: 'Bague Éternelle',
    subtitle: 'Or 18 carats',
    description: 'Le temps gravé dans le métal.',
    model: '/models/bague.glb',
    accent: '#e8d4a8',
  },
] as const

// Picsum seeds choisies pour cohérence visuelle sombre/moody
export const galleryImages = [
  'https://picsum.photos/seed/lum1/700/900',
  'https://picsum.photos/seed/lum2/700/900',
  'https://picsum.photos/seed/lum3/700/900',
  'https://picsum.photos/seed/lum4/700/900',
  'https://picsum.photos/seed/lum5/700/900',
  'https://picsum.photos/seed/lum6/700/900',
  'https://picsum.photos/seed/lum7/700/900',
  'https://picsum.photos/seed/lum8/700/900',
]
