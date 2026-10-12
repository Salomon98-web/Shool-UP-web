'use client'

import React, { useState, useEffect, use } from "react"
import ModalErrors from "@/components/modal-error";
import ModalSuccess from "@/components/modal-succes";
import Loader from "@/components/loading";
import { Switch } from "../ui/switch";
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
    titreValue:string
    typeValue:string
    classeValue:string
    matiereValue:string
    leconValue:string
    idClasse:number
    idMatiere:number
    idLecon:number
    id:number
    onOpenChange:(open:boolean)=>void
    onSuccess:()=>void
}

export default function MoadalUpdateExercice({
    token, 
    open, 
    titreValue, 
    typeValue, 
    classeValue, 
    matiereValue,
    leconValue, 
    idClasse,
    idMatiere,
    idLecon,
    id, 
    onOpenChange, 
    onSuccess }:Props
){
    {/**step */}
    const [step, setStep] = useState(0)
    {/**type */}
    const [valType, setValType] = useState<any>('')

    const [openModalErros, setOpenModalErros] = useState(false);
    const [openModalSuccess, setOpenModaalSuccess] = useState(false)
    const [message, setMessage] = useState<string>('')
    const [erreurs, setErreurs] = useState<string[]>([])
    const [loading, setLoading] = useState(false)
    {/**titre */}
    const [valueInputTextTitre, setValueTitre] = useState('')
    {/**matiere */}
    const [dataMatiere, setDataMatiere] = useState<any[]>([]);
    const [valMatiere, setValMatiere] = useState<string | null>('');
    const selectedMatiere = dataMatiere.find((item:any)=>item.nom_matiere === valMatiere);
    const matiereId = selectedMatiere ? selectedMatiere.id :"";
    {/**lecon */}    
    const [dataLecon, setDataLecon] = useState<any[]>([]);
    const [valLecon, setValLecon] = useState<string | null>('');
    const selectedLecon = dataLecon.find((item:any)=>item.titre === valLecon);
    const leconId = selectedLecon ? selectedLecon.id :"";
    {/**classe */}
    const [valClasse, setValClasse] = useState<string | null>('');
    const [dataClasse, setDataClasse] = useState<any[]>([]);
    const selectedClass = dataClasse.find((item:any)=>item.name_class === valClasse);
    const classeId = selectedClass ? selectedClass.id :"";

    const [onCliked, setOnCliked] = useState(false)

    const toast= useToastCustom()

    useEffect(()=>{
        const matiere = async ()=>{
            const res = await fetch(`${[process.env.NEXT_PUBLIC_BASE_URL]}/matiere`,{
                method:"GET"
            })
            const statusCode = res.status
            const result = await res.json();

            if(!res.ok){
                setLoading(false)
                setDataMatiere([])
                return false
            }else{
                setDataMatiere(result)
                console.log(result)
                setLoading(false)
                return result;
            }
        }
        const lecon = async ()=>{
            const res = await fetch(`${[process.env.NEXT_PUBLIC_BASE_URL]}/lecon/classe/${classeId ? classeId : idClasse}/matirere/${matiereId ? matiereId : idMatiere}`,{
                method:"GET",
                headers:{
                    "X-Api-Key":token as any
                }
            })
            const statusCode = res.status
            const result = await res.json();

            if(!res.ok){
                setLoading(false)
                setDataLecon([])
                return false
            }else{
                setDataLecon(result)
                console.log(result)
                setLoading(false)
                return result;
            }
        }
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
        lecon()
        matiere()
        setValueTitre(titreValue)
        setValType(typeValue)
        setValLecon(leconValue)
        setValClasse(classeValue)
        setValMatiere(matiereValue)
        if(open == false){
            setValType('')
            setValClasse('')
            setValMatiere('')
            setStep(0)
            setOnCliked(false)
        }
    },[open, classeId, matiereId])

    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        setLoading(true)
        const nouvelleErreus: string[] = [];
        const formData = new FormData(e.currentTarget)
        const urlParams = new URLSearchParams()

        urlParams.append("description", formData.get("description") as any)
        urlParams.append("matiere_id", formData.get("matiere_id") as any)
        urlParams.append("classe_id", formData.get("classe_id") as any)
        urlParams.append("type", formData.get("type") as any)
        urlParams.append("lecon_id", formData.get("lecon_id") as any)

        console.log(formData.get("description"))
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/exercice/${id}`,{
            method:"PUT",
            headers:{
                "X-Api-Key": token as string,
                "Content-Type":"application/x-www-form-urlencode"
            },
            body:urlParams.toString(),
        })

        const statusCode = res.status;   
        if(res.ok){
            
            toast.success("Modification réussie")
            setLoading(false) 
            onSuccess()
            onOpenChange(false)
        }else{
            const result = await res.json();
            if(nouvelleErreus.length > 0){
                
                setErreurs(nouvelleErreus)
            }
            toast.error(`${result.message}`)
            setLoading(false)
           /*  console.log(result); */
        }
        
    }

    return(
        <>
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className={`w-96 `}>
                <DialogHeader>
                    <DialogTitle className={`font-mono font-bold text-blue-900 my-6 px-4`}>
                        Modifier
                    </DialogTitle>
                </DialogHeader>
                <div className="px-4">
                     Vous voulez modifier <strong>{titreValue}</strong><br/>
                    <p className="text-chart-2">leçon : {leconValue}</p>
                </div>
                <hr className=" relative top-10 font-bold" />
                <div className="flex justify-between z-20 my-1">
                    <div className={`w-10 h-10 rounded-full ${step == 0 ? 'bg-gray-200':'bg-blue-700'} p-2 flex items-center justify-center text-white font-mono`}>
                        1
                    </div>

                    <div className={`w-10 h-10 rounded-full ${step <= 1 ? 'bg-gray-200':'bg-blue-700'} p-2 flex items-center justify-center text-white font-mono`}>
                        2
                    </div>
                </div>
                <div className="w-full ">
                    <form className="flex flex-col justify-center items-center gap-7 h-40 relative top-1" encType="multipart/form-data" onSubmit={handleSubmit}>

                        <div className="w-full flex flex-col gap-4  p-2 rounded-md">

                            <div className={`w-full ${step === 0 ? 'block':'hidden' } flex flex-col gap-2`}>
                                {/**type */}
                                <Combobox
                                    value={valType}
                                    onValueChange={(e)=>{
                                        setValType(e)
                                    }}
                                >
                                    <ComboboxInput placeholder="Selectionner un type" className={`h-12`} />
                                    <ComboboxContent>
                                        <ComboboxList>
                                            <ComboboxItem className={`uppercase`} value={`GABONAIS`} >
                                                GABONAIS
                                            </ComboboxItem>
                                            <ComboboxItem className={`uppercase`} value={`FRANCAIS`} >
                                                FRANCAIS
                                            </ComboboxItem>
                                        </ComboboxList>
                                    </ComboboxContent>
                                </Combobox>

                                <textarea  
                                    name="description" 
                                    placeholder="Entrer le nouveau nom"
                                    onChange={(e)=> setValueTitre(e.target.value)} 
                                    value={valueInputTextTitre} 
                                    className={`w-full h-20 p-2 border rounded-lg `}
                                >
                                </textarea>

                            </div>
                            
                            <input type="hidden" name="matiere_id" value={matiereId}/>
                            <input type="hidden" name="lecon_id" value={leconId} />
                            <input type="hidden" name="classe_id" value={classeId} />
                            <input type="hidden" name="type" value={valType} />

                            <div className={`w-full ${step === 1 ? 'block':'hidden' } flex flex-col gap-2`}>
                                {/** classe*/}
                                <Combobox
                                    items={dataClasse}
                                    value={valClasse}
                                    onValueChange={(e)=>{
                                        setValClasse(e)
                                        setValLecon('')
                                        //console.log(classeId)
                                    }}
                                >
                                    <ComboboxInput placeholder="Rechercher une classe..." className={`h-12`} />
                                    <ComboboxContent>
                                        <ComboboxEmpty>
                                            Aucune catégorie.
                                        </ComboboxEmpty>

                                        <ComboboxList className={`uppercase `}>
                                            {(item)=>(
                                                <ComboboxItem 
                                                    key={item.id} 
                                                    value={item.name_class}
                                                    className={`uppercase`}
                                                    onClick={()=>{
                                                        setOnCliked(true)
                                                    }}
                                                >
                                                    {item.name_class}
                                                    
                                                </ComboboxItem>
                                            )}
                                        </ComboboxList>
                                    </ComboboxContent>
                                </Combobox>

                                {/**matiere */}
                                <Combobox
                                    items={dataMatiere}
                                    value={valMatiere}
                                    onValueChange={(e)=>{
                                        setValMatiere(e)
                                        setValLecon('')
                                        //console.log(classeId)
                                    }}
                                >
                                    <ComboboxInput placeholder="Rechercher une matière..." className={`h-12`}/>
                                    <ComboboxContent>
                                        <ComboboxEmpty>
                                            Aucune catégorie.
                                        </ComboboxEmpty>

                                        <ComboboxList className={`uppercase `}>
                                            {(item)=>(
                                                <ComboboxItem 
                                                    key={item.id} 
                                                    value={item.nom_matiere}
                                                    className={`uppercase`}
                                                    onClick={()=>{
                                                        setOnCliked(true)
                                                    }}
                                                >
                                                    {item.nom_matiere}
                                                    
                                                </ComboboxItem>
                                            )}
                                        </ComboboxList>
                                    </ComboboxContent>
                                </Combobox>

                                {/**lecon */}  
                                <Combobox
                                    items={dataLecon}
                                    value={onCliked == true ? valLecon : valLecon}
                                    onValueChange={(e)=>{
                                        setValLecon(e)
                                    }}
                                >
                                    <ComboboxInput placeholder="Rechercher une leçon..." className={`h-12`} />
                                    <ComboboxContent>
                                        <ComboboxEmpty>
                                            Aucune catégorie.
                                        </ComboboxEmpty>

                                        <ComboboxList className={`uppercase `}>
                                            {(item)=>(
                                                <ComboboxItem 
                                                    key={item.id} 
                                                    value={item.titre}
                                                    className={`uppercase`}
                                                >
                                                    {item.titre}
                                                    
                                                </ComboboxItem>
                                            )}
                                        </ComboboxList>
                                    </ComboboxContent>
                                </Combobox>
                            </div>
                            
                        </div>
                        

                        {step === 2 &&(
                            <>
                            <button 
                                type="submit"
                                className="bg-blue-700 p-2 text-white font-mono text-[12px] rounded-sm w-full h-8"
                            >
                                {loading ?(
                                <Loader />
                            ) : (
                                
                                <p id="button-connexion">Modifier</p>
                            )}
                            
                        </button>
                            </>
                            
                        )}
                        
                    </form>

                    <div className="my-12"></div>

                    {step >= 1 &&(
                        <button 
                            onClick={()=>{
                                setStep(step - 1)
                            }}
                            className=" p-2  font-mono text-[12px] text-blue-700"
                        >
                            
                            <p id="button-connexion">précédent</p>
                        </button>
                    )}

                    {step >= 0 && step < 2 &&(
                        <button 
                            onClick={()=>(
                                setStep(step +1)
                            )}
                            className=" p-2  font-mono text-[12px] text-blue-700"
                        >
                            
                            <p id="button-connexion">suivant</p>
                        </button>
                    )}
                </div>
            </DialogContent>
        </Dialog>

        <ModalErrors open={openModalErros} onOpenChange={setOpenModalErros} errors={erreurs} />
        <ModalSuccess open={openModalSuccess} onOpenChange={setOpenModaalSuccess} message={message} />
        </>
        
    )
}