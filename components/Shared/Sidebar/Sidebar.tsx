import { Logo } from "../Logo";
import SidebarRoutes from "../SidebarRoutes/SidebarRoutes";

export default function Sidebar() {
  return (
    <>
        <div className="py-6">
            <Logo />
        </div>
        <SidebarRoutes />
    </>
   
  )
}
