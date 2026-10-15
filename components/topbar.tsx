'use client'

import { useState } from "react"
import { Button } from "./ui/button"
import { Settings } from "lucide-react"
import MonCompte from "./(elements-mon-compte)/sheet-menu"

interface Props{
    token:any
    onSuccess:()=>void
}

export default function Topbar({token,onSuccess}:Props){
    const [openModalLogout, setModalLogout] = useState(false)

    return(
        <>
        <div className=" top-0 fixed md:relative h-16 w-full bg-white border border-b-gray-200 z-20  shadow-md">
            <div className="flex justify-end items-center w-full h-full p-3">
                <Button 
                    onClick={()=>{
                        setModalLogout(true)
                    }}
                    className={`bg-blue-800  z-50  text-[11px] hover:bg-blue-700 duration-500`}
                >
                    <Settings/>
                    Mon compte
                </Button>
            </div>
        </div>
        <MonCompte onSuccess={onSuccess} open={openModalLogout} onOpenChange={setModalLogout} token={token} />
        <div className="my-7"></div>
        </>
        
    )
}