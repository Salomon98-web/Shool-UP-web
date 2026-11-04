// public/sw.js - Version PWABuilder compatible
importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js');
const { registerRoute } = workbox.routing;  
const { CacheFirst, StaleWhileRevalidate } = workbox.strategies;
registerRoute(  
    ({request}) => request.destination === 'image',  
    new CacheFirst()  
);  
registerRoute(  
    ({request}) => request.destination === 'style' || request.destination === 'script',  
    new StaleWhileRevalidate()  
);
// TA PARTIE PUSH - OBLIGATOIRE  
/* self.addEventListener('push', function (event) {  
    const data = event.data ? event.data.json() : { title: 'Test', body: 'Nouvelle notif !' } 
     
    event.waitUntil(  
        self.registration.showNotification(data.title, {  
        body: data.body,  
        icon: '/icon1.png'  
        })  
    )  
}) */

// public/sw.js
self.addEventListener('push', function (event) {
    let data = { title: 'Test', body: 'Nouvelle notif !' };

    if (event.data) {
        try {
            // Tente de parser le JSON envoyé par votre backend Yii2
            data = event.data.json();
        } catch (e) {
            // Si c'est du texte brut ou vide (comme le bouton Test de Chrome DevTools)
            const text = event.data.text();
            if (text) {
                data = { title: 'Notification', body: text };
            }
        }
    }

    event.waitUntil(
        self.registration.showNotification(data.title, {
            body: data.body,
            icon: '/icon1.png'
        })
    );
});