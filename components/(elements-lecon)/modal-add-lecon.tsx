'use client'

import React, { useState, useEffect, use } from "react"
import Loader from "@/components/loading";
import { useToastCustom } from "@/components/ui/toast-custom";
import { Input } from "../ui/input";
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
import { Textarea } from "../ui/textarea";

interface Props{
    token:string | undefined
    open:boolean
    onOpenChange:(open:boolean)=>void
    onSuccess:()=>void
}

export default function MoadalAddLecon({token, open, onOpenChange, onSuccess,}:Props){

    const [erreurs, setErreurs] = useState<string[]>([])
    const [loading, setLoading] = useState(false)
    const [dataClasse, setdataClasse] = useState<any[]>([]);
    const [val, setVal] = useState<string | null>('');
    const selectedClasse = dataClasse.find((item:any)=>item.name_class === val);
    const classeId = selectedClasse ? selectedClasse.id :"";

    const [dataMatiere, setdataMatiere] = useState<any[]>([]);
    const [valMatiere, setValMatiere] = useState<string | null>('');
    const selectedMatiere = dataMatiere.find((item:any)=>item.nom_matiere === valMatiere);
    const matiereId = selectedMatiere ? selectedMatiere.id :"";

    const toast = useToastCustom()

    useEffect(()=>{
        const classe = async ()=>{
            const res = await fetch(`${[process.env.NEXT_PUBLIC_BASE_URL]}/classe`,{
                method:"GET"
            })
            const statusCode = res.status
            const result = await res.json();

            if(!res.ok){
                setLoading(false)
                setdataClasse([])
                return false
            }else{
                setdataClasse(result)
                console.log(result)
                setLoading(false)
                return result;
            }
        }
        const maitire = async ()=>{
            const res = await fetch(`${[process.env.NEXT_PUBLIC_BASE_URL]}/matiere`,{
                method:"GET"
            })
            const statusCode = res.status
            const result = await res.json();

            if(!res.ok){
                setLoading(false)
                setdataMatiere([])
                return false
            }else{
                setdataMatiere(result)
                console.log(result)
                setLoading(false)
                return result;
            }
        }
        maitire()
        classe()
        if(open == false){
            setVal('')
            setValMatiere('')
        }
    },[open])

    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        setLoading(true)
        const nouvelleErreus: string[] = [];
        const formData = new FormData(e.currentTarget)
        //console.log(formData.get("file"))
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/lecon`,{
            method:"POST",
            headers:{
                "X-Api-Key": token as string,
            },
            body:formData,
        })

        const statusCode = res.status;
        const result = await res.json();
            
        if(!res.ok){
            
            nouvelleErreus.push( `${result[0]?.message}`)
            if(nouvelleErreus.length > 0){
                setErreurs(nouvelleErreus)
            }
            toast.error(nouvelleErreus)
            setLoading(false)
            
        }else{
            toast.success("Ajout réussi")
            setLoading(false) 
            onSuccess()
        }
        /* console.log(result); */
    }

    return(
        <>
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className={`w-96 `}>
                <DialogHeader>
                    <DialogTitle className={`font-mono font-bold text-blue-900 my-6 px-4`}>Nouvelle leçon</DialogTitle>
                </DialogHeader>
                <div className="w-full">
                    <form action="" className="flex flex-col justify-center items-center gap-7" encType="multipart/form-data" onSubmit={handleSubmit}>

                        <div className=" flex flex-col gap-4  p-2 rounded-md w-full">
                            <Textarea  
                                name="titre" 
                                placeholder="Entrer le titre" 
                                required
                            ></Textarea>
                            
                            <input type="hidden" name="classe_id" value={classeId}/>
                            <input type="hidden" name="matiere_id" value={matiereId}/>

                            <Combobox
                                items={dataClasse}
                                value={val}
                                onValueChange={setVal}
                            >
                                <ComboboxInput placeholder="Rechercher une classe..." />
                                <ComboboxContent>
                                    <ComboboxEmpty>
                                        Aucune catégorie.
                                    </ComboboxEmpty>

                                    <ComboboxList className={`uppercase`}>
                                        {(item)=>(
                                            <ComboboxItem 
                                                key={item.id} 
                                                value={item.name_class}
                                                className={`uppercase`}
                                            >
                                                {item.name_class}
                                                
                                            </ComboboxItem>
                                        )}
                                    </ComboboxList>
                                </ComboboxContent>
                            </Combobox>

                            <Combobox
                                items={dataMatiere}
                                value={valMatiere}
                                onValueChange={setValMatiere}
                            >
                                <ComboboxInput placeholder="Rechercher une matière..." />
                                <ComboboxContent>
                                    <ComboboxEmpty>
                                        Aucune catégorie.
                                    </ComboboxEmpty>

                                    <ComboboxList className={`uppercase`}>
                                        {(item)=>(
                                            <ComboboxItem 
                                                key={item.id} 
                                                value={item.nom_matiere}
                                                className={`uppercase`}
                                            >
                                                {item.nom_matiere}
                                                
                                            </ComboboxItem>
                                        )}
                                    </ComboboxList>
                                </ComboboxContent>
                            </Combobox>
                        </div>
                        

                        <button 
                            type="submit"
                            className="bg-blue-950 p-2 text-white font-mono text-[12px] rounded-sm w-32 h-8"
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
        </>
        
    )
}