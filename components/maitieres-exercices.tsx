"use client"

import { useState, useEffect } from "react";
import LoaderCarte from "./loading-carte";
import Link from "next/link";

interface Props{
    id:number
    classeId:number
}

export default function matiereExercices({id, classeId}:Props){
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState([])

    useEffect(()=>{
        const matieres = async ()=>{
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/exercice/matiere/classe/${id}`,{
                method:"GET"
            })
            const result = await res.json()
            const statusCode = res.status
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
            <div className="relative top-6 h-14 flex overflow-x-auto pb-4 scrollbar-hide gap-2 px-4 lg:px-28">
                {[1,2,3,4].map((item)=>(
                    <div key={item} className="w-20 rounded-sm shrink-0">
                        <LoaderCarte />
                    </div>
                ))}
            </div>
        )
    }
    if(data.length < 1){
        return(
            <div></div>
        )
    }
    return(
        <div className=" w-full flex flex-row justify-start items-center h-auto relative top-6 px-4 lg:px-28">
            <div className="flex overflow-x-auto pb-4 scrollbar-hide gap-2 ">

                <Link href={`/exercices/${classeId}/${id}`}>
                    <div className="flex items-center justify-center shadow-lg bg-blue-950 rounded-sm shrink-0 p-2">
                        <p className="text-white text-xs md:text-sm whitespace-nowrap">Toutes les matières</p>
                    </div>
                </Link>
                {data.map((subject:any)=>(
                    <Link key={subject.id} href={`/exercices/${classeId}/${id}/${subject.matiere.id}`}>
                        <div className="flex items-center justify-center shadow-lg bg-blue-950 rounded-sm shrink-0 p-2">
                            <p className="text-white text-xs md:text-sm whitespace-nowrap">{subject.matiere.nom_matiere}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}