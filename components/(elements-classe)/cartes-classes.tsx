'use client'

import { useState, useEffect } from "react"
import {Presentation } from "lucide-react"
import ConvertNumber from "@/functions/convert-number"
import LoaderCarte from "../loading-carte"

interface Props{
    token:String | undefined
    refreshKey:number
}

export default function CartesClasses({token, refreshKey}:Props){
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    useEffect(()=>{
        const totalClasse = async ()=>{
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/classe`,{
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
        totalClasse()
    },[refreshKey])

    if(loading){
        return(
            <div className=" w-full flex flex-row items-center h-auto p-2 relative top-10 px-4 lg:px-14">
                <div className="w-96 flex flex-col h-38">
                    <LoaderCarte />
                </div>
            </div>
        )
    }
    return (
        <>
        <div className=" w-full flex flex-row items-center h-auto p-2 relative top-10 px-4 lg:px-14">
            <div className="w-96 flex flex-col bg-blue-400 rounded-md p-5 shadow-md group relative overflow-hidden bg-linear-to-br from-white to-blue-300 ">
                <div className="flex flex-row gap-4">
                    <Presentation
                        className={`  
                        absolute bottom-0 right-1 -rotate-10 
                        h-40 w-40  
                        text-gray-500 
                        opacity-10  group-hover:scale-125 duration-500 
                        `}  
                    />
                    <div className="w-12 h-12 rounded-xl bg-blue-200 p-2 flex justify-center items-center">
                        <Presentation className=" text-blue-600" />
                    </div>
                    <p className=" text-chart-2">Total classe</p>
                </div>
                <div className="my-3">
                    <p className=" text-blue-800 text-lg relative left-19 bottom-7"><span className="text-4xl font-extrabold "><ConvertNumber number={data.length} /></span></p>

                </div>
                <p className=" text-gray-800 text-lg">classe-s</p>
            </div>
        </div>
        </>
    )
}