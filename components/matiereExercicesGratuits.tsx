'use client'

import { useState, useEffect } from "react";
import Link from "next/link";
import LoaderCarte from "@/components/loading-carte"

export default function Matieres(){
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(()=>{
        const matieres = async ()=>{
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/exercice-gratuit/matieres`,{
                method:"GET"
            })
            const result = await res.json()
            if(!res.ok){
                setData([])
                setLoading(false)
            }else{
                setData(result)
                setLoading(false)
                console.log(result)
            }
        }
        matieres()
    },[])
    if(loading){
        return(
            <div className="flex justify-start  px-4 lg:px-28">
                <div className="flex flex-col gap-4 w-full h-56">
                    {[1,2,3,4].map((item)=>(
                        <div key={item} className="flex justify-start items-center w-full h-24">
                            <LoaderCarte />
                        </div>
                    ))}
                </div>
            </div>
        )
    }
    if(data.length < 1){
        return(
            <div></div>
        )
    }
    return(
        <>
            {/* <div className="flex overflow-x-auto pb-4 scrollbar-hide gap-2 ">

                <Link href="/exercices-gratuits">
                    <div className="flex items-center justify-center shadow-lg bg-blue-950 rounded-sm shrink-0 p-2">
                        <p className="text-white text-xs whitespace-nowrap font-mono">Toutes les matières</p>
                    </div>
                </Link>
                {data.map((subject:any)=>(
                    <Link key={subject.id} href={`/exercices-gratuits/${subject.matiere.id}`}>
                        <div className="flex items-center justify-center shadow-lg bg-blue-950 rounded-sm shrink-0 p-2">
                            <p className="text-white text-xs whitespace-nowrap font-mono">{subject.matiere.nom_matiere}</p>
                        </div>
                    </Link>
                ))}
            </div> */}
            <div className=" px-4 lg:px-28">
                <div className="flex flex-col gap-4 w-full">
                    {data.map((subject:any)=>(
                        <Link key={subject.id} href={`/exercices-gratuits/${subject.matiere.id}`}>
                            <div className="flex justify-start items-center group bg-gray-100 duration-500 hover:shadow-lg 
                                hover:shadow-mauve-300 w-full h-auto rounded-sm p-4 ">
                                <p className="text-start font-bold font-mono text-[12px] text-wrap">{subject.matiere.nom_matiere}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </>
    )
}