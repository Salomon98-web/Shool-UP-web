'use client'

import { useState, useEffect, use } from "react"
import { 
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription 
} from "@/components/ui/dialog";
import { 
    Combobox,
    ComboboxGroup,
    ComboboxContent,
    ComboboxInput,
    ComboboxItem,
    ComboboxEmpty,
    ComboboxList 
} from "../ui/combobox";
import Loader from "@/components/loading";
import { Input } from "../ui/input"
import { useToastCustom } from "@/components/ui/toast-custom";

interface Props{
    open:boolean
    onOpenChange:(open:boolean)=>void
    type:string
    id:number
    price:number
    download:string
    token:string | undefined
    onSuccess:()=>void
}

export default function CommencerAbonnement({open, onOpenChange, type, id, price, download, token, onSuccess}:Props){

    const [dataClasse, setDataClasse] = useState<any[]>([]);
    const [val, setvalue] = useState<string | null>('');
    const [isLoading, setIsLoading] = useState(false)
    const selectedClass = dataClasse.find((item:any)=>item.name_class === val);
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
            setvalue('')
        }
    },[open])

    const createAbonnement = async (e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();    
        setIsLoading(true);
        const nouvelleErreus: string[] = [];

        const formData = new FormData(e.currentTarget);
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/member`,{
            method:"POST",
            headers:{
                "X-Api-Key": token as string,
            },
            body:formData,
        })
        const statusCode = res.status
        const data = await res.json()
        if(!res.ok){
            toast.error(`${data[0]?.message}`)
            setIsLoading(false)
        }else{
            toast.success("Operation réussie ! Activer votre abonnement en payant le montant")
            setIsLoading(false)
            onSuccess() 
        }
        console.log(data)
    }

    return(
        <>
        <Dialog open={open} onOpenChange={onOpenChange}>
            
            <DialogContent className={`w-96 p-0`}>
                <DialogHeader 
                    className={` bg-linear-to-r 
                        ${type === "annuel" ?("to-blue-500 via-blue-800 to-blur from-blue-950 bg-blue-700"):(null)} 
                        ${type === "mensuel" ?("to-blue-50 via-blue-100 to-blur from-blue-200 bg-blue-200"):(null)}
                        rounded-t-lg p-2 rounded-b-4xl h-40`}
                    >
                    <DialogTitle 
                        className={` font-bold uppercase  p-3 
                        ${type === "annuel" ?("text-yellow-500"):("")}`}
                    >
                        {type}
                    </DialogTitle>
                    <div 
                        className={`text-2xl  font-bold  p-2
                        ${type === "annuel" ?("text-white"):("")}`}
                    >
                        {price} XAF
                    </div>
                    <p 
                        className={`  text-xs relative left-2
                        ${type === "annuel" ?("text-white"):("")}`}
                    >
                        {download}
                    </p>
                </DialogHeader>
                
                <form className="h-auto flex flex-col gap-2 p-7" onSubmit={createAbonnement}>
                    <Input 
                        type="text" 
                        name="name" 
                        placeholder="Entrer un nom" 
                        className="p-2"
                    />
                    <Input 
                        type="text" 
                        name="phone" 
                        placeholder="Entrer un numéro de téléphone"
                        className="p-2 " 
                    />
                    <input type="hidden" name="abonnement_id" value={id} />
                    <input type="hidden" name="classe_id" value={classeId}/>
                    
                    <Combobox
                        items={dataClasse}
                        value={val} 
                        onValueChange={setvalue}
                    >
                        <ComboboxInput placeholder="Rechercher une classe..." className={`p-2 h-10 bg-gray-100`} />
                        <ComboboxContent>
                            <ComboboxEmpty>
                                Aucune classe.
                            </ComboboxEmpty>
                            <ComboboxList>
                                
                                {(item)=>(
                                    <ComboboxItem key={item.id} value={item.name_class}>
                                        {item.name_class}
                                    </ComboboxItem>
                                )}
                            </ComboboxList>
                        </ComboboxContent>
                    </Combobox>

                    <button
                        type="submit"
                        className={` my-4 p-2 w-full rounded-lg text-white 
                        ${type === "annuel" ?("bg-yellow-500"):("bg-blue-700")}`}
                    >
                        {isLoading ?(
                            <Loader />
                        ) : (
                            
                            <p id="button-connexion">Valider</p>
                        )}
                        
                    </button>
                </form>
            </DialogContent>
        </Dialog>
        </>
        
    )
}