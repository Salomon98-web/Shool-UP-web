'use client'

import { useState, useEffect } from "react"
import {Presentation, BookOpen } from "lucide-react"
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
        const totaMatiere = async ()=>{
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/matiere`,{
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
        totaMatiere()
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
            <div className="w-96 flex flex-col bg-indigo-200 rounded-md p-5 shadow-md group relative overflow-hidden bg-linear-to-br from-white to-indigo-300 ">
                <div className="flex flex-row gap-4">
                    <BookOpen 
                        className={`  
                        absolute bottom-0 right-1 -rotate-10 
                        h-40 w-40  
                        text-indigo-500 
                        opacity-10  group-hover:scale-125 duration-500 
                        `}  
                    />
                    <div className="w-12 h-12 rounded-xl bg-indigo-200 p-2 flex justify-center items-center">
                        <BookOpen className=" text-indigo-600" />
                    </div>
                    <p className=" text-chart-2 uppercase">Total matières</p>
                </div>
                <div className="my-3">
                    <p className=" text-indigo-800 text-lg relative left-19 bottom-7"><span className="text-4xl font-extrabold "><ConvertNumber number={data.length} /></span></p>

                </div>
                <p className=" text-gray-800 text-lg uppercase">matières</p>
            </div>
        </div>
        </>
    )
}