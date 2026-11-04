'use client'

import { useState, useEffect, use } from "react";
import Sidebar from "../sidebar";
import Topbar from "../topbar";
import LoaderCarte from "../loading-carte"
import { Eye, FileText, BellDot } from "lucide-react";
import { useToastCustom } from "../ui/toast-custom";

interface Props{
    token:string | undefined
    role:string | undefined
}

export default function Notifications({token,role}:Props){

    const [refreshKey, setRefresh] = useState(0)
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [notifId, setNotifId] = useState<number>(0)

    const toast = useToastCustom()

    const onReadNotif = async (id:any)=>{
       /*  console.log(id) */
       const formData = new FormData();
       formData.append("notification_id", id)

        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/onread`,{
            method:"POST",
            headers:{
                "X-Api-Key": token as string,
            },
            body:formData
        })
        const result = await res.json()
        if(!res.ok){
            toast.error("Une erreur s'est produite")
        }
        /* console.log(result) */
        setRefresh(k=>k+1)
    }

    useEffect(()=>{
        const exercices = async ()=>{
            
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/notification/get?sort=-id`,{
                method:"GET",
                headers:{
                    "X-Api-Key": token as string,
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
            }
            console.log(result);
        }
        exercices()
       /*  window.scrollTo({top:0, behavior:"smooth"}) */
    },[refreshKey])

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
                        <div key={item.id} className="relative top-15 w-full flex justify-center px-4 lg:px-14 my-1 group">
                            <div className="w-96 flex-col relative overflow-hidden bg-white shadow-sm p-2 rounded-lg">
                                <BellDot 
                                    className={`  
                                    absolute bottom-4 right-1 -rotate-10 
                                    h-28 w-28  
                                    text-blue-500 
                                    opacity-10  group-hover:scale-125 duration-500 
                                    `}  
                                />
                                <div className="w-full flex justify-between">
                                    <p className="  font-semibold text-lg p-2 line-clamp-1 text-blue-700 truncate w-[38vw] md:w-[30vw]">{item.title}</p>
                                </div>

                                <div className="w-full ">
                                    <div className=" flex flex-col "> 
                                        <p className="text-sm p-2 relative bottom-2 text-wrap w-full">{item.body} <strong> {item.target_id.name_class}</strong></p>
                                        
                                        <div className="w-full flex justify-between items-center">
                                            <p className="text-xs p-2 text-chart-2 text-wrap">{item.created_at}</p>

                                            <div className=" flex  gap-2  z-10">
                                                <button
                                                    onClick={async ()=>{
                                                        onReadNotif(item.id)
                                                    }}
                                                    className="p-2 rounded-md text-xs font-bold text-blue-900 md:text-sm">
                                                    Marquer comme lu
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
                
                <div className="my-32"></div>
            </div>
        </div> 
        </>
    )
}