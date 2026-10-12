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
        const classes = async ()=>{
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/classe/category/${(await param).classeId}`,{
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

            if(!res.ok){
                setDataCategory(null)
                return false
            }else{
                const result = await res.json();
                setDataCategory(result)
                console.log(result)
            }
        }
        category()
        classes()
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
                                src={`http://localhost:8000/uploads/images/${dataCategory?.image.name}`}
                                alt=""
                                fill
                                className=" object-cover group-hover:shadow-gray-900 group-hover:shadow-lg duration-500"
                            />
                            <div className=" bg-black opacity-60 absolute inset-0"></div>
                            <div className=" flex flex-col justify-center items-center relative top-14 gap-2">
                                <p className="text-white font-mono text-[16px] text-wrap"><span className=" font-bold font-mono text-2xl">{dataCategory?.name}</span> </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div className="flex flex-1 flex-col my-10 gap-8">
                <div className="flex justify-center items-center px-4 lg:px-28">
                    <div className="flex flex-col justify-center w-full">
                        <p className="text-[18px] text-blue-950 text-center font-mono font-extrabold">Classe</p> 
                        <p className=" text-lg text-center text-chart-2 font-mono">Cliquer sur votre classe</p>               
                    </div>
                </div>
                {loading ? (
                    <LoaderText />
                ):(
                    
                    <div className="flex justify-center items-center w-full px-4 lg:px-28">
                        {data.length < 1 ? (
                            <p className="text-center text-chart-1 font-bold font-mono">Aucune classe</p>
                        ):(
                            <div className="flex flex-wrap justify-center gap-4">
                                {data.map((item:any)=>(
                                    <Link key={item.id} href={`/exercices/${param.classeId}/${item.id}`}>
                                        <div className="flex justify-center items-center group border bg-gray-100 duration-500 hover:shadow-mauve-300 shadow-xs 
                                            hover:shadow-lg hover:transform hover:rotate-2 w-72 h-24 rounded-lg p-2">
                                            <p className="text-center font-bold font-mono text-[16px] group-h text-wrap">{item.name_class}</p>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
            
            
            <Footer />
        </div>
    )
}