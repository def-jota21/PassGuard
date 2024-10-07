"use client"
import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Menu } from "lucide-react";
import SidebarRoutes from "../SidebarRoutes/SidebarRoutes";


export default function SidebarMobile() {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button className="bg-green-800 hover:bg-green-700 focus:ring-green-600"> <Menu /> </Button>
            </SheetTrigger>
            <SheetContent side="left" className="bg-green-800 text-white">
                <SheetHeader className="text-left">
                    <SheetTitle className="text-white">PassGuard</SheetTitle>
                    <SheetDescription className="text-slate-100">
                        Create and manage your passwords
                    </SheetDescription>
                </SheetHeader>
                <SidebarRoutes />
            </SheetContent>
        </Sheet>
    )
}
