import { FunctionComponent } from "react";
import * as Collapsible from "@radix-ui/react-collapsible"
import { ArrowBendDoubleUpLeft } from "phosphor-react";
import clsx from "clsx";
import LinkContent from "./Link";

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
                <nav className=" flex-2 mx-2 flex-col gap-8 text-slate-100">
                    <div className="flex flex-col gap-2">
                        <div className="text-white font-semibold uppercase mb-2 ml-2">
                            Menu
                        </div>
                    </div>
                    <section className="flex flex-col gap-px">
                        <LinkContent to="/create"> Habitos </LinkContent>
                        <LinkContent to="/dashboard"> Dashboard </LinkContent>
                    </section>
                </nav>
            </div>
        </Collapsible.Content> 
    );
}
 
export default Sidebar;