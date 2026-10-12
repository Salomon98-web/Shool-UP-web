'use client'

import { useState } from "react"
import { CheckSquare, CheckCircle2 } from "lucide-react"
import { 
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogClose 
} from "./ui/dialog"

interface Props{
    open:boolean
    onOpenChange:(open:boolean)=>void
}

export default function InfosAfterSignup({open, onOpenChange}:Props){
    return(
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className={`w-[85vw] md:w-[55vw] lg:w-[35vw]`}>
                <DialogHeader >
                    <DialogTitle className={` font-mono flex flex-row items-center gap-3`}>
                       <CheckCircle2 className="text-green-600" width="70" height="70" /> 
                       <span className="text-green-700">Felicitation !</span>
                    </DialogTitle>
                </DialogHeader>

                <div className="flex flex-col p-2 gap-4">
                    <p className="font-mono text-[12px] font-bold text-green-800">Votre compte School UP a été créé avec succès</p>

                    <hr />

                    <div className="flex flex-col gap-2">
                        <ol className="list-decimal list-inside space-y-2 marker:font-bold marker:text-2xl text-base ">
                            <li>Cliquer sur continuer pour vous connecter a votre compte School UP</li>
                            <li>Dans votre compte School UP choisissez votre abonnement</li>
                            <li>Une fois votre abonnement choisi, definissez votre configuration et cliquer sur valider</li>
                            <li>En fin cliquer sur payer pour activer votre abonnement</li>
                        </ol>
                    </div>
                </div>

                <DialogDescription className="bg-gray-100 h-auto p-2 rounded-lg">
                    Votre compte school UP vous permettra de consulter les corrigés de tous vos téléchargements, d'acheter vos abonnements et de vous réabonner
                </DialogDescription>

                <div className=" flex justify-end">
                    <a href="/login" className=" bg-blue-900 p-2 text-white font-mono rounded-sm ">
                        Continuer
                    </a>
                </div>
                {/* <DialogDescription className={`flex flex-col gap-3 text-black`}>
                    <span className="font-mono text-[12px]">
                       Votre compte compte School UP a été créé
                    </span>
                    
                </DialogDescription> */}
            </DialogContent>
        </Dialog>
    )
}