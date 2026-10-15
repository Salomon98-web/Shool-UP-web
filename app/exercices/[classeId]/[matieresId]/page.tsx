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
    }>;
};

interface Category{
    id:number;
    name:string;
    image:any;
}

export default function page({params}:Props){
    const param = use(params);
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [dataCategory, setDataCategory] = useState<Category | null>(null)

    useEffect(()=>{
        const matiere = async ()=>{
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/exercice/matiere/classe/${(await param).matieresId}`,{
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
        const category = async () =>{
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/category/${param.classeId}`,{
                method:"GET"
            });
            const statusCode = res.status
            const result = await res.json();
            if(!res.ok){
                setDataCategory(null)
                return false
            }else{
                setDataCategory(result)
                console.log(result)
            }
        }
        category()
        matiere()
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
                                <p className="text-white  text-lg text-wrap"><span className=" font-bold  text-xl">{dataCategory?.name}</span> </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div className="flex flex-1 flex-col my-10 gap-8">
                <div className="flex justify-start items-center px-4 lg:px-28">
                    <div className="flex flex-col justify-center w-full">
                        <p className="text-2xl text-blue-950  font-extrabold">Matière</p> 
                        <p className=" text-[14px] md:text-sm  text-chart-2">Cliquer sur une matière pour accéder a la/les leçon(s)</p>               
                    </div>
                </div>
                <div className="px-4 lg:px-28">
                    <Link href={`/exercices/${param.classeId}`} className="p-2 bg-blue-950 text-white rounded-sm ">Retour</Link>
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
                            <div className="text-center text-chart-1 ">Aucune matière</div>
                        ):(
                        
                            <div className="flex justify-start mx-auto px-4 lg:px-28">
                                <div className="flex flex-col gap-4 w-full">
                                    {data.map((item:any)=>(
                                        <Link key={item.id} href={`/exercices/${param.classeId}/${param.matieresId}/${item.matiere.id}`}>
                                            <div className="flex justify-start items-center group bg-gray-100 duration-500 hover:shadow-lg 
                                                hover:shadow-mauve-300 w-full h-auto rounded-sm p-4 ">
                                                <p className="text-start font-bold  text-xl text-wrap">{item.matiere.nom_matiere}</p>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
            
            
            <Footer />
        </div>
    )
}