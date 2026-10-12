import { cookies } from "next/headers";
import Dashboard from "@/components/account/dashboard";
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
    <Dashboard token={token} role={role} />
    <CheckSatusAccount token={token}/>
    </>
    
  )
}