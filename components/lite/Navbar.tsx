"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Key, Menu } from "lucide-react";
import Image from "next/image";
import logo from "@/public/SCHOOL UP_LOGO 1.png";

import { 
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
} from "@/components/ui/navigation-menu";

import {Sheet, SheetContent, SheetTrigger} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Home, BookOpen, Crown, UserCircle } from "lucide-react";

const links = [
    {href: '/lite/', label: 'Accueil', icon:Home},
    {href: '/lite/exercices', label: 'Exercices', icon:BookOpen},
    {href: '/lite/reabonnement', label: 'Réabonnement', icon:Crown},
    {href: 'https://schoolup.net', label: 'Mon compte', icon:UserCircle},
].filter((lien): lien is {href: string; label: string; icon:any} => lien !==null);;

export default function Navbar(){
    const pathname = usePathname();
    const [openMenu, setOpenMenu] = useState(false);

    return(
        <div className="flex justify-center items-center">
            <header className=" z-50 w-[95vw] bg-blue-950  fixed bottom-1 rounded-xl">
                <div className=" container mx-auto flex max-h-max items-center justify-between px-4 p-2 rounded-xl">
                    {/* menu mobile */}
                    {links.map((item)=>(
                        <Link href={item.href} key={item.href} className="flex flex-col justify-center items-center">
                            {item.icon && <item.icon className="text-white " />}
                            <p className="text-white text-xs">{item.label}</p>
                        </Link>
                    ))}
                </div>
            </header>
        </div>
        
    );
}