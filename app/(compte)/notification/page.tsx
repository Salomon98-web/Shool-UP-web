import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import CheckSatusAccount from "@/functions/check-status-account"
import Notifications from "@/components/account/notifications"

export default async function Categorie(){
  const token = (await cookies()).get("token")?.value
  const role = (await cookies()).get("role")?.value

  if(!token){
    redirect("/login");
  }

  return(
    <>
      <Notifications token={token} role={role} />
      <CheckSatusAccount token={token}/>
    </>
    
  )
}