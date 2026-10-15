'use client'

import { User, CreditCard, Zap, ArrowBigLeftIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import logo from "@/public/SCHOOL UP_LOGO COULEURS.png";

export default function Option() {
    const router = useRouter()
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black p-4 md:p-1">

        <div className="w-96 h-32 flex justify-center items-center  relative bottom-12">
            <Image
                src={logo}
                alt=""
                width={200}
            />
        </div>

        <div className="flex flex-wrap justify-center items-center w-full px-4 lg:px-28 gap-4">

            <Link  href={`/signup`}>
                <div className="flex flex-col gap-2 justify-center relative overflow-hidden items-center group border bg-violet-100 duration-500 hover:shadow-mauve-300 shadow-xs 
                    hover:shadow-lg hover:transform hover:rotate-2 w-72 h-24 rounded-lg p-2">
                        <CreditCard
                            className={`  
                            absolute -top-5 right-1 -rotate-10 
                            h-30 w-30  
                            text-violet-500 
                            opacity-10  group-hover:scale-125 duration-500 
                            `}  
                        />
                    <p className="text-center font-bold  group-h text-wrap uppercase text-lg">Premier abonnement</p>
                    <p className="text-chart-2  text-[10px]">cliquer içi</p>
                </div>
            </Link>

            <Link  href={`/login`}>
                <div className="flex flex-col gap-2 justify-center relative overflow-hidden items-center group border bg-blue-100 duration-500 hover:shadow-mauve-300 shadow-xs 
                    hover:shadow-lg hover:transform hover:rotate-2 w-72 h-24 rounded-lg p-2">
                        <User
                            className={`  
                            absolute -top-5 right-1 -rotate-10 
                            h-30 w-30  
                            text-blue-500 
                            opacity-10  group-hover:scale-125 duration-500 
                            `}  
                        />
                    <p className="text-center font-bold  group-h text-wrap uppercase text-lg">connectez-vous</p>
                    <p className="text-chart-2  text-[10px]">cliquer içi</p>
                </div>
            </Link>

            <Link  href={`/reabonnement`}>
                <div className="flex flex-col gap-2 justify-center relative overflow-hidden items-center group border bg-rose-100 duration-500 hover:shadow-mauve-300 shadow-xs 
                    hover:shadow-lg hover:transform hover:rotate-2 w-72 h-24 rounded-lg p-2">
                        <Zap
                            className={`  
                            absolute -top-5 right-1 -rotate-10 
                            h-30 w-30  
                            text-rose-500 
                            opacity-10  group-hover:scale-125 duration-500 
                            `}  
                        />
                    <p className="text-center font-bold  group-h text-wrap uppercase text-lg">Réabonnez-vous</p>
                    <p className="text-chart-2  text-[10px]">cliquer içi</p>
                </div>
            </Link>

        </div>

        <button
            onClick={()=>{
                router.back()
            }}

            className="relative top-23"
        >
           <ArrowBigLeftIcon /> 
        </button>

        <div className="my-5"></div>
    </div>
  );
}