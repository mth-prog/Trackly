//isso vai ser um componente fixo para parecer em todas as paginas no caso seria nossa sidebar

import { FunctionComponent } from "react";
import { Outlet } from "react-router-dom"
import * as Collapsible from "@radix-ui/react-collapsible"

interface LayoutProps {
    
}

const Layout: FunctionComponent<LayoutProps> = () => {
    return (
         <Collapsible.Root>
            
            <div className="flex-1 flex flex-col max-h-screen">
                <Outlet />
            </div>
         </Collapsible.Root>
    );
}
 
export default Layout;