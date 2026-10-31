'use client'

import { useState, useEffect } from "react"

export default function useIsApk(){
    const [isApk, setIsApk] = useState(false)

    useEffect(()=>{
        const isTwa = document.referrer.includes('android-app://')
        const isStandalone = window.matchMedia('(display-mode:standalone)').matches
        const isAndroid = /Android/i.test(navigator.userAgent)
        
        if(isTwa || (isStandalone && isAndroid)){
            setIsApk(true)
        }
        
    },[])

    return isApk
}