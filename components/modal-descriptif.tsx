"use client"

import { useState, useEffect } from "react"
import { 
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTitle,
    DialogFooter,
    DialogHeader,
    DialogTrigger,
} from "@/components/ui/dialog";

interface Props{
    open:boolean
    onOpenChange:(openModalDescription:boolean)=>void
    description:string
}

export default function modalDescriptif({open, onOpenChange, description}:Props){

    return(
        <>
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogHeader>
                <DialogTitle></DialogTitle>
            </DialogHeader>
            <DialogContent>
                <DialogDescription className="w-72 text-black">
                    {description}
                </DialogDescription>
            </DialogContent>
        </Dialog>
        </>
    )

}