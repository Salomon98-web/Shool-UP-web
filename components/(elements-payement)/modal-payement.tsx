'use client'

import { useState, useEffect, ReactElement, useRef } from "react"
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
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
    DrawerDescription, 
    DrawerClose,
    DrawerFooter
} from "../ui/drawer";
import Image from "next/image";
import logoairtelmoney from  "@/public/logo-airtel.jpg"
import { Button } from "../ui/button";
import Loader from "../loading";
import { Input } from "../ui/input";
import { useToastCustom } from "@/components/ui/toast-custom";
import { json } from "stream/consumers";

interface Props{
    nomAbonnement:any
    classe:any
    amount:any
    codePIN:any
    onSuccess:()=>void
    open:boolean
    onOpenchange:(open:boolean)=>void
}

export default function ModalPayement({nomAbonnement, classe, amount, codePIN, onSuccess, open, onOpenchange}:Props){
    
    const [loading, setLoading]= useState(false)
    const toast = useToastCustom()
    const [messageError, setMessageError] = useState<string>('')
    const [messageSuccess, setMessageSuccess] = useState<string>('')
    const intervalRef = useRef<NodeJS.Timeout | null>(null)

    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) =>{
        setLoading(true)
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const startPayment = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/payement/start`,{
            method:"POST",
            body:formData
        })
        const result = await startPayment.json()
        if(!startPayment.ok){
            console.log(result)
            //toast.error(result.message)
            setMessageError(result.message)
            setMessageSuccess('')
            setLoading(false)
        }else{
            if(result.data){
                if(result.data?.status === "PENDING"){
                    setMessageError('')
                    setMessageSuccess("Payement lancer...")
                    checkStatus(codePIN)

                }else{
                    
                }

            }else{
                setMessageSuccess('')
                setMessageError("Une erreur c'est produite veillez réessayer")
            }
            
        }
        console.log(result)
    }

    const checkStatus =  (codePinForAbonne : any)=>{
        const check = async ()=>{
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/payement/checksatus/${codePinForAbonne}`,{
                method:"GET"
            })
            const result = await res.json() 
            if(res.ok){
                if(result.data){
                    if(result.data.status === "FAILED"){
                        setMessageError(result.data.message)
                        setMessageSuccess('')
                        if(intervalRef.current){
                            clearInterval(intervalRef.current)
                        }
                        setLoading(false)
                        onSuccess()
                    }else if(result.data.status === "SUCCESS"){
                        setMessageSuccess("Payement réussi")
                        setMessageError('')
                        onSuccess()
                        if(intervalRef.current){
                            clearInterval(intervalRef.current)
                        }
                        setLoading(false)
                    }

                }else{
                    setLoading(false)
                    setMessageError('Payement échoué')
                    setMessageSuccess('')
                }
            }else{
                setLoading(false)
                setMessageError('Payement échoué une erreur c\'est produite veillez réessayer')
            }
            
            console.log(result)
                    
        }
        check()
        intervalRef.current = setInterval(check, 10*1000)
        
    }

    useEffect(()=>{
        if(open == false){
            setMessageError('')
            setMessageSuccess('')
        }
    },[open])

    return(
        <>
        <Drawer open={open} onOpenChange={onOpenchange}>
            <DrawerContent className={`h-auto p-4 flex justify-center items-center`}>
                
                <div className="flex flex-col gap-2.5 w-full">
                    <div className="border-2 border-green-200 rounded-lg p-2 bg-green-50 w-full text-md md:text-lg">
                        <p className="">Vous êtes sur le point de valider votre abonnement <strong>{nomAbonnement}</strong> de la classe de <strong>{classe}</strong> <br />Montant a payer <strong className="text-red-500">{amount} XAF</strong></p>
                    </div>
                    <div className="w-full border rounded-lg p-2 h-72">
                        <form className="w-full flex flex-col gap-4 p-2" onSubmit={handleSubmit}>
                            <Input 
                                type="number"
                                placeholder="Entrer votre numéro de téléphone"
                                name="phone"
                                required
                                className="  p-4 text-lg "
                            />
                            <input type="hidden" name="amount" value={amount} />
                            <input type="hidden" name="codePin" value={codePIN} />
                            <Button
                                type="submit"
                                className={` bg-red-600 hover:bg-red-700 duration-500 text-lg rounded-sm`}
                            >
                                {loading === true ? (
                                    <Loader />
                                ):(
                                    <p className=" uppercase font-normal">payer</p>
                                )}
                            </Button>
                        </form>
                        <div className="w-full flex flex-col justify-center items-center gap-1 p-2  ">
                            <p className="text-lg"><strong>Mode de payement </strong></p>
                            <Image 
                                src={logoairtelmoney}
                                width={150}
                                alt=""
                                className="object-cover w-60 relative bottom-12 -z-10 bg-gray-300"
                            />
                        </div>
                        
                            <p className="text-center text-red-600 relative bottom-20 font-bold">{messageError}</p>
                            <p className="text-center text-green-600 relative bottom-20 font-bold">{messageSuccess}</p>
                    </div>
                </div>
            </DrawerContent>
        </Drawer>
        </>
    )
}