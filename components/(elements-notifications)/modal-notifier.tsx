'use client'

import React, { useState, useEffect, use } from "react"
import Loader from "@/components/loading";
import { Input } from "../ui/input";
import { File, ArrowBigLeft, ArrowBigRight } from "lucide-react";
import { 
    Dialog,
    DialogContent,
    DialogHeader,
    DialogDescription,
    DialogTitle,
    DialogFooter
} from "@/components/ui/dialog"
import { 
    Combobox,
    ComboboxGroup,
    ComboboxContent,
    ComboboxInput,
    ComboboxItem,
    ComboboxEmpty,
    ComboboxList 
} from "../ui/combobox";
import { useToastCustom } from "@/components/ui/toast-custom";

interface Props{
    token:string | undefined
    open:boolean
    onOpenChange:(open:boolean)=>void
    onSuccess:()=>void
    message:string | undefined
}

export default function MoadalNotifier({token, open, onOpenChange, onSuccess,message}:Props){
    {/**step */}
    const [step, setStep] = useState(0)

    const [erreurs, setErreurs] = useState<string[]>([])
    const [loading, setLoading] = useState(false)
    {/**classe */}
    const [valClasse, setValClasse] = useState<string | null>('');
    const [dataClasse, setDataClasse] = useState<any[]>([]);
    const selectedClass = dataClasse.find((item:any)=>item.name_class === valClasse);
    const classeId = selectedClass ? selectedClass.id :"";

    const toast = useToastCustom()
    
    useEffect(()=>{
        const classes = async ()=>{
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/classe`,{
                method:"GET"
            })
            const status = res.status
            const result = await res.json()
            if(!res.ok){
                setDataClasse([])
            }else{
                
                setDataClasse(result)
                console.log(result)
            }
        }
        classes()
        
        if(open == false){
            setValClasse('')
            setStep(0)
        }
    },[open, step, classeId])

    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        setLoading(true)
        const nouvelleErreus: string[] = [];
        const formData = new FormData(e.currentTarget)
        //console.log(formData.get("file"))
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/notification`,{
            method:"POST",
            headers:{
                "X-Api-Key": token as string,
            },
            body:formData,
        })

        const statusCode = res.status;
       
        if(res.ok){
            //console.log(dataResult)
            toast.success("Ajout réussi")
            setLoading(false) 
            onSuccess()
            setValClasse('')
        }else{

            const result = await res.json();
            if(result[0]?.message === undefined){
                nouvelleErreus.push( `${result.message}`)
                if(nouvelleErreus.length > 0){
                    setErreurs(nouvelleErreus)
                }  
            }else{
               nouvelleErreus.push( `${result[0]?.message}`)
                if(nouvelleErreus.length > 0){
                    setErreurs(nouvelleErreus)
                } 
            }
            toast.error(nouvelleErreus)
            setLoading(false)
            console.log(result);
        }
        
    }

    return(
        <>
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className={`w-96 `}>
                <DialogHeader>
                    <DialogTitle className={` font-bold text-blue-900 my-6 px-4`}>Notifier les utilisateurs</DialogTitle>
                </DialogHeader>
                
                <div className="w-full">
                    <form action="" className="flex flex-col justify-center items-center gap-7 h-40 relative top-6" encType="multipart/form-data" onSubmit={handleSubmit}>
                            
                        <input type="hidden" name="target_id" value={classeId} />
                        <input type="hidden" name="title" value={`Nouveauté`} />
                        <input type="hidden" name="body" value={message} />

                        <div className={`w-full flex flex-col gap-2`}>
                            {/** classe*/}
                            <Combobox
                                items={dataClasse}
                                value={valClasse}
                                onValueChange={(e)=>{
                                    setValClasse(e)
                                    //console.log(classeId)
                                }}
                            >
                                <ComboboxInput placeholder="Rechercher une classe..." className={`h-12`} />
                                <ComboboxContent>
                                    <ComboboxEmpty>
                                        Aucune classe.
                                    </ComboboxEmpty>

                                    <ComboboxList className={`uppercase `}>
                                        {(item)=>(
                                            <ComboboxItem 
                                                key={item.id} 
                                                value={item.name_class}
                                                className={`uppercase`}
                                                onClick={()=>{
                                                    
                                                }}
                                            >
                                                {item.name_class}
                                                
                                            </ComboboxItem>
                                        )}
                                    </ComboboxList>
                                </ComboboxContent>
                            </Combobox>
                        </div>
                        <button 
                            type="submit"
                            className="bg-blue-700 p-2 text-white  text-lg rounded-sm w-full h-12"
                        >
                            {loading ?(
                                <Loader />
                            ) : (
                                
                                <p id="button-connexion">ENVOYER</p>
                            )}
                            
                        </button>
                    </form>
                    <div className="my-4"></div>
                </div>
            </DialogContent>
        </Dialog>
        </>
        
    )
}