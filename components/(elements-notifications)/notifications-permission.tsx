'use client'

import { useState, useEffect } from "react"
import { 
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogOverlay,
    DialogPortal,
    DialogTitle,
    DialogTrigger,
} from "../ui/dialog"
import { Bell, BellDot } from "lucide-react"
import { Switch } from "../ui/switch"
import { useToastCustom } from "@/components/ui/toast-custom";
import GenerateDeviceId from "@/functions/generate-device-id"

interface Props{
    open:boolean,
    onOpenchange:(open:boolean)=>void
}

export default function NotificationsPermission({open, onOpenchange}:Props){
    const [checkedDevice, setCheckedDevice] = useState(false)
    const [permission, setPermission] = useState<NotificationPermission>("default")
    const [isSupported, setIsSupported] = useState(false)

    const deviceId = GenerateDeviceId()

    useEffect(()=>{
        /**On verifie si le navigateur supporte la permission pour les notification */
        if("Notification" in window && "serviceWorker" in navigator && "PushManager" in window){
            setIsSupported(true)
            setPermission(Notification.permission)
        }

        navigator.serviceWorker.register('/sw.js')
        .then((registration) => {
            console.log('Service Worker enregistré avec succès :', registration.scope);
        })
        .catch((error) => {
            console.error('Échec de l’enregistrement du Service Worker :', error);
        });
        
        /* console.log(localStorage.getItem("push-subscription")) */
    },[isSupported])

    const demanderPermission = async () =>{

        const result = await Notification.requestPermission()
        /* console.log(result) */
        setPermission(result)

        if(result === 'denied'){ 
            
            return
        }

        const registration = await navigator.serviceWorker.getRegistration() || await navigator.serviceWorker.register('/sw.js')
        console.log(registration)
        const vapidkey = 'BA-p7T6fpN_cSGSlYNzVny0InaSSzwk_biJzQE__x9DIOUw0CS42XHjJUkZaCWECaNknbsN1GUoDyMtCOvulqdk'

        const subscription = await registration.pushManager.subscribe({
            userVisibleOnly:true,
            applicationServerKey:urlBase64ToUint8Array(vapidkey)
        })

        localStorage.setItem("push-subscription", JSON.stringify(subscription))
        console.log(JSON.stringify(subscription))

        localStorage.setItem("deviceId", deviceId)
        // 1. Récupérer l'objet via toJSON() et le typer pour éviter l'erreur TypeScript
        const subJson = subscription.toJSON() as {
            endpoint: string;
            keys?: {
                p256dh: string;
                auth: string;
            };
        };

        // 2. Extraire les valeurs en toute sécurité
        const endpoint = subJson.endpoint;
        const p256dh = subJson.keys?.p256dh || '';
        const auth = subJson.keys?.auth || '';
        const device = localStorage.getItem("deviceId") as any

        // 3. Créer et remplir le FormData
        const formData = new FormData();
        formData.append("device", device);
        formData.append("endpoint", endpoint);
        formData.append("p256dh", p256dh);
        formData.append("auth", auth);
        /* console.log(formData.get("endpoint"))
        console.log(formData.get("p256dh"))
        console.log(formData.get("auth")) */

        await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/device`,{
            method:"POST",
            body:formData
        })
        
    }

    if(!isSupported){
        return
    }

    if(permission === 'denied' || permission === 'granted'){
        return
    }
    
    return(
        <>
        <Dialog open={open} onOpenChange={onOpenchange}>
            <DialogContent className={`w-96`}>
                <DialogHeader>
                    <DialogTitle className={`flex flex-row gap-3.5 items-center`}>
                        <BellDot height={50} width={50} className="text-blue-900 font-bold "/>
                        <p className="">Autoriser les notifications</p>
                    </DialogTitle>
                </DialogHeader>
                <hr />
                <div className="flex flex-row justify-center items-center gap-2.5">
                    <Switch onCheckedChange={demanderPermission} />
                </div>
            </DialogContent>
        </Dialog>
        </>
    )
}

function urlBase64ToUint8Array(base64String:any){
    const padding = "=".repeat((4-base64String.length % 4)%4)
    const base64 = (base64String+padding).replace(/-/g,"+").replace(/_/g,"/")
    const rawData = window.atob(base64)
    const outputArray = new Uint8Array(rawData.length)

    for(let i=0; i< rawData.length; i++){
        outputArray[i] = rawData.charCodeAt(i)
    }

    return outputArray
}