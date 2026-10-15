import { cookies } from "next/headers";
import Reabonnement from "@/components/account/reabonnement";

export default async function Page(){
  return(
    <>
    <Reabonnement  />
    </>
    
  )
}