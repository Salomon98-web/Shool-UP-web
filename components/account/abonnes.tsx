'use client'

import { useState, useEffect, use } from "react";
import Sidebar from "../sidebar";
import Topbar from "../topbar";
import LoaderCarte from "../loading-carte"
import { Pagination } from "../ui/pagination";
import ModalUnlockAbonne from "../(elements-abonnes)/modal-unlock-abonne";
import ModalLockAbonne from "../(elements-abonnes)/modal-lock-abonne";
import ModalDeleteAccount from "../(elements-abonnes)/modal-delete-account";
import ModalRestorAccount from "../(elements-abonnes)/modal-restor-account";
import CartesAbonnes from "../(elements-abonnes)/carte-abonnes";
import { 
    Select, 
    SelectContent, 
    SelectItem,
    SelectLabel, 
    SelectTrigger, 
    SelectValue 
} from "../ui/select";
import { it } from "node:test";
import { Delete, Lock } from "lucide-react";

interface Props{
    token:string | undefined
    role:string | undefined
}

export default function Abonnes({token, role}:Props){

    const [refreshKey, setRefresh] = useState(0)

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalPage, setTotalPage] = useState(1)
    const [idAbonne, setidAbonne] = useState<number>(0)

    const [option, setOption] = useState<string | null>('all')
    const [nomAbonne, setNomAbonne] = useState<string>('')
    {/**modal bloquer abonne */}
    const [openModalLockAbonne, setOpenModalLockAbonne] = useState(false)
    {/**modal debloquer abonne */}
    const [openModalUnLockAbonne, setOpenModalUnLockAbonne] = useState(false)
    {/**modal delete account */}
    const [openModalDeleteAccount, setOpenModalDeleteAccount] = useState(false)
    {/**modal restor account */}
    const [openModalRestorAccount, setOpenModalRestorAccount] = useState(false)

    useEffect(()=>{
        const abonnes = async ()=>{
            
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/payement/${option}?sort=-id&page=${page}&per-page=20`,{
                method:"GET",
                headers:{
                    "X-Api-Key":token as string
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
        abonnes()
       /*  window.scrollTo({top:0, behavior:"smooth"}) */
    },[refreshKey, page, option])

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

                <div className=" relative top-7 p-2 px-4 lg:px-14">
                    <hr className="p-2" />
                    <p className="text-chart-3">Abonnés</p>
                </div>
                <CartesAbonnes token={token} refreshKey={refreshKey} filtre={option} />

                <div className="relative top-15 w-full flex flex-col gap-2.5 px-4 lg:px-14">
                    <label htmlFor=""></label>
                    <Select value={option} onValueChange={setOption}>
                        <SelectTrigger>
                            <SelectValue>Filtre</SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value={`all`}>Tous les abonnés</SelectItem>
                            <SelectItem value={`pending`}>En attente</SelectItem>
                            <SelectItem value={`failed`}>Validation échoué</SelectItem>
                            <SelectItem value={`success`}>Validés</SelectItem>
                        </SelectContent>
                    </Select>

                    <p className="px-2 relative top-3 font-bold text-lg">
                        {option === 'all'? 'Tous les abonnés' : option === 'pending'? 'En attente' : option === 'failed'? 'Validation échoué' : option === 'success'? 'Validés' :null}
                    </p>
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
                        <div key={item.id} className="relative top-30 w-full flex px-4 lg:px-14 group my-1 ">
                            <div className="w-full flex-col relative overflow-hidden bg-white shadow-sm p-2 border-t  rounded-lg">
                                <div 
                                    className={`overflow-hidden relative w-full flex justify-between border rounded-lg
                                        ${item.payeur.status_account === 3 ? 'border-red-200 bg-red-50' : 'border-blue-200 bg-blue-50'}`}
                                >
                                    <p className={` text-lg p-2 line-clamp-1 truncate w-[38vw] md:w-[30vw]`}>{item.payeur.name}</p>
                                    
                                    {item.payeur.status_account === 3 ?(
                                        <Delete 
                                            className={`  
                                            absolute bottom-0 right-1 -rotate-10 
                                            h-13 w-13  
                                            text-red-800 
                                            opacity-30  
                                            `}  
                                        />
                                    ):(null)}
                                    
                                </div>

                                <div className="my-2"></div>

                                <div className="w-full ">
                                    <div className=" flex flex-col w-full"> 
                                        <div className="w-full flex justify-between border rounded-lg bg-gray-50 p-2">
                                            <div className="flex flex-col">
                                                <div className="flex flex-row items-center px-2">
                                                    <p className="text-chart-2 text-xs">Type :</p>
                                                    <p className={`${item.abonnement[0][0].type ==='annuel'?'text-blue-900':'text-indigo-600'} text-xs font-extrabold md:w-[30vw] p-2 text-blue-600 uppercase`}> {item.abonnement[0][0].type}</p>
                                                </div>
                                                <div className="flex flex-row items-center px-2">
                                                    <p className="text-chart-2 text-xs">Payement :</p>
                                                    <p className={`${item.status_payment ==='PENDING'?'text-yellow-600': item.status_payment ==='SUCCESS' ?'text-green-600': item.status_payment ==='FAILED' ?'text-red-600':''} text-xs font-extrabold md:w-[30vw] p-2 text-blue-600 uppercase`}> {item.status_payment}</p>
                                                </div>
                                            </div>
                                            <p className="text-chart-2 font-bold">{item.status_abonnement.classe }</p>
                                        </div>
                                        <div className="my-1.5"></div>
                                        
                                        {/* <p className="text-chart-2  text-sm w-[38vw] md:w-[30vw] p-2 relative bottom-2">{item.lecon?.titre}</p> */}
                                        <div className="my-1.5"></div>
                                        <div className="w-full flex flex-col gap-1.5">
                                            <div className="w-full flex justify-between items-center">
                                                <div className="flex flex-col px-2 ">
                                                    <p className="text-chart-3 text-xs md:text-sm">{item.request_id}</p>
                                                    <p className={`text-chart-4 text-xs md:text-sm`}>{item.payment_id}</p>
                                                </div>
                                                <p className={`${item.status_abonnement.status === 2 ? 'text-red-500 text-xs md:text-lg font-bold': null}`}>
                                                    {item.status_abonnement.status === 2 ? (
                                                        <Lock 
                                                            className={`  
                                                            absolute bottom-6 right-1 -rotate-10 
                                                            h-13 w-13  
                                                            text-red-800 
                                                            opacity-30
                                                            `}  
                                                        />
                                                    ):null}
                                                </p>
                                            </div>
                                            <hr />
                                            <div className=" flex  gap-2  z-10">
                                                
                                                <button 
                                                    onClick={()=>{
                                                        setidAbonne(item.abonne)
                                                        setNomAbonne(item.payeur.name)
                                                        setOpenModalLockAbonne(true)
                                                    }}
                                                    className="p-2 bg-red-600 text-white rounded-md text-[8px] md:text-[11px]">
                                                    Bloquer
                                                </button>
                                                <button 
                                                    onClick={()=>{
                                                        setidAbonne(item.abonne)
                                                        setNomAbonne(item.payeur.name)
                                                        setOpenModalUnLockAbonne(true)
                                                    }}
                                                    className="p-2 bg-blue-800 text-white rounded-md text-[8px] md:text-[11px]">
                                                    Débloquer
                                                </button>
                                                <button 
                                                    onClick={()=>{
                                                       setidAbonne(item.payeur.id)
                                                        setNomAbonne(item.payeur.name)
                                                        setOpenModalDeleteAccount(true)
                                                    }}
                                                    className="p-2 bg-red-600 text-white rounded-md text-[8px] md:text-[11px]">
                                                    Supprimer le compte
                                                </button>
                                                <button 
                                                    onClick={()=>{
                                                        setidAbonne(item.payeur.id)
                                                        setNomAbonne(item.payeur.name)
                                                        setOpenModalRestorAccount(true)
                                                    }}
                                                    className="p-2 bg-blue-800 text-white rounded-md text-[8px] md:text-[11px]">
                                                    Restaurer le compte
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
        

        <ModalLockAbonne 
            token={token} 
            id={idAbonne} 
            open={openModalLockAbonne} 
            onOpenOnChange={setOpenModalLockAbonne} 
            nomAbonne={nomAbonne} 
            onSuccess={()=>setRefresh(k=>k+1)}  
        />
        <ModalUnlockAbonne 
            token={token} 
            id={idAbonne} 
            open={openModalUnLockAbonne} 
            onOpenOnChange={setOpenModalUnLockAbonne} 
            nomAbonne={nomAbonne} 
            onSuccess={()=>setRefresh(k=>k+1)}  
        />
        <ModalDeleteAccount 
            token={token} 
            id={idAbonne} 
            open={openModalDeleteAccount} 
            onOpenOnChange={setOpenModalDeleteAccount} 
            nomAbonne={nomAbonne} 
            onSuccess={()=>setRefresh(k=>k+1)}  
        /> 
        <ModalRestorAccount 
            token={token} 
            id={idAbonne} 
            open={openModalRestorAccount} 
            onOpenOnChange={setOpenModalRestorAccount} 
            nomAbonne={nomAbonne} 
            onSuccess={()=>setRefresh(k=>k+1)}  
        />
        </>
    )
}