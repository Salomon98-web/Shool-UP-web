'use client'

import { useEffect, useState } from "react"
import ModalCommencerAbonnement from "./modal-commencer-abonnement"
import ModalDeleteAbonnement from "./modal-delete-abonnement"
import LoaderCarte from "../loading-carte"
import { Crown, Download, Calendar, Zap, LucideDelete } from "lucide-react"

interface Props{
    token:string | undefined
    role:string | undefined
    onSuccess:()=>void
    refreshKey:number
}

export default function Abonnement({token, role, onSuccess, refreshKey}:Props){

    const[open, setOpen] = useState(false)
    const [data, setData] = useState([])
    const [Loading, setLoading] = useState(true)
    const [type, setType] = useState<string>('')
    const [id, setId] = useState<number>(0)
    const [price, setPrice] = useState<number>(0)
    const [nbrDownload, setNbrDownload] = useState<number>(0)
    {/** */}
    const [openModalDelete, setOpenModalDelete] = useState(false)

    useEffect(()=>{
        const abonnement = async ()=>{
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/abonnement`,{
                method:"GET",
                headers:{
                    "X-Api-Key": token as string,
                }
            })
            

            const statusCode = res.status
            const result = await res.json()

            if(!res.ok){
                setLoading(false)
                setData([])

            }else{
                setLoading(false)
                setData(result)
            }
            
            console.log(result)
        }
        abonnement()
    },[refreshKey])

    if(Loading){
        return(
            <div className=" w-full flex flex-row items-center h-auto p-2 relative top-10 px-4 lg:px-14">
                <div className="flex overflow-x-auto pb-4 scrollbar-hide gap-2 ">
                    {[0,1,3].map((item:any)=>(
                    <div 
                        key={item}
                        className=" rounded-xl h-78 shrink-0 min-w-64 "
                    >
                        <LoaderCarte />
                    </div>
                    ))}
                </div>
            </div>
        )
    }

    if(data.length < 1){
        return(
            <div className=" w-full flex flex-row items-center h-auto p-2 relative top-10 px-4 lg:px-14">
                <div className="flex overflow-x-auto pb-4 scrollbar-hide gap-2 ">
                    
                    <div 
                        
                        className=" rounded-xl h-78 shrink-0 min-w-64 bg-gray-200 flex justify-center items-center text-chart-2"
                    >
                        Aucun abonnement
                    </div>
                </div>
            </div>
        )
    }

    return(
        <>
        <div className=" w-full flex flex-row items-center h-auto p-2 relative top-10 px-4 lg:px-14">
            <div className="flex overflow-x-auto pb-4 scrollbar-hide gap-2 w-full">
                {data.map((abonnement:any)=>(
                    <div 
                        key={abonnement.id} 
                        className={`relative overflow-hidden flex flex-col group duration-500  bg-linear-to-br rounded-sm h-78 shrink-0 min-w-64 p-4 gap-2 
                        ${abonnement.type == "annuel"?('from-blue-950 bg-blue-700 via-blue-800 to-blur to-blue-950'):('bg-blue-100 from-blue-50 via-blue-50 to-blur to-blue-100 border border-blue-200')}`}
                    >
                        <div className="w-full flex justify-between">
                            <div className={`w-12 h-12 ${abonnement.type == "annuel" ?('bg-blue-800 text-yellow-300'):('bg-blue-200')}  p-2 rounded-lg flex items-center justify-center`}>
                                {abonnement.type == "annuel" ?(<Crown />):(<Calendar/>)}
                            </div>

                            {role === 'admin' ?(
                                <button
                                    onClick={()=>{
                                        setType(abonnement.type)
                                        setId(abonnement.id)
                                        setOpenModalDelete(true)
                                    }}      
                                    className="z-30 w-12 h-12 rounded-lg bg-red-700 flex items-center justify-center text-white"
                                >
                                    <LucideDelete />
                                </button>
                            ):(null)}
                        </div>
                        
                        <div  
                            className={`absolute -right-19 -top-32 h-48 w-48 rounded-full bg-violet-100 opacity-10 `}
                        />

                        <p className={` font-mono text-md ${abonnement.type == "annuel"?('text-white'):('')}  font-extrabold uppercase`}>{abonnement.type}</p>

                        <p className={`${abonnement.type == "annuel"?('text-white'):('')} text-wrap font-mono text-[10px]`}>
                            {abonnement.type == "annuel"?(<span> d'avantages, plus <br/> d'économies</span>):(<span>Idéal pour commencer <br/> et profiter de nos services</span>)}
                        </p>
                        <p className="flex flex-row gap-2 ">
                            <span className={`${abonnement.type == "annuel"?('text-white'):('')} font-mono font-extrabold text-4xl`}>{abonnement.montant}</span>
                            <span className={`font-mono ${abonnement.type == "annuel"?('text-white'):('')} relative top-5`}>XAF</span>
                        </p>

                        <p className={` ${abonnement.type == "annuel"?('text-white bg-blue-800'):('bg-blue-200')} font-mono text-[10px] w-full p-2  rounded-lg flex flex-row gap-2 items-center`}>
                            <span className={`text-xs w-9 h-9 rounded-full ${abonnement.type == "annuel" ?('bg-blue-600 '):('bg-blue-600 text-white')}  flex justify-center items-center`}>
                                {abonnement.type == "annuel" ?(<Download width={20} />):(<Zap/>)}
                            </span>
                            {abonnement.limit_techarge} téléchargements / jour
                        </p>

                        <button onClick={()=>{
                                setOpen(true)
                                setType(abonnement.type)
                                setId(abonnement.id)
                                setPrice(abonnement.montant)
                                setNbrDownload(abonnement.limit_techarge)
                            }}
                            className={` p-2  ${abonnement.type == "annuel" ?('bg-yellow-400'):('bg-blue-700 text-white')} w-full  font-mono text-[10px] flex justify-center items-center 
                            rounded-md my-3`}
                        >
                            commencer
                        </button>
                        {/* <span className="text-[10px] font-mono text-gray-400">19 exercices</span> */}
                    </div>
                ))}
            </div>
        </div>
        <ModalDeleteAbonnement token={token} id={id} abonnementName={type} open={openModalDelete} onOpenOnChange={setOpenModalDelete} onSuccess={onSuccess} />
        <ModalCommencerAbonnement onSuccess={onSuccess} open={open} onOpenChange={setOpen} type={type} id={id} price={price} download={`${nbrDownload} téléchargements / jour `}token={token} />
        </>
        
    )
}