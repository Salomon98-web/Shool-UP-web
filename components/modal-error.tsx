import { 
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTitle,
    DialogFooter,
    DialogHeader,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@base-ui/react";
import { AlertTriangle } from "lucide-react";

interface Props{
    open:boolean
    onOpenChange:(open:boolean)=>void
    errors:string[]
}

export default function modalErrors({open, onOpenChange, errors}: Props){
    return(
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="w-72">
                <DialogHeader>
                    <DialogTitle className="text-red-700">
                        <AlertTriangle width="80" height="70" />
                    </DialogTitle>
                </DialogHeader>
                <hr />
                {errors.map((error, index)=>(
                    <p key={index} className=" text-lg font-semibold">
                        {error}
                    </p>
                ))}
            </DialogContent>
        </Dialog>
    )
}