import clsx from "clsx";
import { FunctionComponent, ReactNode } from "react";
import { NavLink } from "react-router-dom";


interface LinkContentProps {
    to: string
    children: ReactNode
}
 
const LinkContent: FunctionComponent<LinkContentProps> = ( {to, children} ) => {
    return ( 
    <NavLink to={to}
        className={( {isActive} ) => {
            return clsx(
                'flex items-center text-sm gap-2 py-2 px-3 rounded group', 
                {
                    "bg-gray-50 font-semibold": isActive,
                    "text-black": isActive
                }
            )
        }}
    >
        <span className="truncate flex-1">
            {children}
        </span>
    </NavLink> );
}
 
export default LinkContent;