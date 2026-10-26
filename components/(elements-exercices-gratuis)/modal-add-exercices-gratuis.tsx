'use client'

import React, { useState, useEffect, use } from "react"
import Loader from "@/components/loading";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
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
}

export default function MoadalAddExerciceGratuit({token, open, onOpenChange, onSuccess,}:Props){
    {/**step */}
    const [step, setStep] = useState(0)

    const [erreurs, setErreurs] = useState<string[]>([])
    const [loading, setLoading] = useState(false)
    {/**matiere */}
    const [dataMatiere, setDataMatiere] = useState<any[]>([]);
    const [val, setVal] = useState<string | null>('');
    const selectedMatiere = dataMatiere.find((item:any)=>item.nom_matiere === val);
    const matiereId = selectedMatiere ? selectedMatiere.id :"";
    {/**lecon */}    
    const [dataLecon, setDataLecon] = useState<any[]>([]);
    const [valLecon, setValLecon] = useState<string | null>('');
    const selectedLecon = dataLecon.find((item:any)=>item.titre === valLecon);
    const leconId = selectedLecon ? selectedLecon.id :"";
    {/**type */}
    const [valType, setValType] = useState<any>('')
    {/** pdf */}
    const [pdf, setPdf] = useState(false)
    {/**classe */}
    const [valClasse, setValClasse] = useState<string | null>('');
    const [dataClasse, setDataClasse] = useState<any[]>([]);
    const selectedClass = dataClasse.find((item:any)=>item.name_class === valClasse);
    const classeId = selectedClass ? selectedClass.id :"";
    {/**count pdf */}
    const [countPdf, setCountPdf] = useState<any>()

    const [onCliked, setOnCliked] = useState(false)

    const toast = useToastCustom()
    
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
            const res = await fetch(`${[process.env.NEXT_PUBLIC_BASE_URL]}/lecon/classe/${classeId ? classeId : 0}/matirere/${matiereId ? matiereId : 0}`,{
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
        
        if(open == false){
            setVal('')
            setValLecon('')
            setValType('')
            setValClasse('')
            setStep(0)
            setPdf(false)
            setOnCliked(false)
        }
    },[open, step, pdf, countPdf, classeId, matiereId])

    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        setLoading(true)
        const nouvelleErreus: string[] = [];
        const formData = new FormData(e.currentTarget)
        //console.log(formData.get("file"))
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/exercice-gratuit`,{
            method:"POST",
            headers:{
                "X-Api-Key": token as string,
            },
            body:formData,
        })

        const statusCode = res.status;
        
        if(res.ok){
            toast.success("Ajout réussi")
            setLoading(false) 
            onSuccess()

            setVal('')
            setValLecon('')
            setValType('')
            setValClasse('')
            setStep(0)
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
            /* console.log(result); */
        }
        
    }

    return(
        <>
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className={`w-96 `}>
                <DialogHeader>
                    <DialogTitle className={` font-bold text-blue-900 my-6 px-4`}>Nouvel exercice</DialogTitle>
                </DialogHeader>
                <hr className=" relative top-10 font-bold" />
                <div className="flex justify-between z-20 my-1">
                    <div className={`w-10 h-10 rounded-full ${step == 0 ? 'bg-gray-200':'bg-blue-700'} p-2 flex items-center justify-center text-white `}>
                        1
                    </div>

                    <div className={`w-10 h-10 rounded-full ${step <= 1 ? 'bg-gray-200':'bg-blue-700'} p-2 flex items-center justify-center text-white `}>
                        2
                    </div>

                    <div className={`w-10 h-10 rounded-full ${step <=2 ? 'bg-gray-200':'bg-blue-700'} p-2 flex items-center justify-center text-white `}>
                        3
                    </div>
                </div>
                <div className="w-full">
                    <form action="" className="flex flex-col justify-center items-center gap-7 h-40 relative top-6" encType="multipart/form-data" onSubmit={handleSubmit}>

                        <div className=" flex flex-col gap-4  p-2 rounded-md w-full">
                            <div className={`w-full ${step === 0 ? 'block':'hidden' } flex flex-col gap-2`}>
                                {/**type */}
                                <Combobox
                                    value={valType}
                                    onValueChange={setValType}
                                >
                                    <ComboboxInput placeholder="Selectionner un type" className={`h-12`} />
                                    <ComboboxContent>
                                        <ComboboxList>
                                            <ComboboxItem className={`uppercase`} value={`CASSIQUES`} >
                                                CASSIQUES
                                            </ComboboxItem>
                                            <ComboboxItem className={`uppercase`} value={`EPREUVES`} >
                                                EPREUVES
                                            </ComboboxItem>
                                        </ComboboxList>
                                    </ComboboxContent>
                                </Combobox>

                                <Textarea 
                                    placeholder="Entrer le titre"  
                                    name="description" 
                                    className={`w-full h-20 p-2 border rounded-lg `}
                                >
                                </Textarea>

                            </div>
                            
                            <input type="hidden" name="matiere_id" value={matiereId}/>
                            <input type="hidden" name="classe_id" value={classeId} />
                            <input type="hidden" name="type" value={valType ?? ''} />

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
                                    value={val}
                                    onValueChange={(e)=>{
                                        setVal(e)
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
                                                >
                                                    {item.nom_matiere}
                                                    
                                                </ComboboxItem>
                                            )}
                                        </ComboboxList>
                                    </ComboboxContent>
                                </Combobox>
                            </div>
                            
                            <div className={`w-full ${step === 2 ? 'block':'hidden' } flex flex-col gap-2`}>
                                <Input 
                                    type="file" name="file" 
                                    onChange={(e)=>{
                                        const f = e.target.files
                                        if(f?.length as any < 2){
                                            setCountPdf(1)
                                            console.log(false)
                                        }else if(f?.length as any == 2){
                                            setCountPdf(2)
                                        }
                                        setPdf(true)
                                    }}
                                />

                                <div className="w-full h-30 border rounded-lg flex flex-row p-2 text-chart-2 justify-center items-center">
                                    {pdf == true ?(
                                        <> 
                                        <File className="w-full h-full text-gray-200"/>
                                        </>
                                    ):('Vous devez selectionner deux fichiers l\'exercice puis le corrigé')}
                                </div>
                            </div>
                        </div>
                        {step === 3 &&(
                            <>
                            
                            <button 
                                type="submit"
                                className="bg-blue-700 p-2 text-white  text-lg rounded-sm w-full h-8"
                            >
                                {loading ?(
                                    <Loader />
                                ) : (
                                    
                                    <p id="button-connexion">AJOUTER</p>
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
                            className=" p-2   text-lg text-blue-700"
                        >
                            
                            <p id="button-connexion">précédent</p>
                        </button>
                    )}

                    {step >= 0 && step < 3 &&(
                        <button 
                            onClick={()=>(
                                setStep(step +1)
                            )}
                            className=" p-2   text-lg text-blue-700"
                        >
                            
                            <p id="button-connexion">suivant</p>
                        </button>
                    )}
                    
                </div>
            </DialogContent>
        </Dialog>
        </>
        
    )
}