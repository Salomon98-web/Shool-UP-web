import { NextResponse } from 'next/server'

export async function GET() {
  const manifest = {
    "background_color": "#ffffff",
  "description": "Votre banque d'exercices scolaires avec corrigés.",
  "dir": "ltr",
  "display": "minimal-ui",
  "name": "schoolup",
  "orientation": "any",
  "scope": "https://schoolup.net/lite",
  "short_name": "schoolup",
  "start_url": "https://schoolup.net/lite",
  "theme_color": "#ffffff",
  "icons": [
    {
      "src": "https://schoolup.net/SCHOOL UP_LOGO 1.png",
      "type": "image/png",
      "sizes": "5197x2835",
      "isSquare": false,
      "isPng": true,
      "isWebp": false,
      "isJpg": false,
      "width": 5197,
      "is512x512": false,
      "is256x256": false,
      "is192x192": false
    }
  ],
  "lang": "fr",
  "categories": [
    "education"
  ]
  }
  return NextResponse.json(manifest, {
    headers: { 'Content-Type': 'application/manifest+json' },
  })
}