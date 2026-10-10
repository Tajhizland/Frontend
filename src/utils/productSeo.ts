import type {ProductResponse} from "../services/types/product";
import {getDisplayColors, isColorAvailable} from "./productColors";
import {absoluteUrl, assetUrl, isoDate, metaDescription} from "./seo";

export function productOffer(product: ProductResponse) {
    const color = getDisplayColors(product.colors)[0];
    const discount = color?.discountItem?.[0];
    // Match ProductSidebar's initial selected color and displayed discount.
    const price = Number(discount?.discount_price || color?.price || 0);
    const oldPrice = Number(color?.price || 0);
    const available = color ? isColorAvailable(color) : false;
    const expiry = discount?.discount_price
        ? isoDate(discount.discount_expire_time_iso || discount.discount_expire_time)
        : undefined;
    return {price, oldPrice, available, expiry};
}

export function productComparisonMetadata(product: ProductResponse): Record<string, string> {
    const {price, oldPrice, available} = productOffer(product);
    return {
        product_id: String(product.id), product_name: product.name,
        ...(price > 0 && {product_price: String(price), product_old_price: String(oldPrice)}),
        availability: available ? "instock" : "outofstock",
        guarantee: product.guaranties?.[0]?.name || "",
    };
}

export function productSchema(product: ProductResponse, path = `/product/${product.url}`) {
    const {price, available, expiry} = productOffer(product);
    // These are the same approved reviews rendered by ProductComment.
    const ratings = (product.comments || []).map(comment => Number(comment.rating))
        .filter(rating => Number.isFinite(rating) && rating >= 1 && rating <= 5);
    return {
        "@context": "https://schema.org",
        "@type": "Product",
        name: product.name,
        url: absoluteUrl(path),
        image: product.images?.map(image => assetUrl("product", image.url)).filter(Boolean),
        description: metaDescription(product.description, 500) || metaDescription(product.review, 500) || product.name,
        sku: String(product.id),
        ...(product.brand_name && {brand: {"@type": "Brand", name: product.brand_name}}),
        ...(ratings.length > 0 && {
            aggregateRating: {
                "@type": "AggregateRating", ratingCount: ratings.length,
                ratingValue: Number((ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length).toFixed(2)),
                bestRating: 5, worstRating: 1,
            },
        }),
        ...(price > 0 && Number.isFinite(price) && {
            offers: {
                "@type": "Offer", url: absoluteUrl(path), priceCurrency: "IRR", price: price * 10,
                availability: `https://schema.org/${available ? "InStock" : "OutOfStock"}`,
                itemCondition: `https://schema.org/${product.is_stock ? "UsedCondition" : "NewCondition"}`,
                ...(expiry && new Date(expiry) > new Date() && {priceValidUntil: expiry.slice(0, 10)}),
                seller: {"@type": "Organization", name: "تجهیزلند"},
            },
        }),
    };
}
