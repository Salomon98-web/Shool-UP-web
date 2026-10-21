'use client'

import { useState, useEffect } from "react"
import Loader from "@/components/loading";
import { 
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogClose 
} from "./ui/dialog"
import { 
    AlertDialog, 
    AlertDialogDescription, 
    AlertDialogAction, 
    AlertDialogTitle,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogCancel
} from "./ui/alert-dialog";
import { 
    Alert,
    AlertDescription,
    AlertAction,
    AlertTitle 
} from "./ui/alert";
import { Button } from "./ui/button"

interface Props{
    open:boolean
    onOpenChange:(open:boolean)=>void
}

export default function Logout({open, onOpenChange}:Props){
    
    const [loading, setLoading] = useState(false)

    const handlerLogout = async ()=>{
        setLoading(true)
       //console.log('ok')   
        const res = await fetch('/api-logout',{
            method: "POST",
        }) 
        const result = await res.json()
        if(!res.ok){
            setLoading(false)
        }else{
            setLoading(false)
            window.location.href="/login"
        } 
        console.log(result)
    }

    return(
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent className={`w-92`}>
                <AlertDialogHeader className="my-2">
                    <AlertDialogTitle className={`text-md uppercase font-bold text-blue-800`}>
                        Déconnectez-vous
                    </AlertDialogTitle>
                    
                </AlertDialogHeader>
                <hr />
                <div className="flex flex-row justify-center gap-4">
                    <Button
                        onClick={handlerLogout} 
                        className={`w-20 bg-blue-800 hover:bg-blue-900 duration-500 text-xs`}
                    >
                        {loading ? (<Loader />):(" OUI !")}
                        
                    </Button>

                    <AlertDialogCancel className={`w-20 border-2 rounded-lg  text-xs`}>Non !</AlertDialogCancel>
                </div>
            </AlertDialogContent>
        </AlertDialog>
    )
}