import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req:Request) {

    const cookieStorage = await cookies()
    const token = (await cookies()).get("token")?.value
    const role = (await cookies()).get("role")?.value

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/account/logout`,{
        method:"POST",
        headers:{
            "X-Api-Key": token as string,
        }
    })

    const data = await res.json()

    if(!res.ok){
        return NextResponse.json(
            {message:data.message || "Connexion échoué"},
            {status:401}
        )
    }

    cookieStorage.delete('token')
    cookieStorage.delete('role')
    
    return NextResponse.json({success:true, user: data})
}