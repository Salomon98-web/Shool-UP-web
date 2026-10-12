'use client'

import { useState, useEffect } from "react"
import { User, LockKeyholeIcon, DeleteIcon } from "lucide-react"
import ConvertNumber from "@/functions/convert-number"
import LoaderCarte from "../loading-carte"

interface Props{
    token:string | undefined
}

export default function StatsUsers({token}:Props){
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState([])

    useEffect(()=>{
        const stats = async ()=>{
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/account/stats`,{
                method:"GET",
                headers:{
                    "X-Api-Key":token as string
                }
            })

           const statusCode = res.status
           const result = await res.json()
           if(!res.ok){
                setData([])
                setLoading(false)
            }else{
                if(statusCode < 200 || statusCode >=300){
                    setData([])
                    setLoading(false)
                    console.log(result)
                }else{
                    setData(result)
                    console.log(result)
                    setLoading(false)
                }
            }
        }
        stats()
    },[])

    if(loading){
        return (
            <div className="relative top-10 grid grid-cols-1 w-full gap-2 mx-auto px-4 lg:px-14">
                {[0,1,2].map((item)=>(
                    <div key={item} className=" w-full h-19">
                        <LoaderCarte/>
                    </div>
                ))}
            </div>
        )
    }

    if(data.length < 1){
        return(
            <div className="relative top-10 w-full flex justify-center items-center gap-2 mx-auto px-4 lg:px-14">
                    <p className="text-chart-3">Aucun compte</p>
            </div>
        )
    }

    return(
        <>
        <div className="relative top-10 grid grid-cols-1 w-full gap-5 mx-auto px-4 lg:px-14">

            <div className="relative overflow-hidden flex flex-col p-4 gap-3 bg-white shadow-md rounded-sm">
                <User  
                    className={`  
                    absolute bottom-0 right-1 -rotate-10 
                    h-20 w-20  
                    text-gray-500 
                    opacity-10  
                    `}  
                />
                <div className="flex justify-between w-full gap-3 items-start">
                    <div className="flex flex-col gap-2">

                        <p className="text-xl font-mono font-extrabold">
                            <ConvertNumber number={(data as any).totalAccount} />
                        </p>

                        <p className="font-mono text-xs text-chart-2">Utilisateur-s</p>
                    </div>
                    
                </div>
            </div>

            {/* <div className="relative overflow-hidden flex flex-col p-4 gap-3 bg-green-100 shadow-md rounded-sm">
                <CheckCircleIcon  
                    className={`  
                    absolute bottom-0 right-1 -rotate-10 
                    h-20 w-20  
                    text-green-500 
                    opacity-10  
                    `}  
                />
                <div className="flex justify-between w-full gap-3">
                    <div className="flex flex-col gap-2 items-start">

                       <p className="text-xl font-mono font-extrabold">100</p>

                        <p className="font-mono text-xs text-chart-2">Compte-s actif-s</p>
                    </div>
                    
                </div>
            </div> */}

            <div className="relative overflow-hidden flex flex-col p-4 gap-3 bg-yellow-100 shadow-md rounded-sm">
                <LockKeyholeIcon  
                    className={`  
                    absolute bottom-0 right-1 -rotate-10 
                    h-20 w-20  
                    text-rose-500 
                    opacity-10  
                    `}  
                />
                <div className="flex justify-between w-full gap-3">
                    <div className="flex flex-col gap-2 items-start">

                        <p className="text-xl font-mono font-extrabold">
                            <ConvertNumber number={(data as any).totalDesactive} />
                        </p>

                        <p className="font-mono text-xs text-chart-2">Compte-s bloqué-s</p>
                    </div>
                </div>
            </div>

            <div className="relative overflow-hidden flex flex-col p-4 gap-3 bg-red-100 shadow-md rounded-sm">
                <DeleteIcon  
                    className={`  
                    absolute bottom-0 right-1 rotate-20 
                    h-20 w-20  
                    text-rose-500 
                    opacity-10  
                    `}  
                />
                <div className="flex justify-between w-full gap-3">
                    <div className="flex flex-col gap-2 items-start">

                       <p className="text-xl font-mono font-extrabold">
                            <ConvertNumber number={(data as any).totalSupprime} />
                        </p>

                        <p className="font-mono text-xs text-chart-2">Compte-s supprimé-s</p>
                    </div>
                </div>
            </div>

        </div>
        </>
    )
}