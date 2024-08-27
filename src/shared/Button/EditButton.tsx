import React, {ButtonHTMLAttributes} from "react";
import {Route} from "@/routers/types";

export interface ButtonProps {
    className?: string;
    disabled?: boolean;
    onClick?: () => void;
    children?: React.ReactNode;
}


export  default  function EditButton(props:ButtonProps){
    return(<>
        <button {...props}
            className={`py-1 px-3 sm:py-0 h-8 sm:px-6 bg-orange-600 hover:bg-orange-700  text-white  rounded-full ${props.className}`}
        >
        </button>
    </>)
}
