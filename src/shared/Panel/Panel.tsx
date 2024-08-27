import React from "react";
export  default  function Panel({children , className}:{children: React.ReactNode , className?:string})
{
    return(<>
        <div
            className={`p-4  my-1 mx-2 bg-white border-gray-200 border  rounded-lg flex flex-col gap-y-4 ${className}`}>
            {children}
        </div>
    </>)
}
