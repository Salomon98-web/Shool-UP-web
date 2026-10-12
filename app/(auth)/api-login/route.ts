import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req:Request) {

    const cookieStorage = await cookies()

    const formData = await req.formData()
    const username = formData.get("username")
    const password = formData.get("password")

    const form = new FormData()
    form.append("username", username as string)
    form.append("password", password as string)

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/account/login`,{
        method:"POST",
        body:form
    })

    const data = await res.json()

    if(!res.ok){
        return NextResponse.json(
            {message:data.message || "Connexion échoué"},
            {status:401}
        )
    }
    
    cookieStorage.set("token",data.token,{
        httpOnly:true,
        secure:true,
        sameSite:"lax",
        path:"/",
        maxAge:60*60*24*7
    });
    cookieStorage.set("role",data.role,{
        httpOnly:true,
        secure:true,
        sameSite:"lax",
        path:"/",
        maxAge:60*60*24*7
    })
    cookieStorage.set("status",data.status,{
        httpOnly:true,
        secure:true,
        sameSite:"lax",
        path:"/",
        maxAge:60*60*24*7
    })

    return NextResponse.json({success:true, user: data})
}