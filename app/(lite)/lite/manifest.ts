import type { MetadataRoute } from "next";

export default function manifest():MetadataRoute.Manifest{
    return{
        name: 'School UP Lite',
        short_name: 'School UP',
        description: 'School UP version Lite',
        start_url: '/lite',
        display: 'standalone',
        background_color: '#020617',
        theme_color: '#020617',
        orientation: 'portrait',
        scope: '/lite',
        lang: 'fr',
        categories: ['school'],
        icons:[
            {
                src: '/icon.png'
            }
        ],
        shortcuts:[
            {
                name: 'Accueil Lite',
                url: '/lite',
                description: "Aller à l'accueil"
            },
        ]
    }
}