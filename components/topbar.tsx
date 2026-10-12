'use client'

import { useState } from "react"
import { Button } from "./ui/button"
import Logout from "./modal-logout"
import AlertSuccess from "./carousel"

export default function Topbar(){
    const [openModalLogout, setModalLogout] = useState(false)

    return(
        <>
        <div className=" top-0 fixed md:relative h-16 w-full bg-white border border-b-gray-200 z-20  shadow-md">
            <div className="flex justify-end items-center w-full h-full p-3">
                <Button 
                    onClick={()=>{
                        setModalLogout(true)
                    }}
                    className={`bg-blue-800  z-50 font-mono text-[11px] hover:bg-blue-700 duration-500`}
                >
                    Déconnexion
                </Button>
            </div>
        </div>
        <Logout open={openModalLogout} onOpenChange={setModalLogout} />
        <div className="my-7"></div>
        </>
        
    )
}