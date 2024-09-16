import {findProductByUrl} from "@/services/api/shop/product";
interface ProductPageProps{
    params:{
        url:string;
    }
}
export default async  function Page2({ params }: ProductPageProps) {
     let product =  await findProductByUrl(params.url[0]);
    console.log("Prod is ",product)
     return (<>
        {
            params.url
        }
    </>)
}
