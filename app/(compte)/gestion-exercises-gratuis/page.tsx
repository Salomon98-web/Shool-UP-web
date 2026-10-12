import { cookies } from "next/headers";
import ExercicesGratuits from "@/components/account/exercices-gratuits";
import { redirect } from "next/navigation";
import CheckSatusAccount from "@/functions/check-status-account"

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
    <ExercicesGratuits token={token} role={role} />
    <CheckSatusAccount token={token}/>
    </>
    
  )
}