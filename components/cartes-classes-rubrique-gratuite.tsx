'use client'

import { useState, useEffect, use } from "react"

import Link from "next/link"
import LoaderText from "@/components/loading-text";

export default function cartes(){
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(()=>{
        const classes = async ()=>{
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/exercice-gratuit/classes`,{
                method:"GET"
            })
            const statusCode = res.status
            const data = await res.json()
            if(!res.ok){
                setData([])
                setLoading(false)

            }else{
                if(statusCode >= 300){
                    setData([])
                    setLoading(false)
                }else{
                    setData(data)
                    setLoading(false)
                }
            }
        }
        classes()
    },[])

    if(loading){
        return(
            <LoaderText />
        )
    }

    return(
        <div className="flex justify-center items-center w-full px-4 lg:px-28">
            {data.length < 1 ? (
                <p className="text-center text-chart-1 font-bold ">Aucune classe</p>
            ):(
                <div className="flex flex-wrap justify-center gap-4">
                    {data.map((item:any)=>(
                        <Link key={item.classe.id} href={`/exercices-gratuits/${item.classe.id}`}>
                            <div className="flex justify-center items-center group border bg-gray-100 duration-500 hover:shadow-mauve-300 shadow-xs 
                                hover:shadow-lg hover:transform hover:rotate-2 w-72 h-24 rounded-lg p-2 ">
                                <p className="text-center font-bold  text-lg text-wrap">{item.classe.name_class}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    )
}