import React from "react";
export  default  function Panel({children}:{children: React.ReactNode})
{
    return(<>
        <div
            className="p-4  my-1 mx-2 bg-white border-gray-200 border  rounded-lg ">
            {children}
        </div>
    </>)
}
