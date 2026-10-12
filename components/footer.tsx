import Link from "next/link";
import MentionsLegales from "@/components/modal-mentions-legales";
import QRCode from "./ui/qr-code";
import Image from "next/image";
import Appstore from "@/public/appstore.jpg"
import Playstore from "@/public/playstore.jpg"
import { Smartphone } from "lucide-react";

export default function Footer(){
    return(
        <footer className=" w-full flex flex-col ">
            <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 md:justify-items-center gap-5 w-full my-14 py-10 px-4 lg:px-28">
                <div className=" flex flex-col gap-4 ">
                    <p className=" font-mono font-bold text-lg">Contactez-nous</p>
                    <div className=" flex flex-col gap-2 font-mono text-[14px]">
                        <p className="">Email :<br/> <span className=" text-blue-800">contact@schoolup.ga</span></p>
                    </div>
                    <div className=" flex flex-col gap-2 font-mono text-[14px]">
                        <p className="">Téléphone :<br/> <span className=" text-blue-800">(+241) 065 45 01 34</span></p>
                    </div>
                </div>
                <div className=" flex flex-col gap-4">
                    <p className=" text-lg font-mono font-bold">Liens d'accès rapides</p>
                    <div className=" flex flex-col gap-4 font-mono">
                        <Link href='/exercices-gratuits' className="hover:transform hover:translate-x-2 duration-500 text-blue-950 text-[14px]">Exercices gratuits</Link>
                        <Link href='/a-propos' className="hover:transform hover:translate-x-2 duration-500 text-blue-950 text-[14px]">A propos de nous</Link>
                        <Link href='/contact' className="hover:transform hover:translate-x-2 duration-500 text-blue-950 text-[14px]">Contacts</Link>
                        <Link href='/signup' className="hover:transform hover:translate-x-2 duration-500 text-blue-950 text-[14px]">Abonnez-vous</Link>
                    </div>
                </div>
                <div className=" flex flex-col gap-4">
                    <MentionsLegales />
                </div>
            </div>
            
            <div className=" bg-blue-950 lg:h-10 flex justify-center items-center gap-7 text-white text-[11px] font-mono p-2">
                <p>Copyright &copy;
                        document.write{new Date().getFullYear()};
                    
                    Tous droits réservés
                </p>
                <p className="text-sm"></p>
            </div>
        </footer>
    );
}