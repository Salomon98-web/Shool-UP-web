'use client'

import React, { useState, useEffect, use } from "react"
import ModalErrors from "@/components/modal-error";
import ModalSuccess from "@/components/modal-succes";
import Loader from "@/components/loading";
import { Input } from "../ui/input";
import { useToastCustom } from "@/components/ui/toast-custom";
import { 
    Dialog,
    DialogContent,
    DialogHeader,
    DialogDescription,
    DialogTitle,
    DialogFooter
} from "@/components/ui/dialog"
import Image from "next/image";
import { Textarea } from "../ui/textarea";

interface Props{
    token:string | undefined
    open:boolean
    onOpenChange:(open:boolean)=>void
    onSuccess:()=>void
}

export default function MoadalAddCategory({token, open, onOpenChange, onSuccess}:Props){
    const [openModalErros, setOpenModalErros] = useState(false);
    const [openModalSuccess, setOpenModaalSuccess] = useState(false)
    const [message, setMessage] = useState<string>('')
    const [erreurs, setErreurs] = useState<string[]>([])
    const [loading, setLoading] = useState(false)
    const [preview, setPreview] = useState<string>("")
    const toast = useToastCustom()

    useEffect(()=>{
        if(open == false){
            setPreview('');
        }
    },[open])

    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        setLoading(true)
        const nouvelleErreus: string[] = [];
        const formData = new FormData(e.currentTarget)
        //console.log(formData.get("file"))
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/category`,{
            method:"POST",
            headers:{
                "X-Api-Key": token as string,
            },
            body:formData,
        })

        const statusCode = res.status;
        const result = await res.json();
            
        if(!res.ok){

            if(result?.message){
                nouvelleErreus.push( `${result.message}`)
                if(nouvelleErreus.length > 0){
                    setErreurs(nouvelleErreus)
                } 
            }else if(result[0].message){
                nouvelleErreus.push( `${result[0]?.message}`)
                if(nouvelleErreus.length > 0){
                    setErreurs(nouvelleErreus)
                } 
            }
            
            toast.error(nouvelleErreus)
            setLoading(false)
            
        }else{
            toast.success("Ajout réussi")
            setLoading(false) 
            onSuccess()
        }
        console.log(result);
    }

    return(
        <>
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className={`w-96 `}>
                <DialogHeader>
                    <DialogTitle className={` font-bold text-blue-900 my-6 px-4`}>Nouvelle catégorie</DialogTitle>
                </DialogHeader>
                <div className="">
                    <form action="" className="flex flex-col justify-center items-center gap-7" encType="multipart/form-data" onSubmit={handleSubmit}>

                        <div className=" flex flex-col gap-4  p-2 rounded-md w-full">
                            <Textarea 
                                name="name" 
                                placeholder="Entrer le nom" 
                                required
                            ></Textarea>
                            <Input 
                                type="file" 
                                name="file" 
                                accept="image/*"
                                required
                                onChange={(e)=>{
                                    const f = e.target.files?.[0]
                                    if(f){ 
                                        setPreview(URL.createObjectURL(f));
                                    }
                                }}
                            />
                            <div className="w-full h-38 border rounded-lg">
                                {preview && <Image src={preview} width={96} height={96} className="w-full h-full object-cover rounded-lg" alt="" />}
                            </div>
                            
                        </div>
                        

                        <button 
                            type="submit"
                            className="bg-blue-950 p-2 text-white  text-lg rounded-sm w-32 h-8"
                        >
                            {loading ?(
                                <Loader />
                            ) : (
                                
                                <p id="button-connexion">AJOUTER</p>
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