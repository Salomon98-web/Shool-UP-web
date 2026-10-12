'use client'

import { useState, useEffect, use } from "react";
import Sidebar from "../sidebar";
import Topbar from "../topbar";
import CartesMatieres from "../(elements-matiere)/cartes-matieres";
import LoaderCarte from "../loading-carte"
import { Pagination } from "../ui/pagination";
import MoadalAddMatiere from "../(elements-matiere)/modal-add-matiere";
import ModalUpdateMatiere from "../(elements-matiere)/modal-update-matiere";
import ModalDeleteMatiere from "../(elements-matiere)/modal-delete-matiere";

interface Props{
    token:string | undefined
    role:string | undefined
}

export default function Matieres({token, role}:Props){

    const [openModalAddClasse, setOpenModalAddClass] = useState(false)
    const [refreshKey, setRefresh] = useState(0)
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalPage, setTotalPage] = useState(1)
    const [matiereId, setMatiereId] = useState<number>(0)
    const [openModalUpdateClasse, setOpenModalUpdateClasse] = useState(false)
    const [matiereName, setMatiereName] = useState<string>('')
    const [openModalDelete, setOpenModaldeleteClasse] = useState(false)

    useEffect(()=>{
        const classes = async ()=>{
            
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/matiere?sort=-id&page=${page}&per-page=20`,{
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
        classes()
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
                    <p className="text-chart-1">Matières</p>
                </div>
                <CartesMatieres token={token} refreshKey={refreshKey} />

                <div className="relative top-15 w-full flex px-4 lg:px-14">
                    <button 
                            onClick={()=>{
                                setOpenModalAddClass(true)
                            }}
                            className="  font-mono text-[11px] text-white bg-indigo-800 max-w-96 p-2 rounded-sm"
                        >
                        AJouter une matière
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
                        <div key={item.id} className="relative top-30 w-full flex px-4 lg:px-14 my-1">
                        
                            <div className="w-full flex justify-between bg-white shadow-sm p-2 rounded-lg">
                                <div className=" flex flex-col p-2"> 
                                    <p className=" font-mono font-bold text-[10px] md:text-xs p-2 line-clamp-1 truncate w-[38vw] md:w-[30vw]">{item.nom_matiere}</p>
                                </div>
                                
                                <div className=" flex flex-col justify-center items-center gap-12">

                                {/*  <p className=" font-mono font-bold text-xs">{item.name}</p> */}

                                    <div className=" flex  gap-2 font-mono">
                                        <button
                                            onClick={()=>{
                                                /* setIdCategory(item.id)
                                                setNamecategory(item.name)
                                                setopenModalUpdateCategory(true) */
                                                setMatiereId(item.id)
                                                setMatiereName(item.nom_matiere)
                                                setOpenModalUpdateClasse(true)
                                            }}
                                            className="p-2 bg-blue-800 text-white rounded-md text-[8px] md:text-[11px]">
                                            Modifier
                                        </button>
                                        <button 
                                            onClick={()=>{
                                                /* setIdCategory(item.id)
                                                setNamecategory(item.name)
                                                setOpenModaldeleteCategory(true) */
                                                setMatiereId(item.id)
                                                setMatiereName(item.nom_matiere)
                                                setOpenModaldeleteClasse(true)
                                            }}
                                            className="p-2 bg-red-600 text-white rounded-md text-[8px] md:text-[11px]">
                                            Supprimer
                                        </button>
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
        
        <MoadalAddMatiere open={openModalAddClasse} onOpenChange={setOpenModalAddClass} token={token} onSuccess={()=>setRefresh(k=>k+1)} />
        <ModalDeleteMatiere token={token} id={matiereId} open={openModalDelete} onOpenOnChange={setOpenModaldeleteClasse} matiereName={matiereName} onSuccess={()=>setRefresh(k=>k+1)}  />
        <ModalUpdateMatiere token={token} id={matiereId} open={openModalUpdateClasse} onOpenChange={setOpenModalUpdateClasse} matiereValue={matiereName} onSuccess={()=>setRefresh(k=>k+1)}  />  
        </>
    )
}