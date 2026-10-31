'use client'

import { useEffect } from "react"
import React from "react"
import Autoplay from 'embla-carousel-autoplay'
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
import Imagehome from "@/public/accueil.jpg";
import Images3 from "@/public/3.jpg";
import Images4 from "@/public/4.jpg";

export default function CarouselAutoplay(){
    const plugin = React.useRef(
        Autoplay({delay:2890,
            stopOnInteraction:false,
            stopOnMouseEnter:false,
            stopOnFocusIn:false,
            stopOnLastSnap:false,
        })
    )

    useEffect(()=>{
        
    },[plugin])
    return(
        <Carousel
            plugins={[plugin.current]}
            opts={{loop:true}}
            className="w-full flex flex-col gap-4.5"
        >
            <CarouselContent>
                <CarouselItem className="w-full h-100 group flex flex-col">
                    <div className="h-full flex flex-col justify-end items-center border bg-gray-100 duration-500 hover:transform  w-full rounded-sm p-2 relative">
                        <Image 
                            src={Imagehome}
                            alt=""
                            fill
                            className=" object-cover rounded-sm"
                        />
                        
                        <div className=" bg-black opacity-10 absolute inset-0 rounded-sm"></div>
                        
                    </div>
                    <p className="text-start text-lg text-wrap p-1 z-50 ">
                        De nombreux exercices conformes aux programmes officiels, pour de meilleurs résultats scolaires et aux examens.
                    </p>
                </CarouselItem>
                <CarouselItem className="w-full h-100 group flex flex-col">
                    <div className="h-full flex flex-col justify-end items-center border bg-gray-100 duration-500 hover:transform  w-full rounded-sm p-2 relative">
                        <Image 
                            src={Images1}
                            alt=""
                            fill
                            className=" object-cover rounded-sm"
                        />
                        
                        <div className=" bg-black opacity-10 absolute inset-0 rounded-sm"></div>
                        
                    </div>
                    <p className="text-start text-lg group-h text-wrap p-2 z-50">
                        Les exercices permettent de mieux préparer ses examens. Réussite assurée !
                    </p>
                </CarouselItem>
                <CarouselItem className="w-full h-100 group flex flex-col">
                    <div className="h-full flex flex-col justify-end items-center border bg-gray-100 duration-500 hover:transform  w-full rounded-sm p-2 relative">
                        <Image 
                            src={Images2}
                            alt=""
                            fill
                            className=" object-cover rounded-sm"
                        />
                        
                        <div className=" bg-black opacity-10 absolute inset-0 rounded-sm"></div>
                        
                    </div>
                    <p className="text-start text-lg text-wrap p-2 z-50">
                        Les exercices scolaires font progresser. Votre enfant aura de meilleurs résultats !
                    </p>
                </CarouselItem>
                <CarouselItem className="w-full h-100 group flex flex-col">
                    <div className="h-full flex flex-col justify-end items-center border bg-gray-100 duration-500 hover:transform  w-full rounded-sm p-2 relative">
                        <Image 
                            src={Images4}
                            alt=""
                            fill
                            className=" object-cover rounded-sm"
                        />
                        
                        <div className=" bg-black opacity-10 absolute inset-0 rounded-sm"></div>
                        
                    </div>
                    <p className="text-start text-lg text-wrap p-2 z-50">
                        Votre banque d'exercices scolaires avec corrigés. Où vous voulez, quand vous voulez, sans vous déplacer !
                    </p>
                </CarouselItem>
            </CarouselContent>
            <div className="flex flex-row justify-center gap-2.5">
                <CarouselPrevious className={`static`}/>
                <CarouselNext className={`static`}/>
            </div>
            
        </Carousel>
    )
}