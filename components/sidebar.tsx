'use client'

import { 
    Sidebar,
    SidebarTrigger,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuItem,
    SidebarProvider,
    SidebarInset, 
    SidebarMenuButton
} from "@/components/ui/sidebar"
import { usePathname } from "next/navigation";
import logo from "@/public/SCHOOL UP_LOGO COULEURS.png";
import Image from "next/image";
import { useState, useEffect } from "react";
import { 
    Home, 
    FileText, 
    Gift, 
    Download,
    BookOpenText,
    Presentation, 
    BookOpen,
    Pencil,
    Settings,
    UserIcon
} from "lucide-react";
import { Button } from "./ui/button";
import Logout from "./modal-logout"

interface Props{
    role:string | undefined
}

export default function sidebar({role}:Props){
    const [sideTigger, setSideTigger] = useState(false)
    const pathName =usePathname()
    const [openModalLogout, setModalLogout] = useState(false)
    const links = [

        {href: '/dashboard', label: 'Tableau de bord', icon: Home},

        role === "admin" ? {href: '/gestion-exercises', label: 'Exercices', icon: FileText} : null,

        role === "admin" ? {href: '/gestion-exercises-gratuis', label: 'Exercices gratuits', icon: Gift} : null,

        {href: '/mes-corriges', label: 'Mes corrigés', icon: Download},

        {href: '/reabonnement', label: 'Se réabonner', icon: UserIcon},

        role === "admin" ? {href: '/abonnes', label: 'Abonnés', icon: Home} : null,

        role === "admin" ? {href: '/categories', label: 'Catégorie', icon: BookOpenText} : null,

        role === "admin" ? {href: '/classes', label: 'Classe', icon: Presentation} : null,

        role === "admin" ? {href: '/matieres', label: 'Matière', icon: BookOpen} : null,

        role === "admin" ? {href: '/lecons', label: 'Leçon', icon: Pencil} : null,

    ].filter((lien): lien is {href: string; label: string; icon:any} => lien !==null);

    useEffect(()=>{
        setSideTigger(false)
    },[])

    return(
        <SidebarProvider>
            <Sidebar className="">
                <SidebarHeader>
                    <div className="p-2 font-mono font-bold text-white rounded-lg text-2xl flex items-center justify-center relative top-6 h-40">
                        <Image
                            src={logo}
                            alt=""
                            width={200}
                        />
                    </div>
                </SidebarHeader>
                <SidebarContent className="relative top-14">
                    <SidebarMenu>
                        
                        {links.map((link)=>{
                            const isActive = pathName === link.href
                            return(
                                <SidebarMenuItem key={link.href} className="p-2">
                                    <a href={link.href}>
                                        <SidebarMenuButton  
                                            className={`p-4 font-mono text-[12px] ${isActive ? "bg-blue-950 bg-linear-to-r from-blue-950 via-blue-800  to-blue-700 text-white":""} group hover:bg-blue-800 hover:text-white duration-500`} 
                                        >
                                            {link.label}
                                        </SidebarMenuButton>
                                    </a>
                                </SidebarMenuItem>
                            );
                        })}
                        <div className="h-16 w-full">
                            <div className="w-full h-full p-3">
                                <Button 
                                    onClick={()=>{
                                        setModalLogout(true)
                                    }}
                                    className={`bg-blue-800  z-50 font-mono text-[11px] hover:bg-blue-700 duration-500`}
                                >
                                    Déconnexion
                                </Button>
                            </div>
                        </div>
                        <Logout open={openModalLogout} onOpenChange={setModalLogout} />
                    </SidebarMenu>
                </SidebarContent>
                <div className="my-6"></div>
                <SidebarFooter className="bg-gray-100">
                    <div className="flex justify-center items-center gap-7 text-[8px] md:text-[10px] text-chart-2 font-mono p-2">
                        <p>Copyright &copy;
                                document.write{new Date().getFullYear()};
                            
                            Tous droits réservés
                        </p>
                        <p className="text-sm"></p>
                    </div>
                </SidebarFooter>
            </Sidebar>

            <SidebarInset className={`${sideTigger === true ? 'w-12': 'w-0'}  z-50 fixed md:relative text-blue-900`}>
                <SidebarTrigger onClick={()=>{
                    sideTigger == true ? setSideTigger(false) : setSideTigger(true)
                }} />
                <div className={`hidden md:block relative top-38`}>
                {sideTigger === true ? (
                    <>
                    {links.map((link)=>{
                        const isActive = pathName === link.href
                        return(
                            <SidebarMenuItem key={link.href} className="p-2">
                                <a href={link.href}>
                                    <SidebarMenuButton  
                                        className={`p-4 font-mono text-[12px] ${isActive ? "bg-blue-950 bg-linear-to-r from-blue-950 via-blue-800 to-blue-700 text-white":""} group hover:bg-blue-800 hover:text-white duration-500 flex justify-center items-center`} 
                                    >
                                    {link.icon && <link.icon className=" " />}
                                    </SidebarMenuButton>
                                </a>
                            </SidebarMenuItem>
                        );
                    })}
                    </>
                ):(null)}
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}

