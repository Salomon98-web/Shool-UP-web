'use client'

import React, { useState, useEffect, use } from "react"
import Loader from "@/components/loading";
import { useToastCustom } from "@/components/ui/toast-custom";
import { 
    Dialog,
    DialogContent,
    DialogHeader,
    DialogDescription,
    DialogTitle,
    DialogFooter
} from "@/components/ui/dialog"

interface Props{
    token:string | undefined
    open:boolean
    leconValue:string
    id:number
    onOpenChange:(open:boolean)=>void
    onSuccess:()=>void
}

export default function ModalUpdateLecon({token, open, leconValue, id, onOpenChange, onSuccess}:Props){

    const [erreurs, setErreurs] = useState<string[]>([])
    const [loading, setLoading] = useState(false)
    const [valueInputTextName, setValueInputTextName] = useState(leconValue)
    const toast = useToastCustom()

    useEffect(()=>{
        setValueInputTextName(leconValue)
        if(open == false){
        }
    },[leconValue, open])

    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        setLoading(true)
        const nouvelleErreus: string[] = [];
        const formData = new FormData(e.currentTarget)
        console.log(formData.get("file"))
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/lecon/update/${id}`,{
            method:"POST",
            headers:{
                "X-Api-Key": token as string,
            },
            body:formData,
        })

        const statusCode = res.status;
        const result = await res.json();
            
        if(!res.ok){
            
            nouvelleErreus.push( `${result.message}`)
            if(nouvelleErreus.length > 0){
                setErreurs(nouvelleErreus)
            }
            toast.error(nouvelleErreus);
            setLoading(false)
            
        }else{
            toast.success("Modification réussie")
            setLoading(false) 
            onSuccess()
            onOpenChange(false)
        }
        /* console.log(result); */
    }

    return(
        <>
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className={`w-96 `}>
                <DialogHeader>
                    <DialogTitle className={` font-bold text-blue-900 my-6 px-4`}>
                        Modifier
                    </DialogTitle>
                </DialogHeader>
                <div className="px-4"> Vous voulez modifier <strong>{leconValue}</strong></div>
                <div className="w-full">
                    <form action="" className="flex flex-col justify-center items-center gap-7" encType="multipart/form-data" onSubmit={handleSubmit}>

                        {/* <div className="w-full flex flex-col gap-4  p-2 rounded-md">
                            
                                <Input 
                                    type="text" 
                                    name="nom_matiere" 
                                    placeholder="Entrer le nouveau nom"
                                    onChange={(e)=> setValueInputTextName(e.target.value)} 
                                    
                                />
                                
                            </div>
                        */}
                        <textarea 
                            name="titre" 
                            className="w-full p-2 h-20 border rounded-lg"
                            placeholder="Entrer le nouveau titre"
                            onChange={(e)=> setValueInputTextName(e.target.value)} 
                            value={valueInputTextName} 
                        >
                            {valueInputTextName}
                        </textarea>
                        

                        <button 
                            type="submit"
                            className="bg-blue-950 p-2 text-white  text-lg rounded-sm w-32 h-8"
                        >
                            {loading ?(
                                <Loader />
                            ) : (
                                
                                <p id="button-connexion">Modifier</p>
                            )}
                            
                        </button>
                    </form>
                </div>
            </DialogContent>
        </Dialog>
        </>
        
    )
}