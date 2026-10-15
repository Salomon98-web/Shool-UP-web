'use client'

import { useState, useEffect, ReactElement } from "react"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import Loader from "../loading"
import { ToasterProvider, useToastCustom } from "../ui/toast-custom"
import { Switch } from "../ui/switch"

interface Props{
    token:any
    onSuccess:()=>void
}

export default  function AddAbonnement({token, onSuccess}:Props){

    const [loading, setLoading]= useState(false)
    const toast =  useToastCustom()
    const [type, setType] = useState<string>('mensuel')

    useEffect(()=>{
        setType(type)
    },[])

    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>)=>{
        setLoading(true)
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/abonnement`,{
            method:"POST",
            headers:{
                "X-Api-Key":token
            },
            body:formData
        })

        const result = await res.json()
        if(res.ok){
            toast.success("Abonnement ajouté ")
            setLoading(false)
            onSuccess()
        }else{
            setLoading(false)
            if(result.length < 1){
               toast.error(result.message) 
            }else if(result.length == 1){
                toast.error(result[0].message)
            }else{
                toast.error(result.message) 
            }
            
            console.log(result)
        }
    }

    return(
        <>
        <form className="flex flex-col gap-2.5 p-4" onSubmit={handleSubmit}>
            <div className="flex flex-row gap-2.5 w-full">
                <p className="">Mensuel</p>
                <Switch 
                    onCheckedChange={()=>{
                        type === 'mensuel' ? setType('annuel') : setType('mensuel')
                    }}
                />
                <p className="">Annuel</p>
            </div>
            <input type="hidden" name="type" value={type} />
            <p className=" uppercase text-violet-800 font-extrabold text-2xl">{type}</p>
            <input 
                type="number"
                placeholder="Montant "
                name="montant"
                required
                className="  p-2 text-[11px] border border-b border-t-0 border-l-0 border-r-0 focus:outline-none "
            />
            <input 
                type="number"
                placeholder="Nombre de téléchargement / jour"
                name="limit_techarge"
                required
                className=" p-2 text-[11px] border border-b border-t-0 border-l-0 border-r-0 focus:outline-none"
            />
            <Button 
                type="submit"
                className={` bg-blue-800 hover:bg-blue-700 text-xs`}
            >
                {loading === true ? (
                    <Loader />
                ):(
                    <p className="">Ajouter</p>
                )}
            </Button>
        </form>
        </>
    )
}