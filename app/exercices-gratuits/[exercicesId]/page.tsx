'use client'

import Footer from "@/components/footer";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import ImageExercicesgratuits from "@/public/exercicesgratuits.jpg";
import CartesExercicesGratuits from "@/components/cartesExercicesGratuits"
import { useState, useEffect, use } from "react";
import React from "react";
import Link from "next/link";

type Props = {
    params: Promise<{
        exercicesId:number;
    }>;
};

export default function exercices({params}:Props){
    const param = use(params);
    return(
        
        <div className="flex flex-col gap-14">

            <div className="flex flex-col flex-1">
                <div className="w-full h-100">

                    <Navbar />

                    <div className="flex flex-col justify-center  w-full h-full gap-2 bg-gray-300 p-4 relative bottom-24 ">
                        <Image 
                            src={ImageExercicesgratuits}
                            alt=""
                            fill
                            className=" object-cover"
                        />
                        <div className=" bg-black opacity-60 absolute inset-0"></div>
                        <div className=" flex flex-col justify-center items-center relative top-14 gap-2">
                            <p className="text-white  text-lg"><span className=" font-bold  text-xl uppercase">Exercices gratuits</span> </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-1 flex-col my-10 gap-8">
                <div className="flex justify-start items-center px-4 lg:px-28">
                    <div className="flex flex-col justify-start items-start w-full">
                        <Link href="/exercices-gratuits" className="p-2 bg-blue-950 rounded-sm uppercase text-white text-lg" >Toutes les classes</Link>               
                    </div>
                </div>{/* 
                <MatieresExercicesGratuits /> */}
                <CartesExercicesGratuits id={param.exercicesId} /> 
            </div>
            <Footer />
        </div>
    )
}