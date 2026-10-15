import Link from "next/link";
import Image from "next/image";
import Imagehome from "@/public/accueil.jpg";
import ImageExercicesgratuits from "@/public/exercicesgratuits.jpg";
import Images1 from "@/public/1.jpg";
import Images2 from "@/public/2.jpg";
import Images3 from "@/public/3.jpg";
import Images4 from "@/public/4.jpg";
import Appstore from "@/public/appstore.jpg"
import Playstore from "@/public/playstore.jpg"
import Navbar from "@/components/Navbar";
import Category from "@/components/category";
import Footer from "@/components/footer";
import QRCode from "@/components/ui/qr-code";
import { Smartphone } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col gap-10">

      <div className="flex flex-col flex-1">
        <div className="w-full h-127.5">

          <Navbar />

          <div className="flex flex-col justify-center  w-full h-full gap-2 bg-gray-300 p-4 relative bottom-24 ">
            <Image 
                src={Imagehome}
                alt=""
                fill
                className=" object-cover"
            />
            <div className=" bg-black opacity-60 absolute inset-0"></div>
            <div className=" flex flex-col relative top-35 gap-2">
              <p className="text-white  text-2xl">Débutez avec <span className=" font-bold  text-2xl">School UP</span> </p>
              <p className="text-white  text-xl">Votre banque d'exercices scolaires avec corrigés.</p>
            </div>
            <div className=" relative top-40 flex flex-col md:flex-row gap-2 ">
              <Link 
                href="/signup" 
                className=" flex justify-center items-center w-60 h-10  text-xl bg-white duration-300 hover:bg-blue-200 rounded-sm p-2 ">
                Commencer
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col my-10 gap-8">
        <Category />

        <div className=" flex flex-col gap-8 p-4">

          <div className=" flex flex-col lg:flex-row gap-6 justify-center md:p-5">

            <div className=" flex flex-row shadow-lg transition-transform hover:shadow-xl duration-500 group">
              <div className=" left-2 bg-gray-300 w-150 md:w-56 xl:w-72 h-50 group-hover:-rotate-6 duration-500 relative">
                <Image 
                  src={Images1}
                  alt=""
                  fill
                  className=" object-cover"
                />
              </div>
              <div className=" p-4 bg-white flex justify-center items-center w-150 md:w-64 xl:w-72">
                <p className=" text-[14px] ">
                  De nombreux exercices conformes aux programmes officiels, pour de meilleurs résultats scolaires et aux examens.
                </p>
              </div>
            </div>

            <div className="flex flex-row shadow-lg transition-transform hover:shadow-xl duration-500 group">
              <div className=" left-2 bg-gray-300 w-150 md:w-56 xl:w-72 h-50 group-hover:rotate-6 duration-500 relative">
                <Image 
                  src={Images2}
                  alt=""
                  fill
                  className=" object-cover"
                />
              </div>
              <div className=" p-4 bg-white flex justify-center items-center w-150 md:w-64 xl:w-72 rounded-r-xl">
                <p className=" text-[14px] ">
                  Les exercices permettent de mieux préparer ses examens. Réussite assurée !
                </p>
              </div>
            </div>

          </div>

          <div className=" flex flex-col lg:flex-row gap-6 justify-center md:p-5">

            <div className="flex flex-row shadow-lg transition-transform hover:shadow-xl duration-500 group">
              <div className=" left-2 bg-gray-300 w-150 md:w-56 xl:w-72 h-50 group-hover:-rotate-6 duration-500 relative">
                <Image 
                  src={Images3}
                  alt=""
                  fill
                  className=" object-cover"
                />
              </div>
              <div className=" p-4 bg-white flex justify-center w-150 items-center md:w-64 xl:w-72">
                <p className=" text-[14px] ">
                  Les exercices scolaires font progresser. Votre enfant aura de meilleurs résultats !
                </p>
              </div>
            </div>

            <div className="flex flex-row shadow-lg transition-transform hover:shadow-xl duration-500 group">
              <div className=" left-2 bg-gray-300 w-150 md:w-56 xl:w-72 h-50 group-hover:rotate-6 duration-500 relative">
                <Image 
                  src={Images4}
                  alt=""
                  fill
                  className=" object-cover"
                />
              </div>
              <div className=" p-4 bg-white flex justify-center items-center w-150 md:w-64 xl:w-72">
                <p className=" text-[14px] ">
                  Votre banque d'exercices scolaires avec corrigés. Où vous voulez, quand vous voulez, sans vous déplacer !
                </p>
              </div>
            </div>

          </div>

        </div>
        {/* Essayer gratuitement */}
        <div className=" w-full h-80 bg-gray-50 relative">
          
          <Image 
              src={ImageExercicesgratuits}
              alt=""
              fill
              className=" object-cover"
          />
          <div className=" bg-black opacity-70 absolute inset-0"></div>
          <div className=" w-full h-full flex flex-col justify-center items-center gap-5 p-4">
            <div className=" flex flex-col gap-2">
              <p className=" text-white text-center md:text-3xl  z-50 text-2xl font-bold">Essayer gratuitement</p>
              <p className=" text-center text-white z-50  text-xl">Téléchargez gratuitement des exercices avec corrigés.</p>
            </div>
            <Link href="/exercices-gratuits" className=" p-2 bg-white z-50 rounded-sm w-72 md:w-96 text-center  text-lg">
              Clique ici
            </Link>
          </div>
        </div>
      </div>

      <div className=" w-full h-80 relative my-12">
        <div className=" w-full h-full flex flex-col md:flex-row justify-center items-center gap-5 p-4">
          
          <div className="flex flex-col justify-center items-center gap-5 p-4">
            <div className="relative  flex flex-col gap-1.5 px-2 md:px-0">
              <QRCode value={`https://schoolup.ga`} size={200}/>
            </div>
            <div className=" h-auto w-auto rounded-full flex justify-center items-center right-3 md:right-5 relative bottom-8 p-3">
              <div className=" bg-blue-700 h-14 w-14 text-white rounded-full relative right-1 flex justify-center items-center">
                <Smartphone width={30} height={30} />
              </div>
              <div className="flex flex-col justify-center items-center p-2 ">
                <p className="  text-md relative">SCANNEZ-MOI</p>
                <p className=" text-lg">Pour tétéchager l'application</p>
              </div>
            </div>
          </div>

          <div className=" flex flex-col gap-2 relative bottom-8">
            <p className=" text-center z-50  font-bold text-2xl">Disponible sur</p>
            <div className="flex justify-center items-center flex-row gap-2.5">
              <Image 
                  src={Playstore} width={200}  alt=""
                  className="object-cover" 
              />
              <Image 
                  src={Appstore} width={200}  alt=""
                  className="object-cover" 
              />
            </div>
          </div>
        </div>
      </div>

      {/* footer */}
      <Footer />

    </div>
  );
}