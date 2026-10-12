"use client";

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
    DrawerClose
} from "./ui/drawer";
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

{/* Mentions legales */}
export default function MentionsLegales(){
    const [open, setOpen] = useState(false)
    return(
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger className="p-2 bg-blue-950 w-max h-max rounded-sm text-white hover:transform hover:scale-105 duration-500 font-mono text-[14px]">
                Mentions légales
            </SheetTrigger>
            
            <SheetContent  className={`w-full h-auto p-4 flex justify-center items-center`}>
                <DrawerHeader>
                    <DrawerTitle className=" font-mono font-bold text-blue-950 text-xl">Mentions légales</DrawerTitle>
                </DrawerHeader>
                <hr />
                <div className=" overflow-auto h-full font-mono my-4 flex flex-col text-chart-4">
                    <p className=" my-4 text-[14px] font-mono">La plateforme numérique School UP Gabon est gérée par la société DIGITALIA SARL, située à Libreville au Gabon.</p>

                    <p className=" my-4 text-[14px] font-mono"><strong className="text-blue-950">RCCM N° : GA-LBV-01-2024-B12-01237 / NIF : 2024 0102 2334 U</strong></p>

                    <p className=" my-4 text-[14px] font-mono">School UP Gabon a été développé par <strong className="text-blue-950"> esy web developer </strong>
                        Tél : +237 658 111 969 / Email : <strong className="text-blue-950"> salomonyannick0@gmail.com </strong>
                    </p>

                    <p className=" my-4 text-[14px] font-mono">La plateforme numérique <strong className="text-blue-950">School UP</strong> Gabon est hébergée par la Société d’Incubation Numérique du Gabon (SING). </p>

                    <p className=" my-4 text-[14px] font-mono">Tout le contenu de <strong className="text-blue-950">School UP</strong>, exercices, corrigés et autres données informatiques, sont la propriété exclusive de l'éditeur. </p>
                </div>
                <SheetFooter>
                    <div className=" lg:h-10 flex justify-center items-center text-[14px] font-mono w-full text-chart-1">
                        <p>Copyright &copy;
                                document.write{new Date().getFullYear()};
                            
                            Tous droits réservés
                        </p>
                        <p className="text-sm"></p>
                    </div>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
}