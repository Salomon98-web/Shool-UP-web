export async function GET() {
  const manifest = {
    name: 'Mon App Lite',
    short_name: 'Lite',
    start_url: '/lite',
    display: 'standalone',
    background_color: '#020617',
    theme_color: '#020617',
    scope: '/lite',
    icons: [
      { src: '/icon.png', sizes: '512x512', type: 'image/png', purpose: 'any' }
    ]
  }

  return new Response(JSON.stringify(manifest), {
    headers: { 'Content-Type': 'application/manifest+json' },
  })
}