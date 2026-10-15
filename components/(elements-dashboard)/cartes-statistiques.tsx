'use client'

import { useState, useEffect, use } from "react";
import ConvertNumber from "@/functions/convert-number"
import LoaderCarte from "../loading-carte"
import { 
  Book,
  BookOpen,
  BookOpenText,
  Library,
  Notebook,
  BookType,
  Gift,
  Download,
  FileText,
} from "lucide-react";

interface Props{
    token:string | undefined
}

export default function cartes({token}:Props){
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    useEffect(()=>{
        const statsExercices = async ()=>{
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/exercice/stats`,{
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
            <div className="w-ull p-4 relative top-10 grid grid-cols-1 md:grid-cols-2 w-full gap-5 mx-auto px-4 lg:px-14">
                {[0,1,2,3].map((item:any)=>(
                <div 
                    key={item}
                    className="w-full h-32 rounded-md"
                >
                    <LoaderCarte />
                </div>
                ))}
            </div>
        )
    }

    if(data.length < 1){
        return(
            <div className=" w-full flex flex-row items-center h-auto p-2 relative top-10 px-4 lg:px-14">
                <div className="flex overflow-x-auto pb-4 scrollbar-hide gap-2 ">
                    
                    <div 
                        
                        className="rounded-md w-full h-32  bg-gray-200 flex justify-center items-center text-chart-2"
                    >
                        Aucun abonnement
                    </div>
                </div>
            </div>
        )
    }

    return(
        <div className="w-ull p-4 relative top-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 w-full gap-5 mx-auto px-4 lg:px-14">

            <div className="w-full flex flex-col bg-blue-200 rounded-md p-5 shadow-md group relative overflow-hidden bg-linear-to-br from-white to-blue-300 ">
                <div className="flex flex-row gap-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-200 p-2 flex justify-center items-center">
                        <FileText className=" text-blue-600" />
                    </div>
                    <p className=" text-chart-2  text-xs">Total Exercice</p>
                </div>
                <div className="my-3">
                    <p className=" text-lg relative left-19 bottom-7"><span className="text-2xl font-extrabold "><ConvertNumber number={(data as any).totalExercice} /></span></p>
                </div>
                <p className=" text-blue-800 text-lg"> exercices et corrigés</p>
            </div>

            <div className="w-full flex flex-col bg-blue-200 rounded-md p-5 shadow-md group relative overflow-hidden bg-linear-to-br from-white to-green-100 ">
                <div className="flex flex-row gap-4">
                    <div className="w-12 h-12 rounded-xl bg-green-200 p-2 flex justify-center items-center">
                        <Gift className=" text-green-600" />
                    </div>
                    <p className=" text-chart-2  text-xs">Contenu Gratuit</p>
                </div>
                <div className="my-3">
                <p className=" text-green-800 text-lg relative left-19 bottom-7"><span className="text-2xl font-extrabold text-shadow-sm "><ConvertNumber number={(data as any).totalExerciceGratuit} /></span></p>
                
                </div>
                <p className=" text-green-800 text-lg">exercices gratuits et corrigés</p>
            </div>

            <div className="w-full flex flex-col bg-blue-200 rounded-md p-5 shadow-md group relative overflow-hidden bg-linear-to-br from-white to-violet-100 ">
                <div className="flex flex-row gap-4">
                    <div className="w-12 h-12 rounded-xl bg-violet-200 p-2 flex justify-center items-center">
                        <BookOpenText className=" text-violet-600" />
                    </div>
                    <p className=" text-chart-2  text-xs">Domaine</p>
                </div>
                <div className="my-3">
                    <p className=" text-violet-800 text-lg relative left-19 bottom-7"><span className="text-2xl font-extrabold "><ConvertNumber number={(data as any).totalCategorie} /></span></p>

                </div>
                <p className=" text-violet-800 text-lg">catégories</p>
            </div>

            <div className="w-full flex flex-col bg-blue-200 rounded-md p-5 shadow-md group relative overflow-hidden bg-linear-to-br from-white to-orange-100 ">
                <div className="flex flex-row gap-4">
                    <div className="w-12 h-12 rounded-xl bg-orange-200 p-2 flex justify-center items-center">
                        <Download className=" text-orange-600" />
                    </div>
                    <p className=" text-chart-2  text-xs">Activité de téléchargement</p>
                </div>
                <div className="my-3">
                    <p className=" text-orange-800 text-lg relative left-19 bottom-7"><span className="text-2xl font-extrabold "><ConvertNumber number={(data as any).activiteTelechargement} /></span></p>
                </div>
                <p className=" text-orange-800 text-lg">total téléchargements</p>
            </div>
            
        </div>
    )
}