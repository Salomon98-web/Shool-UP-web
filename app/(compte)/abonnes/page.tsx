import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import CheckSatusAccount from "@/functions/check-status-account"
import Abonnes from "@/components/account/abonnes"

export default async function Categorie(){
  const token = (await cookies()).get("token")?.value
  const role = (await cookies()).get("role")?.value

  if(!token){
    redirect("/login");
  }

  if(role !== "admin"){
    redirect("/login");
  }

  return(
    <>
      <Abonnes token={token} role={role} />
      <CheckSatusAccount token={token}/>
    </>
    
  )
}