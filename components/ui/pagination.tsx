"use client"  
  
type Props = {  
  currentPage: number  
  totalPages: number  
  onPageChange: (page: number) => void  
}  
  
export function Pagination({ currentPage, totalPages, onPageChange }: Props) {  
  const getPages = (): (number | string)[] => {  
    if (totalPages <= 5) {  
      return Array.from({ length: totalPages }, (_, i) => i + 1)  
    }  
  
    const pages: (number | string)[] = [1]  
  
    if (currentPage > 3) pages.push("...")  
  
    for (  
      let i = Math.max(2, currentPage - 1);  
      i <= Math.min(totalPages - 1, currentPage + 1);  
      i++  
    ) {  
      pages.push(i)  
    }  
  
    if (currentPage < totalPages - 2) pages.push("...")  
  
    pages.push(totalPages)  
    return pages  
  }  
  
  const btnBase =  
    "h-9 min-w-9 px-3 rounded-lg border text-sm transition flex items-center justify-center"  
  const btnActive = "bg-blue-800 text-white "  
  const btnIdle = "bg-white hover:bg-zinc-100"  
  
  return (  
    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 w-full mt-6">  
      <span className="text-sm text-zinc-500 order-2 sm:order-1">  
        Page {currentPage} / {totalPages}  
      </span>  
  
      <div className="flex items-center gap-1.5 order-1 sm:order-2">  
        <button  
          onClick={() => onPageChange(currentPage - 1)}  
          disabled={currentPage === 1}  
          className={`${btnBase} ${btnIdle} disabled:opacity-50 disabled:pointer-events-none`}  
        >  
          Précédent  
        </button>  
  
        <div className="hidden sm:flex items-center gap-1.5">  
          {getPages().map((p, i) =>  
            p === "..."? (  
              <span key={`dots-${i}`} className="px-2 text-zinc-400">  
               ...  
              </span>  
            ) : (  
              <button  
                key={p}  
                onClick={() => onPageChange(p as number)}  
                className={`${btnBase} ${currentPage === p? btnActive : btnIdle}`}  
              >  
                {p}  
              </button>  
            )  
          )}  
        </div>  
  
        {/* Mobile */}  
        <div className="flex sm:hidden items-center gap-1.5">  
          <span className={`${btnBase} ${btnActive}`}>{currentPage}</span>  
        </div>  
  
        <button  
          onClick={() => onPageChange(currentPage + 1)}  
          disabled={currentPage === totalPages}  
          className={`${btnBase} ${btnIdle} disabled:opacity-50 disabled:pointer-events-none`}  
        >  
          Suivant  
        </button>  
      </div>  
    </div>  
  )  
}  
