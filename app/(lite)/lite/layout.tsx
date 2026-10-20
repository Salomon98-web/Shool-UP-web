"use client"
import { useEffect } from 'react'
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ToasterProvider } from "@/components/ui/toast-custom";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/* export const metadata: Metadata = {
  title: "School UP",
  icons:{
    icon:"/SCHOOL%20UP_LOGO%201.png"
  },
  description: "Votre banque d'exercices scolaires avec corrigés.",
}; */

useEffect(() => {
  const handler = (e: MouseEvent) => {
    const a = (e.target as HTMLElement).closest('a');
    if (!a) return;
    const href = a.getAttribute('href');
    if (!href) return;

    // Si le lien ne commence pas par /lite et va vers schoolup.net
    if (href.startsWith('https://schoolup.net') && !href.includes('/lite')) {
      e.preventDefault();
      window.open(href, '_blank');
    }
    if (href === '/' || (href.startsWith('/') && !href.startsWith('/lite'))) {
      e.preventDefault();
      window.open(`https://schoolup.net${href}`, '_blank');
    }
  }
  document.addEventListener('click', handler);
  return () => document.removeEventListener('click', handler);
}, [])

export const metadata = {
  manifest: '/manifest.webmanifest',
}


export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    
    <ToasterProvider>
      {children}
    </ToasterProvider>
  );
}
