'use client'

import React, { useState, useEffect, use } from "react"
import ModalErrors from "@/components/modal-error";
import ModalSuccess from "@/components/modal-succes";
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
import { Textarea } from "../ui/textarea";

interface Props{
    token:string | undefined
    open:boolean
    matiereValue:string
    id:number
    onOpenChange:(open:boolean)=>void
    onSuccess:()=>void
}

export default function ModalUpdateMatiere({token, open, matiereValue, id, onOpenChange, onSuccess}:Props){
    const [openModalErros, setOpenModalErros] = useState(false);
    const [openModalSuccess, setOpenModaalSuccess] = useState(false)
    const [message, setMessage] = useState<string>('')
    const [erreurs, setErreurs] = useState<string[]>([])
    const [loading, setLoading] = useState(false)
    const [valueInputTextName, setValueInputTextName] = useState(matiereValue)
    const toast = useToastCustom()

    useEffect(()=>{
        setValueInputTextName(matiereValue)
        if(open == false){
        }
    },[matiereValue, open])

    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        setLoading(true)
        const nouvelleErreus: string[] = [];
        const formData = new FormData(e.currentTarget)
        console.log(formData.get("file"))
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/matiere/update/${id}`,{
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
            toast.error(nouvelleErreus)
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
                <div className="px-4"> Vous voulez modifier <strong>{matiereValue}</strong></div>
                <div className="w-full">
                    <form action="" className="flex flex-col justify-center items-center gap-7" encType="multipart/form-data" onSubmit={handleSubmit}>

                        <div className="w-full flex flex-col gap-4  p-2 rounded-md">
                            
                            <Textarea 
                                name="nom_matiere" 
                                placeholder="Entrer le nouveau nom"
                                onChange={(e)=> setValueInputTextName(e.target.value)} 
                                value={valueInputTextName} 
                            ></Textarea>
                            
                        </div>
                        

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

        <ModalErrors open={openModalErros} onOpenChange={setOpenModalErros} errors={erreurs} />
        <ModalSuccess open={openModalSuccess} onOpenChange={setOpenModaalSuccess} message={message} />
        </>
        
    )
}