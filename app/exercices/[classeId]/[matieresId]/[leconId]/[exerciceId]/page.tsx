'use client'

import { useState, useEffect, use } from "react";
import Footer from "@/components/footer";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import CartesExercices from "@/components/cartesExercices";
import MatiereExercices from "@/components/maitieres-exercices";
import LoaderCarte from "@/components/loading-carte";
import LoaderText from "@/components/loading-text";
import Image from "next/image";

interface Props{
    params: Promise<{
        classeId:number;
        matieresId:number;
        leconId:number;
        exerciceId:number;
    }>;
};

interface Category{
    id:number;
    name:string;
    image:any;
}

interface Matiere{
    id:number;
    nom_matiere:string;
}

interface Classe{
    id:number;
    name_class:string;
}

interface Lecon{
    titre:string
}

export default function classeExercices({params}:Props){
    const param = use(params);
    //const {classeId, matieresId, leconId, exerciceId} = await params
    const [dataCategory, setDataCategory] = useState<Category | null>(null)
    const [dataClasse, setDataClasse] = useState<Classe | null>(null)
    const [dataMatiere, setDataMatiere] = useState<Matiere | null>(null)
    const [loading, setLoading] = useState(true)
    const [dataLecon, setLecon] = useState<Lecon | null>(null)

    useEffect(()=>{
        const category = async () =>{
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/category/${param.classeId}`,{
                method:"GET"
            });
            const statusCode = res.status
            const result = await res.json();
            if(!res.ok){
                setDataCategory(null)
                //return false
            }else{
                setDataCategory(result)
                setLoading(false)
                console.log(result)
            }
        }
        const matiere = async()=>{
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/matiere/${(await param).leconId}`,{
                method:"GET"
            })
            const status = res.status
            const result = await res.json()
            if(!res.ok){
                setDataMatiere(null)
            }else{
                
                setDataMatiere(result)
                console.log(result)
            }
        }
        const classe = async () =>{
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/classe/${param.matieresId}`,{
                method:"GET"
            });
            const statusCode = res.status
            const result = await res.json();
            if(!res.ok){
                setDataClasse(null)
               // return false
            }else{
                
                setDataClasse(result)
                console.log(result)
            }
        }
        const lecon = async()=>{
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/lecon/${(await param).exerciceId}`,{
                method:"GET"
            })
            const status = res.status
            const result = await res.json()
            if(!res.ok){
                setLecon(null)
            }else{
                
                setLecon(result)
                console.log(result)
            }
        }
        lecon()
        matiere()
        classe()
        category()
    },[])

    return(
        <div className="flex flex-col gap-14">
            <div className="flex flex-col flex-1">
                <div className="w-full h-100">
                    {/* Navigator bar */}
                    <Navbar />
                    {loading ?(
                        <div className="w-full h-full relative bottom-24 ">
                            <LoaderCarte />
                        </div>
                    ):(
                        <div className="flex flex-col justify-center  w-full h-full gap-2 bg-gray-300 p-4 relative bottom-24 ">
                            <Image 
                                src={`${process.env.NEXT_PUBLIC_BASE_URL2}/uploads/images/${dataCategory?.image.name}`}
                                alt=""
                                fill
                                className=" object-cover group-hover:shadow-gray-900 group-hover:shadow-lg duration-500"
                            />
                            <div className=" bg-black opacity-45 absolute inset-0"></div>
                            <div className=" flex flex-col justify-center items-center relative top-14 gap-2">
                                <p className="text-white  text-2xl text-wrap"><span className=" font-bold  uppercase md:text-4xl">{dataCategory?.name}</span> </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div className="flex flex-1 flex-col my-10 gap-8">
                <div className="flex justify-start items-center px-4 lg:px-28">
                    <div className="flex flex-col justify-center w-full">
                        <p className="font-bold text-2xl uppercase">{dataClasse?.name_class}</p>
                        <p className="font-bold text-blue-950 text-2xl uppercase"> <span>{dataMatiere?.nom_matiere}</span></p>
                        <p className="text-xl uppercase  text-chart-2 text-wrap"> <span>{dataLecon?.titre}</span></p> 
                        <p className=" text-lg text-chart-2  relative top-4">Téléchargez vos exercices et corrigés</p> 
                    </div>
                </div>
                <div className="px-4 lg:px-28 flex flex-row gap-2 items-center">
                    <Link href={`/exercices/${param.classeId}/${param.matieresId}`} className="p-2 bg-blue-950 text-white rounded-sm  uppercase text-lg">Retour</Link>
                    <Link href={`/exercices/${param.classeId}/${param.matieresId}/${param.leconId}`} className="p-2 bg-blue-950 text-white rounded-sm uppercase text-lg ">Toutes les leçons</Link>
                </div>
                {loading ? (
                    <div className="w-full h-full relative top-14 ">
                        <LoaderText />
                    </div>
                ):(

                    <CartesExercices classeId={param.matieresId} matiereId={param.leconId} leconId={param.exerciceId} />
                )}
            </div>
            {/* <InputOTP maxLength={4} className="flex justify-center items-center">
                <InputOTPGroup className="gap-2 w-full h-48">
                    <InputOTPSlot index={0} className="rounded-md border-2 w-16 h-16 text-xl text-blue-800 font-bold" />
                    <InputOTPSlot index={1} className="rounded-md border-2 w-16 h-16 text-xl text-blue-800 font-bold"/>
                    <InputOTPSlot index={2} className="rounded-md border-2 w-16 h-16 text-xl text-blue-800 font-bold"/>
                    <InputOTPSlot index={3} className="rounded-md border-2 w-16 h-16 text-xl text-blue-800 font-bold"/>
                </InputOTPGroup>
            </InputOTP> */}
            <Footer />
        </div>
    )
}