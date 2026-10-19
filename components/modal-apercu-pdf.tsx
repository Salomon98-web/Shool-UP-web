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
import { Document, Page, pdfjs } from "react-pdf"
import 'react-pdf/dist/Page/AnnotationLayer.css'
import 'react-pdf/dist/Page/TextLayer.css'

pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.mjs`;
/* pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.mjs',
    import.meta.url
).toString() */

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
    
    return(
        <>
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="h-[65vw] md:h-[30vw] lg:h-[25vw] w-[75vh] flex flex-col p-2 overflow-hidden">
                <DialogHeader className="h-12">
                    <DialogTitle className=" text-blue-950 text-xl p-2">Apercu</DialogTitle>
                </DialogHeader>
                <hr />
                <div className="h-[80vh] overflow-x-auto overflow-y-hidden relative top-2">
                    <div className="flex justify-center min-w-max mx-auto h-full p-4">
                        <Document
                            file={`${process.env.NEXT_PUBLIC_BASE_URL}/download/control-pdf/${fileName}`}
                            
                        >
                            <Page 
                                pageNumber={1}
                                scale={1} 
                            />
                        </Document> 
                    </div>
                </div>
            </DialogContent>
        </Dialog>
        </>
    )
}