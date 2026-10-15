'use client'

import { useState, useEffect, use } from "react";
import Sidebar from "../sidebar";
import Topbar from "../topbar";
import CartesExercices from "../(elements-exercices-gratuis)/carte-exercice-gratuit";
import LoaderCarte from "../loading-carte"
import { Pagination } from "../ui/pagination";
import MoadalAddExercice from "../(elements-exercices-gratuis)/modal-add-exercices-gratuis";
import MoadalUpdateExercice from "../(elements-exercices-gratuis)/modal-update-exercice-gratuit";
import ModalDeleteExercice from "../(elements-exercices-gratuis)/modal-delete-exercice-gratuit";
import drapeauGabon from "@/public/gabon.png";
import drapeauFrance from "@/public/france.png";
import Image from "next/image";
import { Eye, Gift } from "lucide-react";

interface Props{
    token:string | undefined
    role:string | undefined
}

export default function ExercicesGratuits({token, role}:Props){

    const [openModalAddExercice, setOpenModalAddExercice] = useState(false)
    const [refreshKey, setRefresh] = useState(0)
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalPage, setTotalPage] = useState(1)
    const [exerciceId, setExerciceId] = useState<number>(0)
    const [openModalUpdateExercice, setOpenModalUpdateExercice] = useState(false)
    const [openModalDelete, setOpenModaldeleteClasse] = useState(false)
    {/**value send to madal update */}
    const [titreName, setTitreName] = useState<string>('')
    const [type, setType] = useState<string>('')
    const [classeName, setClasse] = useState<string>('')
    const [matiereName, setMatiere] = useState<string>('')
    const [leconName, setLecon] = useState<string>('')
    {/**id */}
    const [idClasse, setIdClasse] = useState<number>(0)
    const [idMatiere, setIdMatiere] = useState<number>(0)
    const [idLecon, setIdLecon] = useState<number>(0)

    useEffect(()=>{
        const exercices = async ()=>{
            
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/exercice-gratuit?sort=-id&page=${page}&per-page=20`,{
                method:"GET"
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
                <Topbar onSuccess={()=>{}} token={token} />

                <div className=" relative top-7 p-2  text-sm px-4 lg:px-14">
                    <hr className="p-2" />
                    <p className="text-chart-1">Exercices gratuits</p>
                </div>
                <CartesExercices token={token} refreshKey={refreshKey} />

                <div className="relative top-15 w-full flex px-4 lg:px-14">
                    <button 
                            onClick={()=>{
                                setOpenModalAddExercice(true)
                            }}
                            className="   text-[11px] text-white bg-blue-800 max-w-96 p-2 rounded-sm"
                        >
                        AJouter une exercices
                    </button>
                </div>

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
                                <Gift 
                                    className={`  
                                    absolute bottom-4 right-1 -rotate-10 
                                    h-28 w-28  
                                    text-gray-500 
                                    opacity-10  group-hover:scale-125 duration-500 
                                    `}  
                                />
                                <div className="w-full flex justify-between">
                                    <p className="  font-bold text-[10px] md:text-xs p-2 line-clamp-1 truncate w-[38vw] md:w-[30vw]">{item.description}</p>
                                    <div className="w-6 h-6 rounded-xs group-hover:transform group-hover:-rotate-25 duration-500">
                                        <Image
                                            src={ item.type == "GABONAIS" ? drapeauGabon : drapeauFrance}
                                            alt=""
                                            width={80}
                                        />
                                    </div>
                                </div>

                                <div className="w-full ">
                                    <div className=" flex flex-col "> 
                                        
        
                                        <p className="text-chart-2   text-[8px] w-[38vw] md:w-[30vw] p-2">{item.matiere?.nom_matiere}</p>
                                        <p className="text-chart-2   text-[8px] w-[38vw] md:w-[30vw] p-2 relative bottom-2">{item.lecon?.titre}</p>
                                        
                                        <div className="w-full flex justify-between">
                                            <p className="text-chart-2   text-[8px] w-[38vw] md:w-[30vw] p-2 relative ">{item.classe?.name_class}</p>
                                            <div className=" flex  gap-2  z-10">
                                                <a  
                                                    href={`${process.env.NEXT_PUBLIC_BASE_URL3}/${item.exercice_file.name}`} 
                                                    target="_blank" className="text-chart-2"
                                                >
                                                    <Eye className="text-blue-700" />
                                                </a>
                                                <button
                                                    onClick={()=>{
                                                        /* setIdCategory(item.id)
                                                        setNamecategory(item.name)
                                                        setopenModalUpdateCategory(true) */
                                                        setExerciceId(item.id)
                                                        setTitreName(item.description)
                                                        setType(item.type)
                                                        setClasse(item.classe.name_class)
                                                        setMatiere(item.matiere.nom_matiere)
                                                        setIdClasse(item.classe.id)
                                                        setIdMatiere(item.matiere.id)
                                                        setOpenModalUpdateExercice(true)
                                                    }}
                                                    className="p-2 bg-blue-800 text-white rounded-md text-[8px] md:text-[11px]">
                                                    Modifier
                                                </button>
                                                <button 
                                                    onClick={()=>{
                                                        /* setIdCategory(item.id)
                                                        setNamecategory(item.name)
                                                        setOpenModaldeleteCategory(true) */
                                                        setExerciceId(item.id)
                                                        setTitreName(item.description)
                                                        setOpenModaldeleteClasse(true)
                                                    }}
                                                    className="p-2 bg-red-600 text-white rounded-md text-[8px] md:text-[11px]">
                                                    Supprimer
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
        
        <MoadalAddExercice open={openModalAddExercice} onOpenChange={setOpenModalAddExercice} token={token} onSuccess={()=>setRefresh(k=>k+1)} />
        <ModalDeleteExercice 
            token={token} 
            id={exerciceId} 
            open={openModalDelete} 
            onOpenOnChange={setOpenModaldeleteClasse} 
            titre={titreName} 
            onSuccess={()=>setRefresh(k=>k+1)}  
        />
        <MoadalUpdateExercice 
            token={token} 
            open={openModalUpdateExercice} 
            onOpenChange={setOpenModalUpdateExercice} 
            titreValue={titreName} 
            typeValue={type}
            classeValue={classeName} 
            matiereValue={matiereName}
            leconValue={leconName}
            idClasse={idClasse}
            idMatiere={idMatiere}
            id={exerciceId} 
            onSuccess={()=>setRefresh(k=>k+1)}  
        />  
        </>
    )
}