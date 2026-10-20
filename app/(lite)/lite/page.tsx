import Link from "next/link";
import Image from "next/image";
import Imagehome from "@/public/accueil.jpg";
import Images1 from "@/public/1.jpg";
import Images2 from "@/public/2.jpg";
import Images3 from "@/public/3.jpg";
import Navbar from "@/components/lite/Navbar";
import Category from "@/components/lite/category";

export default function Home() {
  return (
    <div className="flex flex-col">

      <div className="flex flex-col flex-1">
        <div className="w-full h-100">

          <Navbar />

          <div className="flex flex-col justify-center  w-full h-full gap-2 bg-gray-300 p-4 relative bottom-24 ">
            <Image 
                src={Images3}
                alt=""
                fill
                className=" object-cover w-[90vw]"
            />
            <div className=" bg-black opacity-50 absolute inset-0"></div>
            <div className=" flex flex-col relative top-19 gap-2">
              <p className="text-white  text-2xl">Débutez avec <span className=" font-bold  text-2xl">School UP</span> </p>
              <p className="text-white  text-xl">Votre banque d'exercices scolaires avec corrigés.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col">
        <Category />

        <div className=" flex flex-col gap-8 p-4 relative bottom-30">

          <div className=" flex flex-col lg:flex-row gap-6 justify-center md:p-5">

            <div className=" flex flex-col sm:flex-row shadow-lg transition-transform hover:shadow-xl duration-500 group">
              <div className=" bg-gray-300 w-full md:w-56 xl:w-72 h-50 group-hover:-rotate-6 duration-500 relative">
                <Image 
                  src={Imagehome}
                  alt=""
                  fill
                  className=" object-cover"
                />
              </div>
              <div className=" p-4 bg-white flex justify-center items-center w-full md:w-64 xl:w-72 rounded-lg">
                <p className=" text-md ">
                  De nombreux exercices conformes aux programmes officiels, pour de meilleurs résultats scolaires et aux examens.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row shadow-lg transition-transform hover:shadow-xl duration-500 group">
              <div className=" bg-gray-300 w-full md:w-56 xl:w-72 h-50 group-hover:rotate-6 duration-500 relative">
                <Image 
                  src={Images1}
                  alt=""
                  fill
                  className=" object-cover"
                />
              </div>
              <div className=" p-4 bg-white flex justify-center items-center w-full md:w-64 xl:w-72 rounded-r-xl">
                <p className=" text-md ">
                  Les exercices permettent de mieux préparer ses examens. Réussite assurée !
                </p>
              </div>
            </div>

          </div>

          <div className=" flex flex-col lg:flex-row gap-6 justify-center md:p-5">

            <div className="flex flex-col sm:flex-row shadow-lg transition-transform hover:shadow-xl duration-500 group">
              <div className=" bg-gray-300 w-full md:w-56 xl:w-72 h-50 group-hover:-rotate-6 duration-500 relative">
                <Image 
                  src={Images2}
                  alt=""
                  fill
                  className=" object-cover"
                />
              </div>
              <div className=" p-4 bg-white flex justify-center w-full items-center md:w-64 xl:w-72">
                <p className=" text-md ">
                  Les exercices scolaires font progresser. Votre enfant aura de meilleurs résultats !
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row shadow-lg transition-transform hover:shadow-xl duration-500 group">
              <div className=" bg-gray-300 w-full md:w-56 xl:w-72 h-50 group-hover:rotate-6 duration-500 relative">
                <Image 
                  src={Imagehome}
                  alt=""
                  fill
                  className=" object-cover"
                />
              </div>
              <div className=" p-4 bg-white flex justify-center items-center w-full md:w-64 xl:w-72">
                <p className=" text-md ">
                  Votre banque d'exercices scolaires avec corrigés. Où vous voulez, quand vous voulez, sans vous déplacer !
                </p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}