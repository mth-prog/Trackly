//isso vai ser um componente fixo para parecer em todas as paginas no caso seria nossa sidebar

import { FunctionComponent, useState } from "react";
import { Outlet } from "react-router-dom"
import * as Collapsible from "@radix-ui/react-collapsible"
import Header from "./Header";
import Sidebar from "./Sidebar";


interface LayoutProps {}

const Layout: FunctionComponent<LayoutProps> = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true)
    
    return (
        
        <Collapsible.Root
            defaultOpen
            className="h-screen w-screen bg-gray-950 text-slate-100 flex"
            onOpenChange={setIsSidebarOpen}
        >
            <Sidebar/>
            <div className="flex-1 flex flex-col max-h-screen">
                <Header isSideBarOpen={isSidebarOpen}/>

                <Outlet />
            </div>
         </Collapsible.Root>
    );
}
 
export default Layout;