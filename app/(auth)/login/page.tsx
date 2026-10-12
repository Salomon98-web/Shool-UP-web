'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Loader from "@/components/loading";
import { Button } from "@/components/ui/button";
import logo from "@/public/SCHOOL UP_LOGO 1.png";
import Image from "next/image";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useToastCustom } from "@/components/ui/toast-custom";

function CardForm() {
  const [isLoading, setIsLoading] = useState(false)
  const toast = useToastCustom()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoading(true);
    const nouvelleErreus: string[] = [];
    const formData = new FormData(e.currentTarget);

    const url = "/api-login";
    console.log(url)
    try{

      const res = await fetch(url,{
        method: "POST",
        body:formData,
      })
      const data = await res.json();
      const status = res.status

      if(!res.ok){
        toast.error(`${data.message}`);
        setIsLoading(false);

      }else{
        toast.success('Connexion établie veillez patienter...')
        setIsLoading(false);
        
        setTimeout(() => {
          router.replace("/dashboard")
        }, 3000);
      }

    }catch(error){

      nouvelleErreus.push("Une erreur est survenue")
      console.error
      toast.error("Une erreur est survenue");
      setIsLoading(false);
    }
    
  };

  return (
    <>
    <Card className="w-full max-w-sm">
      <CardHeader className="bg-blue-950 bg-linear-to-r from-blue-950 via-blue-800  to-blue-700 rounded-b-4xl h-40 text-white flex justify-center items-center relative bottom-4">
        <CardTitle className="font-mono  text-xl flex flex-col gap-2">
          
          <div className=" flex justify-center">
            <Image
              src={logo}
              alt=""
              width={130}
            />
          </div>
          <p className="text-xs">Connectez-vous a votre compte </p>
        </CardTitle>
        {/* <CardDescription className=" font-mono text-[10px] h-14">
          Connectez-vous à votre compte
        </CardDescription> */}
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Input
                id="username"
                name="username"
                type="text"
                placeholder="Nom d'utilisateur"
                required
              />
            </div>
            <div className="grid gap-2">
              <Input 
                id="password" 
                name="password"
                type="password"
                required 
                placeholder="Mot de passe"
              />
            </div>
            <div className="grid gap-2">

              <Button  type="submit" className="w-full h-10 bg-blue-800 hover:bg-blue-700 duration-500 text-[12px] font-mono ">

                {isLoading ?(
                  <Loader />
                ) : (
                  
                  <p id="button-connexion">CONNEXION</p>
                )}
                
              </Button>

              <div className="flex flex-col relative top-4 justify-center items-center gap-3">
                <p className=" font-mono text-[10px]">Vous n'avez pas de compte ? <Link className=" text-blue-950" href="/signup">Créer votre compte</Link></p>
                <Link className=" font-mono text-[12px] text-blue-950" href="/">Retour</Link>
              </div>

            </div>
          </div>
        </form>
        <div id="test" className="my-5"></div>

      </CardContent>
    </Card>
    </>
   
  )
}

export default function LoginPage() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black p-4 md:p-1">
        <CardForm />
    </div>
  );
}