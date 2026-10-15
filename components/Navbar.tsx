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

const links = [
    {href: '/', label: 'Accueil'},
    {href: '/exercices', label: 'Exercices'},
    {href: '/a-propos', label: 'A propos de nous'},
    {href: '/contact', label: 'Contact'},
];

export default function Navbar(){
    const pathname = usePathname();
    const [openMenu, setOpenMenu] = useState(false);

    return(
        <header className=" sticky z-50 w-full bg-black opacity-80">
            <div className=" container mx-auto flex h-24 items-center justify-between px-4">
                <a href='/' className="text-2xl font-bold">
                    <Image
                        src={logo}
                        alt=""
                        width={80}
                    />
                </a>
                
                {/* menu desktop */}
                <NavigationMenu className="hidden lg:flex">
                    <NavigationMenuList className="gap-4">
                        {links.map((link)=>(
                            <NavigationMenuItem key={link.href}>
                                <NavigationMenuLink  href={link.href} active={pathname === link.href}
                                    className="group inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 font-mono text-[13px] transition-colors
                                    hover:bg-white hover:text-accent-foreground text-white"
                                >
                                    {link.label}
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                        ))}
                        
                        <Button className="bg-white text-black hover:bg-blue-900 hover:text-white duration-300 font-mono text-[12px] h-9">
                            <a href='/options'>Abonnez-vous</a>
                        </Button>
                    </NavigationMenuList>
                </NavigationMenu>

                {/* menu mobile */}
                <Sheet open={openMenu} onOpenChange={setOpenMenu}>
                    <SheetTrigger className="lg:hidden">
                        <Menu className="h-5 w-5 text-white" />
                    </SheetTrigger>

                    <SheetContent side="top" className=" w-full p-4 bg-black opacity-65 text-white">
                        <nav className="flex flex-col gap-4 mt-8 text-white font-mono text-[13px]">
                            {links.map((link) =>(
                                <a 
                                    key={link.href} 
                                    href={link.href}
                                    className="hover:transform hover:translate-x-2 duration-500"
                                >
                                    {link.label}
                                    
                                </a>
                            ))}
                            <a href="/options" className="p-2 bg-white max-w-max text-center font-mono text-[14px] text-black rounded-sm hover:transform hover:translate-x-2 duration-500">
                                Abonnez-vous
                            </a>
                        </nav>
                    </SheetContent>
                </Sheet>
            </div>
        </header>
    );
}