import { cookies } from "next/headers";
import Reabonnement from "@/components/account/reabonnement";
import { redirect } from "next/navigation";
import CheckSatusAccount from "@/functions/check-status-account"

export default async function Page(){
  const token = (await cookies()).get("token")?.value
  const role = (await cookies()).get("role")?.value

  if(!token){
    redirect("/login");
  }
  
  return(
    <>
    <Reabonnement token={token} role={role} />
    <CheckSatusAccount token={token}/>
    </>
    
  )
}