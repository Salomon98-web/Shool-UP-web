"use client"

import { useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { CreditCard, Presentation } from "lucide-react";

export default function Category(){

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    useEffect(()=>{
        const categories = async ()=>{
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/category`,{
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
        categories()
    },[])

    if(loading){
        return(
            <div className=" flex flex-col p-3 gap-2">
                <div className="">
                <p className=" text-gray-400 text-center">Nos catégories</p>
            </div>
                <div className=" w-full flex flex-row justify-center items-center h-auto p-2">
                    <div className="flex overflow-x-auto pb-4 scrollbar-hide gap-2 ">
                        {[1,2].map((item:any)=>(
                            <Skeleton key={item} className="flex flex-col items-center justify-center rounded-sm h-20 md:h-60 shrink-0 min-w-60 p-2 gap-2" />
                        ))}
                    </div>
                </div>
            </div>
        )
    }
    if(data.length < 1){
        return(
           <div className="w-ull p-4 relative top-10 flex flex-col gap-5">
                <p className="text-center text-chart-1 font-bold ">Aucune catégorie</p>
           </div> 
        )
    }
    return (
        <div className=" flex flex-col gap-2 relative bottom-36">
            <div className=" w-full flex flex-row justify-center items-center h-auto p-1">
                <div className="flex overflow-x-auto pb-4 scrollbar-hide gap-2 ">
                    {data.map((category:any)=>(
                        <div key={category.id} className="relative overflow-hidden flex flex-col items-center justify-center shadow-lg bg-violet-800  bg-linear-to-r from-violet-950 via-violet-800 to-violet-500 group duration-500 
                            rounded-sm h-40 shrink-0 min-w-50 p-2 gap-2 hover:shadow-mauve-300 hover:shadow-lg">
                                <Presentation
                                    className={`  
                                    absolute top-6 right-1 -rotate-10 
                                    h-45 w-45  
                                    text-violet-500 
                                    opacity-10  group-hover:scale-125 duration-500 
                                    `}  
                                />
                            <p className="  text-white group-hover:transform group-hover:-translate-y-1 group-active:-translate-y-1 font-bold duration-500">{category.name}</p>
                            {/* <span className="text-[10px]  text-gray-400">19 exercices</span> */}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}