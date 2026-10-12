
import { redirect } from "next/navigation"

interface Props{
    token:string | undefined
}
export default async function CheckSatusAccount({token}:Props){

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/account/get-user`,{
        method:"GET",
        headers:{
        "X-Api-Key":token as string
        },
        cache:"no-store"
    })
    const result = await res.json()
    //console.log(result)
    if(!res.ok){
        return  redirect("/login");
    }else{
        if(res.status === 401){
            return redirect("/login");
        }
        if(result.status === 2){
            return redirect("/login");
        }
    }
    return null
     
}