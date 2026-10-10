import type {ProductResponse} from "@/services/types/product";
import {productOffer} from "@/utils/productSeo";

export default function ProductOpenGraph({product}: {product: ProductResponse}) {
    const {price, available} = productOffer(product);
    return <>
        <meta property="og:type" content="product" />
        {price > 0 && Number.isFinite(price) && <>
            <meta property="product:price:amount" content={String(price * 10)} />
            <meta property="product:price:currency" content="IRR" />
        </>}
        <meta property="product:availability" content={available ? "in stock" : "out of stock"} />
    </>;
}
