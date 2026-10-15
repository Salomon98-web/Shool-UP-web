'use client'

import { useState, useEffect } from "react"
import { 
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger 
} from "../ui/sheet"
import { User, Pencil, BadgeCheck } from "lucide-react"
import ChangePassWord from "./form-change-pass"
import InfoAbonnement from "./infos-abonnement"
import AddAbonnement from "./form-add-abonnement"

interface Props{
    token:any
    open:boolean
    onOpenChange:(open:boolean)=>void
    onSuccess:()=>void
}

export default function MonCompte({token, open ,onOpenChange, onSuccess}:Props){
    const [changePass, setChangePass] = useState(false)
    const [dataUser, setDataUser] = useState<any>([])

    useEffect(()=>{
        const infosUser = async ()=>{
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/account/get-user`,{
                method:"GET",
                headers:{
                    "X-Api-Key":token
                }
            })
            const result = await res.json()
            if(res.ok){
                setDataUser(result)
                console.log(result)
            }else{
                setDataUser([])
            }
        }
        infosUser()
        setChangePass(changePass)
        if(open === false){
            setChangePass(false)
        }
    },[open])

    return(
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent className={`flex items-center w-full p-2 `}>
                <SheetHeader className="flex flex-col gap-2 items-center w-full">
                    <SheetTitle>
                        <div className="h-14 w-14 bg-blue-500 rounded-full flex justify-center items-center text-white p-2">
                            <User width={80} height={80}/>
                        </div>
                    </SheetTitle>
                    <p className="text-center text-lg font-bold" >
                        {dataUser.username}
                    </p>
                    <p className="text-chart-2 text-xs md:text-md">Date de création : {dataUser.created_at}</p>
                </SheetHeader>
                <hr />
                <div className=" h-auto p-2 flex flex-col gap-2.5 w-full scroll-auto overflow-y-auto">
                    <div className="flex flex-col gap-2 rounded-lg border bg-blue-50 border-blue-200 p-2">
                        <div className="flex justify-between gap-2.5">
                            <p className="">Changer votre mot de passe</p>
                            <Pencil 
                                className="text-blue-600 cursor-pointer"
                                onClick={()=>{
                                    changePass == true ? setChangePass(false) : setChangePass(true)
                                }} 
                            />
                        </div>
                        {changePass === true ? (
                            <ChangePassWord token={token} />
                        ):(null)}
                        
                    </div>

                    <InfoAbonnement token={token} />

                    {dataUser.role === 'admin' ? (
                        <div className="flex flex-col gap-2 rounded-lg border bg-violet-50 border-violet-200 p-2">
                        <div className="flex justify-between gap-2.5">
                            <p className="">Ajouter un abonnement</p>
                            <BadgeCheck 
                                className="text-violet-600 cursor-pointer" 
                            />
                        </div>
                        <AddAbonnement token={token} onSuccess={onSuccess}/>
                    </div>
                    ):(null)}

                    <div className="my-8"></div>
                </div>
            </SheetContent>
        </Sheet>
    )
}