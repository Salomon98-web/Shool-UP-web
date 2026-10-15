"use client"

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import LoaderText from "@/components/loading-text";
import ModalDownload from "@/components/modal-download";
import ModalDescriptif from "@/components/modal-descriptif";
//import ModalApercu from "@/components/modal-apercu-pdf";
import Image from "next/image";
import drapeauGabon from "@/public/gabon.png";
import drapeauFrance from "@/public/france.png";
import { Eye, Download, File, FileText } from "lucide-react";
import { Pagination } from "@/components/ui/pagination"

const ModalApercu = dynamic(
    ()=>import('@/components/modal-apercu-pdf'),
    {ssr:false}
)
interface Props{
    classeId:number;
    matiereId:number;
    leconId:number;
}

export default function cartesExercices({classeId, matiereId, leconId}:Props){
    const [openModalDownload, setOpenModalDownload] = useState(false)
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [idExercice, setIdExercice] = useState<number>(0)
    const [onpenModalDescription, setOpenModalDescription] = useState(false)
    const [description, setDescription] = useState<string>('')
    const [fileName, setFileName] = useState<string>('')
    const [openModalApercu, setOpenModalApercu] = useState(false)
    const [page, setPage] = useState(1)
    const [totalPage, setTotalPage] = useState(1)


    useEffect(()=>{
        const exercicesInClasse = async ()=>{
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/exercice/classe/${classeId}/matiere/${matiereId}/lecon/${leconId}?page=${page}&per-page=18`,{
                method:"GET"
            })
            const statusCode = res.status

            const pageCount = res.headers.get("X-Pagination-Page-Count")
            const currentPage = res.headers.get("x-pagination-current-page")
            //console.log(currentPage)
            if(!res.ok){
                setData([])
                setLoading(false)
            }else{
               const result = await res.json();
                setData(result)
                console.log(result)
                setLoading(false)
                
                if(pageCount){
                    setTotalPage(parseInt(pageCount))
                }
                //return result;
            }

        }
        
        exercicesInClasse()
       /*  window.scrollTo({top:0, behavior:"smooth"}) */
    },[page])
    
    if(loading){
        return(
            <div className="w-ull p-4 relative top-10 flex flex-col gap-5">
                <LoaderText />
            </div> 
        )
    }
    if(data.length < 1){
        return(
            <div className="w-full md:h-56 p-4 relative top-10 flex flex-col gap-5">
                <p className="text-center text-chart-1 font-bold ">Aucun exercice</p>
            </div> 
        )
    }

    return(
        <>
        <div className="w-ull p-4 relative top-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6 w-full gap-5 mx-auto px-4 lg:px-28">
                
            { data.map((item:any)=>(
                <div key={item.id} className="flex flex-col w-full h-auto border border-gray-200 shadow-lg hover:shadow-mauve-400 group hover:shadow-xl 
                duration-500 rounded-sm gap-2">
                <div className="flex flex-row gap-1 p-4">
                    <div className="w-6 h-6 rounded-xs group-hover:transform group-hover:-rotate-25 duration-500">
                        <Image
                            src={ item.type == "GABONAIS" ? drapeauGabon : drapeauFrance}
                            alt=""
                            width={80}
                        />
                    </div>
                    <div className="flex flex-col justify-center items-start">
                        <p className="text-[9px] ">{ item.type == "GABONAIS" ? 'Système Gabonais' : 'Système Francais'}</p>
                    </div>
                </div>

                <div className={`font-medium relative overflow-hidden bottom-3 h-37 text-white ${item.type == "GABONAIS"?'bg-blue-800  bg-linear-to-r from-blue-950 via-blue-800 to-blue-500':'bg-red-800 bg-linear-to-r from-red-950 via-red-800 to-red-500'}`}>
                    <FileText 
                        className={`  
                        absolute bottom-0 right-1 -rotate-10 
                        h-40 w-40  
                        text-white 
                        opacity-10  group-hover:scale-125 duration-500 
                        `}  
                    />
                    <p className=" text-lg lg:text-lg p-2 ">{item.description}</p>
                </div>

                <div className="flex flex-row justify-between items-center p-2">
                    <p className=" text-[7px] flex flex-row justify-center items-center gap-1 w-full">
                        <File width="20" className="text-red-600" />
                        <span>Exercice & corrigé</span> 
                    </p>
                    <div className=" flex justify-between  w-full">
                        <button onClick={()=>{
                                setFileName(item.file.name)
                                setOpenModalApercu(true)
                            }}
                        >
                            <Eye width="20" className="text-[9px] text-blue-950" />
                        </button>
                        <button onClick={()=>{
                            setIdExercice(item.id)
                            setOpenModalDownload(true)
                        }} className=" text-[8px] text-blue-950">
                            <Download width="20" className="text-sm text-blue-950" />
                        </button>
                    </div>
                </div>
                    
            </div>
            ))}

            
            <ModalDownload open={openModalDownload} onOpenChange={setOpenModalDownload} exerciceId={idExercice} />
            <ModalDescriptif open={onpenModalDescription} onOpenChange={setOpenModalDescription} description={description} />
            <ModalApercu open={openModalApercu} onOpenChange={setOpenModalApercu} fileName={fileName} />
        </div>

        {/** pagination */}
        <div className="relative top-30 w-full flex px-4 lg:px-28 my-1">
            
            {!loading && totalPage > 1 && (
                <Pagination 
                    currentPage={page}
                    totalPages={totalPage}
                    onPageChange={setPage}
                    
                /> 
            )}
        </div>
        </>
    )
}