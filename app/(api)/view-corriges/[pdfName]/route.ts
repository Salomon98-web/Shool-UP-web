import { NextRequest, NextResponse } from "next/server"
import fs from "fs"
import path from "path"

export async  function GET(req:NextRequest, {params}:{params: Promise<{pdfName:any}>}){
    const {pdfName} = await params
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/download/corrige-control-pdf/${pdfName}`)
    const buffer = await res.arrayBuffer()

    return new Response(buffer,{
        headers:{
            'Content-Type': 'application/pdf',
            'Content-Disposition': 'inline; filename="'+pdfName+'"',
            'Cache-Control': 'no-store',
        }
    })
}
