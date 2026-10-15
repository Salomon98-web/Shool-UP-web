'use client';

import { useState } from "react";
import Link from "next/link";
import { 
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription 
} from "@/components/ui/dialog";

export default function CGU(){
  const [openModalCGU, setOpenModalCGU] = useState(false)
  return(
    <Dialog open={openModalCGU} onOpenChange={setOpenModalCGU} >
      <DialogTrigger>
        <p className=" text-blue-950">Cliquer ici pour lire</p>
      </DialogTrigger>

      <DialogContent className="w-auto">
        <DialogHeader className=" font-bold text-lg text-blue-950 h-8">
          <DialogTitle className={`font-extrabold`}>Contrat d'utilisateur</DialogTitle>
        </DialogHeader>
        <hr />
        <div className="flex flex-col gap-4 w-96 text-xs ">
          <span className="text-black ">
            Les exercices avec corrigés présents sur cette plate-forme sont la propriété exclusive de <span className="font-bold"> School UP</span>.
          </span>
          <span className=" text-black ">
            Toute reproduction en vue de commercialisation, par un usager, est formellement interdite sous peine de poursuites judiciaires.
          </span>
        </div>
      </DialogContent>
    </Dialog>
  )
}