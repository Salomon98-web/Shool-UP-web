'use client'

import { useState, useEffect, use } from "react"
import { 
    Dialog,
    DialogContent,
    DialogHeader,
    DialogDescription,
    DialogTitle,
    DialogFooter
} from "@/components/ui/dialog"
import * as pdfjsLib from "pdfjs-dist"
import { Document, Page, pdfjs } from "react-pdf"
import 'react-pdf/dist/Page/AnnotationLayer.css'
import 'react-pdf/dist/Page/TextLayer.css'
import useIsApk from "@/functions/useIsApk"


interface Props{
    open:boolean;
    onOpenChange:(openModalApecu:boolean)=>void;
    fileName:string;
}

export default function modalApercuPDF({open, onOpenChange, fileName}:Props){
    const [numPage, setNumPage] = useState<number>(0)
    const [scale, setScale] = useState(1)

    const zoomIn = ()=>{
        setScale((prev)=>Math.min(prev + 0.2, 1.2))
    }
    const zoomOut = ()=>{
        setScale((prev)=>Math.min(prev - 0.5, 0.7))
    }

    useEffect(()=>{
        /* pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`; */
        /* pdfjs.GlobalWorkerOptions.workerSrc = new URL(
            'pdfjs-dist/build/pdf.worker.min.mjs',
            import.meta.url
        ).toString() */
    },[])
    
    return(
        <>
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="h-40 md:h-87 lg:h-90 flex flex-col p-2">
                <DialogHeader className="h-12">
                    <DialogTitle className=" text-blue-950 text-xl p-2">Apercu</DialogTitle>
                </DialogHeader>
                <hr />
                <div className="absolute inset-0 z-10 bg-transparent ">
                    <div onContextMenu={(e)=>{e.preventDefault()}} className="h-40 md:h-87 lg:h-90">
                        
                        <iframe
                            src={`https://docs.google.com/gview?embedded=true&url=${encodeURIComponent(`https://schoolup.net/pdf-preview/${fileName}`)}#toolbar=0&navpanes=0&scrollbar=0&zoom=`}
                            className="w-full h-full "
                        />
                        <div onContextMenu={(e)=>{e.preventDefault()}} className="absolute inset-0 z-10 bg-transparent"></div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
        </>
    )
}