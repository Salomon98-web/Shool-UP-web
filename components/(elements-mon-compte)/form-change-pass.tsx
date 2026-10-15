'use client'

import { useState, useEffect, ReactElement } from "react"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import Loader from "../loading"
import { ToasterProvider, useToastCustom } from "../ui/toast-custom"

interface Props{
    token:any
}

export default  function ChangePassWord({token}:Props){

    const [loading, setLoading]= useState(false)
    const toast =  useToastCustom()

    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>)=>{
        setLoading(true)
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/account/reset-password`,{
            method:"POST",
            headers:{
                "X-Api-Key":token
            },
            body:formData
        })

        const result = await res.json()
        if(res.ok){
            toast.success("Votre mot de passe a bient été modifié")
            setLoading(false)
        }else{
            setLoading(false)
            toast.error(result.message)
        }
    }

    return(
        <>
        <form className="flex flex-col gap-2.5 p-4" onSubmit={handleSubmit}>
            <input 
                type="password"
                placeholder="Mot de passe actuel"
                name="actual_password"
                required
                className="  p-2 text-[11px] border border-b border-t-0 border-l-0 border-r-0 focus:outline-none "
            />
            <input 
                type="password"
                placeholder="Nouveau mot de passe"
                name="new_password"
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
                    <p className="">Changer</p>
                )}
            </Button>
        </form>
        </>
    )
}