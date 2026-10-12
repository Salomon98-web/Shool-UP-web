'use client'

import { useEffect, useState } from "react"
import { Eye, EyeOff, Timer, TimerOff } from "lucide-react"
import LoaderCarte from "../loading-carte"

interface Props{
    token:string | undefined
    refreshKey:number
}

export function Carte({item, type, classe, status, codePIN, debut, fin, nom, tel}:any){
    const[code, setCode] = useState(false)
    return(
        <div 
            key={item}
            className={`flex flex-col h-auto shrink-0 min-w-78 to-blur group relative overflow-hidden rounded-md bg-linear-to-br  p-5 
            ${status === 0 ?("to-gray-700 via-gray-800 from-gray-950"):(null)}
            ${status === 3 ?("to-yellow-700 via-yellow-800 from-yellow-950"):(null)}
            ${status === 1 ?("to-green-700 via-green-800 from-green-950"):(null)}
            ${status === 2 ?("to-rose-700 via-orange-800 from-red-950"):(null)}`}
        >
            <div  
                className={`absolute -right-16 -top-16 h-48 w-48 rounded-full bg-pink-100 opacity-10 `}
            />
            <div  
                className={`absolute right-38 top-39 h-48 w-48 rounded-full bg-pink-100 opacity-10 `}
            />

            <div className="flex justify-between w-full gap-2 p-3 font-mono text-[10px]">
                <p className="uppercase text-orange-400 font-mono font-bold text-md">{type}</p>
                <p className="uppercase text-white font-mono font-bold text-md">{classe}</p>
            </div>
            
            <div className="flex justify-between">
                <p className=" text-white font-mono text-[8px] flex flex-row items-center"><Timer width={18}/> : {debut}</p>
                <p className=" text-white font-mono text-[8px] flex flex-row items-center"><TimerOff width={18} /> : {fin}</p>
            </div>

            <div className="flex justify-between p-2 ">
                <div className="flex justify-between items-center gap-2">
                    <div className="p-2 flex flex-col gap-2">
                        <p className=" uppercase text-white font-mono text-[10px]">{nom}</p>
                        <p className=" uppercase text-white font-mono text-[10px]">+241 {tel}</p>
                    </div>
                    
                </div>
            </div>

            <div className="p-4 flex justify-between gap-3">
                
                <p  className={`flex justify-between font-mono uppercase text-white border border-white/20 bg-white/20 backdrop-blur-xl 
                    shadow-inner rounded-sm w-full text-xl duration-500 items-center gap-3`}>
                    
                    {code ? (
                        
                        <button 
                            onClick={()=>{
                                setCode(false);
                            }}
                            className="p-2 font-mono text-xs rounded-sm bg-amber-500 w-14 text-center flex justify-center items-center text-[10px]"
                        >
                            <Eye width={`30`} />
                        </button>
                    ):(
                        <button 
                            onClick={()=>{
                                setCode(true);
                            }}
                            className="p-2 font-mono text-xs rounded-sm bg-amber-500 w-14 flex justify-center items-center text-[10px]"
                        >
                            <EyeOff width={`30`} />
                        </button>
                    )}  
                    <span className=" relative right-3">{code ? `${codePIN}` : '...'} </span>
                </p>
            </div>
            
            <div className=" flex flex-col p-2 gap-2">
                {status == 3 ? (
                    

                    <>
                        <button 
                            className="p-2 font-mono text-xs rounded-md text-yellow-200 relative left-2"
                        >
                            Cliquer ici pour payer
                        </button>
                        <p className="font-mono text-[10px] text-yellow-400 text-center">En attente</p>
                    </>
                ):(null)}
                {status == 1 ? (
                    
                    
                    <>
                        <button 
                            className="p-2 font-mono text-xs rounded-md text-green-200 relative left-2"
                        >
                            Abonnement validé
                        </button>
                        <p className="font-mono text-[10px] text-green-400 text-center">Actif</p>
                    </>
                ):(null)}
                {status == 2 ? (
                    
                    
                    <>
                        <button 
                            className="p-2 font-mono text-xs rounded-md text-red-900 relative left-2"
                        >
                            Abonnement suspendu
                        </button>
                        <p className="font-mono text-[10px] text-red-200 text-center">Bloqué</p>
                    </>
                ):(null)}
                {status == 0 ? (
                    <>
                        <button 
                            className="font-mono text-[10px] text-white "
                        >
                            Cliquer ici pour vous réabonner
                        </button>
                        <p className="font-mono text-[10px] text-red-400 text-center">Terminé</p>
                    </>
                    
                ):(null)}
                
            </div>
        </div>

    )
}

export default function cartes({token, refreshKey}:Props){
    const [Loading, setLoading] = useState(true)
    const [data, setData] = useState([])

    useEffect(()=>{
        const abonnement = async ()=>{
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/member/get-info`,{
                method:"GET",
                headers:{
                    "X-Api-Key": token as string,
                }
            })
            
            const statusCode = res.status
            const result = await res.json()

            if(!res.ok){

            }
            if(statusCode >= 200 && statusCode < 300){
                setLoading(false)
                setData(result)

            }else{
                setLoading(false)
                setData([])
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
                        className=" rounded-xl shrink-0 min-w-72 h-64 "
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
                        
                        className=" rounded-xl shrink-0 min-w-72 h-64  bg-gray-200 flex justify-center items-center text-chart-2"
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
            <div className="flex overflow-x-auto pb-4 scrollbar-hide gap-2 ">
                {data.map((item:any)=>(
                    <Carte key={item.id} type={item.abonnement_type[0].type} classe={item.classe[0].name_class} status={item.status} codePIN={item.code} debut={item.start_date} fin={item.end_date} nom={item.name} tel={item.phone} />
                ))}
            </div>
        </div>
        {/* <div className=" w-full flex flex-row items-center h-auto p-2 relative top-10 px-4 lg:px-14">
            <div className="flex overflow-x-auto pb-4 scrollbar-hide gap-2 ">
                <Carte type={"annuel"} classe={"sixieme"} status={0} codePIN={1234} debut={`25-09-2026`} fin={`25-09-2026`} nom={`salomon`} tel={`0000`}/>
            </div>
        </div> */}
                
        </>
    )
}