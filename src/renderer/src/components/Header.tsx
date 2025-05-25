import { FunctionComponent } from "react";
import * as Collapsible from "@radix-ui/react-collapsible"
import { CaretRight } from "phosphor-react";
import clsx from "clsx";

interface HeaderProps {
    isSideBarOpen: boolean
}
 
const Header: FunctionComponent<HeaderProps> = ({isSideBarOpen}) => {
    const isMacOS = process.platform === 'darwin'

    return ( 
        <div
            id='header'
            className={clsx(
                'flex items-center gap-4 leading-tight relative border-b border-slate-600 transition-all duration-200 py-[1.125rem] px-6',
                {
                    'pl-24': isSideBarOpen && isMacOS,
                    'w-screen': !isSideBarOpen,
                    'w-[calc(100vw-220px)]': isSideBarOpen
                }
            )}
        >
        <Collapsible.Trigger
            className={clsx('h-7 w-7 text-gray 800 bg-gray-100 p-1 rounded-full relative z-[99] top-9 left-0', {
                hidden: isSideBarOpen,
                block: !isSideBarOpen
            })}
        >
            <CaretRight className="w-5 h-5"/>
        </Collapsible.Trigger> 
        
            <h1 className="text-white font-bold">Trackly</h1>

        </div>
    );
}
 
export default Header;