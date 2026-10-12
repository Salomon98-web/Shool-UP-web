'use client'

import { useState, useEffect } from "react"
import { 
    Carousel,
    CarouselItem,
    CarouselNext,
    CarouselContent,
    CarouselPrevious, 
} from "./ui/carousel"
import Images1 from "@/public/1.jpg";
import Images2 from "@/public/2.jpg";
import Image from "next/image";

export default function CarouselPage(){
    return(
        <div className="w-full max-w-md ">
             <Carousel opts={{loop:true, align:"center"}}>
            <CarouselContent>
                <CarouselItem>
                    <div className=" flex flex-col group">
                        <div className=" left-2 bg-gray-300 w-150 md:w-56 xl:w-72 h-96  relative">
                            <Image
                            src={Images1}
                            alt=""
                            fill
                            className=" object-cover"
                            />
                        </div>
                        <div className=" p-4 bg-white flex justify-center items-center w-96 md:w-64 xl:w-72">
                            <p className=" text-[10px] md:text-[11px] font-mono">
                            De nombreux exercices conformes aux programmes officiels, pour de meilleurs résultats scolaires et aux examens.
                            </p>
                        </div>
                    </div>
                </CarouselItem>

                <CarouselItem>
                    <div className="flex flex-col  group">
                        <div className=" left-2 bg-gray-300 w-150 md:w-56 xl:w-72 h-96  relative">
                            <Image 
                            src={Images2}
                            alt=""
                            fill
                            className=" object-cover"
                            />
                        </div>
                        <div className=" p-4 bg-white flex justify-center items-center w-full md:w-64 xl:w-72 rounded-r-xl">
                            <p className=" text-[10px] md:text-[11px] font-mono">
                            Les exercices permettent de mieux préparer ses examens. Réussite assurée !
                            </p>
                        </div>
                    </div>
                </CarouselItem>
                <CarouselItem>
                    <div className="w-1 h-1"></div>
                </CarouselItem>
            </CarouselContent>
            <CarouselPrevious className={`relative top-9 left-9`}/>
            <CarouselNext className={`relative top-9`} />
        </Carousel>
        </div>
       
    )
}