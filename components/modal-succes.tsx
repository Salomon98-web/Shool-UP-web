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
import { CheckCircle,  } from "lucide-react";

interface Props{
    open:boolean
    onOpenChange:(openModalSuccess:boolean)=>void
    message:string
}

export default function modalSuccess({open, onOpenChange, message}: Props){
    return(
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="w-72">
                <DialogHeader>
                    <DialogTitle className="text-green-700 text-lg">
                        <CheckCircle width="80" height="70" />
                    </DialogTitle>
                </DialogHeader>
                    <p className=" text-lg font-semibold">
                        {message}
                    </p>
            </DialogContent>
        </Dialog>
    )
}