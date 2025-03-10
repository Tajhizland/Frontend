import Image from "next/image";
import defaultProfile from "@/images/avatar.svg"

export default function Avatar({profile , className=""}:{profile?:string ,className?:string})
{
    return(<>
        <div className={`w-10 h-10 rounded-full overflow-hidden ${className}`}>
            <Image src={
                profile?
                    `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/avatar/${profile}`
                    :
                    defaultProfile
            } alt={"profile"} width={100} height={100}/>
        </div>
    </>)
}
