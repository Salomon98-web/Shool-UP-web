'use client'

import { useState, useEffect, use } from "react";
import Sidebar from "../sidebar";
import Topbar from "../topbar";
import CartesClasses from "../(elements-classe)/cartes-classes";
import LoaderCarte from "../loading-carte"
import { Pagination } from "../ui/pagination";
import MoadalAddClasse from "../(elements-classe)/modal-add-classe";
import ModalUpdateClasse from "../(elements-classe)/modal-update-classe";
import ModalDeleteClasse from "../(elements-classe)/modal-delete-classe";

interface Props{
    token:string | undefined
    role:string | undefined
}

export default function Classes({token, role}:Props){

    const [openModalAddClasse, setOpenModalAddClass] = useState(false)
    const [refreshKey, setRefresh] = useState(0)
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalPage, setTotalPage] = useState(1)
    const [classeId, setClasseId] = useState<number>(0)
    const [openModalUpdateClasse, setOpenModalUpdateClasse] = useState(false)
    const [classeName, setClasseName] = useState<string>('')
    const [openModalDelete, setOpenModaldeleteClasse] = useState(false)

    useEffect(()=>{
        const classes = async ()=>{
            
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/classe?sort=-id&page=${page}&per-page=20`,{
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
                <Topbar onSuccess={()=>{}} token={token} />

                <div className=" relative top-7 p-2 font-mono text-sm px-4 lg:px-14">
                    <hr className="p-2" />
                    <p className="text-chart-1">Classes</p>
                </div>
                <CartesClasses token={token} refreshKey={refreshKey} />

                <div className="relative top-15 w-full flex px-4 lg:px-14">
                    <button 
                            onClick={()=>{
                                setOpenModalAddClass(true)
                            }}
                            className="  font-mono text-[11px] text-white bg-blue-800 max-w-96 p-2 rounded-sm"
                        >
                        AJouter une classe
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
                        
                            <div className="w-full flex flex-col bg-white shadow-sm p-2 rounded-lg">
                                <div className=" flex flex-col "> 
                                    <p className=" font-mono font-bold text-[10px] md:text-xs p-2 line-clamp-1 truncate w-[38vw] md:w-[30vw]">{item.name_class}</p>
    
                                    
                                    <div className="w-full flex justify-between">
                                        <p className="text-chart-2 font-mono  text-[8px] w-[38vw] md:w-[30vw] p-2">{item.category?.name}</p>
                                        <div className=" flex  gap-2 font-mono">
                                            <button
                                                onClick={()=>{
                                                    /* setIdCategory(item.id)
                                                    setNamecategory(item.name)
                                                    setopenModalUpdateCategory(true) */
                                                    setClasseId(item.id)
                                                    setClasseName(item.name_class)
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
                                                    setClasseId(item.id)
                                                    setClasseName(item.name_class)
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
        
        <MoadalAddClasse open={openModalAddClasse} onOpenChange={setOpenModalAddClass} token={token} onSuccess={()=>setRefresh(k=>k+1)} />
        <ModalDeleteClasse token={token} id={classeId} open={openModalDelete} onOpenOnChange={setOpenModaldeleteClasse} classeName={classeName} onSuccess={()=>setRefresh(k=>k+1)}  />
        <ModalUpdateClasse token={token} id={classeId} open={openModalUpdateClasse} onOpenChange={setOpenModalUpdateClasse} classeValue={classeName} onSuccess={()=>setRefresh(k=>k+1)}  />  
        </>
    )
}