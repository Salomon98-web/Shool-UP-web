'use client';

import { useState, useEffect} from "react";
import Footer from "@/components/footer";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import LoaderText from "@/components/loading-text";
import Image from "next/image";
import Imageexercice from "@/public/exercices.jpg"
import Images4 from "@/public/4.jpg";

export default function page(){
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    useEffect(()=>{
        const categories = async ()=>{
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/category`,{
                method:"GET"
            });
            const statusCode = res.status
            if(!res.ok){
                setLoading(false)
                setData([])
                return false
            }else{

                if(statusCode >= 300){
                    setData([])
                    setLoading(false)
                }else{

                    try{
                        const result = await res.json();
                        setData(result)
                        console.log(result)
                        setLoading(false)
                        return result;

                    }catch(error){

                        setLoading(false)
                    }
                }
            }
        }
        categories()
    },[])
    

    return(
        <div className="flex flex-col gap-4">

            <div className="flex flex-col flex-1">
                <div className="w-full h-100">

                    <Navbar />

                    <div className="flex flex-col justify-center  w-full h-full gap-2 bg-gray-300 p-4 relative bottom-24 ">
                        <Image 
                            src={Images4}
                            alt=""
                            fill
                            className=" object-cover"
                        />
                        <div className=" bg-black opacity-45 absolute inset-0"></div>
                        <div className=" flex flex-col justify-center items-center relative top-14 gap-2">
                            <p className="text-white  text-2xl"><span className=" font-bold uppercase md:text-4xl">Exercices</span> </p>
                            <div className="flex flex-col justify-center items-center w-full">
                                <p className=" text-lg text-white ">Cliquez sur votre niveau</p>               
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-1 flex-col my-6">
                <div className=" w-full">
                    {loading ?(
                        <LoaderText />
                    ):(
                        <div className=" flex flex-col items-center gap-4 my-4 w-full px-4 lg:px-28">
                            {data.length < 1 ? (
                                <div className="my-14">
                                    <p className="text-center text-chart-1 font-bold ">Aucun cycle disponible</p>
                                </div>
                            ):(
                                <div className="flex flex-wrap items-center gap-4 my-14">
                                    {data.map((item:any)=>(
                                        <Link key={item.id} href={`/exercices/${item.id}`} className="w-full h-32 sm:h-40 md:w-72 md:h-72 group">
                                            <div className="h-full flex flex-col justify-end items-center border bg-gray-100 duration-500 hover:transform  w-full rounded-sm p-2 relative">
                                                    <Image 
                                                        src={`${process.env.NEXT_PUBLIC_BASE_URL2}/uploads/images/${item.image.name}`}
                                                        alt=""
                                                        fill
                                                        className=" object-cover rounded-sm group-hover:shadow-gray-900 group-hover:shadow-lg duration-500"
                                                    />
                                                    
                                                    <div className=" bg-black opacity-35 absolute inset-0 rounded-sm"></div>
                                                <p key={item.id} className="text-center font-bold  text-xl text-white group-h text-wrap p-2 z-50 uppercase group-hover:transform group-hover:-translate-y-3 group-active:-translate-y-3 duration-500">{item.name}</p>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    )
}
