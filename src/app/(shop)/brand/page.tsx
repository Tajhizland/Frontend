import { getBrandList } from "@/services/api/shop/brand"

export default async function Page() {
    let response = await getBrandList();
    return (<></>)
}
