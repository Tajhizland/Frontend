import React from "react";

export  default  function PageLink({children}:{children:React.ReactNode})
{
    return(<>
    <div className={"flex gap-5"}>
        {children}
    </div>
    </>)
}
