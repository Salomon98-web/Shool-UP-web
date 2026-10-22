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

export const metadata: Metadata = {
  title: "School UP",
  icons:{
    icon:"/icon1.png"
  },
  description: "Votre banque d'exercices scolaires avec corrigés.",
  manifest: "/manifest.webmanifest",
  openGraph:{
    title:"School UP",
    description:"Votre banque d'exercices scolaires avec corrigés.",
    url:"https://schoolup.net",
    images:[
      {
        url:"/3.jpg",
        width:1200,
        height:630,
        alt:"school UP"
      }
    ],
    type:"website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ToasterProvider>
          {children}
        </ToasterProvider>
      </body>
    </html>
  );
}
