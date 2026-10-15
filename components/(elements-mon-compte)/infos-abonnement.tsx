'use client'

import { useState, useEffect, ReactElement } from "react"
import { Crown } from "lucide-react"
import LoaderText from "../loading-text"

interface Props{
    token:any
}

export default  function InfoAbonnement({token}:Props){

    const [loading, setLoading]= useState(true)
    const [data, setData] = useState<any>([])

    useEffect(()=>{
        const abonnement = async ()=>{
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/member/get-info`,{
                method:"GET",
                headers:{
                    "X-Api-Key": token as string,
                }
            })
            
            const statusCode = res.status
            const result = await res.json()

            if(!res.ok){

            }
            if(statusCode >= 200 && statusCode < 300){
                setLoading(false)
                setData(result)

            }else{
                setLoading(false)
                setData([])
            }
            
            console.log(result)
        }
        abonnement()
    },[])

    return(
        <>
        <div className="flex flex-col gap-2 rounded-lg border bg-rose-50 border-rose-200 p-2">
            <div className="flex justify-between gap-2.5">
                <p className="">Information d'abonnement</p>
                <Crown
                    className="text-rose-600 cursor-pointer"
                />
            </div>
            
            <div className="flex flex-col gap-2.5 p-4">
                <p className="text-chart-2">Nombre d'abonnement</p>
                    {loading ? (
                        <p className="text-lg animate-pulse text-chart-2">chargement...</p>
                    ):(
                        <p className="font-mono text-2xl">
                            <span className="font-extrabold text-rose-800">{data.length}</span> / <span className="font-extrabold text-rose-800">7</span>
                        </p> 
                    )}
            </div>
        </div>
        </>
    )
}