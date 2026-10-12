import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import CheckSatusAccount from "@/functions/check-status-account"
import Matieres from "@/components/account/matieres";

export default async function Page(){
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
    <Matieres token={token} role={role} />
    <CheckSatusAccount token={token}/>
    </>
    
  )
}