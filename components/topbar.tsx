'use client'

import { useState, useEffect } from "react"
import { Button } from "./ui/button"
import { Settings, BellDot } from "lucide-react"
import MonCompte from "./(elements-mon-compte)/sheet-menu"
import Link from "next/link"

interface Props{
    token:any
    onSuccess:()=>void
}

export default function Topbar({token,onSuccess}:Props){
    const [openModalLogout, setModalLogout] = useState(false)

    const [dataNotif, setDataNotif] = useState([])

    useEffect(()=>{
        const notif = async ()=>{
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/notification/get`,{
                method:"GET",
                headers:{
                    "X-Api-Key": token as string,
                }
            })

            const result = await res.json()
            if(!res.ok){
                setDataNotif([])
            }else{
                setDataNotif(result)
            }

            console.log(result)
        }
        notif()
    },[])

    return(
        <>
        <div className=" top-0 fixed md:relative h-16 w-full bg-white border border-b-gray-200 z-20  shadow-md">
            <div className="flex flex-row gap-3.5 justify-end items-center w-full h-full p-3">
                    <div className="w-auto h-auto bg-red-800 p-1 rounded-full text-white relative bottom-3 left-3 
                        text-center ">
                        {dataNotif.length}
                    </div>
                <Link href={`/notification`}>
                    <BellDot className="relative bottom-3" />
                </Link>
                <Button 
                    onClick={()=>{
                        setModalLogout(true)
                    }}
                    className={`bg-blue-800  z-50  text-md hover:bg-blue-700 duration-500 relative bottom-3`}
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