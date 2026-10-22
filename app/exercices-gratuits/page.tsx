import Navbar from "@/components/Navbar";
import Footer from "@/components/footer";
import ImageExercicesgratuits from "@/public/exercicesgratuits.jpg";
import Image from "next/image";
import CartesClasse from "@/components/cartes-classes-rubrique-gratuite"

export default function ExercicesGratuits(){
    return(
        <div className="flex flex-col gap-14">

            <div className="flex flex-col flex-1">
                <div className="w-full h-100">

                    <Navbar />

                    <div className="flex flex-col justify-center  w-full h-full gap-2 bg-gray-300 p-4 relative bottom-24 ">
                        <Image 
                            src={ImageExercicesgratuits}
                            alt=""
                            fill
                            className=" object-cover"
                        />
                        <div className=" bg-black opacity-45 absolute inset-0"></div>
                        <div className=" flex flex-col justify-center items-center relative top-14 gap-2">
                            <p className="text-white  text-lg"><span className=" font-bold  md:text-4xl uppercase">Exercices gratuits</span> </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-1 flex-col my-10 gap-8">
                <div className="flex justify-start items-center px-4 lg:px-28">
                    <div className="flex flex-col justify-center items-center w-full">
                        <p className="text-lg  text-blue-900">Cliquez sur une classe</p>               
                    </div>
                </div>{/* 
                <MatieresExercicesGratuits /> 
                <CartesExercicesGratuits /> */}
                <CartesClasse />
            </div>
            <Footer />
        </div>
    )
}