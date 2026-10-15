'use client'

import { useState } from "react";
import Sidebar from "../sidebar";
import Topbar from "../topbar";
import Abonnement from "../(elements-dashboard)/cartes-abonnement";
import CartesMesAbonnemets from "../(elements-dashboard)/cartes-mes-abonnement";
import CartesStatistiques from "../(elements-dashboard)/cartes-statistiques"
import CartesStatistiquesAbonnes from "../(elements-dashboard)/cartes-statistiques-abonnes"
import StatsUsers from "../(elements-dashboard)/stats-users";

interface Props{
  token:string | undefined
  role:string | undefined
}

export default function dashboard({token,role}:Props) {
  const [refreshKey, setRefresh] = useState(0)
  return (
    <>
      <div className="flex flex-row justify-center">

        {/** sidebar */}
        <div className="max-w-4/12">
          <Sidebar role={role} />
        </div>

        <div className="flex-1 flex flex-col w-8/12 bg-gray-100">
        
          {/** topbar */}
          <Topbar token={token} onSuccess={()=>setRefresh(k=>k+1)} />

          <div className=" relative top-7 p-2  text-sm px-4 lg:px-14">
            <hr className="p-2" />
            <p className="text-chart-1">Abonnemet disponible</p>
          </div>
          <Abonnement role={role} refreshKey={refreshKey} onSuccess={()=>setRefresh(k=>k+1)} token={token}/>

          <div className=" relative top-10 p-2  text-sm px-4 lg:px-14">
            <hr className="p-2" />
            <p className="text-chart-1">Mes abonnemets</p>
          </div>
          <CartesMesAbonnemets refreshKey={refreshKey} token={token} onSuccess={()=>setRefresh(k=>k+1)}/>

          <div className=" relative top-10 p-2  text-sm px-4 lg:px-14">
            <hr className="p-2" />
            <p className="text-chart-1">Exercices disponibles</p>
          </div>
          {/* cartes statistiques*/}
          <CartesStatistiques token={token}/>

          {role == "admin" ?(
            <>
            {/* cartes abonnes*/}
            <div className=" relative top-10 p-2  text-sm px-4 lg:px-14">
              <hr className="p-2" />
              <p className="text-chart-1">Abonnés</p>
            </div>
            <CartesStatistiquesAbonnes token={token}/>

            {/* section statistique comptes*/}
            <div className=" relative top-10 p-2  text-sm px-4 lg:px-14">
              <hr className="p-2" />
              <p className="text-chart-1">Comptes</p>
            </div>
            <StatsUsers token={token} />
            </>

          ):(null)}

          <div className="my-32"></div>
        </div>
      </div>
    </>
  );
}