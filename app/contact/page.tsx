'use client'

import { useState } from "react";
import Footer from "@/components/footer";
import Navbar from "@/components/Navbar";
import { Mail,Phone,MapPin } from "lucide-react";
import Loader from "@/components/loading";
import { useToastCustom } from "@/components/ui/toast-custom";

export default function page(){
    
    const [loading, setLoading] = useState(false)
    const toast = useToastCustom()

    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>)=>{
        setLoading(true)
        e.preventDefault()
        const nouvelleErreus: string[] = [];
        const formData = new FormData(e.currentTarget)
        //console.log(formData.get("file"))
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/mail/send`,{
            method:"POST",
            body:formData,
        })

        const statusCode = res.status;
        const result = await res.json();
            
        if(!res.ok){
            
            toast.error(result.message)
            setLoading(false)
            
        }else{
            toast.success("Envoi réussi !")
            setLoading(false) 
        }

        /* console.log(result) */
    }
    return(
        <div className="flex flex-col gap-4">

            <Navbar />

            <div className="flex flex-1 flex-col my-20 h-full">
                <div className=" w-full flex flex-col lg:flex-row justify-center items-center gap-20">

                    <div className=" flex flex-col justify-center items-center gap-3 w-[85vw] md:w-96">

                        <div className=" flex flex-row items-center gap-1 w-full h-20 p-2 border border-gray-300 shadow-lg rounded-lg">
                            <div className="w-10 h-10 bg-blue-300 flex justify-center items-center rounded-lg">
                                <Mail />
                            </div>
                            <p className="  flex flex-col">
                                <span className="text-[10px] text-chart-2">Email</span>
                                <span>contact@schoolup.net</span>
                            </p>
                        </div>

                        <div className=" flex flex-row items-center gap-1 w-full h-20 p-2 border border-gray-300 shadow-lg rounded-lg">
                            <div className="w-10 h-10 bg-blue-300 flex justify-center items-center rounded-lg">
                                <Phone />
                            </div>
                            <p className="  flex flex-col">
                                <span className="text-[10px] text-chart-2">Téléphone</span>
                                <span>+241 065 45 01 34</span>
                            </p>
                        </div>

                        <div className=" flex flex-row items-center gap-1 w-full h-20 p-2 border border-gray-300 shadow-lg rounded-lg">
                            <div className="w-10 h-10 bg-blue-300 flex justify-center items-center rounded-lg">
                                <MapPin />
                            </div>
                            <p className="  flex flex-col">
                                <span className="text-[10px] text-chart-2">Localisation</span>
                                <span>Libreville, Gabon</span>
                            </p>
                        </div>

                    </div>

                    <form onSubmit={handleSubmit}
                        action="" className="flex flex-col justify-center items-center gap-4 w-[85vw] md:w-96 h-auto border border-gray-300 rounded-lg p-4 shadow-lg group duration-500">

                        <div className="p-4 my-5">
                            <p className="text-black font-black uppercase text-2xl">écrivez-nous</p>
                        </div>

                        {/* <input 
                            type="text" 
                            name="" id="" 
                            className="w-full h-10 p-2 bg-gray-200 border border-gray-300 rounded-sm hover:transform hover:translate-x-2 duration-500  text-lg" 
                            placeholder="Entrer votre nom"
                        /> */}

                        <input 
                            type="email" 
                            name="sender" id="" 
                            className="w-full h-10 p-2 bg-gray-200 border border-gray-300 rounded-sm hover:transform hover:translate-x-2 duration-500  text-lg" 
                            placeholder="Entrer votre adresse mail"
                        />
                        

                        <input 
                            type="text" 
                            name="subject" id="" 
                            className="w-full h-10 p-2 bg-gray-200 border border-gray-300 rounded-sm hover:transform hover:translate-x-2 duration-500  text-lg" 
                            placeholder="Sujet"
                        />
                        <textarea 
                            name="message" id=""
                            className="w-full h-32 p-2 bg-gray-200 border border-gray-300 rounded-sm hover:transform hover:translate-x-2 duration-500  text-lg" 
                            placeholder="Message"
                        ></textarea>

                        <button 
                            type="submit" 
                            className="p-2 w-full h-10 bg-blue-800  text-white text-[18px] rounded-sm hover:bg-blue-700 duration-500 my-3"
                        >
                            {loading ?(
                                <Loader />
                            ) : (
                                
                                'Envoyer'
                            )}
                            
                        </button>
                    </form>
                </div>
            </div>
            <Footer />
        </div>)
}