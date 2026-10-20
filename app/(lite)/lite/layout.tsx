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
