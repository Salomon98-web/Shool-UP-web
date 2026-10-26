"use client"

import { useState, useEffect } from "react";
import Link from "next/link";
import LoaderText from "@/components/loading-text";
import drapeauGabon from "@/public/gabon.png";
import drapeauFrance from "@/public/france.png";
import Image from "next/image";
import {Download, File, Gift } from "lucide-react";
import { Pagination } from "./ui/pagination";

interface Props{
    id:number
}

export default function Cartes({id}:Props){
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1)
    const [totalPage, setTotalPage] = useState(1)

    useEffect(()=>{
        const ExerciseFree = async ()=>{
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/exercice-gratuit/all/${id}?page=${page}&per-page=18`,{
                method:"GET"
            });
            const statusCode = res.status

            const pageCount = res.headers.get('X-Pagination-Page-Count')

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
            }
        }
        ExerciseFree()
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
           <div className="w-ull p-4 relative top-10 flex flex-col gap-5">
                <p className="text-center text-chart-1 font-bold ">Aucun exercice </p>
           </div> 
        )
    }
    return(
        <>
        
        <div className="w-ull p-4 relative top-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6 w-full gap-5 mx-auto px-4 lg:px-28">
                
            { data.map((item:any)=>(
                <div key={item.id} className="flex flex-col w-full h-auto border border-gray-200 shadow-lg hover:shadow-mauve-400 group hover:shadow-xl 
                    duration-500 rounded-sm gap-2">
                    {/* <div className="flex flex-row gap-1 p-4">
                        <div className="w-6 h-6 rounded-xs group-hover:transform group-hover:-rotate-25 duration-500">
                            <Image
                                src={ item.type == "GABONAIS" ? drapeauGabon : drapeauFrance}
                                alt=""
                                width={80}
                            />
                        </div>
                        <div className="flex flex-col justify-center items-start file:">
                            <p className="text-[9px] ">{ item.type == "GABONAIS" ? 'Système Gebonais' : 'Système Francais'}</p>
                        </div>
                    </div> */}

                    <div className={`font-medium relative overflow-hidden bottom-3 h-37 text-white rounded-t-sm ${item.type == "CLASSIQUES"?'bg-blue-800  bg-linear-to-r from-blue-950 via-blue-800 to-blue-500':'bg-green-800 bg-linear-to-r from-green-950 via-green-800 to-green-500'}`}>
                        <Gift 
                            className={`  
                            absolute bottom-0 right-1 -rotate-10 
                            h-40 w-40  
                            text-white 
                            opacity-10  group-hover:scale-125 duration-500 
                            `}  
                        />
                        <p className="text-lg md:text-2xl p-2 font-extrabold text-center"><i>{item.description}</i></p>
                    </div>

                    <div className="h-2 ">
                        <p className="font-mon text-xs md:text-md text-center text-chart-2 relative left-3 uppercase">{item.matiere.nom_matiere}</p>
                    </div>

                    <div className="flex flex-col justify-justify-center items-center p-2">
                        <p className="text-xs md:text-lg flex flex-row justify-center items-center gap-1">
                            <File width="20" className="text-red-600" />
                            <span>Exercice & corrigé</span> 
                        </p>
                        <Link href={`${process.env.NEXT_PUBLIC_BASE_URL}/download/free/${item.id}`} className=" p-2">
                            <Download width="20" className="text-sm text-blue-950" />
                        </Link>
                    </div>
                </div>
            ))}
            {/* <div className="flex flex-col w-full h-auto border border-gray-200 shadow-lg group hover:transform hover:-translate-y-2 duration-500 
                rounded-sm p-4 gap-2">
                <div className="flex flex-row gap-1">
                    <div className="w-6 h-6 bg-blue-950 rounded-xs group-hover:transform group-hover:-rotate-12 duration-500"></div>
                    <div className="flex flex-col justify-center items-start  ">
                        <p className="text-[10px] font-semibold ">{}</p>
                        <p className=" text-lg font-black text-blue-950 ">{}</p>
                    </div>
                </div>

                <div className=" w-3xs text-chart-2 font-medium my-3 relative bottom-3">
                    <p className=" line-clamp-2">{}</p>
                </div>

                <div className="flex justify-between items-center">
                    <p className="text-xs">{} {}</p>
                    <Link href={`${process.env.NEXT_PUBLIC_BASE_URL}/download/free/`} className=" p-2 rounded-xs text-xs group-hover:bg-green-900 duration-500 group-hover:text-white">
                        Télécharger
                    </Link>
                </div>
            </div> */}
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
