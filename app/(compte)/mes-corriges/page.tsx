import { cookies } from "next/headers";
import Corriges from "@/components/account/corriges";
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
    <Corriges token={token} role={role} />
    <CheckSatusAccount token={token}/>
    </>
    
  )
}