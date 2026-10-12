'use client'

import { useState, useEffect, use } from "react";
import Sidebar from "../sidebar";
import Topbar from "../topbar";
import CartesCorriges from "../(elements-corriges)/carte-corrige";
import LoaderCarte from "../loading-carte"
import { Pagination } from "../ui/pagination";
import drapeauGabon from "@/public/gabon.png";
import drapeauFrance from "@/public/france.png";
import Image from "next/image";
import { Eye, Download } from "lucide-react";
import dynamic from "next/dynamic";

const MoadalAfiicheCorrige = dynamic(
    ()=>import('@/components/(elements-corriges)/modal-affiche-corrige'),
    {ssr:false}
)

interface Props{
    token:string | undefined
    role:string | undefined
}

export default function Corriges({token, role}:Props){

    const [openModalAfficheCorrige, setOpenModalAfficheCorrige] = useState(false)
    const [refreshKey, setRefresh] = useState(0)
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalPage, setTotalPage] = useState(1)
    {/** */}
    const [fileName, setFileName] = useState<string>('')

    useEffect(()=>{
        const exercices = async ()=>{
            
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/corrige/get?sort=-id&page=${page}&per-page=20`,{
                method:"GET",
                headers:{
                    "X-Api-Key":token as any
                }
            })
            const statusCode = res.status;
            const result = await res.json();

            const pageCount = res.headers.get("X-Pagination-Page-Count")
            const currentPage = res.headers.get("X-Pagination-Current-Page")
            //console.log(currentPage)

            if(!res.ok){
                setData([])
                setLoading(false)

            }else{
                setData(result)
                setLoading(false)

                if(pageCount){
                    setTotalPage(parseInt(pageCount))
                }
            }
            console.log(result);
        }
        exercices()
       /*  window.scrollTo({top:0, behavior:"smooth"}) */
    },[refreshKey, page])

    return(
        <>
        <div className="flex flex-row justify-center">
            {/** sidebar */}
            <div className="max-w-4/12">
                <Sidebar role={role} />
            </div>

            <div className="flex-1 flex flex-col w-8/12 bg-gray-100">
                {/** topbar */}
                <Topbar />

                <div className=" relative top-7 p-2 font-mono text-sm px-4 lg:px-14">
                    <hr className="p-2" />
                    <p className="text-chart-1">Corrigés</p>
                </div>
                <CartesCorriges token={token} refreshKey={refreshKey} />

                {loading ? (
                    <>
                    {[0,1,2].map((item)=>(
                        <div key={item} className="relative top-30 w-full flex px-4 lg:px-14 my-1">
                            <div className="w-full flex justify-between h-12">
                                <LoaderCarte />
                            </div>
                        </div>
                    ))}
                    </>
                ):(
                    <>
                    {data.map((item:any)=>(
                        <div key={item.id} className="relative top-30 w-full flex px-4 lg:px-14 my-1 group">
                            <div className="w-full flex-col relative overflow-hidden bg-white shadow-sm p-2 rounded-lg">
                                <Download 
                                    className={`  
                                    absolute bottom-4 right-1 -rotate-10 
                                    h-28 w-28  
                                    text-gray-500 
                                    opacity-10  group-hover:scale-125 duration-500 
                                    `}  
                                /> 
                                <div className="w-full flex justify-between">
                                    <p className=" font-mono font-bold text-[10px] md:text-xs p-2 line-clamp-1 truncate w-[38vw] md:w-[30vw]">{item.exercice_with_correction.description}</p>
                                    <div className="w-6 h-6 rounded-xs group-hover:transform group-hover:-rotate-25 duration-500">
                                        <Image
                                            src={ item.exercice_with_correction?.type == "GABONAIS" ? drapeauGabon : drapeauFrance}
                                            alt=""
                                            width={80}
                                        />
                                    </div>
                                </div>

                                <div className="w-full ">
                                    <div className=" flex flex-col "> 
                                        
        
                                        <p className="text-chart-2 font-mono  text-[8px] w-[38vw] md:w-[30vw] p-2">{item.exercice_with_correction?.matiere?.nom_matiere}</p>
                                        <p className="text-chart-2 font-mono  text-[8px] w-[38vw] md:w-[30vw] p-2 relative bottom-2">{item.exercice_with_correction?.lecon?.titre}</p>
                                        
                                        <div className="w-full flex justify-between">
                                            <p className="text-chart-2 font-mono  text-[8px] w-[38vw] md:w-[30vw] p-2 relative ">{item.exercice_with_correction?.lecon?.classe?.name_class}</p>
                                            <div className=" flex  gap-2 font-mono z-10">
                                                <button  
                                                     onClick={()=>{
                                                        setFileName(item.exercice_with_correction.corrige_file.name)
                                                        setOpenModalAfficheCorrige(true)
                                                     }}
                                                    
                                                >
                                                    <Eye className="text-green-700" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                            </div>
                        </div>  
                    ))}
                    </>
                )}

                {/** pagination */}
                <div className="relative top-30 w-full flex px-4 lg:px-14 my-1">
                    
                    {!loading && totalPage > 1 && (
                        <Pagination 
                            currentPage={page}
                            totalPages={totalPage}
                            onPageChange={setPage}
                            
                        /> 
                    )}
                </div>
                
                <div className="my-32"></div>
            </div>
        </div>
        
        <MoadalAfiicheCorrige 
            open={openModalAfficheCorrige} 
            onOpenChange={setOpenModalAfficheCorrige} 
             fileName={fileName}
        /> 
        </>
    )
}