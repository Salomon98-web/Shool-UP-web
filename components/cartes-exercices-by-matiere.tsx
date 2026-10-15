"use client"

import { useState, useEffect } from "react";
import Link from "next/link";
import LoaderText from "@/components/loading-text";
import ModalDownload from "@/components/modal-download";
import ModalDescriptif from "@/components/modal-descriptif";
import Image from "next/image";
import drapeauGabon from "@/public/gabon.png";
import drapeauFrance from "@/public/france.png";

interface Props{
    id:number
    matiereId:number
}

export default function cartesExercices({id,matiereId}:Props){
    const [openModalDownload, setOpenModalDownload] = useState(false)
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [idExercice, setIdExercice] = useState<number>(0)
    const [onpenModalDescription, setOpenModalDescription] = useState(false)
    const [description, setDescription] = useState<string>('')

    useEffect(()=>{
        const exercicesInClasse = async ()=>{
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/exercice/${id}/by/matiere/${matiereId}`,{
                method:"GET"
            })
            const statusCode = res.status
            if(!res.ok){
                setData([])
                setLoading(false)
            }else{
                const result = await res.json();
                setData(result)
                console.log(result)
                setLoading(false)
                return result;

            }

        }
        
        exercicesInClasse()
    },[])
    
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
                <p className="text-center text-chart-1 font-bold ">Aucun exercices</p>
            </div> 
        )
    }

    return(
        <>
        <div className="w-ull p-4 relative top-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 w-full gap-5 mx-auto px-4 lg:px-28">
                
            { data.map((item:any)=>(
                <div key={item.id} className="flex flex-col w-full h-auto border border-gray-200 shadow-lg group hover:transform hover:-translate-y-2 duration-500 
                    rounded-sm p-4 gap-2">
                    <div className="flex flex-row gap-1">
                        {item.type == "GABONAIS" ?(

                            <div className="w-6 h-6 rounded-xs group-hover:transform group-hover:-rotate-12 duration-500">
                                <Image
                                    src={drapeauGabon}
                                    alt=""
                                    width={80}
                                />
                            </div>
                        ):(
                            
                            <div className="w-6 h-6 rounded-xs group-hover:transform group-hover:-rotate-12 duration-500">
                                <Image
                                    src={drapeauFrance}
                                    alt=""
                                    width={80}
                                />
                            </div>
                        )}
                        <div className="flex flex-col justify-center items-start  ">
                            <p className="text-[9px] font-semibold ">{item.classe.name_class}</p>
                            <p className=" text-[10px] font-black text-blue-950 ">{item.matiere.nom_matiere}</p>
                        </div>
                    </div>

                    <div className=" w-3xs text-chart-2 font-medium my-3 relative bottom-3">
                        <p className=" line-clamp-2 text-lg">{item.description}</p>
                        <button onClick={()=>{
                            setDescription(item.description)
                            setOpenModalDescription(true)
                        }} className="text-lg text-blue-700">
                            Lire la description complet
                        </button>
                    </div>

                    <div className="flex justify-between items-center">
                        <p className="text-xs">{item.techarge} {item.techarge <= 1 ?"téléchargement" : "téléchargememts"}</p>
                        <button onClick={()=>{
                            setOpenModalDownload(true)
                            setIdExercice(item.id)
                        }} className=" p-2 rounded-xs text-xs bg-blue-950 group-hover:bg-blue-800 duration-500 text-white">
                            Télécharger
                        </button>
                    </div>
                    
                </div>
            ))}
            <ModalDownload open={openModalDownload} onOpenChange={setOpenModalDownload} exerciceId={idExercice} />
            <ModalDescriptif open={onpenModalDescription} onOpenChange={setOpenModalDescription} description={description} />
        </div>
        </>)
}