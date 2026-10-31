'use client'

import Link from "next/link";
import MentionsLegales from "@/components/modal-mentions-legales";
import Paternaires from "@/public/partenaire.jpg"
import Image from "next/image";
import useIsApk from "@/functions/useIsApk"
import Image5logo from "@/public/IMG_3001.jpg"

export default function Footer(){
    const isApk = useIsApk()
    return(
        <>
        <div className="my-12"></div>
        <footer className={`${isApk === true ? 'hidden': 'block'} w-full flex flex-col `}>
            <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 md:justify-items-center gap-9 w-full my-14 py-10 px-4 lg:px-28">
                <div className="flex-col gap-4 ">
                    <p className="  font-bold text-2xl">Contactez-nous</p>
                    <div className=" flex flex-col gap-2 text-lg">
                        <p className="">Email :<br/> <span className=" text-blue-800">contact@schoolup.net</span></p>
                    </div>
                    <div className=" flex flex-col gap-2 text-lg">
                        <p className="">Téléphone :<br/> <span className=" text-blue-800">(+241) 065 45 01 34</span></p>
                    </div>
                </div>
                <div className="flex-col gap-4">
                    <p className=" text-2xl font-bold">Liens d'accès rapides</p>
                    <div className=" flex flex-col gap-4 ">
                        <Link href='/exercices-gratuits' className="hover:transform hover:translate-x-2 duration-500 text-blue-950 text-lg">Exercices gratuits</Link>
                        <Link href='/a-propos' className="hover:transform hover:translate-x-2 duration-500 text-blue-950 text-lg">A propos de nous</Link>
                        <Link href='/contact' className="hover:transform hover:translate-x-2 duration-500 text-blue-950 text-lg">Contacts</Link>
                        <Link href='/options' className="hover:transform hover:translate-x-2 duration-500 bg-violet-950 text-lg max-w-max max-h-max p-2 rounded-lg text-white">Abonnez-vous</Link>
                        <MentionsLegales />
                    </div>
                </div>
                <div className="flex-col gap-4">
                    <p className=" text-2xl font-bold">Nos partenaires</p>
                    <div className=" flex flex-col gap-4 relative top-1.5">
                        <Image 
                            src={Paternaires}
                            alt=""
                            width={100}
                        />
                    </div>
                </div>
                {/* <div className=" flex flex-col gap-4">
                    <MentionsLegales />
                </div> */}
            </div>
            
            <div className=" bg-blue-950 h-10 flex justify-center items-center gap-7 text-white text-[11px]  p-2">
                <p>
                    Copyright &copy;
                    {new Date().getFullYear()};
                    Tous droits réservés
                </p>
                <p className="text-sm"></p>
            </div>
        </footer>
        <div className={`${isApk === false ? 'hidden': 'block'} flex-col gap-4 px-4`}>
            <div className="flex flex-row gap-5.5">
                <div className="flex flex-col gap-1.5">
                    <div className=" flex flex-col gap-4 relative top-1.5">
                        <Image 
                            src={Paternaires}
                            alt=""
                            width={100}
                        />
                    </div>
                    <p className=" text-sm md:text-xl font-bold">Nos partenaires</p>
                </div>
                <div className="flex flex-col gap-1.5">
                    <a href="https://schoolup.net" target="_blank" rel="noopener">
                        <div className=" flex flex-col gap-4 relative top-1.5">
                            <Image 
                                src={Image5logo}
                                alt=""
                                width={100}
                            />
                        </div>
                    </a>
                    <p className=" text-sm md:text-xl font-bold">site web officiel</p>
                </div>
            </div>
            <div className="my-7"></div>
        </div>
        </>
    );
}