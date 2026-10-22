"use client"

import Link from "next/link";
import CGU from "@/components/modal-cgu";
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import logo from "@/public/SCHOOL UP_LOGO 1.png";
import Image from "next/image";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from "@/components/ui/field"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input"
import { useState } from "react";
import ModalErrors from "@/components/modal-error";
import Loader from "@/components/loading";
import InfosAfterSignup from "@/components/modal-info-after-signup";
import { useToastCustom } from "@/components/ui/toast-custom";

export function CreatAccount() {
  const [isLoading, setIsLoading] = useState(false)
  const [openInfo, setOpenInfo] = useState(false)
  const toast = useToastCustom()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoading(true);
    const nouvelleErreus: string[] = [];
    const formData = new FormData(e.currentTarget);
    
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/account`;
    try{

      const res = await fetch(url,{
        method: "POST",
        body:formData,
      })
      const data = await res.json();
      const status = res.status

      if(!res.ok){
        toast.error(`${data[0].message}`)
        /* console.log(data) */
        setIsLoading(false);

      }else{
        /* console.log(data) */
        setOpenInfo(true)
        setIsLoading(false);
      }

    }catch(error){
      toast.error("Une erreur est survenue")
      console.error(error)
      setIsLoading(false);
    }
    
  };

  return (
    
    <>
    <Card className="w-full max-w-sm">
      <CardHeader className="bg-blue-950 bg-linear-to-r from-blue-950 via-blue-800  to-blue-700 rounded-b-4xl h-40 text-white flex justify-center items-center relative bottom-4">
        <CardTitle className="  text-xl flex flex-col gap-2">
          
          <div className=" flex justify-center">
            <Image
              src={logo}
              alt=""
              width={130}
            />
          </div>
          <p className="text-md ">Créer votre compte</p>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Input
                id="username"
                name="username"
                type="text"
                placeholder="Définissez votre nom d'utilisateur"
                required
              />
            </div>
            <div className="grid gap-2">
              <Input 
                id="password" 
                name="password"
                type="password"
                required 
                placeholder="Créer votre mot de passe"
              />
            </div>
            <Input type="hidden" name="role" value="member"></Input>
            <hr />
            <FieldSet>

              <FieldLegend className="font-bold ">Contrat d'utilisateur</FieldLegend>

              <FieldDescription>
                <CGU />
              </FieldDescription>

              <FieldGroup>
                <Field orientation="horizontal">
                  <Checkbox
                    id="checkout-7j9-same-as-shipping-wgm"
                    required
                    name="cgu"
                  />
                  <FieldLabel
                    htmlFor="checkout-7j9-same-as-shipping-wgm"
                    className="font-normal"
                  >
                    J'accepte les termes du contrat
                  </FieldLabel>
                </Field>
              </FieldGroup>

            </FieldSet>
            <div className="grid gap-2">

              <Button  type="submit" className="w-full h-10 bg-blue-800 hover:bg-blue-700 duration-500 text-lg  ">

                {isLoading ?(
                  <Loader />
                ) : (
                  
                  <p id="button-connexion">Créer</p>
                )}
                
              </Button>

              <div className="flex flex-col relative top-4 justify-center items-center gap-3">
                <p className="text-sm  ">Vous avez déjà un compte ? <Link className="  text-blue-950" href="/login">Connectez-vous</Link></p>
                <Link className="  text-sm text-blue-950" href="/">Retour</Link>
              </div>

            </div>
          </div>
        </form>
        <div id="test" className="my-5"></div>

      </CardContent>
    </Card>
    <InfosAfterSignup open={openInfo} onOpenChange={setOpenInfo} />
    </>
  )
}


export default function signup() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black p-4 md:p-1">
      <CreatAccount />
    </div>
  );
}
