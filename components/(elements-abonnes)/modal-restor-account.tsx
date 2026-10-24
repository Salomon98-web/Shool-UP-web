'use client';

import { useState } from "react";
import Link from "next/link";
import { 
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription ,
  DialogClose
} from "@/components/ui/dialog";
import { AlertTriangle } from "lucide-react";
import Loader from "@/components/loading";
import { useToastCustom } from "@/components/ui/toast-custom";

interface Props{
    token:string | undefined
    id:number
    nomAbonne: string
    open:boolean
    onOpenOnChange:(open:boolean)=>void
    onSuccess:()=>void
}

export default function ModalRestorAccount({token, id, nomAbonne, open, onOpenOnChange, onSuccess}:Props){

    const [erreurs, setErreurs] = useState<string[]>([])
    const [loading, setLoading] = useState(false)
    const toast = useToastCustom()

    const handleSubmit = async ()=>{
        setLoading(true)
        const nouvelleErreus: string[] = [];
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/account/activate/${id}`,{
            method:"POST",
            headers:{
                "X-Api-Key":token as string
            } 
        })

        const statusCode = res.status;
         
        if(res.ok){
            toast.success("Abonnement bloqué !")
            setLoading(false) 
            onSuccess()
            onOpenOnChange(false)

        }else{

            const result = await res.json();
            nouvelleErreus.push( `${result.message}`)
            if(nouvelleErreus.length > 0){
                setErreurs(nouvelleErreus)
            }
            toast.error(`${result.message}`)
            setLoading(false)
            /* console.log(result); */
            
        }
    }
    return(
        <>
        <Dialog open={open} onOpenChange={onOpenOnChange}>
            <DialogContent className={`w-96 `}>
                <div className="p-2 flex flex-col gap-14 text-lg ">
                    <p className="">
                        vous êtes sur le point de restaurer le compte de l'utilisateur <strong>{nomAbonne}</strong>
                    </p>
                    <div className="flex flex-row gap-3">
                        
                        <button 
                            onClick={handleSubmit}
                            className={`bg-blue-800 text-white p-2 rounded-sm w-37 h-12 flex justify-center items-center`}>
                                {loading ?(
                                    <Loader />
                                ) : (
                                    
                                    <p id="button-connexion">Restaurer</p>
                                )}
                        </button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
        </>
        
    )
}