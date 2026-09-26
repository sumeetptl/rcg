import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'CoinStaq',
    short_name: 'CoinStaq',
    description: 'Intelligence for Digital Markets. Less Noise. More Edge.',
    start_url: '/',
    display: 'standalone',
    background_color: '#000000',
    theme_color: '#000000',
    icons: [
      {
        src: '/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      }
    ],
  }
}
