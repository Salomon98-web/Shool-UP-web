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

interface Props{
    open:boolean;
    onOpenChange:(openModalApecu:boolean)=>void;
    fileName:string;

}

export default function modalAffichePDF({open, onOpenChange, fileName}:Props){
    const [numPage, setNumPage] = useState<number>(1)
    const [scale, setScale] = useState<number>(1)

    const zoomIn = ()=>{
        setScale((prev)=>Math.min(prev + 10, 90))
    }
    const zoomOut = ()=>{
        setScale((prev)=>Math.min(prev - 0.5, 0.7))
    }

    useEffect(()=>{

    },[scale])
    
    return(
        <>
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="h-full w-[50vh] lg:w-[75vh] overflow-y-auto  flex flex-col p-2 overflow-hidden">
                <DialogHeader className="h-12">
                    <DialogTitle className=" text-blue-950 text-xl p-2">Corrigé</DialogTitle>
                </DialogHeader>
                {/* <button onClick={zoomIn} >Zoom +</button>{scale} */}
                <hr />
                <div className="h-[80vh] w-full overflow-x-auto overflow-y-auto top-2">
                    <div className="flex justify-center min-w-max mx-auto relative h-full p-4">
                       
                         <iframe
                            src={`/view-corriges/${fileName}#toolbar=0&navpanes=0&scrollbar=0&zoom=90`}
                            className="w-full h-full "
                        />
                        <div onContextMenu={(e)=>{e.preventDefault()}} className="absolute inset-0 z-10 bg-transparent bottom-7.5 right-7"></div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
        </>
    )
}

'use client'


import 'react-pdf/dist/Page/AnnotationLayer.css'
import 'react-pdf/dist/Page/TextLayer.css'

export  function modalApercuPDF2({open, onOpenChange, fileName}:Props){
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
        pdfjs.GlobalWorkerOptions.workerSrc = new URL(
            'pdfjs-dist/build/pdf.worker.min.mjs',
            import.meta.url
        ).toString()
    },[])
    
    return(
        <>
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="h-full w-[50vh] lg:w-[75vh] flex flex-col p-2 overflow-hidden">
                <DialogHeader className="h-12">
                    <DialogTitle className=" text-blue-950 text-xl p-2">Apercu</DialogTitle>
                </DialogHeader>
                <hr />
                <div className="absolute inset-0 z-10 bg-transparent ">
                    <div className="h-[80vh] overflow-x-auto overflow-y-auto relative top-2">
                        <div className="flex justify-center min-w-max mx-auto h-full p-4">
                            <Document
                                file={`${process.env.NEXT_PUBLIC_BASE_URL}/download/corrige-control-pdf/${fileName}`}
                                
                            >
                                <Page 
                                    pageNumber={numPage}
                                    scale={1} 
                                />
                            </Document> 
                        </div>
                    </div>
                    <div onContextMenu={(e)=>{e.preventDefault()}} className="w-full h-full ">
                        
                        <iframe
                            src={`/pdf-preview/${fileName}#toolbar=0&navpanes=0&scrollbar=0&zoom=`}
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