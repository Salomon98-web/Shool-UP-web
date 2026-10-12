'use client';

import { useState } from "react";
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
    matiereName: string
    open:boolean
    onOpenOnChange:(open:boolean)=>void
    onSuccess:()=>void
}

export default function ModalDeleteMatiere({token, id, matiereName, open, onOpenOnChange, onSuccess}:Props){

    const [erreurs, setErreurs] = useState<string[]>([])
    const [loading, setLoading] = useState(false)
    const toast = useToastCustom()

    const handleSubmit = async ()=>{
        setLoading(true)
        const nouvelleErreus: string[] = [];
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/matiere/delete/${id}`,{
            method:"POST",
            headers:{
                "X-Api-Key":token as string
            }
            
        })

        const statusCode = res.status;
        const result = await res.json();
            
        if(!res.ok){

            nouvelleErreus.push( `${result.message}`)
            if(nouvelleErreus.length > 0){
                setErreurs(nouvelleErreus)
            }
            toast.error(nouvelleErreus)
            setLoading(false)
            
        }else{
            toast.success("Suprression réussie")
            setLoading(false) 
            onSuccess()
            onOpenOnChange(false)
        }
        /* console.log(result); */
    }
    return(
        <>
        <Dialog open={open} onOpenChange={onOpenOnChange}>
            <DialogContent className={`w-96 `}>
                <DialogHeader className=" p-6 text-yellow-600 font-mono ">
                    <DialogTitle className={`flex flex-row items-center gap-3 w-full font-bold`}>
                        <AlertTriangle width={45} height={45}/>
                        Avertissement 
                    </DialogTitle>
                </DialogHeader>
                <div className="p-2 flex flex-col gap-14 text-lg font-mono text-[12px]">
                    <p className="">
                        vous êtes sur le point de supprimer le/la/l' <strong>{matiereName}</strong>, êtes-vous sur de vouloir continuer ?
                        <span className="text-chart-2"> cela entrainera la suppression de toutes les données de cette matière ( leçons, exercices, exercices gratuits...)</span>
                    </p>
                    <div className="flex flex-row gap-3">
                        <DialogClose className={`bg-blue-950 text-white p-2 rounded-sm w-37 h-12`}>Non</DialogClose>
                        
                        <button 
                            onClick={handleSubmit}
                            className={`bg-red-600 text-white p-2 rounded-sm w-37 h-12 flex justify-center items-center`}>
                                {loading ?(
                                    <Loader />
                                ) : (
                                    
                                    <p id="button-connexion">Oui supprimer !</p>
                                )}
                        </button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
        </>
        
    )
}