"use client"

import { 
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTitle,
    DialogFooter,
    DialogHeader,
    DialogTrigger,
} from "@/components/ui/dialog";
import { 
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
    DrawerDescription, 
    DrawerClose,
    DrawerFooter
} from "./ui/drawer";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { useState, useEffect } from "react";
import Loader from "@/components/loading";
import { Switch } from "./ui/switch";
import { useToastCustom } from "@/components/ui/toast-custom";

interface Props {
    open:boolean
    onOpenChange:(openModalDownload:boolean)=>void
    exerciceId:number
}

export default function modalDownload({open, onOpenChange, exerciceId}:Props){
    const [code, setCode] = useState('')
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState<string>('')
    const [maskedValue, setMaskedValue] = useState(false)
    const toast = useToastCustom()

    async function initDownload(PIN:string, exercice_id:any){
        const nouvelleErreus: string[] = [];
        const formData = new FormData()
        formData.append("codeAbonnement", PIN)
        formData.append("exerciseId", exercice_id)

        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/download/init`,{
            method:"POST",
            body:formData
        })
        const status = res.status
        const data = await res.json()
        if(!res.ok){
            toast.error(`${data.message}`);
            setCode('')
            /* console.log(data) */
            setLoading(false)
        }else{
            toast.success('Votre téléchargement va débuter...');
            setLoading(false)
            setCode('')
            
            setTimeout(() => {
                window.location.href=`${process.env.NEXT_PUBLIC_BASE_URL}/download/start/${exerciceId}`
            },  3000);
        }
        
    }

    function handleChange(value:string){
        setCode(value)
        if(value.length === 4){
            setLoading(true)
            initDownload(value, exerciceId)
            /* console.log(value)
            console.log(exerciceId) */
        }else{
            
            /* console.log(value)
            console.log(exerciceId) */
            setLoading(false)
        }
    }

    useEffect(()=>{
        
        if(open == false){
            setMaskedValue(false)
            setCode('')
        }
    },[maskedValue, open])

    return(
        <>
        <Drawer open={open} onOpenChange={onOpenChange}>
            {/* <DrawerContent className={`w-full`}>
                <DrawerHeader>
                    <DrawerTitle className="text-lg md:text-xl font-bold  text-blue-950">
                        School UP
                    </DrawerTitle>
                </DrawerHeader>
                <div className="flex flex-col gap-3">
                    <form className="my-10 ">
                        <InputOTP maxLength={4} value={code} onChange={handleChange} disabled={loading}>
                            <InputOTPGroup className="gap-2 w-full flex justify-center items-center">
                                <InputOTPSlot masked={maskedValue == true ? true:false} index={0} className="rounded-md border-2 w-16 h-16 text-xl text-blue-800 font-bold" />
                                <InputOTPSlot masked={maskedValue == true ? true:false} index={1} className="rounded-md border-2 w-16 h-16 text-xl text-blue-800 font-bold"/>
                                <InputOTPSlot masked={maskedValue == true ? true:false} index={2} className="rounded-md border-2 w-16 h-16 text-xl text-blue-800 font-bold"/>
                                <InputOTPSlot masked={maskedValue == true ? true:false} index={3} className="rounded-md border-2 w-16 h-16 text-xl text-blue-800 font-bold"/>
                            </InputOTPGroup>
                        </InputOTP>
                        
                    </form>
                    <div className="px-9 flex flex-row gap-3 ">
                        <p className="">{maskedValue == true ? 'Afficher': 'Masquer'} votre code</p>
                        <Switch onCheckedChange={()=>{
                           maskedValue == false ? setMaskedValue(true):setMaskedValue(false)
                        }} />
                    </div>
                    
                </div>
                {loading ? (
                    <div className="h-4">
                    <Loader />
                    </div>):(<div className="h-4">
                    
                    </div>)
                }
                <DrawerFooter>
                    <p className="text-center  text-[10px]">Veilliez saisir le code <strong>PIN</strong> de votre abonnement pour télécharger</p>
                </DrawerFooter>
            </DrawerContent> */}
            <DrawerContent  className={`w-full h-auto p-4 flex justify-center items-center`}>
                <DrawerHeader className="p-2">
                    <DrawerTitle className="  font-bold text-blue-950">School UP</DrawerTitle>
                </DrawerHeader>
                <hr />
                <div className="  h-full  lg:my-12">
                    <div className="flex flex-col gap-3 my-2">
                        <form className="my-10 ">
                            <InputOTP maxLength={4} value={code} onChange={handleChange} disabled={loading}>
                                <InputOTPGroup className="gap-2 w-full flex justify-center items-center">
                                    <InputOTPSlot masked={maskedValue == true ? true:false} index={0} className="rounded-md border-2 w-16 h-16 text-xl text-blue-800 font-bold" />
                                    <InputOTPSlot masked={maskedValue == true ? true:false} index={1} className="rounded-md border-2 w-16 h-16 text-xl text-blue-800 font-bold"/>
                                    <InputOTPSlot masked={maskedValue == true ? true:false} index={2} className="rounded-md border-2 w-16 h-16 text-xl text-blue-800 font-bold"/>
                                    <InputOTPSlot masked={maskedValue == true ? true:false} index={3} className="rounded-md border-2 w-16 h-16 text-xl text-blue-800 font-bold"/>
                                </InputOTPGroup>
                            </InputOTP>
                            
                        </form>
                        <div className="px-9 flex flex-row justify-center gap-3 ">
                            <p className="">{maskedValue == true ? 'Afficher': 'Masquer'} votre code</p>
                            <Switch onCheckedChange={()=>{
                            maskedValue == false ? setMaskedValue(true):setMaskedValue(false)
                            }} />
                        </div>
                        
                    </div>
                    <div className="my-3"></div>
                    {loading ? (
                        <div className="h-4 relative bottom-2.5">
                            <Loader />
                        </div>):(null)
                    }
                    
                </div>
                <DrawerFooter>
                        <p className="text-center  text-[10px]">Veilliez saisir le code <strong>PIN</strong> de votre abonnement pour télécharger</p>
                    </DrawerFooter>
                <DrawerClose className={`text-black`}>fermer</DrawerClose>
            </DrawerContent>
        </Drawer>
        </>
    )
}