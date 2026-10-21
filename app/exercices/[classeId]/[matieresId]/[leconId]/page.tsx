'use client'

import { useState, useEffect, use } from "react";
import Footer from "@/components/footer";
import Navbar from "@/components/Navbar";
import LoaderText from "@/components/loading-text";
import Link from "next/link";
import Image from "next/image";
import LoaderCarte from "@/components/loading-carte";

type Props = {
    params: Promise<{
        classeId:number;
        matieresId:number;
        leconId:number;
    }>;
};

interface Matiere{
    id:number;
    nom_matiere:string;
}

interface Category{
    id:number;
    name:string;
    image:any;
}

interface Classe{
    id:number;
    name_class:string;
}

export default function page({params}:Props){
    const param = use(params);
    const [data, setData] = useState([])
    const [dataMatiere, setDataMatiere] = useState<Matiere | null>(null)
    const [loading, setLoading] = useState(true)
    const [dataCategory, setDataCategory] = useState<Category | null>(null)
    const [dataClasse, setDataClasse] = useState<Classe | null>(null)

    useEffect(()=>{
        const lecon = async ()=>{
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/exercice/classe/${(await param).matieresId}/matiere/${(await param).leconId}/lecon`,{
                method:"GET"
            })
            const status = res.status
            const result = await res.json()
            if(!res.ok){
                setData([])
                setLoading(false)
            }else{
                
                setData(result)
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
                //return false
            }else{
                setDataClasse(result)
                console.log(result)
            }
        }
        classe()
        category()
        matiere()
        lecon()
    },[])
    return(
        <div className="flex flex-col min-h-screen gap-14">
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
                            <div className=" bg-black opacity-60 absolute inset-0"></div>
                            <div className=" flex flex-col justify-center items-center relative top-14 gap-2">
                                <p className="text-white  text-2xl text-wrap"><span className=" font-bold uppercase md:text-4xl">{dataCategory?.name}</span> </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div className="flex flex-1 flex-col my-10 gap-8">
                <div className="flex justify-start items-center px-4 lg:px-28">
                    <div className="flex flex-col justify-center w-full">
                        {loading ? (''):(
                            <p className="flex flex-col uppercase text-2xl text-blue-950 ">
                                <span className=" font-bold ">{dataClasse?.name_class}</span>
                                <span>{dataMatiere?.nom_matiere}</span>
                            </p> 
                        )}
                        <p className=" text-lg text-chart-2 ">Selectionnez votre leçon accéder aux exercices</p>               
                    </div>
                </div>
                <div className="px-4 lg:px-28 flex flex-row items-center gap-2 my-8">
                    <Link href={`/exercices/${param.classeId}`} className="p-2 bg-blue-950 text-white rounded-sm uppercase text-lg">Retour</Link>
                    <Link href={`/exercices/${param.classeId}/${param.matieresId}`} className="p-2 bg-blue-950 text-white rounded-sm  uppercase text-lg">Toutes les matières</Link>
                </div>
                {loading ? (
                    <div className="flex justify-start  px-4 lg:px-28">
                        <div className="flex flex-col gap-4 w-full h-56">
                            {[1,2,3,4].map((item)=>(
                                <div key={item} className="flex justify-start items-center w-full h-24">
                                    <LoaderCarte />
                                </div>
                            ))}
                        </div>
                    </div>
                ):(
                    <div className="">
                        
                        {data.length < 1 ? (
                            <div className="text-center text-chart-1 ">Aucune leçon</div>
                        ):('')}
                        
                        <div className="flex justify-start mx-auto px-4 lg:px-28">
                            <div className="flex flex-col gap-4 w-full">
                                {data.map((item:any, index)=>(
                                    <Link key={item.id} href={`/exercices/${param.classeId}/${param.matieresId}/${param.leconId}/${item.id}`}>
                                        <div className="flex justify-start items-center group bg-gray-100 duration-500 hover:shadow-lg 
                                                hover:shadow-mauve-300 w-full h-auto rounded-sm p-4 ">
                                            <p className="flex gap-3 text-start text-xl uppercase font-bold text-wrap">
                                                <span className="flex justify-center items-center relative -top-6 font-bold text-white p-3 rounded-sm bg-blue-950">{index + 1}</span>{item.titre}
                                            </p>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>

                    </div>
                )}
                
                {/* cette partie sert juste de test
                <div className="flex justify-start items-center group bg-gray-100 duration-500 hover:shadow-lg 
                                hover:shadow-mauve-300 w-full h-auto rounded-sm p-4 ">
                    <p className="flex gap-3 text-start font-semibold  text-lg text-wrap">
                        <span className="flex justify-center items-center relative -top-6 text-2xl text-white p-3 rounded-sm bg-blue-950">2</span>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Porro ducimus impedit perferendis quas tempora aliquam ea dicta nobis officia amet.</p>
                </div> */}
            </div>
            
            
            <Footer />
        </div>
    )
}