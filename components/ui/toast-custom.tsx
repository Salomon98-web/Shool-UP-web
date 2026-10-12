"use client"  
import { createContext, useContext, useState, ReactNode } from "react"  
  
type Toast = { id: number, message: string, type: "success" | "error" | "info" }  
  
const ToastContext = createContext<any>(null)  
  
export function ToasterProvider({ children }: { children: ReactNode }) {  
  const [toasts, setToasts] = useState<Toast[]>([])  
  
  const toast = {  
    success: (msg: string) => add(msg, "success"),  
    error: (msg: string) => add(msg, "error"),  
    info: (msg: string) => add(msg, "info"),  
  }  
  
  const add = (message: string, type: Toast["type"]) => {  
    const id = Date.now()  
    setToasts(t => [...t, { id, message, type }])  
    setTimeout(() => setToasts(t => t.filter(x => x.id!== id)), 3000)  
  }  
  
  return (  
    <ToastContext.Provider value={toast}>  
      {children}  
        <div className="fixed top-18 right-4 z-100 flex flex-col gap-2">  
            {toasts.map(t => (  
              <div key={t.id} className={`w-82 h-auto px-4 py-3 rounded-lg shadow-lg text-sm font-mono animate-in slide-in-from-top-4 duration-300 
                ${t.type === "success"? "border border-green-600 bg-green-100" : t.type === "error"? "border border-red-600 bg-red-100" : "border border-zinc-600 bg-zinc-100"}`}>  
                {t.message}  
              </div>  
            ))}  
        </div>  
    </ToastContext.Provider>  
  )  
}  
  
export const useToastCustom = () => useContext(ToastContext)  
