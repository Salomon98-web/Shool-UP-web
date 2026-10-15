'use client'

import { useState, useEffect, use } from "react"
import LoaderCarte from "../loading-carte"
import ConvertNumber from "@/functions/convert-number"

interface Props{
    token:string | undefined
}

export default function cartes({token}:Props){
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(()=>{
        const statsExercices = async ()=>{
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/member/stats`,{
                method:"GET",
                headers:{
                    "X-Api-Key": token as string,
                }
            })
            const statusCode = res.status;
            const result = await res.json();
            if(!res.ok){
                setData([])
                setLoading(false)
            }else{
                setData(result)
                setLoading(false)
            }
            console.log(result);
        }
        statsExercices()
    },[])

    if(loading){
        return(
            <div className="p-4 relative top-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 2xl:grid-cols-4 w-full gap-5 mx-auto px-4 lg:px-14">
                {[0,1,2,3].map((item:any)=>(
                
                    <div key={item}  className={`group w-full h-37 relative overflow-hidden rounded-md `}  >
                        
                        <LoaderCarte />
                    </div>
                ))}
            </div>
        )
    }

    if(data.length < 1){
        return(
            <div className="w-ull p-4 relative top-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 2xl:grid-cols-4 w-full gap-5 mx-auto px-4 lg:px-14">
                <div className="group  w-full h-37 relative overflow-hidden rounded-md flex justify-center items-center text-chart-2">   
                    
                    Aucun abonnement
                </div>
            </div>
        )
    }

    return(
        <div className="w-ull p-4 relative top-10 grid grid-cols-2 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 w-full gap-5 mx-auto px-4 lg:px-14">

            <div  className={`group relative overflow-hidden rounded-md bg-linear-to-br from-rose-50 to-pink-200  p-7 shadow-[0_15px_40px_rgba(0,0,0,0.08)]  
                transition-all duration-300  hover:-translate-y-1  hover:shadow-[0_20px_50px_rgba(0,0,0,0.12)]  `}  >
                <div  
                    className={`absolute -right-16 -top-16 h-48 w-48 rounded-full bg-rose-500 opacity-10 transition-transform duration-500 
                    group-hover:scale-125  `}
                />

                <div  
                    className={`  
                    absolute -bottom-20 -right-10  
                    h-52 w-52  
                    rounded-full  
                    bg-rose-500 
                    opacity-10  
                    `}  
                />

                <p className=" text-lg uppercase font-extrabold tracking-wide text-slate-800">Total</p>
                <div className="h-20 flex justify-start items-center">
                    <p className=" font-black text-2xl"><ConvertNumber number={(data as any).totalAbonnes} /></p>
                </div>
                <p className=" text-xs text-chart-2">Abonnés</p>
            </div>

            <div className={`group relative overflow-hidden rounded-md bg-linear-to-br from-yellow-50 to-pink-200  p-7 shadow-[0_15px_40px_rgba(0,0,0,0.08)]  
                transition-all duration-300  hover:-translate-y-1  hover:shadow-[0_20px_50px_rgba(0,0,0,0.12)]  `}>

                <div  
                    className={`absolute -right-16 -top-16 h-48 w-48 rounded-full bg-yellow-500 opacity-10 transition-transform duration-500 
                    group-hover:scale-125  `}
                />

                <div  
                    className={`  
                    absolute -bottom-20 -right-10  
                    h-52 w-52  
                    rounded-full  
                    bg-yellow-500 
                    opacity-10  
                    `}  
                />

                <p className=" font-bold text-yellow-700 text-lg uppercase">en attente</p>
                <div className="h-20 flex justify-start items-center">
                    <p className=" font-black text-2xl"><ConvertNumber number={(data as any).totalAbonnesEnAttente} /></p>
                </div>
                <p className=" text-xs text-chart-2">Abonnés</p>
            </div>

            <div className={`group relative overflow-hidden rounded-md bg-linear-to-br from-gray-50 to-green-200  p-7 shadow-[0_15px_40px_rgba(0,0,0,0.08)]  
                transition-all duration-300  hover:-translate-y-1  hover:shadow-[0_20px_50px_rgba(0,0,0,0.12)]  `}>

                <div  
                    className={`absolute -right-16 -top-16 h-48 w-48 rounded-full bg-green-500 opacity-10 transition-transform duration-500 
                    group-hover:scale-125  `}
                />

                <div  
                    className={`  
                    absolute -bottom-20 -right-10  
                    h-52 w-52  
                    rounded-full  
                    bg-green-500 
                    opacity-10  
                    `}  
                />

                <p className=" font-bold text-green-700 text-lg uppercase">Actifs</p>
                <div className="h-20 flex justify-start items-center">
                    <p className=" font-black text-2xl"><ConvertNumber number={(data as any).totalAbonnesActif} /></p>
                </div>
                <p className=" text-xs text-chart-2">Abonnés</p>
            </div>

            <div className={`group relative overflow-hidden rounded-md bg-linear-to-br from-gray-50 to-gray-200  p-7 shadow-[0_15px_40px_rgba(0,0,0,0.08)]  
                transition-all duration-300  hover:-translate-y-1  hover:shadow-[0_20px_50px_rgba(0,0,0,0.12)]  `}>

                <div  
                    className={`absolute -right-16 -top-16 h-48 w-48 rounded-full bg-gray-500 opacity-10 transition-transform duration-500 
                    group-hover:scale-125  `}
                />

                <div  
                    className={`  
                    absolute -bottom-20 -right-10  
                    h-52 w-52  
                    rounded-full  
                    bg-gray-500 
                    opacity-10  
                    `}  
                />

                <p className=" font-bold text-red-700 text-lg uppercase">terminés</p>
                <div className="h-20 flex justify-start items-center">
                    <p className=" font-black text-2xl"><ConvertNumber number={(data as any).totalAbonnesTermine} /></p>
                </div>
                <p className=" text-xs text-chart-2">Abonnés</p>
            </div>

        </div>
    )
}