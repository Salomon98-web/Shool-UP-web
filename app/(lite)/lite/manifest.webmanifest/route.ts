import { NextResponse } from 'next/server'

export async function GET() {
  const manifest = {
    "id": "/lite",
    "background_color": "#ffffff",
    "description": "Votre banque d'exercices scolaires avec corrigés.",
    "dir": "ltr",
    "display": "standalone", // "standalone" est recommandé à la place de "minimal-ui"
    "name": "schoolup",
    "short_name": "schoolup",
    "orientation": "any",
    "scope": "https://schoolup.net/lite",
    "start_url": "https://schoolup.net/lite",
    "theme_color": "#ffffff",
    "lang": "fr",
    "categories": [
      "education"
    ],
    "icons": [
      {
        "src": "https://schoolup.net/icons/icon-192x192.png",
        "type": "image/png",
        "sizes": "192x192",
        "purpose": "any maskable"
      },
      {
        "src": "https://schoolup.net/icons/icon-512x512.png",
        "type": "image/png",
        "sizes": "512x512",
        "purpose": "any maskable"
      }
    ]
  }

  return NextResponse.json(manifest, {
    headers: {
      'Content-Type': 'application/manifest+json',
    },
  })
}