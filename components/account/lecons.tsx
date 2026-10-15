'use client'

import { useState, useEffect, use } from "react";
import Sidebar from "../sidebar";
import Topbar from "../topbar";
import CartesLecons from "../(elements-lecon)/cartes-lecons";
import LoaderCarte from "../loading-carte"
import { Pagination } from "../ui/pagination";
import MoadalAddLecon from "../(elements-lecon)/modal-add-lecon";
import ModalDeleteLecon from "../(elements-lecon)/modal-delete-lecon";
import ModalUpdateLecon from "../(elements-lecon)/modal-update-lecon"

interface Props{
    token:string | undefined
    role:string | undefined
}

export default function Lecons({token, role}:Props){

    const [openModalAddClasse, setOpenModalAddClass] = useState(false)
    const [refreshKey, setRefresh] = useState(0)
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalPage, setTotalPage] = useState(1)
    const [leconId, setLeconId] = useState<number>(0)
    const [openModalUpdateClasse, setOpenModalUpdateClasse] = useState(false)
    const [leconName, setLeconName] = useState<string>('')
    const [openModalDelete, setOpenModaldeleteClasse] = useState(false)

    useEffect(()=>{
        const classes = async ()=>{
            
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/lecon?sort=-id&page=${page}&per-page=20`,{
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
                <Topbar onSuccess={()=>{}} token={token}/>

                <div className=" relative top-7 p-2  text-sm px-4 lg:px-14">
                    <hr className="p-2" />
                    <p className="text-chart-1">Leçons</p>
                </div>
                <CartesLecons token={token} refreshKey={refreshKey} />

                <div className="relative top-15 w-full flex px-4 lg:px-14">
                    <button 
                            onClick={()=>{
                                setOpenModalAddClass(true)
                            }}
                            className="   text-[11px] text-white bg-purple-800 max-w-96 p-2 rounded-sm"
                        >
                        AJouter une leçon
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
                            
                            <div className="flex flex-col bg-white shadow-sm w-full rounded-lg">
                                <div className="w-full flex flex-col bg-white p-2 rounded-lg">
                                    <div className=" flex flex-col  w-full h-auto"> 
                                        <p className="  font-semibold text-[10px] md:text-xs p-2 uppercase">{item.titre}</p>
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <p className="  font-bold text-[10px] p-2 px-3 text-chart-2">{item.classe.name_class}</p>
                                    
                                    <div className="w-full flex justify-between items-center">
                                        <p className="  font-bold text-[8px] p-2 px-3 text-chart-2">{item.matiere.nom_matiere}</p>

                                        <div className=" flex  gap-2  p-2">
                                            <button
                                                onClick={()=>{
                                                    /* setIdCategory(item.id)
                                                    setNamecategory(item.name)
                                                    setopenModalUpdateCategory(true) */
                                                    setLeconId(item.id)
                                                    setLeconName(item.titre)
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
                                                    setLeconId(item.id)
                                                    setLeconName(item.titre)
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
        
        <MoadalAddLecon open={openModalAddClasse} onOpenChange={setOpenModalAddClass} token={token} onSuccess={()=>setRefresh(k=>k+1)} />
        <ModalDeleteLecon token={token} id={leconId} open={openModalDelete} onOpenOnChange={setOpenModaldeleteClasse} leconName={leconName} onSuccess={()=>setRefresh(k=>k+1)}  />
        <ModalUpdateLecon token={token} id={leconId} open={openModalUpdateClasse} onOpenChange={setOpenModalUpdateClasse} leconValue={leconName} onSuccess={()=>setRefresh(k=>k+1)}  /> 
        </>
    )
}