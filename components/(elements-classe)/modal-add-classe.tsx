'use client'

import React, { useState, useEffect, use } from "react"
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
import { 
    Combobox,
    ComboboxGroup,
    ComboboxContent,
    ComboboxInput,
    ComboboxItem,
    ComboboxEmpty,
    ComboboxList 
} from "../ui/combobox";

interface Props{
    token:string | undefined
    open:boolean
    onOpenChange:(open:boolean)=>void
    onSuccess:()=>void
}

export default function MoadalAddClasse({token, open, onOpenChange, onSuccess,}:Props){

    const [erreurs, setErreurs] = useState<string[]>([])
    const [loading, setLoading] = useState(false)
    const [dataCategory, setDataCategory] = useState<any[]>([]);
    const [val, setVal] = useState<string | null>('');
    const selectedCategory = dataCategory.find((item:any)=>item.name === val);
    const categoryId = selectedCategory ? selectedCategory.id :"";
    const toast = useToastCustom()

    useEffect(()=>{
        const categories = async ()=>{
            const res = await fetch(`${[process.env.NEXT_PUBLIC_BASE_URL]}/category`,{
                method:"GET"
            })
            const statusCode = res.status
            const result = await res.json();

            if(!res.ok){
                setLoading(false)
                setDataCategory([])
                return false
            }else{
                setDataCategory(result)
                console.log(result)
                setLoading(false)
                return result;
            }
        }
        categories()
        if(open == false){
            setVal('')
        }
    },[open])

    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        setLoading(true)
        const nouvelleErreus: string[] = [];
        const formData = new FormData(e.currentTarget)
        //console.log(formData.get("file"))
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/classe`,{
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
        console.log(result);
    }

    return(
        <>
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className={`w-96 `}>
                <DialogHeader>
                    <DialogTitle className={`font-mono font-bold text-blue-900 my-6 px-4`}>Nouvelle classe</DialogTitle>
                </DialogHeader>
                <div className="w-full">
                    <form action="" className="flex flex-col justify-center items-center gap-7" encType="multipart/form-data" onSubmit={handleSubmit}>

                        <div className=" flex flex-col gap-4  p-2 rounded-md w-full">
                            <Input 
                                type="text" 
                                name="name_class" 
                                placeholder="Entrer le nom" 
                                required
                            />
                            
                            <input type="hidden" name="cycle_id" value={categoryId}/>
                            <Combobox
                                items={dataCategory}
                                value={val}
                                onValueChange={setVal}
                            >
                                <ComboboxInput placeholder="Rechercher une catégorie..." />
                                <ComboboxContent>
                                    <ComboboxEmpty>
                                        Aucune catégorie.
                                    </ComboboxEmpty>

                                    <ComboboxList className={`uppercase`}>
                                        {(item)=>(
                                            <ComboboxItem 
                                                key={item.id} 
                                                value={item.name}
                                                className={`uppercase`}
                                            >
                                                {item.name}
                                                
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