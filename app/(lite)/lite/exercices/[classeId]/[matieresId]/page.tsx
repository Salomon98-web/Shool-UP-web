'use client'

import { useState, useEffect, use } from "react";
import Navbar from "@/components/lite/Navbar";
import Link from "next/link";
import LoaderCarte from "@/components/loading-carte";

type Props = {
    params: Promise<{
        classeId:number;
        matieresId:number;
    }>;
};

interface Category{
    id:number;
    name:string;
    image:any;
}

export default function page({params}:Props){
    const param = use(params);
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [dataCategory, setDataCategory] = useState<Category | null>(null)

    useEffect(()=>{
        const matiere = async ()=>{
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/exercice/matiere/classe/${(await param).matieresId}`,{
                method:"GET"
            })
            const status = res.status
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
        const category = async () =>{
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/category/${param.classeId}`,{
                method:"GET"
            });
            const statusCode = res.status
            const result = await res.json();
            if(!res.ok){
                setDataCategory(null)
                return false
            }else{
                setDataCategory(result)
                console.log(result)
            }
        }
        category()
        matiere()
    },[])

    return(
        <div className="flex flex-col min-h-screen gap-14">

            <div className="flex flex-1 flex-col my-10 gap-8">
                <div className="flex justify-start items-center px-4 lg:px-28">
                    <div className="flex flex-col justify-center w-full">
                        <p className="text-2xl uppercase text-blue-950 font-extrabold">Matière</p> 
                        <p className=" text-lg md:text-sm  text-chart-2">Cliquer sur une matière pour accéder a la/les leçon(s)</p>               
                    </div>
                </div>
                <div className="px-4 lg:px-28">
                    <Link href={`/lite/exercices/${param.classeId}`} className="p-2 bg-blue-950 text-white rounded-md uppercase ">Retour</Link>
                </div>
                {loading ? (
                    <div className="flex justify-start  px-4 lg:px-28">
                        <div className="flex flex-col gap-4 w-full h-56">
                            {[1,2,3,4].map((item)=>(
                                <div key={item} className="flex justify-start items-center w-full h-24">
                                    <LoaderCarte />
                                </div>
                            ))}
                        </div>
                    </div>
                ):(
                    <div className="">
                        
                        {data.length < 1 ? (
                            <div className="text-center text-chart-1 ">Aucune matière</div>
                        ):(
                        
                            <div className="flex justify-start mx-auto px-4 lg:px-28">
                                <div className="flex flex-col gap-4 w-full">
                                    {data.map((item:any)=>(
                                        <Link key={item.id} href={`/lite/exercices/${param.classeId}/${param.matieresId}/${item.id}`}>
                                            <div className="flex justify-start items-center group bg-gray-100 duration-500 hover:shadow-lg 
                                                hover:shadow-mauve-300 w-full h-auto rounded-sm p-4 ">
                                                <p className="text-start font-bold  text-xl text-wrap">{item.nom_matiere}</p>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
            
            
            <div className="flex flex-col flex-1">
                <div className="w-full">
                    {/* Navigator bar */}
                    <Navbar />
                </div>
            </div>
        </div>
    )
}