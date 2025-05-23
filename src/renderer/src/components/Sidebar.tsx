import { FunctionComponent } from "react";
import * as Collapsible from "@radix-ui/react-collapsible"
import { ArrowBendDoubleUpLeft } from "phosphor-react";
import clsx from "clsx";

interface SidebarProps {
    
}
 
const Sidebar: FunctionComponent<SidebarProps> = () => {
    const isMacOS = process.platform === 'darwin'
    return ( 
        <Collapsible.Content className='bg-gray-950 flex-shrink-0 border-r border-slate-600 h-screen relative group overflow-hidden'>
            <Collapsible.Trigger 
            className={
                clsx(
                'absolute h-7 w-7 right-4 z-[99] text-white inline-flex items-center justify-center', 
                {
                    'top-[1.125rem]': isMacOS,
                    'top-6': !isMacOS
                }
            )}> 
            <ArrowBendDoubleUpLeft className='h-7 w-7'/>
            </Collapsible.Trigger>
            <div className={clsx(
                'flex-1 flex flex-col h-full gap-8 w-[220px] transition-opacity duration-200', 
                    {
                        'pt-6': !isMacOS
                    }
                )}
            >
                <nav>
                    <button className="text-white">ta porra</button>
                </nav>
            </div>
        </Collapsible.Content> 
    );
}
 
export default Sidebar;