"use client";

import { 
    Sheet,
    SheetTrigger,
    SheetContent,
    SheetDescription,
    SheetClose,
    SheetFooter,
    SheetHeader,
    SheetTitle 
} from "./ui/sheet";
import { useState } from "react";
import Image from "next/image";
import logoschoolup from "@/public/SCHOOL UP_LOGO COULEURS.png"

{/* Mentions legales */}
export default function MentionsLegales(){
    const [open, setOpen] = useState(false)
    return(
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger className="p-2 bg-blue-950 w-max h-max rounded-sm text-white hover:transform hover:scale-105 duration-500  text-lg ">
                Mentions légales
            </SheetTrigger>
            
            <SheetContent  className={`w-full h-auto p-2 `}>
                <SheetHeader className="flex justify-center items-center">
                    <Image src={logoschoolup} width={150} alt="" />
                    <SheetTitle className=" font-bold text-blue-950 text-2xl">Mentions légales</SheetTitle>
                </SheetHeader>
                <div className="max-h-max max-w-max overflow-auto h-full flex flex-col text-chart-4 border rounded-lg p-2 bg-gray-50 relative bottom-5">
                    <p className=" my-4 text-lg ">La plateforme numérique School UP Gabon est gérée par la société DIGITALIA SARL, située à Libreville au Gabon.</p>
                    
                    <p className=" my-4 text-lg"><strong className="text-blue-950">RCCM N° : GA-LBV-01-2024-B12-01237 / NIF : 2024 0102 2334 U</strong></p>
                    
                    <p className=" my-4 text-lg">School UP Gabon a été développé par <strong className="text-blue-950"> esy web developer </strong>
                        Tél : +237 658 111 969 / Email : <strong className="text-blue-950"> salomonyannick0@gmail.com </strong>
                    </p>
                    
                    <p className=" my-4 text-lg">Tout le contenu de <strong className="text-blue-950">School UP</strong>, exercices, corrigés et autres données informatiques, sont la propriété exclusive de l'éditeur. </p>
                </div>
            </SheetContent>
        </Sheet>
    );
}