'use client'

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
            stopOnInteraction:true
        })
    )
    return(
        <Carousel
            plugins={[plugin.current]}
            opts={{loop:true}}
            className="w-full"
        >
            <CarouselContent>
                <CarouselItem className="w-full h-100 group">
                    <div className="h-full flex flex-col justify-end items-center border bg-gray-100 duration-500 hover:transform  w-full rounded-sm p-2 relative">
                        <Image 
                            src={Imagehome}
                            alt=""
                            fill
                            className=" object-cover rounded-sm group-hover:shadow-gray-900 group-hover:shadow-lg duration-500"
                        />
                        
                        <div className=" bg-black opacity-35 absolute inset-0 rounded-sm"></div>
                        <div className=" bg-black opacity-65 absolute inset-0 rounded-b-sm top-69"></div>
                        <p className="text-start text-sm text-white group-h text-wrap p-1 z-50 uppercase group-hover:transform group-hover:-translate-y-3 group-active:-translate-y-3 duration-500">
                            De nombreux exercices conformes aux programmes officiels, pour de meilleurs résultats scolaires et aux examens.
                        </p>
                    </div>
                </CarouselItem>
                <CarouselItem className="w-full h-100 group">
                    <div className="h-full flex flex-col justify-end items-center border bg-gray-100 duration-500 hover:transform  w-full rounded-sm p-2 relative">
                        <Image 
                            src={Images1}
                            alt=""
                            fill
                            className=" object-cover rounded-sm group-hover:shadow-gray-900 group-hover:shadow-lg duration-500"
                        />
                        
                        <div className=" bg-black opacity-35 absolute inset-0 rounded-sm"></div>
                        <div className=" bg-black opacity-65 absolute inset-0 rounded-b-sm top-69"></div>
                        <p className="text-start text-sm md:text-lg text-white group-h text-wrap p-2 z-50 uppercase group-hover:transform group-hover:-translate-y-3 group-active:-translate-y-3 duration-500">
                            Les exercices permettent de mieux préparer ses examens. Réussite assurée !
                        </p>
                    </div>
                </CarouselItem>
                <CarouselItem className="w-full h-100 group">
                    <div className="h-full flex flex-col justify-end items-center border bg-gray-100 duration-500 hover:transform  w-full rounded-sm p-2 relative">
                        <Image 
                            src={Images2}
                            alt=""
                            fill
                            className=" object-cover rounded-sm group-hover:shadow-gray-900 group-hover:shadow-lg duration-500"
                        />
                        
                        <div className=" bg-black opacity-35 absolute inset-0 rounded-sm"></div>
                        <div className=" bg-black opacity-65 absolute inset-0 rounded-b-sm top-69"></div>
                        <p className="text-start text-sm md:text-lg text-white group-h text-wrap p-2 z-50 uppercase group-hover:transform group-hover:-translate-y-3 group-active:-translate-y-3 duration-500">
                            Les exercices scolaires font progresser. Votre enfant aura de meilleurs résultats !
                        </p>
                    </div>
                </CarouselItem>
                <CarouselItem className="w-full h-100 group">
                    <div className="h-full flex flex-col justify-end items-center border bg-gray-100 duration-500 hover:transform  w-full rounded-sm p-2 relative">
                        <Image 
                            src={Images4}
                            alt=""
                            fill
                            className=" object-cover rounded-sm group-hover:shadow-gray-900 group-hover:shadow-lg duration-500"
                        />
                        
                        <div className=" bg-black opacity-35 absolute inset-0 rounded-sm"></div>
                        <div className=" bg-black opacity-65 absolute inset-0 rounded-b-sm top-69"></div>
                        <p className="text-start text-sm md:text-lg text-white group-h text-wrap p-2 z-50 uppercase group-hover:transform group-hover:-translate-y-3 group-active:-translate-y-3 duration-500">
                            Votre banque d'exercices scolaires avec corrigés. Où vous voulez, quand vous voulez, sans vous déplacer !
                        </p>
                    </div>
                </CarouselItem>
            </CarouselContent>
        </Carousel>
    )
}