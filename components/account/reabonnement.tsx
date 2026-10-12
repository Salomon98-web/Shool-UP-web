'use client'

import { useState, useEffect, use } from "react";
import Sidebar from "../sidebar";
import Topbar from "../topbar";
import { Switch } from "../ui/switch";
import { Download, Zap } from "lucide-react";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp";
import { 
    Combobox,
    ComboboxGroup,
    ComboboxContent,
    ComboboxInput,
    ComboboxItem,
    ComboboxEmpty,
    ComboboxList 
} from "../ui/combobox";

interface Props{
    token:string | undefined
    role:string | undefined
}

export default function Reabonnement({token, role}:Props){
    
    const [dataClasse, setDataClasse] = useState<any[]>([]);
    const [val, setvalue] = useState<string | null>('');
    const selectedClass = dataClasse.find((item:any)=>item.name_class === val);
    const classeId = selectedClass ? selectedClass.id :"";

    const [openModalAddClasse, setOpenModalAddClass] = useState(false)
    const [refreshKey, setRefresh] = useState(0)
    const [dataAbonnement, setDataAbonnement] = useState([])
    const [loading, setLoading] = useState(true)
    {/**changer abonnement */}
    const [change, setChange] = useState(false);
    {/**code PIN */}
    const [code, setCode] = useState('')
    {/**abonnement select */}
    const [selectedDefault, setSelectedDefault] = useState(0)

    useEffect(()=>{
        const classes = async ()=>{
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/classe`,{
                method:"GET"
            })
            const status = res.status
            const result = await res.json()
            if(!res.ok){
                setDataClasse([])
            }else{
                
                setDataClasse(result)
                console.log(result)
            }
        }
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
                setDataAbonnement([])

            }else{
                setLoading(false)
                setDataAbonnement(result[selectedDefault])
            }
            
            console.log(result[selectedDefault])
        }
        abonnement()
        classes()
        //setChange(true)
       /*  window.scrollTo({top:0, behavior:"smooth"}) */
    },[refreshKey, change, selectedDefault])

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

                <div className=" relative top-0 p-2 font-mono text-sm px-4 lg:px-14">
                    <hr className="p-2" />
                    <p className="text-chart-1">Réabonnez-vous !</p>
                </div>
                <div className="w-full h-full flex justify-center items-center">
                    <div className="border rounded-lg h-auto w-84 bg-white shadow">
                        <div className="flex flex-col p-4">
                            <form className="flex flex-col gap-4">
                                <div className="w-full h-auto from-blue-950 bg-blue-700 via-blue-800 to-blur to-blue-950 rounded-lg p-4 flex flex-col justify-center items-center gap-4 relative overflow-hidden">
                                    <div  
                                        className={`absolute -right-19 -top-32 h-48 w-48 rounded-full bg-violet-100 opacity-10 `}
                                    />
                                    <p className="font-mono text-[12px] text-white">Veillez entrer votre code <strong>PIN</strong></p>
                                    {/* <input 
                                        className="border-2 border-gray-300 bg-white rounded-lg w-full h-12 p-2 flex justify-center items-center font-mono"
                                        type="password" 
                                        name=""
                                        required
                                    /> */}
                                    <InputOTP required maxLength={4} name="" value={code} onChange={(e)=>{
                                        setCode(e)
                                        
                                        //console.log(code)
                                    }}>
                                        <InputOTPGroup className="gap-2 w-full flex justify-center items-center">
                                            <InputOTPSlot masked={false} index={0} className="rounded-md border-2 w-12 h-12 text-xl bg-white text-blue-800 font-bold"></InputOTPSlot>
                                            <InputOTPSlot masked={false} index={1} className="rounded-md border-2 w-12 h-12 text-xl bg-white text-blue-800 font-bold"></InputOTPSlot>
                                            <InputOTPSlot masked={false} index={2} className="rounded-md border-2 w-12 h-12 text-xl bg-white text-blue-800 font-bold"></InputOTPSlot>
                                            <InputOTPSlot masked={false} index={3} className="rounded-md border-2 w-12 h-12 text-xl bg-white text-blue-800 font-bold"></InputOTPSlot>
                                        </InputOTPGroup>
                                    </InputOTP>
                                </div>
                                <div className="flex flex-row gap-2">
                                    <p className="font-mono text-[10px]">Changer votre abonnement</p>
                                    <Switch 
                                        onCheckedChange={()=>{
                                            change == true ? setChange(false) : setChange(true)
                                            setSelectedDefault(0)
                                        }} 
                                    />
                                </div>
                               {change === true ?(
                                    <div className="flex flex-col gap-2 my-3">
                                        <div className="flex flex-row gap-1.5 items-center">
                                            <p className="">Annuel</p>
                                            <Switch 
                                                onCheckedChange={()=>{
                                                    selectedDefault ===0 ? setSelectedDefault(1): setSelectedDefault(0);
                                                }} 
                                            /> 
                                            <p className="">Mensuel</p>
                                        </div>
                                        <p className={` font-mono text-md font-extrabold uppercase`}>{(dataAbonnement as any).type}</p>
                                        <p className="flex flex-row gap-2 ">
                                            <span className={`${(dataAbonnement as any).type == "annuel"?('text-yellow-600'):('')} font-mono font-extrabold text-4xl`}>{(dataAbonnement as any).montant}</span>
                                            <span className={`font-mono ${(dataAbonnement as any).type == "annuel"?('text-yellow-600'):('')} relative top-5`}>XAF</span>
                                            <span className="relative left-1 top-4 text-[12px] w-full my-2">{(dataAbonnement as any).limit_techarge} téléchargements / jour</span>
                                        </p>
                                        <input type="hidden" name="" required value={(dataAbonnement as any).id} />
                                        <input type="hidden" name="classe_id" value={classeId}/>

                                        <Combobox
                                            items={dataClasse}
                                            value={val} 
                                            required
                                            onValueChange={setvalue}
                                        >
                                            <ComboboxInput placeholder="Rechercher une classe..." className={`p-2 h-10 bg-gray-100 relative top-3`} />
                                            <ComboboxContent>
                                                <ComboboxEmpty>
                                                    Aucune classe.
                                                </ComboboxEmpty>
                                                <ComboboxList>
                                                    
                                                    {(item)=>(
                                                        <ComboboxItem key={item.id} value={item.name_class}>
                                                            {item.name_class}
                                                        </ComboboxItem>
                                                    )}
                                                </ComboboxList>
                                            </ComboboxContent>
                                        </Combobox>
                                    </div>
                                    
                                ):(null)}
                                {code.length === 4 ?(
                                    <button
                                        type="submit" 
                                        className="p-2 bg-blue-700 rounded-lg font-mono text-white"
                                    >
                                        Réabonner
                                    </button>
                                ):(
                                    <button
                                        disabled
                                        type="submit" 
                                        className="p-2 bg-gray-300 rounded-lg font-mono text-white"
                                    >
                                        Réabonner
                                    </button>
                                )}
                                
                            </form>
                        </div>
                    </div>
                </div>
                <div className="my-32"></div>
            </div>
        </div>  
        </>
    )
}