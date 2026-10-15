'use client'

import { useState, useEffect, use } from "react";
import Sidebar from "../sidebar";
import Topbar from "../topbar";
import CartesCategories from "../(elements-categories)/cartes-category";
import MoadalAddCategory from "../(elements-categories)/modal-add-category";
import ModalDeleteCategory from "../(elements-categories)/modal-delete-category";
import MoadalUpdateCategory from "../(elements-categories)/modal-update-category";
import Image from "next/image";
import LoaderCarte from "../loading-carte"

interface Props{
    token:string | undefined
    role:string | undefined
}

export default function Category({token, role}:Props){
    const [refreshKey, setRefresh] = useState(0)
    const [openModalAddCategory, setopenModalAddCategory] = useState(false)
    const [openModalUpdateCategory, setopenModalUpdateCategory] = useState(false)
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [openModalDelete, setOpenModaldeleteCategory] = useState(false)
    const [categoryId, setIdCategory] = useState<number>(0)
    const [nameCategory, setNamecategory] = useState<string>('')

    useEffect(()=>{
        const categories = async ()=>{
            const res = await fetch(`${[process.env.NEXT_PUBLIC_BASE_URL]}/category`,{
                method:"GET"
            });
            const statusCode = res.status
            if(!res.ok){
                setLoading(false)
                setData([])
                return false
            }else{

                const result = await res.json();
                setData(result)
                console.log(result)
                setLoading(false)
                return result;
            }
        }
        categories()
    },[refreshKey])
    return(
        <>
        <div className="flex flex-row justify-center">

            {/** sidebar */}
            <div className="max-w-4/12">
                <Sidebar role={role} />
            </div>

            <div className="flex-1 flex flex-col w-8/12 bg-gray-100">

                {/** topbar */}
                <Topbar onSuccess={()=>{}} token={token} />

                <div className=" relative top-7 p-2 px-4 lg:px-14">
                    <hr />
                    <p className="text-chart-1">Catégorie</p>
                </div>
                <CartesCategories token={token} refreshKey={refreshKey} />

                <div className="relative top-15 w-full flex px-4 lg:px-14">
                    <button 
                        onClick={()=>{
                            setopenModalAddCategory(true)
                        }}
                        className="   text-md text-white bg-violet-800 max-w-96 p-2 rounded-sm"
                    >
                        AJouter une catégorie
                    </button>
                </div>
                {loading ? (
                    <>
                    {[0,1,2].map((item)=>(
                        <div key={item} className="relative top-30 w-full flex px-4 lg:px-14 my-1">
                            <div className="w-full flex justify-between h-20">
                                <LoaderCarte />
                            </div>
                        </div>
                    ))}
                    </>
                ):(
                    <>
                    {data.map((item:any)=>(
                        <div key={item.id} className="relative top-30 w-full flex px-4 lg:px-14 my-1">
                        
                            <div className="w-full flex justify-between bg-white shadow-sm p-2 rounded-lg">
                                <div className=" flex justify-between gap-3">
                                    <div className="w-20 h-20 bg-gray-200 rounded-sm relative">
                                        <Image 
                                            src={`${process.env.NEXT_PUBLIC_BASE_URL2}/uploads/images/${item.image.name}`}
                                            alt=""
                                            fill
                                            className=" object-cover rounded-sm "
                                        />
                                                                
                                        <div className=" bg-black opacity-30 absolute inset-0 rounded-sm"></div>
                                    </div> 
                                    <p className="  font-bold text-md uppercase line-clamp-1 truncate w-[24vw] md:w-[30vw]">{item.name}</p>
                                </div>
                                
                                <div className=" flex flex-col justify-center items-center gap-12">

                                {/*  <p className="  font-bold text-xs">{item.name}</p> */}

                                <div className=" flex  gap-2 ">
                                    <button
                                        onClick={()=>{
                                            setIdCategory(item.id)
                                            setNamecategory(item.name)
                                            setopenModalUpdateCategory(true)
                                        }}
                                        className="p-2 bg-blue-800 text-white rounded-md text-[8px] md:text-[11px]">
                                        Modifier
                                    </button>
                                    <button 
                                        onClick={()=>{
                                            setIdCategory(item.id)
                                            setNamecategory(item.name)
                                            setOpenModaldeleteCategory(true)
                                        }}
                                        className="p-2 bg-red-600 text-white rounded-md text-[8px] md:text-[11px]">
                                        Supprimer
                                    </button>
                                </div>
                                </div>
                            </div>
                        </div>  
                    ))}
                    </>
                )}
                
                <div className="my-32"></div>
            </div>

        </div>

        <MoadalAddCategory open={openModalAddCategory} onOpenChange={setopenModalAddCategory} token={token} onSuccess={()=>setRefresh(k=>k+1)} />
        <ModalDeleteCategory token={token} id={categoryId} open={openModalDelete} onOpenOnChange={setOpenModaldeleteCategory} categoryName={nameCategory} onSuccess={()=>setRefresh(k=>k+1)}  />
        <MoadalUpdateCategory token={token} id={categoryId} open={openModalUpdateCategory} onOpenChange={setopenModalUpdateCategory} categoryValue={nameCategory} onSuccess={()=>setRefresh(k=>k+1)}  />    
        </>
       
    )
}
