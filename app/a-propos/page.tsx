"use client"

import Footer from "@/components/footer";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import ImageAprops from "@/public/apropos.jpg"

export default function Apropos(){
    return(
        <div className=" flex flex-col gap-14">
        
            <div className="flex flex-col flex-1">
                <div className="w-full h-100">

                    <Navbar />

                    <div className="flex flex-col justify-center items-center w-full h-full gap-2 bg-gray-300 p-4 relative bottom-24 ">
                        <Image 
                            src={ImageAprops}
                            alt=""
                            fill
                            className=" object-cover"
                        />
                        <div className=" bg-black opacity-60 absolute inset-0"></div>
                        <div className=" flex flex-col justify-center items-center relative top-14 gap-2">
                            <p className="text-white  text-2xl"><span className=" font-bold  uppercase text-4xl">A propos de nous</span> </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-1 flex-col my-10 px-4 lg:px-28">
                <div className=" flex flex-col p-4 lg:p-10 gap-9">
                    <p className="  text-lg">Lorsqu’on est scolarisé, on apprend beaucoup de choses durant les cours. Que ce soit de la première jusqu’à la dernière année, chaque élève remplit son cerveau de nouvelles informations qui pourront lui être utiles dans sa vie de tous les jours. En général, un élève scolarisé effectue son apprentissage petit à petit, durant tout son parcours scolaire. On se rend donc compte que la scolarité est un long chemin qui n’est pas toujours évident, puisque chaque année de nombreuses informations sont apprises et il faut donc du sérieux pour arriver à tout enregistrer. Mais alors qu’est-ce qui peut vous aider ou aider votre enfant à bien enregistrer tout ce qu’il apprend et ainsi à bien progresser ?</p>
                    <p className="  text-lg">L’exercice scolaire en général permet de voir si l’élève a bien compris les leçons étudiées. Que ce soit en maternelle, à l’école primaire, au collège, au lycée et à l’université, les exercices permettent aux élèves de mettre en pratique ce qu’ils ont appris et ainsi de voir leurs lacunes. En effet, lorsqu’un élève étudie sa leçon, qu’il note les points importants et qu’il révise ceux-ci, il n’est pas sûr à 100% qu’il ait bien retenu ou compris les éléments de la leçon. C’est pour cela qu’effectuer des exercices de soutien scolaire aide à voir où nous en sommes vis-à-vis de la compréhension et de l’application de chaque leçon.</p>
                    <p className="  text-lg">Telle est la vocation de School UP.</p>
                    <p className="  text-lg">Non seulement School UP facilite l’accès aux exercices scolaires pour s’entraîner et réviser ses leçons, mais cette application crée encore plus de proximité parents-enfants. La disponibilité des corrigés permet aux parents d’aider et de mieux suivre leurs enfants dans leurs révisions.</p>
                    <p className="  text-lg">School UP le meilleur atout pour votre réussite scolaire !</p>
                </div>
            </div>
            
            <Footer />

        </div>
    )
}