import type {ProductResponse, ProductCardResponse} from "@/services/types/product";

// Client carousels only need card data. Keep reviews, specifications, videos,
// comments and nested products out of their React Server Component payload.
export function productCardData(product: ProductResponse): ProductCardResponse {
    return {
        id: product.id, name: product.name, url: product.url,
        description: product.description, type: product.type, is_stock: product.is_stock,
        min_price: product.min_price, rating: product.rating,
        guaranty: product.guaranty, images: product.images,
        colors: product.colors.map(color => ({
            id: color.id, product_id: color.product_id,
            color_name: color.color_name, color_code: color.color_code,
            status: color.status, statusLabel: color.statusLabel,
            stock: color.stock, price: color.price, discountItem: color.discountItem,
            delivery_delay: color.delivery_delay,
        })),
    };
}
